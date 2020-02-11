import React, { Component } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Row, Col, Spinner } from 'react-bootstrap';

class LoadingComponent extends Component {
  constructor(props) {
    super(props);
    this.checkStatus = this.checkStatus.bind(this);
  }

  componentDidMount() {
    this.intervalId = setInterval(this.checkStatus, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  checkStatus() {
    const { checkCanReveal } = this.props;
    checkCanReveal();
  }

  render() {
    const { strings, commitConfirmed } = this.props;

    return (
      <div className="waiting">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Spinner animation="border" variant="primary" className="minor-section" />
            <p>{strings.process_step_2_explanation}</p>

            {!commitConfirmed
              && (
                <>
                  <h3 className="blue">
                    {strings.did_you_know}
                    ...
                  </h3>
                  <p className="lead minor-section">
                    {strings.tip1}
                  </p>
                  <p>
                    <a
                      href="https://iovlabs.org"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {strings.read_more}
                    </a>
                  </p>
                </>
              )
            }
            {commitConfirmed
              && (
                <div className="commitConfirmedBox major-section">
                  <svg width="37" height="23" viewBox="0 0 37 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 10.5L12.5 21L36 1" stroke="#008FF7" strokeWidth="2" />
                  </svg>
                  <p className="blue">{strings.domain_requested}</p>
                </div>
              )
            }
          </Col>
        </Row>
      </div>
    );
  }
}

LoadingComponent.propTypes = ({
  checkCanReveal: propTypes.func.isRequired,
  commitConfirmed: propTypes.bool.isRequired,
  strings: propTypes.shape({
    process_step_2_explanation: propTypes.string.isRequired,
    did_you_know: propTypes.string.isRequired,
    tip1: propTypes.string.isRequired,
    read_more: propTypes.string.isRequired,
    domain_requested: propTypes.string.isRequired,
  }).isRequired,
});

export default multilanguage(LoadingComponent);
