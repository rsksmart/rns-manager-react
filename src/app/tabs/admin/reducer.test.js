import reducer from './reducer';
import {
  ADD_SUBDOMAIN,
  RECEIVE_SUBDOMAIN_OWNER,
  CLEAR_SUBDOMAINS,
  REQUEST_SET_SUBDOMAIN_OWNER,
  RECEIVE_SET_SUBDOMAIN_OWNER,
  VIEW_EDIT_SUBDOMAIN_OWNER,
  REVERSE_REQUEST_GET,
  REVERSE_RECEIVE_GET,
  REVERSE_REQUEST_SET,
  REVERSE_RECEIVE_SET,
  REVERSE_ERROR_SET,
} from './types';

describe('admin reducer', () => {
  it('should handle CLEAR_SUBDOMAINS and remove all subdomains', () => {
    expect(reducer(undefined, {
      type: CLEAR_SUBDOMAINS,
    }).subdomains)
      .toEqual(
        [],
      );
  });

  it('should handle ADD_SUBDOMAIN adding a new subdomain label', () => {
    expect(reducer(undefined, {
      type: ADD_SUBDOMAIN,
      label: 'test',
    }).subdomains)
      .toEqual(
        [{
          label: 'test',
          owner: '...',
          viewEdit: false,
          editing: false,
        }],
      );
  });

  it('should handle RECEIVE_SUBDOMAIN_OWNER and set owner when label is in state', () => {
    expect(reducer({
      subdomains: [
        {
          label: 'test',
        },
      ],
    }, {
      type: RECEIVE_SUBDOMAIN_OWNER,
      label: 'test',
      owner: '0x01',
    }).subdomains)
      .toEqual(
        [{
          label: 'test',
          owner: '0x01',
        }],
      );
  });

  it('should handle RECEIVE_SUBDOMAIN_OWNER keep previous state when label is not in state', () => {
    expect(reducer({
      subdomains: [
        {
          label: 'test',
        },
      ],
    }, {
      type: RECEIVE_SUBDOMAIN_OWNER,
      label: 'test2',
      owner: '0x01',
    }).subdomains)
      .toEqual(
        [{
          label: 'test',
        }],
      );
  });

  it('should handle VIEW_EDIT_SUBDOMAIN_OWNER and set the opposite value to viewEdit when label is in state', () => {
    expect(reducer({
      subdomains: [
        {
          label: 'test',
          viewEdit: true,
        },
      ],
    }, {
      type: VIEW_EDIT_SUBDOMAIN_OWNER,
      label: 'test',
    }).subdomains)
      .toEqual(
        [{
          label: 'test',
          viewEdit: false,
        }],
      );
  });

  it('should handle VIEW_EDIT_SUBDOMAIN_OWNER and keep previous state when label is not in state', () => {
    expect(reducer({
      subdomains: [
        {
          label: 'test',
          viewEdit: true,
        },
      ],
    }, {
      type: VIEW_EDIT_SUBDOMAIN_OWNER,
      label: 'test2',
    }).subdomains)
      .toEqual(
        [{
          label: 'test',
          viewEdit: true,
        }],
      );
  });

  it('should handle REQUEST_SET_SUBDOMAIN_OWNER and set edditing value when label is in state', () => {
    expect(reducer({
      subdomains: [
        {
          label: 'test',
        },
      ],
    }, {
      type: REQUEST_SET_SUBDOMAIN_OWNER,
      label: 'test',
    }).subdomains)
      .toEqual(
        [{
          label: 'test',
          editing: true,
        }],
      );
  });

  it('should handle REQUEST_SET_SUBDOMAIN_OWNER and keep previous state when label is not in state', () => {
    expect(reducer({
      subdomains: [
        {
          label: 'test',
        },
      ],
    }, {
      type: REQUEST_SET_SUBDOMAIN_OWNER,
      label: 'test2',
    }).subdomains)
      .toEqual(
        [{
          label: 'test',
        }],
      );
  });

  it('should handle RECEIVE_SET_SUBDOMAIN_OWNER and set editing value when label is in state', () => {
    expect(reducer({
      subdomains: [
        {
          label: 'test',
        },
      ],
    }, {
      type: RECEIVE_SET_SUBDOMAIN_OWNER,
      label: 'test',
    }).subdomains)
      .toEqual(
        [{
          label: 'test',
          editing: false,
        }],
      );
  });

  it('should handle RECEIVE_SET_SUBDOMAIN_OWNER and keep previous state when label is not in state', () => {
    expect(reducer({
      subdomains: [
        {
          label: 'test',
        },
      ],
    }, {
      type: RECEIVE_SET_SUBDOMAIN_OWNER,
      label: 'test2',
    }).subdomains)
      .toEqual(
        [{
          label: 'test',
        }],
      );
  });

  it('should handle REVERSE_REQUEST_GET and set props', () => {
    expect(reducer(undefined, {
      type: REVERSE_REQUEST_GET,
    }).reverse)
      .toEqual(
        {
          getting: true,
          reverseResolution: undefined,
          setting: false,
        },
      );
  });

  it('should handle REVERSE_RECEIVE_GET with empty string and set hasReverse to false', () => {
    expect(reducer(undefined, {
      reverseResolution: '',
      type: REVERSE_RECEIVE_GET,
    }).reverse)
      .toEqual(
        {
          getting: false,
          reverseResolution: '',
          setting: false,
        },
      );
  });

  it('should handle REVERSE_RECEIVE_GET and set reverse resolution', () => {
    expect(reducer(undefined, {
      reverseResolution: 'test',
      type: REVERSE_RECEIVE_GET,
    }).reverse)
      .toEqual(
        {
          getting: false,
          reverseResolution: 'test',
          setting: false,
        },
      );
  });

  it('should handle REVERSE_REQUEST_SET and set setting', () => {
    expect(reducer(undefined, {
      type: REVERSE_REQUEST_SET,
    }).reverse)
      .toEqual(
        {
          getting: false,
          reverseResolution: undefined,
          setting: true,
        },
      );
  });

  it('should handle REVERSE_RECEIVE_SET and set hasReverse', () => {
    expect(reducer(undefined, {
      reverseResolution: 'test',
      type: REVERSE_RECEIVE_SET,
    }).reverse)
      .toEqual(
        {
          getting: false,
          reverseResolution: 'test',
          setting: false,
        },
      );
  });

  it('should handle REVERSE_ERROR_SET and remove setting flag', () => {
    expect(reducer(undefined, {
      type: REVERSE_ERROR_SET,
    }).reverse)
      .toEqual(
        {
          getting: false,
          reverseResolution: undefined,
          setting: false,
        },
      );
  });
});
