import React, { Component } from 'react';
import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { ChainAddrSelectorComponent } from '../../../components';
import { multilanguage } from 'redux-multilanguage';

class MultiChainAddrFieldComponent extends Component {
  constructor (props) {
    super(props);

    this.state = {
      validationError: null,
      chainId: '0x80000089'
    };

    this.onChangeChainId = this.onChangeChainId.bind(this);
  }

  onChangeChainId (event) {
    const chainId = event.target.value;
    this.setState({ chainId });

    const { get } = this.props;
    if (chainId.length === 10) get(chainId);
  }

  componentDidMount () {
    const { get } = this.props;
    const { chainId } = this.state;
    get(chainId);
  }

  componentWillReceiveProps (newProps) {
    const { get, domain } = this.props;
    if (newProps.domain !== domain) {
    const { chainId } = this.state;
    get(newProps.domain, chainId);
    }
  }

  render () {
    const { strings, getting, value, changeEdit, editOpen, set, editting } = this.props;

    let input;

    return (
      <React.Fragment>
        <Row>
          <Col md={2}>chain addr</Col>
          <Col md={3}>
            <ChainAddrSelectorComponent onChange={this.onChangeChainId} list='chains' value={this.state.chainId} />
          </Col>
          <Col md={5}>{getting ? '...' : value}</Col>
          <Col md={2}>
            <Button variant='link' onClick={changeEdit}>{editOpen ? strings.cancel : strings.edit}</Button>
          </Col>
        </Row>
        {
          editOpen &&
          <React.Fragment>
            <br />
            <Row>
              <Col>
                <Form onSubmit={e => {
                  e.preventDefault();
                  set(this.state.chainId, input.value);
                }}>
                  <Form.Group>
                    <InputGroup>
                      <Form.Control type='text' ref={node => (input = node)} />
                      <InputGroup.Append>
                        <Button type='submit' size='sm'>{strings.edit}</Button>
                      </InputGroup.Append>
                    </InputGroup>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </React.Fragment>
        }
        {
          editting && '...'
        }
      </React.Fragment>
    );
  }
}

export default multilanguage(MultiChainAddrFieldComponent);
