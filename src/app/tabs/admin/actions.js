import {
  OWNER, RESOLVER, TTL,
  ADD_SUBDOMAIN, RECEIVE_SUBDOMAIN_OWNER, CLEAR_SUBDOMAINS,
  VIEW_EDIT_SUBDOMAIN_OWNER, REQUEST_SET_SUBDOMAIN_OWNER, RECEIVE_SET_SUBDOMAIN_OWNER,
  REVERSE_REQUEST_GET, REVERSE_RECEIVE_GET,
  REVERSE_REQUEST_SET, REVERSE_RECEIVE_SET, REVERSE_ERROR_SET,
  FIFS_MIGRATION_CHECK_SUBDOMAIN, FIFS_MIGRATION_REQUEST_CHECK_MIGRATION,
  FIFS_MIGRATION_RECEIVE_CHECK_MIGRATION, FIFS_MIGRATION_RECEIVE_MIGRATION,
  FIFS_MIGRATION_REQUEST_MIGRATION, FIFS_MIGRATION_ERROR_MIGRATION,
  FIFS_MIGRATION_ERROR_CHECK_MIGRATION,
} from './types';

import filedActions from '../../factories/actionFactory';

export const owner = filedActions(OWNER);
export const resolver = filedActions(RESOLVER);
export const ttl = filedActions(TTL);

// subdomains
export const addSubdomain = label => ({
  type: ADD_SUBDOMAIN,
  label,
});

export const receiveSubdomainOwner = (label, subdomainOwner) => ({
  type: RECEIVE_SUBDOMAIN_OWNER,
  label,
  owner: subdomainOwner,
});

export const clearSubdomains = () => ({
  type: CLEAR_SUBDOMAINS,
});

// subdomain owners
export const viewEditSubdomainOwner = label => ({
  type: VIEW_EDIT_SUBDOMAIN_OWNER,
  label,
});

export const requestSetSubdomainOwner = label => ({
  type: REQUEST_SET_SUBDOMAIN_OWNER,
  label,
});

export const receiveSetSubdomainOwner = label => ({
  type: RECEIVE_SET_SUBDOMAIN_OWNER,
  label,
});

export const requestGetReverse = () => ({
  type: REVERSE_REQUEST_GET,
});

export const receiveGetReverse = reverseResolution => ({
  type: REVERSE_RECEIVE_GET,
  reverseResolution,
});

export const requestSetReverse = () => ({
  type: REVERSE_REQUEST_SET,
});

export const receiveSetReverse = reverseResolution => ({
  type: REVERSE_RECEIVE_SET,
  reverseResolution,
});

export const errorSetReverse = () => ({
  type: REVERSE_ERROR_SET,
});

export const fifsMigrationCheckIfSubdomain = isSubdomain => ({
  type: FIFS_MIGRATION_CHECK_SUBDOMAIN,
  isSubdomain,
});

export const requestCheckFifsMigration = () => ({
  type: FIFS_MIGRATION_REQUEST_CHECK_MIGRATION,
});

export const receiveCheckFifsMigration = migrated => ({
  type: FIFS_MIGRATION_RECEIVE_CHECK_MIGRATION,
  migrated,
});

export const errorCheckFifsMigration = () => ({
  type: FIFS_MIGRATION_ERROR_CHECK_MIGRATION,
});

export const requestFifsMigration = () => ({
  type: FIFS_MIGRATION_REQUEST_MIGRATION,
});

export const receiveFifsMigration = () => ({
  type: FIFS_MIGRATION_RECEIVE_MIGRATION,
});

export const errorFifsMigration = () => ({
  type: FIFS_MIGRATION_ERROR_MIGRATION,
});
