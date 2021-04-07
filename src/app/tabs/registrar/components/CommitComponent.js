import React, { Component } from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';
import {
  Container, Row, Col, Spinner, Button,
} from 'react-bootstrap';
import NotEnoughRifComponent from '../../../components/NotEnoughRifComponent';

class CommitComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkingBalance: false,
      hasBalance: true,
    };

    this.handleCommit = this.handleCommit.bind(this);
  }

  handleCommit() {
    const { checkBalance, doCommitment } = this.props;
    this.setState({ checkingBalance: true, hasBalance: true });

    checkBalance()
      .then((response) => {
        this.setState({ checkingBalance: false });
        return response ? doCommitment() : this.setState({ hasBalance: false });
      })
      .catch(() => this.setState({ checkingBalance: false }));
  }

  render() {
    const {
      committing,
      strings,
      committed,
    } = this.props;
    const { checkingBalance, hasBalance } = this.state;

    return (
      <Container>
        <Row>
          <div className="col-md-4 offset-md-4">
            <p className="explanation">{strings.process_step_1_explanation}</p>
          </div>
        </Row>
        {!hasBalance && (
          <Row>
            <div className="col-md-6 offset-md-3">
              <NotEnoughRifComponent />
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
                    disabled={committing || committed || checkingBalance}
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
  }).isRequired,
  doCommitment: propTypes.func.isRequired,
  committing: propTypes.bool.isRequired,
  committed: propTypes.bool.isRequired,
  checkBalance: propTypes.func.isRequired,
};

export default multilanguage(CommitComponent);
