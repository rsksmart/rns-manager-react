const RNSSuite = require('@rsksmart/rns-suite');
const fs = require('fs');

// set the blockchainURL. Use 0.0.0.0:8545 for CircleCi
const blockchainUrl = 'http://127.0.0.1:7545';
// const blockchainUrl = 'http://0.0.0.0:8545';

RNSSuite(
  blockchainUrl,
  ['alice', 'bob', 'charlie'],
  ['david', 'eve', 'frank'],
).then((suite) => {
  const contracts = {
    rns: suite.rns.options.address,
    reverseRegistrar: suite.reverseRegistrar.options.address,
    publicResolver: suite.publicResolver.options.address,
    nameResolver: suite.nameResolver.options.address,
    multiChainResolver: suite.multiChainResolver.options.address,
    rif: suite.rif.options.address,
    fifsRegistrar: suite.fifsRegistrar.options.address,
    fifsAddrRegistrar: suite.fifsAddrRegistrar.options.address,
    rskOwner: suite.rskOwner.options.address,
    renewer: suite.renewer.options.address,
  };

  // write a contracts to a local file to be called in a bit:
  const stream = fs.createWriteStream('./src/config/contracts.circleci.json');
  stream.once('open', () => {
    stream.write(JSON.stringify(contracts));
    stream.end();
  });
});
