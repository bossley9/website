{
  description = "Sam's website";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs { inherit system; };
    in
    {
      nixosConfigurations.webserver = nixpkgs.lib.nixosSystem {
        system = "x86_64-linux";
        modules = [ ./server/configuration.nix ];
      };

      packages.${system} = rec {
        default = pkgs.stdenv.mkDerivation {
          name = "website";
          src = ./.;
          buildPhase = ''
            # non-empty build phase to prevent derivation
            # from using makefile build by default
            echo "skip default build phase."
          '';
          installPhase = ''
            mkdir -p $out/
            cp ${resume}/resume.pdf $out/sam-bossley.pdf
            cp ${keys}/keys $out/keys
          '';
        };

        keys = pkgs.stdenv.mkDerivation {
          name = "keys";
          src = ./keys;
          installPhase = ''
            mkdir -p $out
            cp keys.pub $out/keys
          '';
        };

        resume = pkgs.stdenv.mkDerivation {
          name = "resume";
          src = ./src/resume;
          buildInputs = with pkgs; [ texlive.combined.scheme-full ];
          buildPhase = ''
            mkdir -p $out
            pdflatex resume.tex
            cp resume.pdf $out
          '';
        };

      };

      devShells.${system}.default = pkgs.stdenv.mkDerivation {
        name = "website";
        buildInputs = with pkgs; with self.packages.${system}; resume.buildInputs ++ [
          # general dependencies
          nodejs
          # spellcheck
          (aspellWithDicts (d: [ d.en d.en-computers d.en-science ]))
          # s3 access for media files
          s3cmd
          # captioning
          ffmpeg
          openai-whisper-cpp
          # compression
          gzip
          # deployment and other make actions
          rsync
          gnumake
        ];
        shellHook = ''
          set -o vi
          alias g="git"
        '';
      };
    };
}
