import admin from './admin';
import bid from './bid';
import finalize from './finalize';
import publicResolver from './publicResolver';
import multiChainResolver from './multiChainResolver';
import resolve from './resolve';
import search from './search';
import startAuction from './startAuction';
import unseal from './unseal';
import user from './user';

export default {
  admin,
  bid,
  finalize,
  publicResolver,
  multiChainResolver,
  search,
  startAuction,
  unseal,
  resolve,
  user
};

export { AdminTab } from './admin';
export { BidTab } from './bid';
export { FinalizeTab } from './finalize';
export { HomeTab } from './home';
export { NotificationTab } from './notifications';
export { PublicResolverTab } from './publicResolver';
export { MultiChainResolverTab } from './multiChainResolver';
export { ResolveTab } from './resolve';
export { SearchTab } from './search';
export { StartAuctionTab } from './startAuction';
export { UnsealTab } from './unseal';
export { NoMetamaskTab } from './NoMetamaskTab';
export { SetUpTab } from './SetUpTab';
export { UserTab } from './user';
export { default as AdminMyCryptoTab } from './AdminMyCryptoTab';
