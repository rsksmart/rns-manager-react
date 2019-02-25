import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router'
import routes from './routes';

class App extends Component {
  render() {
    const { history } = this.props;
    return (
      <ConnectedRouter history={history}>
        {routes}
      </ConnectedRouter>
    );
  }
}

export default App;
