import reducer from './reducer';
import {  OWNER, RESOLVER, TTL, ADD_SUBDOMAIN, RECEIVE_SUBDOMAIN_OWNER, CLEAR_SUBDOMAINS,
  REQUEST_SET_SUBDOMAIN_OWNER, RECEIVE_SET_SUBDOMAIN_OWNER, VIEW_EDIT_SUBDOMAIN_OWNER } from './types';

  describe('admin reducer', () => {
    it('should handle CLEAR_SUBDOMAINS and remove all subdomains', () => {
      expect(reducer(undefined, {
        type: CLEAR_SUBDOMAINS
      }).subdomains)
      .toEqual(
        []
      );
    });

    it('should handle ADD_SUBDOMAIN adding a new subdomain label', () => {
      expect(reducer(undefined, {
        type: ADD_SUBDOMAIN,
        label: 'test'
      }).subdomains)
      .toEqual(
        [{
          label: 'test',
          owner: '...',
          viewEdit: false,
          editting: false
        }]
      );
    });

    it('should handle RECEIVE_SUBDOMAIN_OWNER and set owner when label is in state', () => {
      expect(reducer({
        subdomains: [
          {
            label: 'test'
          }
        ]
      }, {
        type: RECEIVE_SUBDOMAIN_OWNER,
        label: 'test',
        owner: '0x01'
      }).subdomains)
      .toEqual(
        [{
          label: 'test',
          owner: '0x01'
        }]
      );
    });

    it('should handle RECEIVE_SUBDOMAIN_OWNER keep previous state when label is not in state', () => {
      expect(reducer({
        subdomains: [
          {
            label: 'test'
          }
        ]
      }, {
        type: RECEIVE_SUBDOMAIN_OWNER,
        label: 'test2',
        owner: '0x01'
      }).subdomains)
      .toEqual(
        [{
          label: 'test'
        }]
      );
    });

    it('should handle VIEW_EDIT_SUBDOMAIN_OWNER and set the opposite value to viewEdit when label is in state', () => {
      expect(reducer({
        subdomains: [
          {
            label: 'test',
            viewEdit: true
          }
        ]
      }, {
        type: VIEW_EDIT_SUBDOMAIN_OWNER,
        label: 'test'
      }).subdomains)
      .toEqual(
        [{
          label: 'test',
          viewEdit: false
        }]
      );
    });

    it('should handle VIEW_EDIT_SUBDOMAIN_OWNER and keep previous state when label is not in state', () => {
      expect(reducer({
        subdomains: [
          {
            label: 'test',
            viewEdit: true
          }
        ]
      }, {
        type: VIEW_EDIT_SUBDOMAIN_OWNER,
        label: 'test2'
      }).subdomains)
      .toEqual(
        [{
          label: 'test',
          viewEdit: true
        }]
      );
    });

    it('should handle REQUEST_SET_SUBDOMAIN_OWNER and set edditing value when label is in state', () => {
      expect(reducer({
        subdomains: [
          {
            label: 'test'
          }
        ]
      }, {
        type: REQUEST_SET_SUBDOMAIN_OWNER,
        label: 'test'
      }).subdomains)
      .toEqual(
        [{
          label: 'test',
          editting: true
        }]
      );
    });

    it('should handle REQUEST_SET_SUBDOMAIN_OWNER and keep previous state when label is not in state', () => {
      expect(reducer({
        subdomains: [
          {
            label: 'test'
          }
        ]
      }, {
        type: REQUEST_SET_SUBDOMAIN_OWNER,
        label: 'test2'
      }).subdomains)
      .toEqual(
        [{
          label: 'test'
        }]
      );
    });

    it('should handle RECEIVE_SET_SUBDOMAIN_OWNER and set edditing value when label is in state', () => {
      expect(reducer({
        subdomains: [
          {
            label: 'test'
          }
        ]
      }, {
        type: RECEIVE_SET_SUBDOMAIN_OWNER,
        label: 'test'
      }).subdomains)
      .toEqual(
        [{
          label: 'test',
          editting: false
        }]
      );
    });

    it('should handle RECEIVE_SET_SUBDOMAIN_OWNER and keep previous state when label is not in state', () => {
      expect(reducer({
        subdomains: [
          {
            label: 'test'
          }
        ]
      }, {
        type: RECEIVE_SET_SUBDOMAIN_OWNER,
        label: 'test2'
      }).subdomains)
      .toEqual(
        [{
          label: 'test'
        }]
      );
    });
  });