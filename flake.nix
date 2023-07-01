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

      packages.${system}.default = pkgs.stdenv.mkDerivation {
        name = "resume";
        src = ./src/resume;
        buildInputs = with pkgs; [ texlive.combined.scheme-full ];
        buildPhase = ''
          mkdir -p $out/resume
          pdflatex resume.tex
          cp resume.pdf $out/resume/sam-bossley.pdf
        '';
      };

      devShells.${system}.default = pkgs.stdenv.mkDerivation {
        name = "website";
        buildInputs = with pkgs; self.packages.${system}.default.buildInputs ++ [
          # general dependencies
          nodejs
          # spellcheck
          aspell
          aspellDicts.en
          aspellDicts.en-computers
          aspellDicts.en-science
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
