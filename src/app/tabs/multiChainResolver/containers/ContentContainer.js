import React from 'react';
import { FieldContainer } from '../../../containers';
import { valueTypes } from '../../../types';
import { content } from '../actions';
import { getContent, setContent } from '../operations';

const registryFieldProps = {
  fieldName: 'content',
  type: 'text',
  valueType: valueTypes.BYTES32,
  getField: state => state.multiChainResolver.content,
  get: getContent,
  changeEdit: content.changeEdit,
  set: setContent
};

export default () => <FieldContainer {...registryFieldProps} />;
