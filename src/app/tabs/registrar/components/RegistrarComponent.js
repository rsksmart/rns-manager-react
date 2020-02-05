import React, { Component } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Link } from 'react-router-dom';
import {
  Row, OverlayTrigger, Tooltip, Card, Spinner, Button,
} from 'react-bootstrap';
import { TabWithSearchComponent } from '../../../components';
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
            {strings.start_registration_for}
            {' '}
            <span className="domain">{domainDisplay}</span>
          </h1>
          <p>registering a name requires you to complete 3 steps</p>

          <Card>
            <Card.Header>
              <Row>
                <div className="step col-md-4">
                  <p><strong>Step 1: </strong></p>
                </div>
                <div className="description col-md-6">
                  <p>Request to Register</p>
                </div>
                <div className="question col-md-2">
                  <OverlayTrigger
                    key="step1"
                    placement="left"
                    overlay={(
                      <Tooltip id="tooltip-step1">
                        <div>
                          {strings.process_step_1_explanation}
                        </div>
                      </Tooltip>
                    )}
                  >
                    <Button variant="secondary">?</Button>
                  </OverlayTrigger>
                </div>
              </Row>
            </Card.Header>
            {!committed
              && (
              <Card.Body>
                <Card.Body>
                  <RentalPeriodContainer />
                  <CommitContainer />
                </Card.Body>
              </Card.Body>
              )
            }
          </Card>

          <Card>
            <Card.Header>
              <Row>
                <div className="step col-md-4">
                  <p><strong>Step 2: </strong></p>
                </div>
                <div className="description col-md-6">
                  <p>Wait for aproximately a minute</p>
                </div>
                <div className="question col-md-2">
                  <OverlayTrigger
                    key="step2"
                    placement="left"
                    overlay={(
                      <Tooltip id="tooltip-step2">
                        <div>
                          {strings.process_step_2_explanation}
                        </div>
                      </Tooltip>
                    )}
                  >
                    <Button variant="secondary">?</Button>
                  </OverlayTrigger>
                </div>
              </Row>
            </Card.Header>
            {waiting
              && (
                <Card.Body>
                  <LoadingContainer />
                </Card.Body>
              )
            }
          </Card>

          <Card>
            <Card.Header>
              <Row>
                <div className="step col-md-4">
                  <p><strong>Step 3: </strong></p>
                </div>
                <div className="description col-md-6">
                  <p>Register the domain</p>
                </div>
                <div className="question col-md-2">
                  <OverlayTrigger
                    key="step3"
                    placement="left"
                    overlay={(
                      <Tooltip id="tooltip-step3">
                        <div>
                          {strings.process_step_3_explanation}
                        </div>
                      </Tooltip>
                    )}
                  >
                    <Button variant="secondary">?</Button>
                  </OverlayTrigger>
                </div>
              </Row>
            </Card.Header>
            {(canReveal && !revealConfirmed)
              && (
              <Card.Body>
                <RevealContainer />
              </Card.Body>
              )
            }
          </Card>

          <Card>
            <Card.Header>
              <Row>
                <div className="step col-md-4">
                  <p><strong>Step 4: </strong></p>
                </div>
                <div className="description col-md-8">
                  <p>Login and administer</p>
                </div>
              </Row>
            </Card.Header>
            {revealConfirmed
              && (
                <Card.Body>
                  <AutoLoginComponent />
                </Card.Body>
              )
            }
          </Card>

        </div>
      );
    }

    return (
      <div>
        <TabWithSearchComponent>
          {elementToRender}
        </TabWithSearchComponent>
      </div>
    );
  }
}

RegistrarComponent.propTypes = {
  strings: propTypes.shape({
    start_registration_for: propTypes.string.isRequired,
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
