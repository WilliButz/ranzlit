{
  description = "Simple React app for transliteration from Latin to Russian Cyrillic";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    napalm = {
      url = "github:nix-community/napalm";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
    napalm
  }:
  flake-utils.lib.eachDefaultSystem (system:
  let
    pkgs = import nixpkgs { inherit system; };
    buildPackage = napalm.legacyPackages.${system}.buildPackage;
  in
  {
    packages.default = self.packages.${system}.ranzlit;
    packages.ranzlit = buildPackage ./. {
      GENERATE_SOURCEMAP = "false";
      NODE_ENV = "production";
      npmCommands = [
        "npm install"
        "npm run build"
      ];
      installPhase = ''
        mv build $out
      '';
    };

    devShells.default = pkgs.mkShell {
      name = "ranzlit-env";
      buildInputs = [
        pkgs.nodejs
        pkgs.nodePackages.npm
        pkgs.nodePackages.create-react-app
      ];
    };
  });
}
