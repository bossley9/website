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
    };
}
