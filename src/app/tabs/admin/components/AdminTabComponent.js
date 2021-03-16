import React, { Component } from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class AdminTabComponent extends Component {
  render() {
    const hello = 'yes';
    return (
      <div>
        admin
        {hello}
      </div>
    );
  }
}

AdminTabComponent.propTypes = {
};

AdminTabComponent.defaultProps = {
  resolver: null,
  name: null,
};

export default AdminTabComponent;
