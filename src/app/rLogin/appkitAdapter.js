import { appKit } from '../appkit/appkitConfig';

const connect = () => new Promise((resolve, reject) => {
  try {
    appKit.open({ view: 'Connect', namespace: 'eip155' });

    const unsubscribe = appKit.subscribeProviders((state) => {
      const provider = state.eip155;

      if (provider) {
        unsubscribe?.();
        resolve({ provider });
      }
    });
  } catch (e) {
    reject(e);
  }
});

export default { connect };
