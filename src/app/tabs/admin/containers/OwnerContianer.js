import React from 'react';
import { FieldContainer } from '../../../containers';
import { valueTypes } from '../../../types';
import { owner } from '../actions';
import { getDomainOwner, setDomainOwner } from '../operations';

const registryFieldProps = {
  fieldName: 'owner',
  type: 'text',
  valueType: valueTypes.ADDRESS,
  getField: state => state.admin.owner,
  get: getDomainOwner,
  changeEdit: owner.changeEdit,
  set: setDomainOwner
};

export default () => <FieldContainer {...registryFieldProps} />;
