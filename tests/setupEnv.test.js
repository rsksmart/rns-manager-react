/* eslint-disable arrow-body-style */
import Web3 from 'web3';
import { keccak_256 as sha3 } from 'js-sha3';
import ganache from 'ganache-cli';
import RNSSuite from '@rsksmart/rns-suite';

import { rskOwnerAbi } from '../src/app/tabs/search/abis.json';

const ONE_HUNDREAD = 100000000000000000000;
const ONE = ONE_HUNDREAD / 100;

describe('set up RSK environment, contracts, etc', () => {
  let web3;
  let accounts;
  let rnsAddr;

  beforeAll(async () => {
    // setup blockchain and get account list
    const provider = ganache.provider();
    web3 = new Web3(provider);
    accounts = await web3.eth.getAccounts();

    // setup RSK suite, the 60000 at the end of beforeAll lets this function
    // have up to 60 seconds to complete
    const suite = await RNSSuite(provider, ['alice', 'bob', 'charlie'], ['david', 'eve', 'frank']);

    rnsAddr = {
      rskOwner: suite.rskOwner.options.address,
      rns: suite.rns.options.address,
    };
  }, 60000);

  beforeEach(() => {
    // deploy suite
    // console.log('before each');
  });

  afterAll(() => {
    // console.log('after all!');
  });

  it('gets the block number after RNS suite is deployed', async () => {
    const currentBlock = await web3.eth.getBlock('latest');
    expect(currentBlock.number).toBe(39);
  });

  it('accounts exists and has a balance', async () => {
    // first account exists
    expect(accounts[0]).toBeTruthy();

    // second account has full balance
    const balance = await web3.eth.getBalance(accounts[1]);
    expect(parseInt(balance, 10)).toBe(ONE_HUNDREAD);
  });

  it('can send a transaction from one account to another', async () => {
    return web3.eth.sendTransaction({
      from: accounts[0],
      to: accounts[1],
      value: ONE,
    })
      .then(async () => {
        const newBalance1 = await web3.eth.getBalance(accounts[0]);
        const newBalance2 = await web3.eth.getBalance(accounts[1]);
        expect(newBalance1 < ONE_HUNDREAD).toBeTruthy();
        expect(newBalance2 > ONE_HUNDREAD).toBeTruthy();
      });
  });

  it('it should show the domain david as unavailable', async () => {
    const rskOwner = new web3.eth.Contract(rskOwnerAbi, rnsAddr.rskOwner);
    const hash = `0x${sha3('david')}`;

    return rskOwner.methods.available(hash).call()
      .then((available) => {
        expect(available).toBeFalsy();
      });
  });

  it('it should show the domain foobar as available', async () => {
    const rskOwner = new web3.eth.Contract(rskOwnerAbi, rnsAddr.rskOwner);
    const hash = `0x${sha3('foobar')}`;

    return rskOwner.methods.available(hash).call()
      .then((available) => {
        expect(available).toBeTruthy();
      });
  });
});
