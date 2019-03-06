import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
  return <Link to={`/publicResolver?domain=${props.domain}`}>Manage resolution</Link>
};
