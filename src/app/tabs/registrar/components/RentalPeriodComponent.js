import React, { Component } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import {
  Col, InputGroup, FormControl, Button, Row, Spinner, Alert,
} from 'react-bootstrap';


class RentalPeriodComponent extends Component {
  constructor(props) {
    super(props);
    const { duration } = this.props;

    this.state = {
      duration,
    };

    this.handleChangeDuration = this.handleChangeDuration.bind(this);
    this.decrement = this.decrement.bind(this);
    this.increment = this.increment.bind(this);
  }

  componentDidMount() {
    this.handleChangeDuration();
  }

  handleChangeDuration() {
    const { getCost } = this.props;
    const { duration } = this.state;
    getCost(duration);
  }

  decrement() {
    const { duration } = this.state;
    if (duration <= 1) {
      return;
    }
    this.setState({ duration: duration - 1 }, this.handleChangeDuration);
  }

  increment() {
    const { duration } = this.state;
    this.setState({ duration: duration + 1 }, this.handleChangeDuration);
  }

  render() {
    const {
      strings, getting, rifCost, committing, committed, hasBalance,
    } = this.props;

    const { duration } = this.state;

    const counter = (
      <div>
        <Row className="justify-content-center">
          <Col xs="4" lg="3">
            {strings.rental_period}
            <InputGroup>
              <InputGroup.Append>
                <Button size="sm" disabled={committing || committed} onClick={this.decrement}>-</Button>
              </InputGroup.Append>
              <FormControl
                value={duration}
                readOnly
              />
              <InputGroup.Append>
                <Button size="sm" disabled={committing || committed || !hasBalance} onClick={this.increment}>+</Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
      </div>
    );

    return (
      <div>
        <h3>
          {strings.how_long_want_name}
          ?
        </h3>
        {counter}

        {
          getting
            ? <Spinner animation="grow" variant="primary" />
            : <p><strong>{`${strings.price}: ${rifCost} RIF`}</strong></p>
        }
        <p>
          <em>{strings.discount}</em>
        </p>
        {
          !hasBalance
          && (
            <Alert variant="warning" dismissible="false">
              <p>{strings.not_enough_balance}</p>
              <a
                href="https://www.rsk.co/#exchanges"
                target="_blank"
                rel="noopener noreferrer"
              >
                {strings.click_here_not_enough_balance}
              </a>
            </Alert>
          )
        }
      </div>
    );
  }
}

RentalPeriodComponent.propTypes = {
  strings: propTypes.shape({
    rental_period: propTypes.string.isRequired,
    discount: propTypes.string.isRequired,
    price: propTypes.string.isRequired,
    how_long_want_name: propTypes.string.isRequired,
    click_here_not_enough_balance: propTypes.string.isRequired,
    not_enough_balance: propTypes.string.isRequired,
  }).isRequired,
  getting: propTypes.bool.isRequired,
  rifCost: propTypes.number,
  hasBalance: propTypes.bool.isRequired,
  duration: propTypes.number,
  getCost: propTypes.func.isRequired,
  committing: propTypes.bool.isRequired,
  committed: propTypes.bool.isRequired,
};

RentalPeriodComponent.defaultProps = {
  rifCost: 0,
  duration: 3,
};

export default multilanguage(RentalPeriodComponent);
