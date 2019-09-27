import fieldTypes from '../../factories/typeFactory';

export const OWNER = fieldTypes('OWNER');
export const RESOLVER = fieldTypes('RESOLVER');
export const TTL = fieldTypes('TTL');

// subdomains
export const ADD_SUBDOMAIN = 'ADD_SUBDOMAIN';
export const RECEIVE_SUBDOMAIN_OWNER = 'RECEIVE_SUBDOMAIN_OWNER';
export const CLEAR_SUBDOMAINS = 'CLEAR_SUBDOMAINS';

// set subdomain owner
export const VIEW_EDIT_SUBDOMAIN_OWNER = 'VIEW_EDIT_SUBDOMAIN_OWNER';
export const REQUEST_SET_SUBDOMAIN_OWNER = 'REQUEST_SET_SUBDOMAIN_OWNER';
export const RECEIVE_SET_SUBDOMAIN_OWNER = 'RECEIVE_SET_SUBDOMAIN_OWNER';

export const REVERSE_REQUEST_GET = 'REVERSE_REQUEST_GET';
export const REVERSE_RECEIVE_GET = 'REVERSE_RECEIVE_GET';
export const REVERSE_REQUEST_SET = 'REVERSE_REQUEST_SET';
export const REVERSE_RECEIVE_SET = 'REVERSE_RECEIVE_SET';
export const REVERSE_ERROR_SET = 'REVERSE_ERROR_SET';
