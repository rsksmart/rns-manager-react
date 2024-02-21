import React, { Component } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Row, Col } from 'react-bootstrap';
import { Loader } from 'rimble-ui';

class LoadingComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { intervalId: false };

    this.checkStatus = this.checkStatus.bind(this);
  }

  componentDidMount() {
    const intervalId = setInterval(this.checkStatus, 3000);
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    const { intervalId } = this.state;
    clearInterval(intervalId);
  }

  checkStatus() {
    const { checkCanReveal } = this.props;
    checkCanReveal();
  }

  render() {
    const { strings } = this.props;
    return (
      <div className="waiting">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Loader color="#4B5CF0" size="80px" className="loader-center" />
            <p className="major-section">
              {strings.registration_waiting}
            </p>
          </Col>
        </Row>
      </div>
    );
  }
}

LoadingComponent.propTypes = ({
  checkCanReveal: propTypes.func.isRequired,
  strings: propTypes.shape({
    registration_waiting: propTypes.string.isRequired,
    domain_requested: propTypes.string.isRequired,
  }).isRequired,
});

export default multilanguage(LoadingComponent);
