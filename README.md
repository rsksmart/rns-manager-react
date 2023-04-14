<p align="middle">
    <img src="https://www.rifos.org/assets/img/logo.svg" alt="logo" height="100" >
</p>
<h3 align="middle">RNS Manager</h3>
<p align="middle">
    Manage your RNS domains<br />
    Mainnet: https://manager.rns.rifos.org<br />
    Testnet: https://testnet.manager.rns.rifos.org
</p>
<p align="middle">
    <a href="https://github.com/rnsdomains/rns-manager-react/actions?query=workflow%3Aci">
        <img src="https://github.com/rnsdomains/rns-manager-react/workflows/ci/badge.svg" />
    <a href="https://sonarcloud.io/dashboard?id=rnsdomains_rns-manager-react">
        <img src="https://sonarcloud.io/api/project_badges/measure?project=rnsdomains_rns-manager-react&metric=alert_status" alt="Quality Gate Status" />
    </a>
    <a href="https://github.com/rnsdomains/rns-manager-react/actions?query=workflow%3Adeploy">
        <img src="https://github.com/rnsdomains/rns-manager-react/workflows/RNS%20build%20and%20deploy/badge.svg" />
     </a>
</p>

## Run for development

Requisites:

- [Node v12](https://nodejs.org/en/)
- [yarn](https://yarnpkg.com/)

Install dependencies:

```
yarn
```

### Run locally

1. Run a local blockhain:
    - Preferred: [RSK node](https://developers.rsk.co/quick-start/step1-install-rsk-local-node/)
    - Other options: Ganache or Truffle develop
2. Deploy [RNS Suite](https://github.com/rsksmart/rns-suite) on your local blockchain.
3. Set the contract addresses in `/src/app/config/contracts.local.json`. The contract names are the same as the JSON variable name except for the following:
    - `rif` variable is the `ERC677` contract
    - `registrar` variable is the `TokenRegistrar` contract

> If you are not using `localhost:8545` as your network, change the .env variable in `.env.local`

```
yarn start
```

> Connect your browser wallet to local environment using 'Custom RPC' option

### Run locally against public networks

For RSK Mainnet

```
yarn start:mainnet
```

For RSK Testnet

```
yarn start:testnet
```

### Run tests

The testing suite will first install the RNS suite on a local blockchain before running. To make sure this works properly, start Ganache, and set the URL and port in `/tests/setEnvVars.js`.

Run the linter and unit tests:

```
yarn test
```

Run a test watcher:

```
yarn test:watch
```

Update snapshots and run watcher:
```
yarn test:watch -u
```

### Branching model

- `main` has latest release. Merge into `main` will deploy to S3. Do merge commits.
- `develop` has latest approved PR. Do squash & merge.

PRs:
- Use branches pointing to latest commit in `develop`
- Will deploy to Github Pages

## Build

```
yarn build
```

For RSK Mainnet:

```
yarn build:mainnet
```

For RSK Testnet:

```
yarn build:testnet
```

## Running production builds

Mainnet:
```
docker build -t rns-manager-mainnet . -f mainnet.Dockerfile
docker run -d --name rns-manager-mainnet -p 5000:5000 rns-manager-mainnet
```

Testnet:
```
docker build -t rns-manager-testnet . -f testnet.Dockerfile
docker run -d --name rns-manager-testnet -p 5001:5001 rns-manager-testnet
```

## Custom theme 
To change the default RIF theme edit the `theme.json` file containing the following properties:

```
{
  "logo": "",
  "footerLogo": "",
  "font": {
    "family": "",
    "src": ""
  },
  "colors": {
    "primary": {
      "main": "",
      "light": "",
      "dark": "",
      "transparent": ""
    },
    "secondary": {
      "main": "",
      "light": "",
      "dark": "",
      "transparent": ""
    }
  },
  "images": {
    "homeSpacer": "",
    "footerArch": ""
  },
  "hideHomeContent": false
}
```

## Custom theme 
To change the default RIF theme edit the `theme.json` file containing the following properties:

```
{
  "logo": "",
  "footerLogo": "",
  "font": {
    "family": "",
    "src": ""
  },
  "colors": {
    "primary": {
      "main": "",
      "light": "",
      "dark": "",
      "transparent": ""
    },
    "secondary": {
      "main": "",
      "light": "",
      "dark": "",
      "transparent": ""
    }
  },
  "images": {
    "homeSpacer": "",
    "footerArch": ""
  },
  "hideHomeContent": false
}
```

### Options:
- `logo`: _String_ URL of the header logo.
- `footerLogo`: _String_ URL of the footer logo.
- `font`:
    - `family`: _String_ Name of the font
    - `url`: _String_ URL of the font file, leave empty if the font family is a system font.
- `colors`:
    - `primary`: 
        - `main`: _String_ Color for main areas, hero sections and buttons.
        - `light`: _String_ Text colors, borders and alerts.
        - `dark`: _String_ Text colors, borders and alerts on hover.
        - `transparent`: _String_ On button focus events text color.
    - `secondary`:
        - `main`: _String_ Secondary buttons text color.
        - `light`: _String_ Secondary buttons background color and borders.
        - `dark`: _String_ Secondary buttons background color and borders on hover.
        - `transparent`: _String_ On secondary button focus events text color.
- `images`:
    - `homeSpacer`: _String_ URL of the separator image on the homepage, SVG recommended.
    - `footerArch`: _String_ URL of the footer separator image, SVG recommended.
- `hideHomeContent`: _Boolean_ Hide informational content in the homepage.
