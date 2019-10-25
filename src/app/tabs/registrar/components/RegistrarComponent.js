import React, { Component } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { TabWithSearchComponent } from '../../../components';
import { RentalPeriodContainer, CommitContainer } from '../containers';

class RegistrarComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { };
  }

  render() {
    const {
      strings, domain,
    } = this.props;

    return (
      <div>
        <TabWithSearchComponent>
          <h2>
            {strings.start_registration_for}
            {' '}
            <code>{domain}</code>
          </h2>
        </TabWithSearchComponent>
        <RentalPeriodContainer />
        <CommitContainer />
      </div>
    );
  }
}

RegistrarComponent.propTypes = {
  strings: propTypes.shape({
    start_registration_for: propTypes.string.isRequired,
    rental_period: propTypes.string.isRequired,
  }).isRequired,
  domain: propTypes.string.isRequired,
};

export default multilanguage(RegistrarComponent);
