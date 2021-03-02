import React, { Component } from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';
import {
  Container, Row, Col, Spinner, Button, Alert,
} from 'react-bootstrap';

class CommitComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { balanceState: 'INITIAL' };
    this.handleCommit = this.handleCommit.bind(this);
  }

  componentDidMount() {
    const { checkIfAlreadyCommitted } = this.props;
    checkIfAlreadyCommitted();
  }

  handleCommit() {
    const { checkBalance, doCommitment } = this.props;
    this.setState({ balanceState: 'CHECKING' });
    checkBalance()
      .then((response) => {
        if (!response) {
          return this.setState({ balanceState: 'NOT_ENOUGH' });
        }

        this.setState({ balanceState: 'INITIAL' });
        return doCommitment();
      })
      .catch(() => this.setState({ balanceState: 'INITIAL' }));
  }

  render() {
    const {
      committing,
      strings,
      committed,
    } = this.props;
    const { balanceState } = this.state;

    return (
      <Container>
        <Row>
          <div className="col-md-4 offset-md-4">
            <p className="explanation">{strings.process_step_1_explanation}</p>
          </div>
        </Row>
        {balanceState === 'NOT_ENOUGH' && (
          <Row>
            <div className="col-md-6 offset-md-3">
              <Alert variant="warning" dismissible="false">
                <p>{strings.not_enough_balance}</p>
                <a
                  href="https://www.rifos.org/#rif-token"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {strings.click_here_not_enough_balance}
                </a>
              </Alert>
            </div>
          </Row>
        )}
        <Row className="major-section">
          <Col>
            {
              committing
                ? <Spinner animation="grow" variant="primary" />
                : (
                  <Button
                    className="commitButton"
                    disabled={committing || committed || balanceState === 'CHECKING'}
                    onClick={this.handleCommit}
                  >
                    {strings.process_step_1}
                  </Button>
                )
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

CommitComponent.propTypes = {
  strings: propTypes.shape({
    process_step_1: propTypes.string.isRequired,
    process_step_1_explanation: propTypes.string.isRequired,
    auto_address_setup: propTypes.string.isRequired,
    auto_address_explanation: propTypes.string.isRequired,
    click_here_not_enough_balance: propTypes.string.isRequired,
    not_enough_balance: propTypes.string.isRequired,
  }).isRequired,
  doCommitment: propTypes.func.isRequired,
  checkIfAlreadyCommitted: propTypes.func.isRequired,
  committing: propTypes.bool.isRequired,
  committed: propTypes.bool.isRequired,
  checkBalance: propTypes.func.isRequired,
};

export default multilanguage(CommitComponent);
