import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import Routes from './routes';
import FooterComponent from './components/FooterComponent';
import HeaderContainer from './containers/HeaderContainer';
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
      <FooterComponent />
    </React.Fragment>
  </ConnectedRouter>
);

export default App;
