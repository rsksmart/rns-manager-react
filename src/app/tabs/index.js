import admin from './admin';
import publicResolver from './publicResolver';
import multiChainResolver from './multiChainResolver';
import resolve from './resolve';
import search from './search';
import registrar from './registrar';
import error from './error';
import newAdmin from './newAdmin';
import faqTab from './faq';

export default {
  admin,
  publicResolver,
  multiChainResolver,
  search,
  registrar,
  resolve,
  error,
  newAdmin,
  faqTab,
};

export { AdminTab } from './admin';
export { NewAdminTab } from './newAdmin';
export { HomeTab } from './home';
export { NotificationTab } from './notifications';
export { PublicResolverTab } from './publicResolver';
export { MultiChainResolverTab } from './multiChainResolver';
export { ResolveTab } from './resolve';
export { SearchTab } from './search';
export { RegistrarTab } from './registrar';
export { default as NoMetamaskTab } from './NoMetamaskTab';
export { default as SetUpTab } from './SetUpTab';
export { default as ErrorTab } from './error';
export { default as FaqTab } from './faq';
