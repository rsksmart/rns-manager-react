import admin from './admin';
import publicResolver from './publicResolver';
import multiChainResolver from './multiChainResolver';
import resolve from './resolve';
import search from './search';
import registrar from './registrar';
import user from './user';

export default {
  admin,
  publicResolver,
  multiChainResolver,
  search,
  registrar,
  resolve,
  user,
};

export { AdminTab } from './admin';
export { HomeTab } from './home';
export { NotificationTab } from './notifications';
export { PublicResolverTab } from './publicResolver';
export { MultiChainResolverTab } from './multiChainResolver';
export { ResolveTab } from './resolve';
export { SearchTab } from './search';
export { RegistrarTab } from './registrar';
export { default as NoMetamaskTab } from './NoMetamaskTab';
export { default as SetUpTab } from './SetUpTab';
export { UserTab } from './user';
export { default as AdminMyCryptoTab } from './AdminMyCryptoTab';
