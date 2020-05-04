const RNSSuite = require('@rsksmart/rns-suite');

// const local = 'http://127.0.0.1:7545';
const circleci = 'http://0.0.0.0:8545';

RNSSuite (
  circleci,
  ['alice', 'bob', 'charlie'],
  ['david', 'eve', 'frank']
).then(suite => {

  const contracts = {
    "rns": suite.rns.options.address,
    "reverseRegistrar": suite.reverseRegistrar.options.address,
    "publicResolver": suite.publicResolver.options.address,
    "nameResolver": suite.nameResolver.options.address,
    "multiChainResolver": suite.multiChainResolver.options.address,
    "rif": suite.rif.options.address,
    "fifsRegistrar": suite.fifsRegistrar.options.address,
    "fifsAddrRegistrar": suite.fifsAddrRegistrar.options.address,
    "rskOwner": suite.rskOwner.options.address,
    "renewer": suite.renewer.options.address
  };

  // write a contracts to a local file to be called in a bit:
  var fs = require('fs');
  var stream = fs.createWriteStream("./src/config/contracts.circleci.json");
  stream.once('open', function(fd) {
    stream.write(JSON.stringify(contracts));
    stream.end();
  });
});

