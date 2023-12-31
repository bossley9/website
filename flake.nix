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
          buildInputs = with pkgs; [ texlive.combined.scheme-full ];
          buildPhase = ''
            mkdir -p $out
            pdflatex src/_resume/resume.tex
            mv resume.pdf $out/sam-bossley.pdf
          '';
        };
      };

      devShells.${system}.default = pkgs.stdenv.mkDerivation {
        name = "website";
        buildInputs = with pkgs; with self.packages.${system}; buildInputs ++ [
          gnugrep
          deno
          # spellcheck
          (aspellWithDicts (d: [ d.en d.en-computers d.en-science ]))
          # captioning
          ffmpeg
          openai-whisper-cpp
          # compression
          gzip
          # deployment
          rsync
        ];
        shellHook = ''
          set -o vi
          alias g="git"
          ./scripts/setup.sh
        '';
      };
    };
}
