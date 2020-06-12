import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import Routes from './routes';
import { HeaderContainer, FooterContainer } from './containers';
import { ScrollToTopComponent } from './components';
import { AuthModal } from './auth';


// eslint-disable-next-line react/prop-types
const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <React.Fragment>
      <ScrollToTopComponent />
      <HeaderContainer />
      <Routes />
      <AuthModal />
      <FooterContainer />
    </React.Fragment>
  </ConnectedRouter>
);

export default App;
