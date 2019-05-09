import React from 'react';
import { publicResolver, multiChainResolver } from '../../config/contracts';
import { multilanguage } from 'redux-multilanguage';

export default multilanguage(({ strings }) => (
  <datalist id='resolvers'>
    <option value={publicResolver}>{strings.rsk_resolver}</option>
    <option value={multiChainResolver}>{strings.multi_chain_resolver}</option>
  </datalist>
  )
);
