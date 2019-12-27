import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';
import {
  ProgressBar, Button, Spinner,
} from 'react-bootstrap';
import { StartButton } from '../../../auth';

class RevealComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: 0,
      percentage: 0,
      lastCheck: 0,
      registerNewName: false,
    };

    this.progressBarInterval = 3; // seconds
    this.progressBarMax = 60; // seconds
    this.progressBarMin = 0; // seconds
    this.amountIntervalsToCheck = 3;

    this.registerNewName = this.registerNewName.bind(this);
  }

  componentDidMount() {
    this.canReveal();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  canReveal() {
    this.timer = setTimeout(() => {
      const {
        waiting, checkCanReveal, commitConfirmed,
      } = this.props;

      if (waiting && commitConfirmed) {
        const { seconds, lastCheck, percentage } = this.state;
        let newLastCheck;

        if ((seconds - lastCheck) >= (this.progressBarInterval * this.amountIntervalsToCheck)) {
          // time to check if canReveal
          newLastCheck = seconds;
          checkCanReveal();
        } else {
          newLastCheck = lastCheck;
        }

        if (seconds >= this.progressBarMax - (this.progressBarInterval * 2)) {
          // if there are less than two intervals to complete the bar, freeze percentage value
          return this.setState(
            {
              seconds: seconds + this.progressBarInterval,
              percentage,
              lastCheck: newLastCheck,
            },
            this.canReveal(),
          );
        }

        return this.setState(
          {
            seconds: seconds + this.progressBarInterval,
            percentage: percentage + this.progressBarInterval,
            lastCheck: newLastCheck,
          },
          this.canReveal(),
        );
      }

      return this.canReveal();
    }, this.progressBarInterval * 1000);
  }

  registerNewName() {
    return this.setState({ registerNewName: true });
  }

  render() {
    const {
      waiting, strings, revealCommit, committed, revealing,
      revealed, canReveal, revealConfirmed,
    } = this.props;

    const { percentage, registerNewName } = this.state;

    if (registerNewName) {
      return <Redirect to="/search" />;
    }

    return (
      <React.Fragment>
        {
          <div>
            <ProgressBar
              animated
              now={canReveal ? 100 : percentage}
              min={this.progressBarMin}
              max={this.progressBarMax}
            />
          </div>
        }
        <hr />
        {
          revealing
            ? <Spinner animation="grow" variant="primary" />
            : (
              <div>
                <p>
                  3.
                  {strings.process_step_3_explanation}
                </p>
                <Button
                  disabled={!committed || waiting || revealed}
                  onClick={revealCommit}
                >
                  {strings.process_step_3}
                </Button>
                <hr />
                <div hidden={!revealed || !revealConfirmed}>
                  <StartButton />
                  <span> </span>
                  <Button onClick={this.registerNewName}>
                    {strings.register}
                  </Button>
                </div>
                <hr />
              </div>
            )
        }
      </React.Fragment>
    );
  }
}

RevealComponent.propTypes = {
  strings: propTypes.shape({
    process_step_3: propTypes.string.isRequired,
    process_step_3_explanation: propTypes.string.isRequired,
    process_step_2_explanation: propTypes.string.isRequired,
    register: propTypes.string.isRequired,
  }).isRequired,
  revealCommit: propTypes.func.isRequired,
  checkCanReveal: propTypes.func.isRequired,
  waiting: propTypes.bool.isRequired,
  commitConfirmed: propTypes.bool,
  revealConfirmed: propTypes.bool,
  canReveal: propTypes.bool.isRequired,
  revealing: propTypes.bool.isRequired,
  revealed: propTypes.bool.isRequired,
  committed: propTypes.bool.isRequired,
};

RevealComponent.defaultProps = {
  commitConfirmed: false,
  revealConfirmed: false,
};

export default multilanguage(RevealComponent);
