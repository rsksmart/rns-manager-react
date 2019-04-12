import admin from './admin';
import bid from './bid';
import finalize from './finalize';
import home from './home';
import publicResolver from './publicResolver';
import search from './search';
import startAuction from './startAuction';
import unseal from './unseal';
import resolve from './resolve';

export default {
  admin,
  bid,
  finalize,
  home,
  publicResolver,
  search,
  startAuction,
  unseal,
  resolve
};

export { HomeTab } from './home';
export { SearchTab } from './search';
export { AdminTab } from './admin';
export { StartAuctionTab } from './startAuction';
export { BidTab } from './bid';
export { UnsealTab } from './unseal';
export { FinalizeTab } from './finalize';
export { PublicResolverTab } from './publicResolver';
export { NotificationTab } from './notifications';
export { ResolveTab } from './resolve';
export { SetUpTab } from './SetUpTab';
export { NoMetamaskTab } from './NoMetamaskTab';
