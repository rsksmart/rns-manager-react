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
    const { strings } = this.props;

    return (
      <div>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <Spinner animation="border" variant="primary" />
            <p>{strings.process_step_2_explanation}</p>
          </Col>
        </Row>
      </div>
    );
  }
};

LoadingComponent.propTypes = ({
  checkCanReveal: propTypes.func.isRequired,
  strings: propTypes.shape({
    process_step_2_explanation: propTypes.string.isRequired,
  }).isRequired,
});

export default multilanguage(LoadingComponent);
