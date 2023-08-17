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
    interfaces.ens3.useDHCP = true;
  };

  services.timesyncd.enable = true;
  time.timeZone = "America/Los_Angeles";
  i18n.defaultLocale = "en_US.UTF-8";
  console = {
    font = "Lat2-Terminus16";
    keyMap = "us";
  };

  users.mutableUsers = false;
  users.users.admin = {
    isNormalUser = true;
    extraGroups = [ "wheel" ];
    openssh.authorizedKeys.keys = lib.strings.splitString "\n" (builtins.readFile ../keys/keys.pub);
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
    allowSFTP = true;
    ports = [ 24 ];
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
      24 # OpenSSH (custom port to reduce extraneous pings)
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
        extraConfig = builtins.readFile ./nginx.conf;
      };
    };
  };

  services.rsyncd = {
    enable = true;
    port = 873;
  };

  system.stateVersion = "22.05"; # required
}
