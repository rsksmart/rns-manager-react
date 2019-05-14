import React from 'react';
import config from '../../config/contracts';
import { multilanguage } from 'redux-multilanguage';


export default multilanguage(({ strings }) => {
  const { publicResolver, multiChainResolver } = config('app/Components/ResolverDatalist');
  return(
    <datalist id='resolvers'>
      <option value={publicResolver}>{strings.rsk_resolver}</option>
      <option value={multiChainResolver}>{strings.multi_chain_resolver}</option>
    </datalist>
  )
});
