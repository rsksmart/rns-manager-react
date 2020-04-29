/* eslint-disable arrow-body-style */
import Web3 from 'web3';
import ganache from 'ganache-cli';

const ONE_HUNDREAD = 100000000000000000000;
const ONE = ONE_HUNDREAD / 100;

describe('set up RSK environment, contracts, etc', () => {
  let web3;
  let accounts;
  beforeAll(async () => {
    // setup blockchain,
    // const ganache = require('ganache-cli');
    web3 = new Web3(ganache.provider());
    accounts = await web3.eth.getAccounts();
  });

  beforeEach(() => {
    // deploy suite
    console.log('before each');
  });

  afterAll(() => {
    console.log('after all!');
  });

  it('returns true', () => {
    console.log('test run');
    expect(true).toBeTruthy();
  });

  it('gets the block number', async () => {
    const currentBlock = await web3.eth.getBlock('latest');
    expect(currentBlock.number).toBe(0);
  });

  it('first account exists and has a balance', async () => {
    expect(accounts[0]).toBeTruthy();

    const balance = await web3.eth.getBalance(accounts[0]);
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
});
