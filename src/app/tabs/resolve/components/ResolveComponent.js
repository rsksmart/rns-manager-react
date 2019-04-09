import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { isValidName } from '../../../selectors';

class ResolveComponent extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isValid: true
    };

    this.validate = this.validate.bind(this);
  }

  validate (name) {
    const isValid = isValidName(name);
    this.setState({ isValid });
    return isValid;
  }

  render () {
    const { loading, resolution, error, resolveAddress } = this.props;

    const displayResult = loading ? '...' : error ? error : resolution;

    var input;

    return (
      <Container>
        <Row>
          <Col>
            <h2>Resolve address</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={e => {
              e.preventDefault();
              resolveAddress(input.value);
            }}>
              <Form.Group>
                <Form.Control ref={node => (input = node)} className={!this.state.isValid ? 'is-invalid' : null} />
                <div className='invalid-feedback'>
                  Invalid name.
                </div>
              </Form.Group>
              <Button type="submit" size='sm'>Resolve</Button>
              <p>{displayResult}</p>
            </Form>
          </Col>
        </Row>
        {
          resolution &&
          <Row>
            <Col>
              <Image src={`https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${resolution}&choe=UTF-8`} alt='resolution qr' />
            </Col>
          </Row>
        }
      </Container>
    );
  }
}

export default ResolveComponent;
