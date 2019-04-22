import React from 'react';
import { FieldContainer } from '../../../containers';
import { valueTypes } from '../../../types';
import { changeEditContent } from '../actions';
import { getContent, setContent } from '../operations';

const registryFieldProps = {
  fieldName: 'content',
  type: 'text',
  valueType: valueTypes.BYTES32,
  getField: state => state.publicResolver.content,
  get: getContent,
  changeEdit: changeEditContent,
  set: setContent
};

export default () => <FieldContainer {...registryFieldProps} />;
