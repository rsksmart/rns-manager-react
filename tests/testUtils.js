import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

export function renderWithProviders(ui, { store, withRouter = false, ...options } = {}) {
  function Wrapper({ children }) {
    const content = withRouter ? <HashRouter>{children}</HashRouter> : children;
    return <Provider store={store}>{content}</Provider>;
  }

  return render(ui, { wrapper: Wrapper, ...options });
}

export * from '@testing-library/react';
