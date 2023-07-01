{ config, pkgs, lib, ... }:

let
  email = "bossley.samuel@gmail.com";
in
{
  imports = [
    ./hardware-configuration.nix
  ];

  nix.settings = {
    experimental-features = [ "nix-command" "flakes" ];
    allowed-users = [ "@wheel" ];
  };

  hardware.enableRedistributableFirmware = true;

  boot.loader = {
    grub = {
      enable = true;
      device = "/dev/vda";
    };
    timeout = 2;
  };

  networking = {
    hostName = "webserver";
    useDHCP = false; # False recommended for security
    interfaces.enp1s0.useDHCP = true;
  };

  services.timesyncd.enable = true;
  time.timeZone = "America/Los_Angeles";
  i18n.defaultLocale = "en_US.UTF-8";
  console = {
    font = "Lat2-Terminus16";
    keyMap = "us";
  };

  users.mutableUsers = false;
  users.users.nixos = {
    isNormalUser = true;
    initialPassword = "test1234!";
    extraGroups = [ "wheel" ];
    openssh.authorizedKeys.keys = lib.strings.splitString "\n" (builtins.readFile ../keys.pub);
  };
  environment.defaultPackages = lib.mkForce [ ]; # Remove default packages for security
  environment.systemPackages = with pkgs; [
    neovim
    git
    rsync
  ];
  environment.shellInit = ''
    umask 0077
  '';
  programs.bash.shellInit = ''
    set -o vi > /dev/null 2>&1
    alias vim="nvim"
    alias nrs="doas nixos-rebuild switch --flake .#"
  '';

  security = {
    sudo.enable = false;
    doas = {
      enable = true;
      extraRules = [
        { groups = [ "wheel" ]; noPass = true; keepEnv = true; }
      ];
    };
    lockKernelModules = true; # Disable loading kernel modules after boot
  };

  services.openssh = {
    enable = true;
    allowSFTP = false;
    settings = {
      PasswordAuthentication = false;
      PermitRootLogin = "no";
    };
    extraConfig = ''
      AuthenticationMethods publickey
    '';
  };
  services.sshguard.enable = true;

  # Automatically garbage collect nix
  nix.gc = {
    automatic = true;
    dates = "weekly";
  };
  # Reduce systemd journaling
  services.journald.extraConfig = ''
    SystemMaxUse=250M
    MaxRetentionSec=7day
  '';
  services.cron = {
    enable = true;
    systemCronJobs = [
      # Reboot on Sundays at 3 AM
      "0 3 * * 0 root reboot"
    ];
  };

  networking.firewall = {
    enable = true;
    allowedTCPPorts = [
      22 # OpenSSH (automatically allowed but explicitly adding for sanity)
      80 # HTTP
      443 # HTTPS
      873 # Rsync
    ];
  };
  security.acme = {
    acceptTerms = true;
    defaults.email = email;
  };
  services.nginx = {
    enable = true;
    recommendedGzipSettings = true;
    recommendedOptimisation = true;
    recommendedTlsSettings = true;
    virtualHosts = {
      "www.bossley.us" = {
        forceSSL = true;
        enableACME = true;
        globalRedirect = "sam.bossley.us";
      };
      "bossley.us" = {
        forceSSL = true;
        enableACME = true;
        globalRedirect = "sam.bossley.us";
      };
      "www.sam.bossley.us" = {
        forceSSL = true;
        enableACME = true;
        globalRedirect = "sam.bossley.us";
      };
      "sam.bossley.us" = {
        forceSSL = true;
        enableACME = true;
        root = "/var/www/sam.bossley.us";
        extraConfig = ''
          error_page 400 401 402 403 404 429 /404.html;
          # security headers
          location / {
            add_header X-Frame-Options "sameorigin";
            add_header X-XSS-Protection "1";
            add_header X-Content-Type-Options "nosniff";
            add_header X-Permitted-Cross-Domain-Policies "none";
            add_header Strict-Transport-Security "max-age=31536000";
            add_header Content-Security-Policy "default-src * data:; script-src https: 'unsafe-inline' 'unsafe-eval'; style-src https: 'unsafe-inline'";
            add_header Referrer-Policy "no-referrer-when-downgrade";
            add_header Feature-Policy "camera 'none'; fullscreen 'self'; geolocation 'none'; microphone 'none'";
          }

          # static asset caching
          location ~* .(?:css|jpg|js|png|webp|woff)$ {
            expires 1y;
            add_header Cache-Control "public, no-transform";
          }
        '';
      };
    };
  };

  services.rsyncd = {
    enable = true;
    port = 873;
  };

  system.stateVersion = "22.05"; # required
}
