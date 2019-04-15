import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Button } from 'react-bootstrap';
import Octicon, { getIconByName } from '@githubprimer/octicons-react'

const copy = value => {
  const el = document.createElement('textarea');
  el.value = value;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

class CopyableComponent extends Component {
  constructor (props) {
    super(props);

    this.hoverOn = this.hoverOn.bind(this);
    this.hoverOff = this.hoverOff.bind(this);
  }

  state = {
    hover: false
  }

  hoverOn () {
    this.setState({ hover: true });
  }

  hoverOff () {
    this.setState({ hover: false });
  }

  render () {
    return (
      <FormGroup>
        <InputGroup>
          <FormControl type='text' readOnly defaultValue={this.props.children} style={{paddingLeft: 5}} />
          <InputGroup.Append>
            <Button variant='secondary' onClick={() => copy(this.props.children)} size='sm'>
              <Octicon icon={getIconByName('clippy')} verticalAlign='middle'/>
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </FormGroup>
    );
  }
}

export default CopyableComponent;
