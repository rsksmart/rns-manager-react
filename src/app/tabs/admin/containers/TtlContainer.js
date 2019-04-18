import React from 'react';
import { RegistryFieldContainer } from '.';
import { valueTypes } from '../types';
import { changeEditTtl } from '../actions';
import { getDomainTtl, setDomainTtl } from '../operations';

const registryFieldProps = {
  fieldName: 'ttl',
  type: 'number',
  valueType: valueTypes.POSITIVE_NUMBER,
  getField: state => state.admin.ttl,
  get: getDomainTtl,
  changeEdit: changeEditTtl,
  set: setDomainTtl
};

export default () => <RegistryFieldContainer {...registryFieldProps} />;
