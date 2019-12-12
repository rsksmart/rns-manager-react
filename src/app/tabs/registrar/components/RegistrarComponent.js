import React, { Component } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Link, Redirect } from 'react-router-dom';
import { Card, Spinner } from 'react-bootstrap';
import { TabWithSearchComponent } from '../../../components';
import { RentalPeriodContainer, CommitContainer, RevealContainer } from '../containers';
import { isValidName } from '../../../validations';


class RegistrarComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invalid: null,
    };
  }

  componentDidMount() {
    const { domain, getState } = this.props;
    if (domain && this.validate() && getState) getState(domain);
  }

  validate() {
    const { domain } = this.props;
    const invalid = isValidName(domain);
    this.setState({ invalid });
    return !invalid;
  }

  render() {
    const {
      strings, domain, owned, blocked, domainStateLoading, owner, requestingOwner,
    } = this.props;
    const { invalid } = this.state;

    let elementToRender;

    if (!domain) {
      return <Redirect to="/search" />;
    }

    if (invalid) {
      elementToRender = <h4>{invalid}</h4>;
    } else if (domainStateLoading) {
      elementToRender = <Spinner animation="grow" variant="primary" />;
    } else if (owned) {
      if (requestingOwner) {
        elementToRender = (
          <Card.Text>
            {strings.owned}
            <br />
            <Spinner animation="grow" variant="primary" />
          </Card.Text>
        );
      } else {
        elementToRender = (
          <Card.Text>
            {strings.owned}
            <br />
            <strong>
              {strings.owner}
              {': '}
            </strong>
            {owner}
            <br />
            <Link to={`/resolve?name=${domain}.rsk`} className="btn btn-primary">{strings.resolve}</Link>
          </Card.Text>
        );
      }
    } else if (blocked) {
      elementToRender = <h4>{strings.blocked_domain}</h4>;
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
    blocked_domain: propTypes.string.isRequired,
    admin_your_domain_title: propTypes.string.isRequired,
    owned: propTypes.string.isRequired,
    search_another_domain: propTypes.string.isRequired,
    owner: propTypes.string.isRequired,
    resolve: propTypes.string.isRequired,
  }).isRequired,
  domain: propTypes.string.isRequired,
  domainStateLoading: propTypes.bool.isRequired,
  owned: propTypes.bool,
  blocked: propTypes.bool,
  owner: propTypes.string,
  requestingOwner: propTypes.bool.isRequired,
  getState: propTypes.func.isRequired,
};

RegistrarComponent.defaultProps = {
  owned: false,
  blocked: false,
  owner: '',
};

export default multilanguage(RegistrarComponent);
