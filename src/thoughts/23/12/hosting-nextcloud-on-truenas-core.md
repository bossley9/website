---
title: "Hosting Nextcloud on TrueNAS Core"
description: "This is a guide on how to host a public instance securely on TrueNAS Core."
date: 2023-12-07T20:35:00-04:00
tags:
  - "thought"
  - "tech"
  - "nextcloud"
  - "truenas"
  - "nas"
---

This is guide on how to host a public Nextcloud instance securely on TrueNAS Core. I'm currently in the process of moving all my personal data out of third party cloud providers and decided to set up a NAS (Network Attached Storage) running [TrueNAS Core](https://www.truenas.com/download-truenas-core/) for storing all my data. I also want to be able to share my contacts, files, and photos with other members of my family and settled with using [Nextcloud](https://nextcloud.com/) a free and open source self-hosted cloud provider. I've been using other Nextcloud instances for a few years now and absolutely love it. If you're looking to host your own data, you've come to the right place.

## Table of Contents

1. [Requirements and Disclaimers](#requirements-and-disclaimers)
2. [Creating Datasets](#creating-datasets)
3. [Configuring Dataset Ownership](#configuring-dataset-ownership)
4. [Creating a Jail with Mounted Datasets](#creating-a-jail-with-mounted-datasets)
5. [Connecting to the Jail](#connecting-to-the-jail)
6. [Installation of Packages](#installation-of-packages)
7. [Configuring the Database](#configuring-the-database)
8. [Configuring PHP](#configuring-php)
9. [Installing Nextcloud](#installing-nextcloud)
10. [Configuring the Webserver](#configuring-the-webserver)
11. [Configuring Caching](#configuring-caching)
12. [Configuring Nextcloud](#configuring-nextcloud)
13. [Hardening Security](#hardening-security)
14. [Configuring Email](#configuring-email)
15. [Disabling SSH](#disabling-ssh)
16. [Resources](#resources)

## Requirements and Disclaimers

In order to set up a public Nextcloud instance, you must have:

* **A machine running TrueNAS Core.** TrueNAS Scale may work as well but you will need to modify some steps (namely, package installation).
* **A domain name.** For the sake of this guide I will be using `drive.domain.com`.

At the time of this writing, I am using the following program versions. Your installation may vary.

* `TrueNAS Core 13.0-U5.3`
* `MariaDB 10.6.16`
* `Caddy 2.7.5`
* `Redis 7.2.3`
* `PHP 8.2`
* `Nextcloud 27.1.4`

## Creating Datasets

We first want to create a few separate datasets for the Nextcloud instance. By keeping the database, data, configuration, and themes managed by separate datasets, it ensures that we can restore the Nextcloud service in the case it inevitably fails.

In *Storage* > *Pools*, press the three dots next to the root dataset and press **Add Dataset**. My root dataset is named `tank` so I will be using this name to refer to it going forward. This new dataset will be the main dataset housing all Nextcloud data. Name it `nextcloud-data` then press **Submit**.

We also need to create sub-datasets under the newly created Nextcloud dataset for each category of data Nextcloud stores. Create four sub-datasets with the following properties:

```plaintext
nextcloud-data:
  config:
    Compression level: LZ4
    Enable Atime: On
  data:
    Compression level: LZ4
    Enable Atime: Off
  db:
    Compression level: LZ4
    Enable Atime: Off
  themes:
    Compression level: LZ4
    Enable Atime: On
```

## Configuring Dataset Ownership

We need to set the proper owners of each dataset.

First, we will create a MySQL user. Go to *Account* > *Users* and press **Add**. Fill in the following user information:

```plaintext
Full Name: mysql
Username: mysql
User ID: 88
[x] New Primary Group
Disable Password > Yes
[ ] Samba Authentication
```

Then press **Submit**.

Go back to *Storage* > *Pools* and press **Edit Permissions** next to each sub-dataset created earlier. Make the following changes to dataset ownership. You may need to check an **Apply User** and an **Apply Group** checkbox for each:

```plaintext
nextcloud-data:
  config:
    User: www
    Group: www
  data:
    User: www
    Group: www
  db:
    User: mysql
    Group: mysql
  themes:
    User: www
    Group: www
```

## Creating a Jail with Mounted Datasets

Now we will create a jail which will run the Nextcloud server.

In *Jails*, press **Add**. Name this jail `nextcloud`, then set *Jail Type* to **Default (Clone Jail)**, and set the *Release* to the latest release (**13.2-RELEASE**). Then press **Next**.

Check **DHCP Autoconfigure IPv4** which should automatically check **VNET**. Then press **Next** and **Submit**.

To ensure the jail automatically starts, press **Edit** on the jail, then check **Auto-start**. We also need to check **allow_raw_sockets** under *Jail Properties*. Then press **Save**. Finally, press **Start** on the jail to start it.

It's much easier to mount the datasets to the jail using the given TrueNAS shell. In *Shell*, type the following commands:

```sh
iocage exec nextcloud mkdir -p /mnt/data
iocage exec nextcloud mkdir -p /var/db/mysql
iocage exec nextcloud mkdir -p /usr/local/www/nextcloud/config
iocage exec nextcloud mkdir -p /usr/local/www/nextcloud/themes

iocage fstab -a nextcloud /mnt/tank/nextcloud-data/data /mnt/data nullfs rw 0 0
iocage fstab -a nextcloud /mnt/tank/nextcloud-data/db /var/db/mysql nullfs rw 0 0
iocage fstab -a nextcloud /mnt/tank/nextcloud-data/config /usr/local/www/nextcloud/config nullfs rw 0 0
iocage fstab -a nextcloud /mnt/tank/nextcloud-data/themes /usr/local/www/nextcloud/themes nullfs rw 0 0
```

If for some reason you need to manually edit the fstab file, you can do so with `iocage fstab -e nextcloud`.

Since MariaDB has its own internal cache, we also do not want to cache for the database dataset. This will improve performance:

```sh
zfs set primarycache=metadata tank/nextcloud-data/db
```

## Connecting to the Jail

To make it easier to temporarily access our new jail we will enable SSH (don't worry, we will disable it once the server is completely setup). In *Jails* > `nextcloud` > *Shell*:

```sh
passwd # change to something temporary you will remember!
echo "PermitRootLogin yes" >> /etc/ssh/sshd_config
service sshd enable
service sshd start
```

Then connect to the jail via SSH as `root`. The jail's IP address will be located in *Jails* > `nextcloud`.

## Installation of Packages

We will now install packages necessary for the server. Run the following commands:

```sh
pkg update
pkg install neovim # or nano, or your editor of choice
pkg install wget
pkg install mariadb106-server
pkg install caddy
pkg install redis
# and all PHP packages...
pkg install php82 php82-bz2 php82-ctype php82-curl php82-dom php82-exif php82-fileinfo php82-filter php82-gd php82-iconv php82-intl php82-ldap php82-mbstring php82-opcache php82-pdo php82-pdo_mysql php82-pecl-APCu php82-pecl-imagick php82-pecl-redis php82-posix php82-session php82-simplexml php82-xml php82-xmlreader php82-xmlwriter php82-xsl php82-zip php82-zlib php82-bcmath php82-gmp php82-sysvsem
```

## Configuring the Database

Next, we will configure MariaDB, our database of choice. I've chosen MariaDB because it is officially supported by Nextcloud and the performance of PostgreSQL vs MySQL vs MariaDB seem to all be approximately the same.

In `/usr/local/etc/mysql/my.cnf`, change the socket:

```plaintext
socket = /tmp/mysql.sock
```

Then run the server.

```sh
service mysql-server enable
service mysql-server start
mysql_secure_installation --socket=/tmp/mysql.sock
```

You will need to answer a few prompts during the secure installation:

```plaintext
Enter current password for root (enter for none): # enter the password we set earlier
Switch to unix_socket authentication [Y/n] y
Change the root password? [Y/n] y
New password: # choose a secure database password
Remove anonymous users? [Y/n] y
Disallow root login remotely? [Y/n] y
Remove test database and access to it? [Y/n] y
Reload privilege tables now? [Y/n] y
```

We can now set up the Nextcloud database. Log into MySQL using the database password from earlier.

```sh
mysql -u root -p
```

Then create the database using the following SQL query:

```sql
CREATE DATABASE nextcloud;
CREATE USER 'nextcloud_admin'@'localhost' IDENTIFIED BY 'YOUR_DB_PASSWORD_HERE';
GRANT ALL ON nextcloud.* TO 'nextcloud_admin'@'localhost';
FLUSH PRIVILEGES;
exit
```

We now have a properly configured Nextcloud database!

## Configuring PHP

We need to configure PHP-FPM, the FastCGI implementation of PHP. First, enable the service:

```sh
service php-fpm enable
service php-fpm start
cp /usr/local/etc/php.ini-production /usr/local/etc/php.ini
```

Then edit `/usr/local/etc/php.ini` to configure basic PHP settings:

```ini
memory_limit = 512M
post_max_size = 1999M
cgi.fix_pathinfo = 1
upload_max_filesize = 1999M
date.timezone = America/Kentucky/Louisville # or your local timezone via http://php.net/manual/en/timezones.php
opcache.enable = 1
opcache.enable_cli = 1
opcache.memory_consumption = 128
opcache.interned_strings_buffer = 16
opcache.max_accelerated_files = 10000
opcache.revalidate_freq = 60
opcache.save_comments = 1
opcache.jit = 1255
opcache.jit_buffer_size = 128M
```

Then tune PHP-FPM settings in `/usr/local/etc/php-fpm.d/www.conf`:

```ini
pm = dynamic
pm.max_children = 120
pm.start_servers = 12
pm.min_spare_servers = 6
pm.max_spare_servers = 18

env[HOSTNAME] = $HOSTNAME
env[PATH] = /usr/local/bin:/usr/bin:/bin
env[TMP] = /tmp
env[TMPDIR] = /tmp
env[TEMP] = /tmp
```

Then restart the service:

```sh
service php-fpm restart
```

## Installing Nextcloud

We will now install Nextcloud. Run the following commands:

```sh
cd /tmp
wget https://download.nextcloud.com/server/releases/latest.tar.bz2
wget https://download.nextcloud.com/server/releases/latest.tar.bz2.sha512
shasum -a 512 -c latest.tar.bz2.sha512
tar -xvf latest.tar.bz2 -C /usr/local/www
chown -R www:www /usr/local/www/nextcloud /mnt/data
```

Then configure Nextcloud cron jobs. Open the crontab with the following commands:

```sh
setenv EDITOR nvim
crontab -u www -e
```

Then add the following job:

```plaintext
*/5 * * * * /usr/local/bin/php -f /usr/local/www/nextcloud/cron.php
```

## Configuring the Webserver

We can now configure the webserver. I've chosen Caddy because the configuration syntax is very simple and automatic HTTPS/SSL configuration is a huge win in my mind.

Edit `/usr/local/etc/caddy/Caddyfile` and add the following server configuration.

```plaintext
YOUR_JAIL_IP_HERE, drive.domain.com {
    root * /usr/local/www/nextcloud
    file_server
    php_fastcgi localhost:9000 {
        env front_controller_active true
    }
    encode gzip

    header {
        Strict-Transport-Security "max-age=15768000;includeSubDomains"
    }

    redir /.well-known/carddav /remote.php/dav 301
    redir /.well-known/caldav /remote.php/dav 301
    redir /.well-known/webfinger /index.php/.well-known/webfinger 301
    redir /.well-known/nodeinfo /index.php/.well-known/nodeinfo 301

    @forbidden {
        path /.htaccess
        path /data/*
        path /config/*
        path /db_structure
        path /.xml
        path /README
        path /3rdparty/*
        path /lib/*
        path /templates/*
        path /occ
        path /console.php
    }

    respond @forbidden 404

    log {
        output file /var/log/caddy/access.log
        format json
    }
}
```

Then start the server:

```sh
service caddy enable
service caddy start
```

You should be able to navigate to your jail IP in a browser and see the Nextcloud admin account configuration page! We will configure this after we make a few changes.

## Configuring Caching

We want to configure caching with Redis to increase performance.

First, edit `/usr/local/etc/redis.conf`:

```plaintext
bind 127.0.0.1
port 0
unixsocket /var/run/redis/redis.sock
unixsocketperm 770
```

Then start Redis and set the proper permissions:

```sh
service redis enable
service redis start
pw usermod www -G redis
```

We also need to enable APCu, our local caching mechanism. Edit `/usr/local/etc/php/ext-20-apcu.ini` and add the following:

```plaintext
apc.enabled=1
apc.enable_cli=1
```

## Configuring Nextcloud

Finally, we can set up the Nextcloud admin account. Navigate back to the jail IP in your browser and fill in the following information:

```plaintext
Username: ncadmin
Password: # some secure password you will remember!
Data folder: /mnt/data
Database user: nextcloud_admin
Database password: # the database password you used earlier
Database name: nextcloud
Database host: localhost:/tmp/mysql.sock
```

Then press **Install**. This may take a while. I suggest pressing **Skip** when asked to install recommended apps - you can always install them later.

We now need to configure a few Nextcloud configuration settings to use Redis and good defaults. We will be using the `occ` Nextcloud utility but you can also modify these values directly in `/usr/local/www/nextcloud/config/config.php`.

```sh
su -m www -c 'php /usr/local/www/nextcloud/occ config:system:set redis host --value="/var/run/redis/redis.sock"'
su -m www -c 'php /usr/local/www/nextcloud/occ config:system:set redis port --value=0 --type=integer'
su -m www -c 'php /usr/local/www/nextcloud/occ config:system:set filelocking.enabled --value=true --type=boolean'
su -m www -c 'php /usr/local/www/nextcloud/occ config:system:set memcache.local --value="\OC\Memcache\APCu"'
su -m www -c 'php /usr/local/www/nextcloud/occ config:system:set memcache.locking --value="\OC\Memcache\Redis"'
# set your default phone region based on https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements
su -m www -c 'php /usr/local/www/nextcloud/occ config:system:set default_phone_region --value="US"'
su -m www -c 'php /usr/local/www/nextcloud/occ config:system:set overwrite.cli.url --value="https://drive.domain.com:443"'
su -m www -c 'php /usr/local/www/nextcloud/occ config:system:set trusted_domains 0 --value="YOUR_JAIL_IP"'
su -m www -c 'php /usr/local/www/nextcloud/occ config:system:set trusted_domains 1 --value="drive.domain.com"'
su -m www -c 'php /usr/local/www/nextcloud/occ config:system:set knowledgebaseenabled --value=false --type=boolean'
su -m www -c 'php /usr/local/www/nextcloud/occ config:system:set trashbin_retention_obligation --value="auto, 31"'
```

Then restart the necessary services.

```sh
service redis restart
service php-fpm restart
service caddy restart
```

## Hardening Security

There are a few adjustments we can take to ensure our instance is properly hardened to reduce risk of data loss.

We can harden our FreeBSD jail by inserting the following into `/etc/sysctl.conf`:

```plaintext
security.bsd.see_other_uids=0
security.bsd.see_other_gids=0
security.bsd.unprivileged_read_msgbuf=0
security.bsd.unprivileged_proc_debug=0
kern.randompid=$(jot -r 1 9999)
security.bsd.stack_guard_page=1
```

Then run the following command to clear temporary files:

```sh
sysrc clear_tmp_enable=YES
```

## Configuring Email

In order to get notified for alerts, updates, and to be able to send email reset notifications to users, you will need to set up SMTP.

For the sake of this tutorial we will be using Gmail's SMTP because it is reliable and convenient and ensures your emails will never get flagged as spam. If you know how to set up SMTP yourself feel free to use your own server.

Go to https://myaccount.google.com/ > *Security* > *How you sign in to Google* > *2-Step Verification* > *App passwords* and add a new application. You can call this application `truenas-nextcloud-email` which will give you a generated app password. Copy this password.

Then go to `http://YOUR_JAIL_IP/index.php/settings/admin` and scroll down to the *Email server* section. Type in the following information:

```plaintext
Send mode: SMTP
Encryption: None/STARTTLS
From address: noreply@drive.domain.com
Server address: smtp.gmail.com : 587
Authentication: [x] Authentication required
Credentials (username): # your Gmail address
Credentials (password): # the password you copied earlier
```

To test, make sure your admin account's email is set in your Nextcloud user settings. Then go back to the *Email server* section and press **Send email** to send a test email. If configured properly, you should see an email appear in your inbox.

## Disabling SSH

The final task is to disable SSH to prevent users on the local network from logging in to our server. Run the following commands from the jail shell:

```sh
service sshd stop
service sshd disable
```

That's it! You now have a fully functioning Nextcloud server!

> Please be sure to keep your server regularly updated. Outdated software means a higher risk of compromise.

## Resources

I would like to give credit to the following resources (in no particular order) for guiding me along the way in writing this guide.

* [Creating Jails | Managing TrueNAS Core by Blackbeard Support](https://youtu.be/-AJrrr4wd80)
* [How to install Nextcloud on FreeNAS in an iocage jail with hardened security by Samuel Dowling](https://www.samueldowling.com/2020/07/24/install-nextcloud-on-freenas-iocage-jail-with-hardened-security/)
* [Nextcloud server recommendations](https://docs.nextcloud.com/server/latest/admin_manual/installation/system_requirements.html#server)
* [Caddy FreeBSD Wiki](https://wiki.freebsd.org/ThomasHurst/Caddy)
* [The optimal & fastest Nextcloud-FPM docker setup with Caddy as webserver and https-proxy by zilexa](https://help.nextcloud.com/t/the-optimal-fastest-nextcloud-fpm-docker-setup-with-caddy-as-webserver-and-https-proxy/110515/)
