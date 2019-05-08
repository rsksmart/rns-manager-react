import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Image, Card, FormGroup } from 'react-bootstrap';
import { ChainAddrSelectorComponent } from '../../../components';
import { isValidName } from '../../../validations';
import { CopyableComponent } from '../../../components';
import { Alert } from '@githubprimer/octicons-react';
import { multilanguage } from 'redux-multilanguage';

const resolutionDisplay = resolution => (
  <Container>
    <Row>
      <Col lg={{ span: 8, offset: 2 }} md={{ span: 10, offset: 1 }} sm={12}>
        <br />
        <Card>
          <Image src={`https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${resolution}&choe=UTF-8`} alt='resolution qr' className='card-img-top' />
        </Card>
      </Col>
    </Row>
    <br />
    <Row>
      <Col lg={{ span: 8, offset: 2 }} md={{ span: 10, offset: 1 }} sm={12}>
        <CopyableComponent>{resolution}</CopyableComponent>
      </Col>
    </Row>
  </Container>
);

const displayChainAddr = (supportsChainAddr, chainAddrLoading, chainAddrError, chainAddrResolution) => {
  if (!supportsChainAddr) return null;

  if (chainAddrLoading) return '...';
  if (chainAddrError) return <Alert variant='danger'>{chainAddrError}</Alert>;
  if (chainAddrResolution) return resolutionDisplay(chainAddrResolution);

  return 'no resolution';
}

class ResolveComponent extends Component {
  constructor (props) {
    super(props);

    this.state = {
      value: props.name,
      isValid: true,
      chainId: '0x80000000'
    };

    this.resolveValueChange = this.resolveValueChange.bind(this);
    this.validate = this.validate.bind(this);
    this.onResolve = this.onResolve.bind(this);
    this.onChangeChainId = this.onChangeChainId.bind(this);
  }

  componentDidMount() {
    const { name, resolveAddress } = this.props;
    if (name) resolveAddress(name);
  }

  resolveValueChange (event) {
    this.setState({ value: event.target.value });
  }

  onResolve (event) {
    event.preventDefault();
    if (this.validate()) {
      if (this.props.name === this.state.value) this.props.resolveAddress(this.state.value);
      else this.props.search(this.state.value);
    }
  }

  validate () {
    const isValid = isValidName(this.state.value);
    this.setState({ isValid });
    return isValid;
  }

  componentWillReceiveProps(newProps) {
    const { name, resolveAddress } = this.props;
    if (name !== newProps.name) resolveAddress(newProps.name);
  }

  onChangeChainId (event) {
    const chainId = event.target.value;
    const { name, resolveChainAddr } = this.props;
    if (chainId.length === 10) resolveChainAddr(chainId, name);
    this.setState({ chainId });
  }

  render () {
    const { strings, loading, resolution, error, supportsChainAddr, chainAddrLoading, chainAddrError, chainAddrResolution } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <Form onSubmit={this.onResolve}>
              <Form.Group>
                <Form.Control type='text' value={this.state.value} onChange={this.resolveValueChange} className={!this.state.isValid && 'is-invalid'} />
                <div className='invalid-feedback'>
                  {strings.invalid_name}
                </div>
              </Form.Group>
              <Button type="submit" size='sm'>{strings.resolve}</Button>
              {!resolution && <p>{loading ? '...' : error}</p>}
            </Form>
          </Col>
        </Row>
        <Row>
          {
            resolution &&
            <Col md={supportsChainAddr ? 6 : { span: 6, offset: 3 }}>
              <Container>
                <Row>
                  <Col>
                    <h2>{strings.rsk_address}</h2>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {resolutionDisplay(resolution)}
                  </Col>
                </Row>
              </Container>
            </Col>
          }
          {
            supportsChainAddr &&
            <Col md={6}>
              <Container>
                <Row>
                  <Col>
                    <h2>{strings.chain_address}</h2>
                  </Col>
                </Row>
              </Container>
              <FormGroup as={Row}>
                <Col>
                  <ChainAddrSelectorComponent onChange={this.onChangeChainId} list='chains' value={this.state.chainId} />
                </Col>
              </FormGroup>
              {displayChainAddr(supportsChainAddr, chainAddrLoading, chainAddrError, chainAddrResolution)}
              </Col>
            }
        </Row>
      </Container>
    );
  }
}

export default multilanguage(ResolveComponent);
