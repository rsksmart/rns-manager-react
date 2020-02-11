import React, { Component } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Link } from 'react-router-dom';
import {
  Row, Card, Spinner,
} from 'react-bootstrap';
import {
  RentalPeriodContainer, CommitContainer, RevealContainer, LoadingContainer, AutoLoginComponent,
} from '../containers';
import { isValidName } from '../../../validations';

class RegistrarComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invalid: null,
    };
  }

  componentDidMount() {
    const { domain, getState } = this.props;
    if (domain && this.validate() && getState) getState(domain);
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
      committed, waiting, canReveal, revealConfirmed,
    } = this.props;
    const { invalid } = this.state;

    let elementToRender;

    if (invalid) {
      elementToRender = <h4>{invalid}</h4>;
    } else if (domainStateLoading) {
      elementToRender = <Spinner animation="grow" variant="primary" />;
    } else if (owned) {
      if (requestingOwner) {
        elementToRender = (
          <Card.Text>
            {strings.owned}
            <br />
            <Spinner animation="grow" variant="primary" />
          </Card.Text>
        );
      } else {
        elementToRender = (
          <Card>
            <Card.Header>{strings.owned}</Card.Header>
            <Card.Body>
              <p>
                <strong>
                  {strings.owner}
                  {': '}
                </strong>
                {owner}
              </p>
              <p>
                <Link to={`/resolve?name=${domain}.rsk`} className="btn btn-primary">{strings.resolve}</Link>
              </p>
            </Card.Body>
          </Card>
        );
      }
    } else if (blocked) {
      elementToRender = <h4>{strings.blocked_domain}</h4>;
    } else {
      const domainDisplay = `${domain}.rsk`;

      elementToRender = (
        <div className="register">
          <h1 className="sub-heading">
            {strings.registering}
            {': '}
            <span className="domain">{domainDisplay}</span>
          </h1>
          <ul className="list-inline steps">
            <li><div className={`btn ${(!committed || waiting) ? 'btn-active' : 'btn-outline-primary'}`}>1. Request domain</div></li>
            <li><div className={`btn ${(committed && !revealConfirmed) ? 'btn-active' : 'btn-outline-primary'}`}>2. Register domain</div></li>
            <li><div className={`btn ${revealConfirmed ? 'btn-active' : 'btn-outline-primary'}`}>3. Login</div></li>
          </ul>

          {!committed
            && (
            <div>
              <RentalPeriodContainer />
              <CommitContainer />
            </div>
            )
          }

          {waiting && <LoadingContainer />}

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

        </div>
      );
    }

    return (
      <div>
        {elementToRender}
      </div>
    );
  }
}

RegistrarComponent.propTypes = {
  strings: propTypes.shape({
    registering: propTypes.string.isRequired,
    rental_period: propTypes.string.isRequired,
    blocked_domain: propTypes.string.isRequired,
    admin_your_domain_title: propTypes.string.isRequired,
    owned: propTypes.string.isRequired,
    search_another_domain: propTypes.string.isRequired,
    owner: propTypes.string.isRequired,
    resolve: propTypes.string.isRequired,
    how_long_want_name: propTypes.string.isRequired,
    process_step_1_explanation: propTypes.string.isRequired,
    process_step_2_explanation: propTypes.string.isRequired,
    process_step_3_explanation: propTypes.string.isRequired,
  }).isRequired,
  domain: propTypes.string.isRequired,
  domainStateLoading: propTypes.bool.isRequired,
  owned: propTypes.bool,
  blocked: propTypes.bool,
  owner: propTypes.string,
  requestingOwner: propTypes.bool.isRequired,
  getState: propTypes.func.isRequired,
  committed: propTypes.bool.isRequired,
  waiting: propTypes.bool.isRequired,
  canReveal: propTypes.bool.isRequired,
  revealConfirmed: propTypes.bool.isRequired,
};

RegistrarComponent.defaultProps = {
  owned: false,
  blocked: false,
  owner: '',
};

export default multilanguage(RegistrarComponent);
