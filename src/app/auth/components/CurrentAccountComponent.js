import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


const CurrentAccountComponet = ({
  strings, name, handleLogOut,
}) => (
  <div className="current">
    <Link
      to="/newAdmin"
      className="switchButton"
    >
      {name}
    </Link>
    <Button
      variant="outline-primary"
      onClick={handleLogOut}
    >
      {strings.log_out}
    </Button>
  </div>
);

CurrentAccountComponet.propTypes = {
  strings: propTypes.shape({
    log_out: propTypes.string.isRequired,
  }).isRequired,
  name: propTypes.string.isRequired,
  handleLogOut: propTypes.func.isRequired,
};

export default multilanguage(CurrentAccountComponet);
