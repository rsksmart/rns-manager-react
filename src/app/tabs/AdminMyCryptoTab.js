import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, FormGroup } from 'react-bootstrap';

export class AdminMyCryptoTab extends Component {
  constructor (props) {
    super(props);

    this.state = {
      name: '',
      viewAdminOwnership: false,
      adminField: null,
      viewAdminSubdomain: false,
      label: '',
      viewAdminResolver: false,
      resolverValue: '',
      resolverField: ''
    };

    this.changeName = this.changeName.bind(this);

    this.changeViewAdminOwnership = this.changeViewAdminOwnership.bind(this);
    this.changeAdminField = this.changeAdminField.bind(this);

    this.changeViewAdminSubdomain = this.changeViewAdminSubdomain.bind(this);
    this.changeLabel = this.changeLabel.bind(this);

    this.changeViewAdminResolver = this.changeViewAdminResolver.bind(this);
    this.changeResolverValue = this.changeResolverValue.bind(this);
    this.changeResolverField = this.changeResolverField.bind(this);
  }

  changeName (event) {
    this.setState({ name: event.target.value });
  }

  changeViewAdminOwnership () {
    this.setState(state => ({ viewAdminOwnership: !state.viewAdminOwnership }));
  }

  changeAdminField (event) {
    this.setState({ adminField: event.target.value });
  }

  changeViewAdminSubdomain () {
    this.setState(state => ({ viewAdminSubdomain: !state.viewAdminSubdomain }));
  }

  changeLabel (event) {
    this.setState({ label: event.target.value });
  }

  changeViewAdminResolver () {
    this.setState(state => ({ viewAdminResolver: !state.viewAdminResolver }));
  }

  changeResolverValue (event) {
    this.setState({ resolverValue: event.target.value });
  }

  changeResolverField (event) {
    this.setState({ resolverField: event.target.value });
  }

  render () {
    const {
      state,
      changeName,
      changeViewAdminOwnership, changeAdminField,
      changeViewAdminSubdomain, changeLabel,
      changeViewAdminResolver, changeResolverValue, changeResolverField } = this;
    const { name, viewAdminOwnership, adminField, label, viewAdminSubdomain, resolverValue, resolverField, viewAdminResolver } = state;

    return (
      <Container>
        <Row>
          <Col>
            <h2>admin your domain in MyCrypto</h2>
          </Col>
        </Row>
        <Form.Group as={Row}>
          <Form.Label column md={2}>name</Form.Label>
          <Col sm={10}>
            <Form.Control value={name} onChange={changeName} />
          </Col>
        </Form.Group>
        {
          name &&
          <React.Fragment>
            <Row>
              <Col>
                <Container>
                  <Row>
                    <Col>
                      <h3>
                        admin ownership
                        <Button variant='link' onClick={changeViewAdminOwnership}>{viewAdminOwnership ? '-' : '+'}</Button>
                      </h3>
                    </Col>
                  </Row>
                  {
                    viewAdminOwnership &&
                    <React.Fragment>
                      <Form.Group as={Row}>
                        <Form.Label column md={2}>field</Form.Label>
                        <Col sm={10}>
                          <Form.Control as='select' value={adminField} onChange={changeAdminField}>
                            <option value={''}>Choose...</option>
                            <option value={'owner'}>owner</option>
                            <option value={'resolver'}>resolver</option>
                            <option value={'ttl'}>ttl</option>
                          </Form.Control>
                        </Col>
                      </Form.Group>
                      {
                        adminField &&
                        <Row>
                          <Col>
                            <Button size='sm'>get {adminField}</Button>
                          </Col>
                          <Form.Group as={Col}>
                            <InputGroup>
                              <Form.Control type='text' />
                              <InputGroup.Append>
                                <Button size='sm'>set {adminField}</Button>
                              </InputGroup.Append>
                            </InputGroup>
                          </Form.Group>
                        </Row>
                      }
                    </React.Fragment>
                  }
                </Container>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <Container>
                  <Row>
                    <Col>
                      <h3>
                        admin subdomain ownership
                        <Button variant='link' onClick={changeViewAdminSubdomain}>{viewAdminSubdomain ? '-' : '+'}</Button>
                      </h3>
                    </Col>
                  </Row>
                  {
                    viewAdminSubdomain &&
                    <React.Fragment>
                      <FormGroup as={Row}>
                        <Form.Label column sm={2}>subdomain</Form.Label>
                        <Col sm={10}>
                          <InputGroup>
                            <Form.Control type='text' value={label} onChange={changeLabel} />
                            <InputGroup.Append>
                              <InputGroup.Text>.{name}</InputGroup.Text>
                            </InputGroup.Append>
                          </InputGroup>
                        </Col>
                      </FormGroup>
                      {
                        label &&
                        <Row>
                          <Col>
                            <Button size='sm'>get owner</Button>
                          </Col>
                          <Form.Group as={Col}>
                            <InputGroup>
                              <Form.Control type='text' />
                              <InputGroup.Append>
                                <Button size='sm'>set owner</Button>
                              </InputGroup.Append>
                            </InputGroup>
                          </Form.Group>
                        </Row>
                      }
                    </React.Fragment>
                  }
                </Container>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <Container>
                  <Row>
                    <Col>
                      <h3>
                        admin resolution
                        <Button variant='link' onClick={changeViewAdminResolver}>{viewAdminResolver ? '-' : '+'}</Button>
                      </h3>
                    </Col>
                  </Row>
                  {
                    viewAdminResolver &&
                    <React.Fragment>
                      <Row>
                        <Col>
                          <small>check domain resolver</small>
                        </Col>
                      </Row>
                      <Form.Group as={Row}>
                        <Form.Label column md={2}>resolver result</Form.Label>
                        <Col sm={10}>
                          <Form.Control as='select' value={resolverValue} onChange={changeResolverValue}>
                            <option value={''}>Choose...</option>
                            <option value={'public'}>0x... (Public Resolver)</option>
                          </Form.Control>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row}>
                        <Form.Label column md={2}>field</Form.Label>
                        <Col sm={10}>
                          <Form.Control as='select' value={resolverField} onChange={changeResolverField}>
                            <option value={''}>Choose...</option>
                            <option value={'addr'}>addr</option>
                            <option value={'content'}>content</option>
                          </Form.Control>
                        </Col>
                      </Form.Group>
                      {
                        resolverValue && resolverField &&
                        <Row>
                          <Col>
                            <Button size='sm'>get</Button>
                          </Col>
                          <Form.Group as={Col}>
                            <InputGroup>
                              <Form.Control type='text' />
                              <InputGroup.Append>
                                <Button size='sm'>set</Button>
                              </InputGroup.Append>
                            </InputGroup>
                          </Form.Group>
                        </Row>
                      }
                    </React.Fragment>
                  }
                </Container>
              </Col>
            </Row>
          </React.Fragment>
        }
      </Container>
    );
  }
}
