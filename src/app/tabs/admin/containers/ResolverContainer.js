import React from 'react';
import { FieldContainer } from '../../../containers';
import { valueTypes } from '../../../types';
import { changeEditResolver } from '../actions';
import { getDomainResolver, setDomainResolver } from '../operations';

const registryFieldProps = {
  fieldName: 'resolver',
  type: 'text',
  valueType: valueTypes.ADDRESS,
  getField: state => state.admin.resolver,
  get: getDomainResolver,
  changeEdit: changeEditResolver,
  set: setDomainResolver
};

export default () => <FieldContainer {...registryFieldProps} />;
