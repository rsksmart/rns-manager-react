require('./setEnvVars');
const RNSSuite = require('@rsksmart/rns-suite');
const fs = require('fs');

// set the blockchainURL. Use 0.0.0.0:8545 for CircleCi
const blockchainUrl = process.env.CIRCLECI ? 'http://0.0.0.0:8545' : process.env.REACT_APP_NODE;

// eslint-disable-next-line no-console
console.log(`Setting up RNS suite on ${blockchainUrl}`);

RNSSuite(
  blockchainUrl,
  ['alice', 'bob', 'charlie'],
  ['david', 'eve', 'frank'],
).then((suite) => {
  const contracts = {
    rns: suite.rns.options.address.toLowerCase(),
    registrar: suite.auctionRegistrar.options.address.toLowerCase(),
    reverseRegistrar: suite.reverseRegistrar.options.address.toLowerCase(),
    publicResolver: suite.publicResolver.options.address.toLowerCase(),
    nameResolver: suite.nameResolver.options.address.toLowerCase(),
    multiChainResolver: suite.multiChainResolver.options.address.toLowerCase(),
    rif: suite.rif.options.address.toLowerCase(),
    fifsRegistrar: suite.fifsRegistrar.options.address.toLowerCase(),
    fifsAddrRegistrar: suite.fifsAddrRegistrar.options.address.toLowerCase(),
    rskOwner: suite.rskOwner.options.address.toLowerCase(),
    renewer: suite.renewer.options.address.toLowerCase(),
  };

  // write a contracts to a local file to be called in a bit:
  const stream = fs.createWriteStream('./src/config/contracts.testing.json');
  stream.once('open', () => {
    stream.write(JSON.stringify(contracts));
    stream.end();
  });
});
