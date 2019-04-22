import React from 'react';
import { FieldContainer } from '../../../containers';
import { valueTypes } from '../../../types';
import { changeEditAddr } from '../actions';
import { getAddr, setAddr } from '../operations';

const registryFieldProps = {
  fieldName: 'addr',
  type: 'text',
  valueType: valueTypes.ADDRESS,
  getField: state => state.publicResolver.addr,
  get: getAddr,
  changeEdit: changeEditAddr,
  set: setAddr
};

export default () => <FieldContainer {...registryFieldProps} />;
