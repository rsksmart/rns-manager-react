import React, { Component } from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';
import { ProgressBar, Button, Spinner } from 'react-bootstrap';

class RevealComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: 0,
      percentage: 0,
      lastCheck: 0,
    };

    this.progressBarInterval = 3; // seconds
    this.progressBarMax = 60; // seconds
    this.progressBarMin = 0; // seconds
    this.amountIntervalsToCheck = 3;
  }

  componentDidMount() {
    this.canReveal();
  }

  canReveal() {
    const { canReveal } = this.props;

    if (!canReveal) {
      setTimeout(() => {
        const { waiting, checkCanReveal } = this.props;

        if (waiting) {
          const { seconds, lastCheck, percentage } = this.state;
          let newLastCheck;

          if ((seconds - lastCheck) >= (this.progressBarInterval * this.amountIntervalsToCheck)) {
            // time to check if canReveal
            newLastCheck = seconds;
            checkCanReveal();
          } else {
            newLastCheck = lastCheck;
          }

          if (seconds >= this.progressBarMax) {
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
  }

  render() {
    const {
      waiting, strings, revealCommit, committed, revealing, revealed,
    } = this.props;

    const { percentage } = this.state;

    return (
      <React.Fragment>
        {
          <div>
            <ProgressBar
              animated
              now={percentage}
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
  }).isRequired,
  revealCommit: propTypes.func.isRequired,
  checkCanReveal: propTypes.func.isRequired,
  waiting: propTypes.bool.isRequired,
  canReveal: propTypes.bool.isRequired,
  revealing: propTypes.bool.isRequired,
  revealed: propTypes.bool.isRequired,
  committed: propTypes.bool.isRequired,
};

export default multilanguage(RevealComponent);
