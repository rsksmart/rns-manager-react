import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

afterEach(() => {
  cleanup();
});

// for rLogin essentials
jest.mock('@rsksmart/rlogin-dcent-provider', () => ({
  DCentProvider: () => ({}),
}));
