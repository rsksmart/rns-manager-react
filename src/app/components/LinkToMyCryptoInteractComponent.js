import React from 'react';
import { Button } from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';

export default multilanguage(props => <Button variant="primary" onClick={() => window.open('https://mycrypto.com/contracts/interact', '_blank')}>{props.strings.go_to_mycrypto}</Button>);
