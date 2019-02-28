import { MetamaskResponseType } from './types';

export function mapMetamaskResponseTypeToBootstrapVariant (metamaskResponse) {
  if (metamaskResponse === MetamaskResponseType.SUCCESS) return 'success';
  if (metamaskResponse === MetamaskResponseType.ERROR) return 'danger';
  return 'default'
}
