import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router'
import { Header } from './components';
import routes from './routes';

class App extends Component {
  render() {
    const { history } = this.props;
    return (
      <ConnectedRouter history={history}>
        <div>
          <Header />
          {routes}
        </div>
      </ConnectedRouter>
    );
  }
}

export default App;
