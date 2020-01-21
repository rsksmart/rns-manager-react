import Production from '../config/contracts.json';
import Testnet from '../config/contracts.testnet.json';
import Local from '../config/contracts.local.json';

const env = 'PRODUCTION';

const returnValue = (name) => {
  console.log(`fetching contract ${name} from ${env}`);
  switch (env) {
    case 'TESTNET':
      return Testnet[name];
    case 'LOCAL':
      return Local[name];
    case 'PRODUCTION':
    default:
      return Production[name];
  }
};

export const rns = returnValue('rns');
export const registrar = returnValue('registrar');
export const reverseRegistrar = returnValue('reverseRegistrar');
export const publicResolver = returnValue('publicResolver');
export const nameResolver = returnValue('nameResolver');
export const multiChainResolver = returnValue('multiChainResolver');
export const rif = returnValue('rif');
export const fifsRegistrar = returnValue('fifsRegistrar');
export const rskOwner = returnValue('rskOwner');
export const renewer = returnValue('renewer');
export const gasPrice = returnValue('gasPrice');
