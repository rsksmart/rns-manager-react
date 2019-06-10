import reducer from './reducer';
import { REQUEST_RESOLVE_ADDRESS, RECEIVE_RESOLVE_ADDRESS } from './types';

describe('home reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}))
    .toEqual(
    {
      address: '',
      resolveAddressLoading: false
    });
  });

  it('should handle REQUEST_RESOLVE_ADDRESS', () => {
    expect(
      reducer({}, {
        type: REQUEST_RESOLVE_ADDRESS
      })
    )
    .toEqual({
      address: '',
      resolveAddressLoading: true
    });
  });

  it('should handle RECEIVE_RESOLVE_ADDRESS', () => {  
    expect(
      reducer({}, {
        type: RECEIVE_RESOLVE_ADDRESS,
        address: '0x01'
      })
    ).toEqual({
      address: '0x01',
      resolveAddressLoading: false
    });
  });

  it('should handle REQUEST_RESOLVE_ADDRESS and RECEIVE_RESOLVE_ADDRESS', () => {
    expect(
      reducer({}, {
        type: REQUEST_RESOLVE_ADDRESS
      })
    )
    .toEqual({
      address: '',
      resolveAddressLoading: true
    });

    expect(
      reducer({
        address: '',
        resolveAddressLoading: true
      },{
        type: RECEIVE_RESOLVE_ADDRESS,
        address: '0x01'
      })
    ).toEqual({
      address: '0x01',
      resolveAddressLoading: false
    });
  });

  it('should return the initial state when action is not implemented', () => {
    expect(reducer(undefined, {
      type: 'NOT_IMPLEMENTED'
    }))
    .toEqual(
    {
      address: '',
      resolveAddressLoading: false
    });
  });
});
