import React, { Component } from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';
import {
  Button, Container, Spinner,
} from 'react-bootstrap';
import { TransferDomainContainer } from '../containers';

class DangerZoneComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showTransferDomainContainer: false,
    };

    this.changeShowTransferDomainContainer = this.changeShowTransferDomainContainer.bind(this);
  }

  componentDidMount() {
    const { checkIfSubdomainOrTokenOwner } = this.props;
    checkIfSubdomainOrTokenOwner();
  }

  changeShowTransferDomainContainer() {
    this.setState(state => ({ showTransferDomainContainer: !state.showTransferDomainContainer }));
  }

  render() {
    const {
      isSubdomain, isTokenOwner, checking,
    } = this.props;

    const { showTransferDomainContainer } = this.state;

    if (checking) {
      return <Spinner animation="grow" variant="primary" />;
    }
    if (!isSubdomain && isTokenOwner) {
      return (
        <Container>
          <Button variant="danger" onClick={this.changeShowTransferDomainContainer}>{showTransferDomainContainer ? 'Hide' : 'Danger Zone'}</Button>
          {
            showTransferDomainContainer
            && <TransferDomainContainer />
          }
          <hr />
        </Container>
      );
    }

    return '';
  }
}

DangerZoneComponent.defaultProps = {
  isSubdomain: undefined,
};

DangerZoneComponent.propTypes = {
  strings: propTypes.shape({
    transfer_domain: propTypes.string.isRequired,
  }).isRequired,
  checkIfSubdomainOrTokenOwner: propTypes.func.isRequired,
  isSubdomain: propTypes.bool,
  isTokenOwner: propTypes.bool.isRequired,
  checking: propTypes.bool.isRequired,
};

export default multilanguage(DangerZoneComponent);
