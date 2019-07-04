import { parse } from 'query-string';

export const getName = state => parse(state.router.location.search).name || '';

export const getResolve = state => ({
  loading: state.resolve.loading,
  error: state.resolve.error,
  supportedInterfaces: state.resolve.supportedInterfaces,
  resolverAddress: state.resolve.resolverAddress,
});

export const getResolverAddress = state => state.resolve.resolverAddress;

export const getAddr = state => ({
  loading: state.resolve.addr.loading,
  error: state.resolve.addr.error,
  value: state.resolve.addr.value,
});

export const getChainAddr = state => ({
  loading: state.resolve.chainAddr.loading,
  error: state.resolve.chainAddr.error,
  value: state.resolve.chainAddr.value,
});
