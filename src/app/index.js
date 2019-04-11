import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router'
import { HeaderContainer } from './containers';
import routes from './routes';
import { Container } from 'react-bootstrap';
import { AuthModal } from './auth';
import { Notifications } from './notifications';

class App extends Component {
  render() {
    const { history } = this.props;
    return (
      <ConnectedRouter history={history}>
        <React.Fragment>
          <HeaderContainer />
          <div style={{marginTop: '20px'}}>
            <Container>
              {routes}
            </Container>
          </div>
          <div style={{marginTop: '20px'}}>
            <Notifications />
          </div>
          <AuthModal />
        </React.Fragment>
      </ConnectedRouter>
    );
  }
}

export default App;
