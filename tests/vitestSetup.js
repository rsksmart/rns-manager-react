import { vi } from 'vitest';

if (typeof global.jest === 'undefined') {
  global.jest = Object.assign(Object.create(vi), {
    setTimeout: (ms) => vi.setConfig({ testTimeout: ms }),
  });
}
