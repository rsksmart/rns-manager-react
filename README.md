<img src="/logo.png" alt="logo" height="200" />

# `rns-manager-react`

Live at https://beta.manager.rns.rifos.org

## Setup

Install dependencies:
```
yarn
```

## Develop

Run RNS in a local blockchain, and connect RNS Manager to this local network.

#### Run RNS locally

```
git clone https://github.com/rnsdomains/RNS.git
cd RNS
# you can modify some values like auction lengths
npm install
truffle develop
truffle(develop)> migrate --reset
```

#### Add Multi-crypto resolver to RNS

```
git clone https://github.com/rnsdomains/rns-artifacts.git
cd rns-artifacts
# create migration file deploying MultiChainResolver artifact
truffle console
truffle(develop)> migrate --reset
```

## Run the RNS Manager locally

The manager can be run in mainnet, testnet, or on a local network. It uses .env files for the configuration of each network. You can use the following to

### Production

```
npm start
```

### Testnet

```
npm run-script start:testnet
```

### Local Network

#### Configuration

Set the contract addresses in `/src/app/config/contracts.local.json`. The contract names are the same as the variable name execpt for the following: 

- `rif` variable is the `ERC677` contract
- `registrar` variable is the `TokenRegistrar` contract

If you are not using `localhost:8545` as your network, change the .env variable in `.env.local`

#### Run command

```
npm run-script start:local
```


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

---

## Related links

- [RSK](https://rsk.co)
    - [Docs](https://github.com/rsksmart/rskj/wiki)
- [RIF](https://rifos.org)
    - [Docs](https://www.rifos.org/documentation/)
    - [Whitepaper](https://docs.rifos.org/rif-whitepaper-en.pdf)
    - [Testnet faucet](https://faucet.rifos.org)
- RNS
    - [Docs](https://docs.rns.rifos.org)
    - [Manager](https://rns.rifos.org)
    - [Testnet registrar](https://testnet.rns.rifos.org)
