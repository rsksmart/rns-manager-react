import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Image, Card } from 'react-bootstrap';
import { isValidName } from '../../../selectors';

class ResolveComponent extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isValid: true
    };

    this.validate = this.validate.bind(this);
  }

  componentDidMount() {
    const { name, resolveAddress } = this.props;
    if (name) resolveAddress(name);
  }

  componentWillReceiveProps(newProps) {
    const { name, resolveAddress } = newProps;
    if (name !== this.props.name) {
      resolveAddress(name);
    }
  }

  validate (name) {
    const isValid = isValidName(name);
    this.setState({ isValid });
    return isValid;
  }

  render () {
    const { name, loading, resolution, error, resolveAddress } = this.props;

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
                <Form.Control type='text' ref={node => (input = node)} className={!this.state.isValid ? 'is-invalid' : null} defaultValue={name} />
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
            <Col lg={{ span: 4, offset: 4 }} md={{ span: 6, offset: 3 }} sm={12}>
              <br />
              <Card>
                <Image src={`https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${resolution}&choe=UTF-8`} alt='resolution qr' className='card-img-top' />
              </Card>
              <br />
              <p>
                <b>{resolution}</b>
              </p>
            </Col>
          </Row>
        }
      </Container>
    );
  }
}

export default ResolveComponent;
