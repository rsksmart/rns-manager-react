import React, { Component } from 'react';
import { Header, ResolverAddressComponent } from './components';
import { Container } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Container>
          <ResolverAddressComponent />
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
