import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Image, Card } from 'react-bootstrap';
import { isValidName } from '../../../validations';
import { CopyableComponent } from '../../../components';

class ResolveComponent extends Component {
  constructor (props) {
    super(props);

    this.state = {
      value: props.name,
      isValid: true
    };

    this.resolveValueChange = this.resolveValueChange.bind(this);
    this.validate = this.validate.bind(this);
    this.onResolve = this.onResolve.bind(this);
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
    if (this.props.name !== newProps.name) this.props.resolveAddress(newProps.name);
  }

  render () {
    const { loading, resolution, error } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <h2>Resolve address</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={this.onResolve}>
              <Form.Group>
                <Form.Control type='text' value={this.state.value} onChange={this.resolveValueChange} className={!this.state.isValid && 'is-invalid'} />
                <div className='invalid-feedback'>
                  Invalid name.
                </div>
              </Form.Group>
              <Button type="submit" size='sm'>Resolve</Button>
              {!resolution && <p>{loading ? '...' : error}</p>}
            </Form>
          </Col>
        </Row>
        {
          resolution &&
          <Row>
            <Col>
              <Row>
                <Col lg={{ span: 4, offset: 4 }} md={{ span: 6, offset: 3 }} sm={12}>
                  <br />
                  <Card>
                    <Image src={`https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${resolution}&choe=UTF-8`} alt='resolution qr' className='card-img-top' />
                  </Card>
                </Col>
              </Row>
              <br />
              <Row>
                <Col lg={{ span: 8, offset: 2 }} md={{ span: 10, offset: 1 }} sm={12}>
                  <p>
                    <CopyableComponent>{resolution}</CopyableComponent>
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        }
      </Container>
    );
  }
}

export default ResolveComponent;
