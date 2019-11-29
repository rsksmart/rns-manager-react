import React, { Component } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Link } from 'react-router-dom';
import { Card, Spinner } from 'react-bootstrap';
import { TabWithSearchComponent } from '../../../components';
import { RentalPeriodContainer, CommitContainer, RevealContainer } from '../containers';

class RegistrarComponent extends Component {
  componentDidMount() {
    const { domain, getState } = this.props;
    if (domain && getState) getState(domain);
  }

  render() {
    const {
      strings, domain, owned, blocked, domainStateLoading,
    } = this.props;

    let elementToRender;

    if (domainStateLoading) {
      elementToRender = <Spinner animation="grow" variant="primary" />;
    } else if (owned) {
      elementToRender = (
        <Card.Text>
          {strings.owned}
          <br />
          <Link to={`/admin?domain=${domain}`} className="btn btn-primary">{strings.admin_your_domain_title}</Link>
        </Card.Text>
      );
    } else if (blocked) {
      elementToRender = <h4>{strings.domain_not_available}</h4>;
    } else {
      const domainDisplay = `${domain}.rsk`;

      elementToRender = (
        <div>
          <h2>
            {strings.start_registration_for}
            {' '}
            <code>{domainDisplay}</code>
          </h2>
          <h4>registering a name requires you to complete 3 steps</h4>
          <RentalPeriodContainer />
          <hr />
          <CommitContainer />
          <RevealContainer />
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
    domain_not_available: propTypes.string.isRequired,
    admin_your_domain_title: propTypes.string.isRequired,
    owned: propTypes.string.isRequired,
  }).isRequired,
  domain: propTypes.string.isRequired,
  domainStateLoading: propTypes.string.isRequired,
  owned: propTypes.bool.isRequired,
  blocked: propTypes.bool.isRequired,
  getState: propTypes.func.isRequired,
};

export default multilanguage(RegistrarComponent);
