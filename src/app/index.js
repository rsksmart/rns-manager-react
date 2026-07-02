import React from 'react';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import Routes from './routes';
import FooterComponent from './components/FooterComponent';
import HeaderContainer from './containers/HeaderContainer';
import { ScrollToTopComponent } from './components';
import { AuthModal } from './auth';


// eslint-disable-next-line react/prop-types
const App = ({ history }) => (
  <HistoryRouter history={history}>
    <React.Fragment>
      <ScrollToTopComponent />
      <HeaderContainer />
      <Routes />
      <AuthModal />
      <FooterComponent />
    </React.Fragment>
  </HistoryRouter>
);

export default App;
