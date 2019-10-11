import React, { Component } from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';
import { Spinner, Button } from 'react-bootstrap';

class FIFSMigrationComponent extends Component {
  componentDidMount() {
    const { checkIfSubdomain } = this.props;
    checkIfSubdomain();
  }

  render() {
    const {
      isSubdomain, getting, migrating, strings, migrate,
    } = this.props;

    if (isSubdomain) {
      return strings.fifs_subdomain;
    }

    if (getting || migrating) {
      return <Spinner animation="grow" variant="primary" />;
    }

    return <Button disabled={migrating} onClick={migrate}>{strings.fifs_migrate}</Button>;
  }
}

FIFSMigrationComponent.defaultProps = {
  isSubdomain: undefined,
};

FIFSMigrationComponent.propTypes = {
  strings: propTypes.shape({
    already_migrated: propTypes.string.isRequired,
    fifs_subdomain: propTypes.string.isRequired,
    fifs_migrate: propTypes.string.isRequired,
  }).isRequired,
  checkIfSubdomain: propTypes.func.isRequired,
  migrate: propTypes.func.isRequired,
  isSubdomain: propTypes.bool,
  getting: propTypes.bool.isRequired,
  migrating: propTypes.bool.isRequired,
};

export default multilanguage(FIFSMigrationComponent);
