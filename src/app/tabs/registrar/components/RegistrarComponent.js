import React, { Component } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Container } from 'react-bootstrap';
import {
  RentalPeriodContainer, CommitContainer, RevealContainer, LoadingContainer, AutoLoginComponent,
} from '../containers';
import { isValidName } from '../../../validations';
import UserErrorComponent from '../../../components/UserErrorComponent';
import { shuffle } from '../helpers';
import TextRotationComponent from '../../../components/TextRotationComponent';
import keyMessages from '../../../../languages/key_messges.json';
import { UserWaitingComponent } from '../../../components';
import OwnedDomain from './OwnedDomain';
import StepsMenu from './StepsMenu';

class RegistrarComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invalid: null,
    };
  }

  componentDidMount() {
    const { domain, getState, checkIfAlreadyRegistered } = this.props;
    if (domain && this.validate() && getState) getState(domain);
    checkIfAlreadyRegistered(domain);
  }

  validate() {
    const { domain } = this.props;
    const invalid = isValidName(domain);
    this.setState({ invalid });
    return !invalid;
  }

  render() {
    const {
      strings, domain, owned, blocked, domainStateLoading, owner, requestingOwner,
      committed, waiting, canReveal, revealConfirmed, walletAddress, errorMessage,
      handleCloseClick, language,
    } = this.props;
    const { invalid } = this.state;

    if (invalid) {
      return <h4>{invalid}</h4>;
    }

    if (domainStateLoading || requestingOwner) {
      return <UserWaitingComponent visible />;
    }

    if (owned) {
      return (
        <OwnedDomain
          domain={domain}
          owner={owner}
          isOwner={walletAddress === owner.toLowerCase()}
        />
      );
    }
    if (blocked) {
      return <Container className="page"><h4>{strings.blocked_domain}</h4></Container>;
    }

    return (
      <Container className="register page">
        <StepsMenu
          committed={committed}
          waiting={waiting}
          revealConfirmed={revealConfirmed}
          domain={domain}
        />

        {!committed
            && (
            <div className="requestDomain row">
              <div className="col-md-6 offset-md-3">
                <RentalPeriodContainer />
              </div>
              <CommitContainer />
            </div>
            )
          }

        {waiting && (
          <>
            <LoadingContainer />
            <TextRotationComponent
              messages={shuffle(keyMessages)}
              language={language}
              heading={strings.did_you_know}
              timer={6000}
            />
            <p style={{ marginTop: '50px' }}>
              <a
                href="https://hackmd.io/@ilanolkies/rns-user-guide"
                target="_blank"
                rel="noopener noreferrer"
              >
                {strings.download_guide}
              </a>
            </p>
          </>
        )}

        {(canReveal && !revealConfirmed)
            && (
            <RevealContainer />
            )
          }

        {revealConfirmed
            && (
              <AutoLoginComponent />
            )
          }

        <UserErrorComponent
          visible={errorMessage !== ''}
          message={errorMessage}
          handleCloseClick={handleCloseClick}
        />
      </Container>
    );
  }
}

RegistrarComponent.propTypes = {
  strings: propTypes.shape({
    owner: propTypes.string.isRequired,
    resolve: propTypes.string.isRequired,
    owned: propTypes.string.isRequired,
    blocked_domain: propTypes.string.isRequired,
    registering: propTypes.string.isRequired,
    request_domain: propTypes.string.isRequired,
    register_domain: propTypes.string.isRequired,
    login: propTypes.string.isRequired,
    did_you_know: propTypes.string.isRequired,
    download_guide: propTypes.string.isRequired,
  }).isRequired,
  domain: propTypes.string.isRequired,
  domainStateLoading: propTypes.bool.isRequired,
  owned: propTypes.bool,
  blocked: propTypes.bool,
  owner: propTypes.string,
  walletAddress: propTypes.string,
  requestingOwner: propTypes.bool.isRequired,
  getState: propTypes.func.isRequired,
  committed: propTypes.bool.isRequired,
  waiting: propTypes.bool.isRequired,
  canReveal: propTypes.bool.isRequired,
  revealConfirmed: propTypes.bool,
  checkIfAlreadyRegistered: propTypes.func.isRequired,
  errorMessage: propTypes.string.isRequired,
  handleCloseClick: propTypes.func.isRequired,
  language: propTypes.string.isRequired,
};

RegistrarComponent.defaultProps = {
  owned: false,
  blocked: false,
  owner: '',
  walletAddress: null,
  revealConfirmed: false,
};

export default multilanguage(RegistrarComponent);
