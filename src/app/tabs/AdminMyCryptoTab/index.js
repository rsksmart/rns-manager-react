import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, FormGroup, Modal, Spinner, Alert } from 'react-bootstrap';
import { keccak256 as sha3 } from 'js-sha3';
import { hash as namehash } from 'eth-ens-namehash';
import { multilanguage } from 'redux-multilanguage';
import { LinkToMyCryptoInteractComponent, ResolverDatalist, ChainAddrSelectorComponent } from '../../components';
import { getRnsField, getSubdomainOwner } from './rns';
import { publicResolver, multiChainResolver } from '../../../config/contracts';

class AdminMyCryptoTabComponent extends Component {
  constructor (props) {
    super(props);

    this.state = {
      name: '',
      viewAdminOwnership: false,
      adminField: '',
      fieldValue: null,
      fieldValueError: null,
      adminFieldValue: '',
      showAdminGetModal: false,
      showAdminSetModal: false,

      viewAdminSubdomain: false,
      label: '',
      subdomainOwner: null,
      subdomainOwnerError: null,
      subdomainOwnerLoading: null,
      subdomainFieldValue: '',
      showSubdomainModal: false,
      showSubdomainGetModal: false,
      showSubdomainSetModal: false,

      viewAdminResolver: false,
      resolverLoading: false,
      resolverError: null,
      resolverValue: '',
      resolverField: '',
      resolverFieldValue: '',
      showResolverModal: false,
      showResolverGetModal: false,
      showResolverSetModal: false,
      chainId: ''
    };

    this.changeName = this.changeName.bind(this);

    this.changeViewAdminOwnership = this.changeViewAdminOwnership.bind(this);
    this.changeAdminField = this.changeAdminField.bind(this);
    this.changeAdminFieldValue = this.changeAdminFieldValue.bind(this);
    this.changeShowAdminGetModal = this.changeShowAdminGetModal.bind(this);
    this.changeShowAdminSetModal = this.changeShowAdminSetModal.bind(this);

    this.changeViewAdminSubdomain = this.changeViewAdminSubdomain.bind(this);
    this.changeLabel = this.changeLabel.bind(this);
    this.getSubdomainOwner = this.getSubdomainOwner.bind(this);
    this.changeSubdomainFieldValue = this.changeSubdomainFieldValue.bind(this);
    this.changeShowSubdomainGetModal = this.changeShowSubdomainGetModal.bind(this);
    this.changeShowSubdomainSetModal = this.changeShowSubdomainSetModal.bind(this);

    this.changeViewAdminResolver = this.changeViewAdminResolver.bind(this);
    this.changeResolverValue = this.changeResolverValue.bind(this);
    this.changeResolverField = this.changeResolverField.bind(this);
    this.changeResolverFieldValue = this.changeResolverFieldValue.bind(this);
    this.changeShowResolverGetModal = this.changeShowResolverGetModal.bind(this);
    this.changeShowResolverSetModal = this.changeShowResolverSetModal.bind(this);

    this.changeChainId = this.changeChainId.bind(this);
  }

  changeName (event) {
    this.setState({ name: event.target.value });
  }

  changeViewAdminOwnership () {
    this.setState(state => ({ viewAdminOwnership: !state.viewAdminOwnership }));
  }

  changeAdminField (event) {
    const adminField = event.target.value;
    const { name } = this.state;

    this.setState({ adminField, fieldValue: null, fieldValueError: null });

    getRnsField(adminField, name)
    .then(fieldValue => adminField === 'ttl' ? fieldValue.toString() : fieldValue)
    .then(fieldValue => this.setState({ fieldValue }))
    .catch(error => this.setState({ fieldValueError: error.message }));
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
    this.setState({ label: event.target.value, subdomainOwner: null, subdomainOwnerError: null, subdomainOwnerLoading: false });
  }

  getSubdomainOwner () {
    const { name, label } = this.state;

    this.setState({ subdomainOwner: null, subdomainOwnerError: null, subdomainOwnerLoading: true });

    getSubdomainOwner(name, label)
    .then(subdomainOwner => this.setState({ subdomainOwner }))
    .catch(subdomainOwnerError => this.setState({ subdomainOwnerError }))
    .then(() => this.setState({ subdomainOwnerLoading: false }));
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
    const { viewAdminResolver } = this.state;
    this.setState(state => ({ viewAdminResolver: !viewAdminResolver }));

    if (!viewAdminResolver) {
      this.setState({ resolverValue: '', resolverLoading: true, resolverError: null });

      const { name } = this.state;
      getRnsField('resolver', name)
      .then(resolverValue => this.setState({ resolverValue: resolverValue.toLowerCase() }))
      .catch(error => this.setState({ resolverError: error.message }))
      .then(() => this.setState({ resolverLoading: false }));
    }
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

  changeChainId (event) {
    this.setState({ chainId: event.target.value });
  }

  render () {
    const {
      state,
      props,
      changeName,
      changeViewAdminOwnership, changeAdminField, changeAdminFieldValue, changeShowAdminGetModal, changeShowAdminSetModal,
      changeViewAdminSubdomain, changeLabel, getSubdomainOwner, changeSubdomainFieldValue, changeShowSubdomainGetModal, changeShowSubdomainSetModal,
      changeViewAdminResolver, changeResolverValue, changeResolverField, changeResolverFieldValue, changeShowResolverGetModal, changeShowResolverSetModal,
      changeChainId
    } = this;

    const {
      name,
      viewAdminOwnership, adminField, fieldValue, fieldValueError, adminFieldValue, showAdminGetModal, showAdminSetModal,
      label, subdomainOwner, subdomainOwnerError, subdomainOwnerLoading, viewAdminSubdomain, subdomainFieldValue, showSubdomainGetModal, showSubdomainSetModal,
      resolverValue, resolverLoading, resolverError,
      resolverField, viewAdminResolver, resolverFieldValue, showResolverGetModal, showResolverSetModal,
      chainId
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
                            {
                              fieldValue ? <p>value: {fieldValue}</p> :
                              fieldValueError ? <Alert variant='danger'>{fieldValueError}</Alert> :
                              <React.Fragment>
                                <Spinner animation='grow' variant='primary' /><br />
                              </React.Fragment>
                            }
                            <Button size='sm' onClick={changeShowAdminGetModal}>{strings.get_value_on_mycrypto}</Button>
                          </Col>
                          <Form.Group as={Col}>
                            <InputGroup>
                              <Form.Control type='text' value={adminFieldValue} onChange={changeAdminFieldValue} placeholder={strings.value} />
                              <InputGroup.Append>
                                <Button size='sm' onClick={changeShowAdminSetModal}>{strings.set} {adminField} {strings.on_mycrypto}</Button>
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
                            <Form.Control type='text' value={label} onChange={changeLabel} placeholder={strings.label} />
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
                            <Button size='sm' onClick={getSubdomainOwner}>{strings.get_owner}</Button>
                            <br />
                            {
                              subdomainOwner ? <p><br />owner: {subdomainOwner}</p> :
                              subdomainOwnerError ? <Alert variant='danger'>{subdomainOwnerError}</Alert> :
                              subdomainOwnerLoading ?
                              <React.Fragment>
                                <Spinner animation='grow' variant='primary' /><br />
                              </React.Fragment> :
                              <br />
                            }
                            <Button size='sm' onClick={changeShowSubdomainGetModal}>{strings.get_value_on_mycrypto}</Button>
                          </Col>
                          <Form.Group as={Col}>
                            <InputGroup>
                              <Form.Control type='text' value={subdomainFieldValue} onChange={changeSubdomainFieldValue} placeholder={strings.owner} />
                              <InputGroup.Append>
                                <Button size='sm' onClick={changeShowSubdomainSetModal}>{strings.set} {strings.owner} {strings.on_mycrypto}</Button>
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
                    viewAdminResolver && (
                      resolverLoading ? <Spinner animation='grow' /> :
                      <React.Fragment>
                        <Row>
                          <Col>
                            {
                              resolverError &&
                              <small>{strings.check_domain_resolver}</small>
                            }
                          </Col>
                        </Row>
                        <Form.Group as={Row}>
                          <Form.Label column md={2}>{strings.resolver_result}</Form.Label>
                          <Col sm={10}>
                            <Form.Control tpye='text' value={resolverValue} onChange={changeResolverValue} list='resolvers' />
                            <ResolverDatalist />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                          <Form.Label column md={2}>{strings.field}</Form.Label>
                          <Col sm={10}>
                            <Form.Control as='select' value={resolverField} onChange={changeResolverField}>
                              <option value={''}>{strings.choose_}</option>
                              <option value={'addr'}>{strings.addr}</option>
                              <option value={'content'}>{strings.content}</option>
                              {
                                resolverValue === multiChainResolver && <option value={'chainAddr'}>{strings.chain_address}</option>
                              }
                            </Form.Control>
                          </Col>
                        </Form.Group>
                        {
                          resolverValue && resolverField &&
                          <Row>
                            {
                              resolverField === 'chainAddr' && <Col><ChainAddrSelectorComponent value={chainId} onChange={changeChainId} /></Col>
                            }
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
                    )
                  }
                </Container>
              </Col>
            </Row>
          </React.Fragment>
        }

        <Modal show={showAdminGetModal} onHide={changeShowAdminGetModal} size='lg'>
          <Modal.Header closeButton>
            <h3>{strings.Get} {adminField} {strings.on_mycrypto}</h3>
            <code>{name}</code>
          </Modal.Header>
          <Modal.Body>
            <ol>
              <li>{strings.mycrypto_select_network}</li>
              <li>{strings.mycrypto_go_to_interact}</li>
              <li>{strings.mycrypto_select_registry}</li>
              <li>{strings.mycrypto_access}</li>
              <li>{strings.mycrypto_on_read_write_select} <b>{adminField}</b></li>
              <li>
                  <div>
                    {strings.my_crypto_copy_paste_on} <i>node bytes32</i>
                  </div>
                  <code>{namehash(name)}</code>
              </li>
              <li>{strings.mycrypto_read}</li>
            </ol>
          </Modal.Body>
          <Modal.Footer>
            <LinkToMyCryptoInteractComponent />
          </Modal.Footer>
        </Modal>

        <Modal size='lg' show={showAdminSetModal} onHide={changeShowAdminSetModal}>
          <Modal.Header closeButton>
            <h3>{strings.Set} {adminField} {strings.on_mycrypto}</h3>
            <code>{name}</code>
          </Modal.Header>
          <Modal.Body>
            <ol>
              <li>{strings.mycrypto_select_network}</li>
              <li>{strings.mycrypto_go_to_interact}</li>
              <li>{strings.mycrypto_select_registry}</li>
              <li>{strings.mycrypto_access}</li>
              <li>{strings.mycrypto_on_read_write_select} <b>{adminField}</b>.</li>
              <li>
                {strings.mycrypto_copy_paste_values}
                <ul>
                  <li>
                    <div>
                      <i>node bytes32</i>
                    </div>
                    <code>{namehash(name)}</code>
                  </li>
                  <li>
                    <div>
                      <i>
                        {
                          adminField === 'owner' ? 'ownerAddress address' :
                          adminField === 'resolver' ? 'resolverAddress address' :
                          adminField === 'ttl' ? 'ttlValue uint64' : ''
                        }
                      </i>
                    </div>
                    <code>{adminFieldValue}</code>
                  </li>
                </ul>
              </li>
              <li>{strings.mycrypto_choose_checkout}</li>
              <li>{strings.mycrypto_check_gas} <a href='https://stats.rsk.co/' target='_blank' rel='noopener noreferrer'>RSK stats</a>.</li>
              <li>{strings.mycrypto_write}</li>
            </ol>
          </Modal.Body>
          <Modal.Footer>
            <LinkToMyCryptoInteractComponent />
          </Modal.Footer>
        </Modal>

        <Modal show={showSubdomainGetModal} onHide={changeShowSubdomainGetModal} size='lg'>
          <Modal.Header closeButton>
            <h3>{strings.get} {adminField} {strings.on_mycrypto}</h3>
            <code>{label}.{name}</code>
          </Modal.Header>
          <Modal.Body>
            <ol>
              <li>{strings.mycrypto_select_network}</li>
              <li>{strings.mycrypto_go_to_interact}</li>
              <li>{strings.mycrypto_select_registry}</li>
              <li>{strings.mycrypto_access}</li>
              <li>{strings.mycrypto_on_read_write_select} <b>owner</b></li>
              <li>
                  <div>
                    {strings.my_crypto_copy_paste_on} <i>node bytes32</i>
                  </div>
                  <code>{namehash(`${label}.${name}`)}</code>
              </li>
              <li>{strings.mycrypto_read}</li>
            </ol>
          </Modal.Body>
          <Modal.Footer>
            <LinkToMyCryptoInteractComponent />
          </Modal.Footer>
        </Modal>

        <Modal size='lg' show={showSubdomainSetModal} onHide={changeShowSubdomainSetModal}>
          <Modal.Header closeButton>
            <h3>{strings.Set} owner {strings.on_mycrypto}</h3>
            <code>{label}.{name}</code>
          </Modal.Header>
          <Modal.Body>
            <ol>
              <li>{strings.mycrypto_select_network}</li>
              <li>{strings.mycrypto_go_to_interact}</li>
              <li>{strings.mycrypto_select_registry}</li>
              <li>{strings.mycrypto_access}</li>
              <li>{strings.mycrypto_on_read_write_select} <b>setSubnodeOwner</b>.</li>
              <li>
                {strings.mycrypto_copy_paste_values}
                <ul>
                  <li>
                      <div>
                        <i>node bytes32</i>
                      </div>
                      <code>{namehash(name)}</code>
                  </li>
                  <li>
                      <div>
                        <i>label bytes32</i>
                      </div>
                      <code>0x{sha3(label)}</code>
                  </li>
                  <li>
                      <div>
                        <i>node ownerAddress</i>
                      </div>
                      <code>{subdomainFieldValue}</code>
                  </li>
                </ul>
              </li>
              <li>{strings.mycrypto_choose_checkout}</li>
              <li>{strings.mycrypto_check_gas} <a href='https://stats.rsk.co/' target='_blank' rel='noopener noreferrer'>RSK stats</a>.</li>
              <li>{strings.mycrypto_write}</li>
            </ol>
          </Modal.Body>
          <Modal.Footer>
            <LinkToMyCryptoInteractComponent />
          </Modal.Footer>
        </Modal>

        <Modal show={showResolverGetModal} onHide={changeShowResolverGetModal} size='lg'>
          <Modal.Header closeButton>
            <h3>{strings.Get} {resolverField} {strings.on_mycrypto}</h3>
            <code>{name}</code>
          </Modal.Header>
          <Modal.Body>
            <ol>
              <li>{strings.mycrypto_select_network}</li>
              <li>{strings.mycrypto_go_to_interact}</li>
              {
                resolverValue === publicResolver ? <li>{strings.mycrypto_select_resolver}</li> :
                resolverValue === multiChainResolver && <li>{strings.mycrypto_select_multi_resolver}</li>
              }
              <li>{strings.mycrypto_access}</li>
              <li>{strings.mycrypto_on_read_write_select} <b>owner</b></li>
              <li>
                  <div>
                    {strings.my_crypto_copy_paste_on} <i>node bytes32</i>
                  </div>
                  <code>{namehash(name)}</code>
              </li>
              {
                resolverField === 'chainAddr' &&
                <li>
                    <div>
                      {strings.my_crypto_copy_paste_on} <i>chainId bytes8</i>
                    </div>
                    <code>{chainId}</code>
                </li>
              }
              <li>{strings.mycrypto_read}</li>
            </ol>
          </Modal.Body>
          <Modal.Footer>
            <LinkToMyCryptoInteractComponent />
          </Modal.Footer>
        </Modal>

        <Modal size='lg' show={showResolverSetModal} onHide={changeShowResolverSetModal}>
          <Modal.Header closeButton>
            <h3>{strings.Set} {resolverField} on MyCrypto</h3>
            <code>{name}</code>
          </Modal.Header>
          <Modal.Body>
            <ol>
              <li>{strings.mycrypto_select_network}</li>
              <li>{strings.mycrypto_go_to_interact}</li>
              {
                resolverValue === publicResolver ? <li>{strings.mycrypto_select_resolver}</li> :
                resolverValue === multiChainResolver && <li>{strings.mycrypto_select_multi_resolver}</li>
              }
              <li>{strings.mycrypto_access}</li>
              <li>{strings.mycrypto_on_read_write_select} <b>{resolverField}</b>.</li>
              <li>
                {strings.mycrypto_copy_paste_values}
                <ul>
                  <li>
                      <div>
                        <i>node bytes32</i>
                      </div>
                      <code>{namehash(name)}</code>
                  </li>
                  <li>
                      <div>
                        <i>
                          {
                            resolverField === 'addr' ? 'addrValue address' :
                            resolverField === 'content' ? 'contentValue bytes32' : ''
                          }
                        </i>
                      </div>
                      <code>{resolverFieldValue}</code>
                  </li>
                  {
                    resolverField === 'chainAddr' &&
                    <li>
                        <div>
                          <i>chainId bytes8</i>
                        </div>
                        <code>{chainId}</code>
                    </li>
                  }
                </ul>
              </li>
              <li>{strings.mycrypto_choose_checkout}</li>
              <li>{strings.mycrypto_check_gas} <a href='https://stats.rsk.co/' target='_blank' rel='noopener noreferrer'>RSK stats</a>.</li>
              <li>{strings.mycrypto_write}</li>
            </ol>
          </Modal.Body>
          <Modal.Footer>
            <LinkToMyCryptoInteractComponent />
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

export const AdminMyCryptoTab = multilanguage(AdminMyCryptoTabComponent);
