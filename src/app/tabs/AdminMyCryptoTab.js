import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, FormGroup, Modal } from 'react-bootstrap';
import { keccak256 as sha3 } from 'js-sha3';
import { hash as namehash } from 'eth-ens-namehash';
import { multilanguage } from 'redux-multilanguage';

class AdminMyCryptoTabComponent extends Component {
  constructor (props) {
    super(props);

    this.state = {
      name: '',
      viewAdminOwnership: false,
      adminField: null,
      adminFieldValue: null,
      showAdminGetModal: false,
      showAdminSetModal: false,

      viewAdminSubdomain: false,
      label: '',
      subdomainFieldValue: null,
      showSubdomainModal: false,
      showSubdomainGetModal: false,
      showSubdomainSetModal: false,

      viewAdminResolver: false,
      resolverValue: '',
      resolverField: '',
      resolverFieldValue: null,
      showResolverModal: false,
      showResolverGetModal: false,
      showResolverSetModal: false
    };

    this.changeName = this.changeName.bind(this);

    this.changeViewAdminOwnership = this.changeViewAdminOwnership.bind(this);
    this.changeAdminField = this.changeAdminField.bind(this);
    this.changeAdminFieldValue = this.changeAdminFieldValue.bind(this);
    this.changeShowAdminGetModal = this.changeShowAdminGetModal.bind(this);
    this.changeShowAdminSetModal = this.changeShowAdminSetModal.bind(this);

    this.changeViewAdminSubdomain = this.changeViewAdminSubdomain.bind(this);
    this.changeLabel = this.changeLabel.bind(this);
    this.changeSubdomainFieldValue = this.changeSubdomainFieldValue.bind(this);
    this.changeShowSubdomainGetModal = this.changeShowSubdomainGetModal.bind(this);
    this.changeShowSubdomainSetModal = this.changeShowSubdomainSetModal.bind(this);

    this.changeViewAdminResolver = this.changeViewAdminResolver.bind(this);
    this.changeResolverValue = this.changeResolverValue.bind(this);
    this.changeResolverField = this.changeResolverField.bind(this);
    this.changeResolverFieldValue = this.changeResolverFieldValue.bind(this);
    this.changeShowResolverGetModal = this.changeShowResolverGetModal.bind(this);
    this.changeShowResolverSetModal = this.changeShowResolverSetModal.bind(this);
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

  changeAdminFieldValue (event) {
    this.setState({ adminFieldValue: event.target.value });
  }

  changeShowAdminGetModal () {
    this.setState(state => ({ showAdminGetModal: !state.showAdminGetModal }));
  }

  changeShowAdminSetModal () {
    this.setState(state => ({ showAdminSetModal: !state.showAdminSetModal }));
  }

  changeViewAdminSubdomain () {
    this.setState(state => ({ viewAdminSubdomain: !state.viewAdminSubdomain }));
  }

  changeLabel (event) {
    this.setState({ label: event.target.value });
  }

  changeSubdomainFieldValue (event) {
    this.setState({ subdomainFieldValue: event.target.value });
  }

  changeShowSubdomainGetModal () {
    this.setState(state => ({ showSubdomainGetModal: !state.showSubdomainGetModal }));
  }

  changeShowSubdomainSetModal () {
    this.setState(state => ({ showSubdomainSetModal: !state.showSubdomainSetModal }));
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

  changeResolverFieldValue (event) {
    this.setState({ resolverFieldValue: event.target.value });
  }

  changeShowResolverGetModal () {
    this.setState(state => ({ showResolverGetModal: !state.showResolverGetModal }));
  }

  changeShowResolverSetModal () {
    this.setState(state => ({ showResolverSetModal: !state.showResolverSetModal }));
  }

  render () {
    const {
      state,
      props,
      changeName,
      changeViewAdminOwnership, changeAdminField, changeAdminFieldValue, changeShowAdminGetModal, changeShowAdminSetModal,
      changeViewAdminSubdomain, changeLabel, changeSubdomainFieldValue, changeShowSubdomainGetModal, changeShowSubdomainSetModal,
      changeViewAdminResolver, changeResolverValue, changeResolverField, changeResolverFieldValue, changeShowResolverGetModal, changeShowResolverSetModal
    } = this;

    const {
      name,
      viewAdminOwnership, adminField, adminFieldValue, showAdminGetModal, showAdminSetModal,
      label, viewAdminSubdomain, subdomainFieldValue, showSubdomainGetModal, showSubdomainSetModal,
      resolverValue, resolverField, viewAdminResolver, resolverFieldValue, showResolverGetModal, showResolverSetModal
    } = state;

    const { strings } = props;

    return (
      <Container>
        <Row>
          <Col>
            <h2>{strings.mycrypto_admin_title}</h2>
          </Col>
        </Row>
        <Form.Group as={Row}>
          <Form.Label column md={2}>{strings.name}</Form.Label>
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
                        {strings.admin_ownership}
                        <Button variant='link' onClick={changeViewAdminOwnership}>{viewAdminOwnership ? '-' : '+'}</Button>
                      </h3>
                    </Col>
                  </Row>
                  {
                    viewAdminOwnership &&
                    <React.Fragment>
                      <Form.Group as={Row}>
                        <Form.Label column md={2}>{strings.field}</Form.Label>
                        <Col sm={10}>
                          <Form.Control as='select' value={adminField} onChange={changeAdminField}>
                            <option value={''}>{strings.choose_}</option>
                            <option value={'owner'}>{strings.owner}</option>
                            <option value={'resolver'}>{strings.resolver}</option>
                            <option value={'ttl'}>{strings.ttl}</option>
                          </Form.Control>
                        </Col>
                      </Form.Group>
                      {
                        adminField &&
                        <Row>
                          <Col>
                            <Button size='sm' onClick={changeShowAdminGetModal}>{strings.get} {adminField}</Button>
                          </Col>
                          <Form.Group as={Col}>
                            <InputGroup>
                              <Form.Control type='text' value={adminFieldValue} onChange={changeAdminFieldValue} />
                              <InputGroup.Append>
                                <Button size='sm' onClick={changeShowAdminSetModal}>{strings.set} {adminField}</Button>
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
                        {strings.admin_subdomain_ownership}
                        <Button variant='link' onClick={changeViewAdminSubdomain}>{viewAdminSubdomain ? '-' : '+'}</Button>
                      </h3>
                    </Col>
                  </Row>
                  {
                    viewAdminSubdomain &&
                    <React.Fragment>
                      <FormGroup as={Row}>
                        <Form.Label column sm={2}>{strings.subdomain}</Form.Label>
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
                            <Button size='sm' onClick={changeShowSubdomainGetModal}>{strings.get} {strings.owner}</Button>
                          </Col>
                          <Form.Group as={Col}>
                            <InputGroup>
                              <Form.Control type='text' value={subdomainFieldValue} onChange={changeSubdomainFieldValue} />
                              <InputGroup.Append>
                                <Button size='sm' onClick={changeShowSubdomainSetModal}>{strings.set} {strings.owner}</Button>
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
                        {strings.admin_resolution}
                        <Button variant='link' onClick={changeViewAdminResolver}>{viewAdminResolver ? '-' : '+'}</Button>
                      </h3>
                    </Col>
                  </Row>
                  {
                    viewAdminResolver &&
                    <React.Fragment>
                      <Row>
                        <Col>
                          <small>{strings.check_domain_resolver}</small>
                        </Col>
                      </Row>
                      <Form.Group as={Row}>
                        <Form.Label column md={2}>{strings.resolver_result}</Form.Label>
                        <Col sm={10}>
                          <Form.Control as='select' value={resolverValue} onChange={changeResolverValue}>
                            <option value={''}>{strings.choose_}</option>
                            <option value={'public'}>0x4efd...e93a ({strings.public_resolver})</option>
                          </Form.Control>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row}>
                        <Form.Label column md={2}>{strings.field}</Form.Label>
                        <Col sm={10}>
                          <Form.Control as='select' value={resolverField} onChange={changeResolverField}>
                            <option value={''}>{strings.choose_}</option>
                            <option value={'addr'}>{strings.addr}</option>
                            <option value={'content'}>{strings.content}</option>
                          </Form.Control>
                        </Col>
                      </Form.Group>
                      {
                        resolverValue && resolverField &&
                        <Row>
                          <Col>
                            <Button size='sm' onClick={changeShowResolverGetModal}>{strings.get} {resolverField}</Button>
                          </Col>
                          <Form.Group as={Col}>
                            <InputGroup>
                              <Form.Control type='text' value={resolverFieldValue} onChange={changeResolverFieldValue} />
                              <InputGroup.Append>
                                <Button size='sm' onClick={changeShowResolverSetModal}>{strings.set} {resolverField}</Button>
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

        <Modal show={showAdminGetModal} onHide={changeShowAdminGetModal} size='lg'>
          <Modal.Header closeButton>
            <h3>Get <code>{name}</code> {adminField} on MyCrypto</h3>
          </Modal.Header>
          <Modal.Body>
            <ol>
              <li>Go to My Crypto contract interaction on your <a target='_blank' href='https://mycrypto.com/contracts/interact' rel='noopener noreferrer' className='modal-link'>browser</a> or native app.</li>
              <li>Select <b>RSK MainNet</b> network on the top right selector.</li>
              <li>Select <b>RNS Registry</b> contract on <i>Existing Contract</i> selector.</li>
              <li>Access!</li>
              <li>On <i>Read / Write Contract</i> select <b>{adminField}</b></li>
              <li>
                  <div>
                    Copy and paste this hash on <i>node bytes32</i>
                  </div>
                  <code>{namehash(name)}</code>
              </li>
              <li>Read!</li>
            </ol>
          </Modal.Body>
        </Modal>

        <Modal size='lg' show={showAdminSetModal} onHide={changeShowAdminSetModal}>
          <Modal.Header closeButton>
            <h3>Set {adminField} for <code>{name}</code> on MyCrypto</h3>
          </Modal.Header>
          <Modal.Body>
            <ol>
              <li>Go to My Crypto contract interaction on your <a target='_blank' href='https://mycrypto.com/contracts/interact' className='modal-link' rel='noopener noreferrer'>browser</a> or native app.</li>
              <li>Select <b>RSK MainNet</b> network on the top right selector.</li>
              <li>Select <b>RNS Registry</b> contract on <i>Existing Contract</i> selector.</li>
              <li>Access!</li>
              <li>On <i>Read / Write Contract</i> select <b>{adminField}</b></li>
              <li>
                Copy this values and paste them in MyCrypto fields:
                <ul>
                  <li>
                      <div>
                        on <i>node bytes32</i>
                      </div>
                      <code>{namehash(name)}</code>
                  </li>
                  <li>
                      <div>
                        on <i>{
                          adminField === 'owner' ? 'ownerAddress address' :
                          adminField === 'resolver' ? 'resolverAddress address' :
                          adminField === 'ttl' ? 'ttlValue uint64' : ''
                        }</i>
                      </div>
                      <code>{adminFieldValue}</code>
                  </li>
                </ul>
              </li>
              <li>Choose your checkout method.</li>
              <li>Check the gas according to <a href='https://stats.rsk.co/' target='_blank' rel='noopener noreferrer'>RSK stats</a>.</li>
              <li>Write!</li>
            </ol>
          </Modal.Body>
        </Modal>

        <Modal show={showSubdomainGetModal} onHide={changeShowSubdomainGetModal} size='lg'>
          <Modal.Header closeButton>
            <h3>Get <code>{label}.{name}</code> {adminField} on MyCrypto</h3>
          </Modal.Header>
          <Modal.Body>
            <ol>
              <li>Go to My Crypto contract interaction on your <a target='_blank' href='https://mycrypto.com/contracts/interact' rel='noopener noreferrer' className='modal-link'>browser</a> or native app.</li>
              <li>Select <b>RSK MainNet</b> network on the top right selector.</li>
              <li>Select <b>RNS Registry</b> contract on <i>Existing Contract</i> selector.</li>
              <li>Access!</li>
              <li>On <i>Read / Write Contract</i> select <b>owner</b></li>
              <li>
                  <div>
                    Copy and paste this hash on <i>node bytes32</i>
                  </div>
                  <code>{namehash(`${label}.${name}`)}</code>
              </li>
              <li>Read!</li>
            </ol>
          </Modal.Body>
        </Modal>

        <Modal size='lg' show={showSubdomainSetModal} onHide={changeShowSubdomainSetModal}>
          <Modal.Header closeButton>
            <h3>Set owner for <code>{label}.{name}</code> on MyCrypto</h3>
          </Modal.Header>
          <Modal.Body>
            <ol>
              <li>Go to My Crypto contract interaction on your <a target='_blank' href='https://mycrypto.com/contracts/interact' className='modal-link' rel='noopener noreferrer'>browser</a> or native app.</li>
              <li>Select <b>RSK MainNet</b> network on the top right selector.</li>
              <li>Select <b>RNS Registry</b> contract on <i>Existing Contract</i> selector.</li>
              <li>Access!</li>
              <li>On <i>Read / Write Contract</i> select <b>setSubnodeOwner</b></li>
              <li>
                Copy this values and paste them in MyCrypto fields:
                <ul>
                  <li>
                      <div>
                        on <i>node bytes32</i>
                      </div>
                      <code>{namehash(name)}</code>
                  </li>
                  <li>
                      <div>
                        on <i>label bytes32</i>
                      </div>
                      <code>0x{sha3(label)}</code>
                  </li>
                  <li>
                      <div>
                        on <i>node ownerAddress</i>
                      </div>
                      <code>{subdomainFieldValue}</code>
                  </li>
                </ul>
              </li>
              <li>Choose your checkout method.</li>
              <li>Check the gas according to <a href='https://stats.rsk.co/' target='_blank' rel='noopener noreferrer'>RSK stats</a>.</li>
              <li>Write!</li>
            </ol>
          </Modal.Body>
        </Modal>

        <Modal show={showResolverGetModal} onHide={changeShowResolverGetModal} size='lg'>
          <Modal.Header closeButton>
            <h3>Get {name} {resolverField} on MyCrypto</h3>
          </Modal.Header>
          <Modal.Body>
            <ol>
              <li>Go to My Crypto contract interaction on your <a target='_blank' href='https://mycrypto.com/contracts/interact' rel='noopener noreferrer' className='modal-link'>browser</a> or native app.</li>
              <li>Select <b>RSK MainNet</b> network on the top right selector.</li>
              <li>Select <b>RNS Resolver</b> contract on <i>Existing Contract</i> selector.</li>
              <li>Access!</li>
              <li>On <i>Read / Write Contract</i> select <b>{resolverField}</b></li>
              <li>
                  <div>
                    Copy and paste this hash on <i>node bytes32</i>
                  </div>
                  <code>{namehash(name)}</code>
              </li>
              <li>Read!</li>
            </ol>
          </Modal.Body>
        </Modal>

        <Modal size='lg' show={showResolverSetModal} onHide={changeShowResolverSetModal}>
          <Modal.Header closeButton>
            <h3>Set {resolverField} for <code>{name}</code> on MyCrypto</h3>
          </Modal.Header>
          <Modal.Body>
            <ol>
              <li>Go to My Crypto contract interaction on your <a target='_blank' href='https://mycrypto.com/contracts/interact' className='modal-link' rel='noopener noreferrer'>browser</a> or native app.</li>
              <li>Select <b>RSK MainNet</b> network on the top right selector.</li>
              <li>Select <b>RNS Resolver</b> contract on <i>Existing Contract</i> selector.</li>
              <li>Access!</li>
              <li>On <i>Read / Write Contract</i> select <b>{resolverField}</b></li>
              <li>
                Copy this values and paste them in MyCrypto fields:
                <ul>
                  <li>
                      <div>
                        on <i>node bytes32</i>
                      </div>
                      <code>{namehash(name)}</code>
                  </li>
                  <li>
                      <div>
                        on <i>{
                          resolverField === 'addr' ? 'addrValue address' :
                          resolverField === 'content' ? 'contentValue bytes32' : ''
                        }</i>
                      </div>
                      <code>{resolverFieldValue}</code>
                  </li>
                </ul>
              </li>
              <li>Choose your checkout method.</li>
              <li>Check the gas according to <a href='https://stats.rsk.co/' target='_blank' rel='noopener noreferrer'>RSK stats</a>.</li>
              <li>Write!</li>
            </ol>
          </Modal.Body>
        </Modal>
      </Container>
    );
  }
}

export const AdminMyCryptoTab = multilanguage(AdminMyCryptoTabComponent);
