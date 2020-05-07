import * as actions from './actions';
import * as types from './types';

describe('search actions', () => {
  it('requestDomainState', () => {
    const expectedAction = {
      type: types.REQUEST_DOMAIN_STATE,
      domain: 'foobar.rsk',
    };
    expect(actions.requestDomainState('foobar.rsk')).toEqual(expectedAction);
  });

  it('receiveDomainState', () => {
    const expectedAction = {
      type: types.RECEIVE_DOMAIN_STATE,
      owned: true,
    };
    expect(actions.receiveDomainState(false)).toEqual(expectedAction);

    const expectedActionFalse = { ...expectedAction, owned: false };
    expect(actions.receiveDomainState(true)).toEqual(expectedActionFalse);
  });

  it('requestDomainOwner', () => {
    expect(actions.requestDomainOwner()).toEqual({ type: types.REQUEST_DOMAIN_OWNER });
  });

  it('receiveDomainOwner', () => {
    const expectedAction = {
      type: types.RECEIVE_DOMAIN_OWNER,
      owner: '0x1234',
    };

    expect(actions.receiveDomainOwner('0x1234')).toEqual(expectedAction);
  });

  it('blockedDomain', () => {
    expect(actions.blockedDomain()).toEqual({ type: types.BLOCKED_DOMAIN });
  });

  it('requestDomainCost', () => {
    expect(actions.requestDomainCost('0x1234')).toEqual({ type: types.REQUEST_DOMAIN_COST });
  });

  it('receiveDomainCost', () => {
    const expectedAction = {
      type: types.RECEIVE_DOMAIN_COST,
      rifCost: 6,
    };

    expect(actions.receiveDomainCost(6)).toEqual(expectedAction);
  });

  it('clearDomainState', () => {
    expect(actions.clearDomainState()).toEqual({ type: types.CLEAR_DOMAIN_STATE });
  });
});
