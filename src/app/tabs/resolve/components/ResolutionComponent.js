import React, { Component } from 'react';
import { Container, Row, Col, Image, Card, Alert, Spinner } from 'react-bootstrap';
import { CopyableComponent } from '../../../components';

export default class extends Component {
  state = { showError: false };

  componentWillReceiveProps (newProps) {
    const { error } = this.props;

    if (newProps.error !== error) {
      this.setState({ showError: true });
    }
  }

  render () {
    const { error, loading, value } = this.props;
    if (error) {
      return <Alert variant='danger' dismissible show={this.state.showError} onClose={() => this.setState({ showError: false })}>{error}</Alert>;
    }

    if (loading) {
      return <Spinner animation='grow' variant='primary' />;
    }

    if (!value) {
      return 'no reolution';
    }

    return (
      <Container>
        <Row>
          <Col lg={{ span: 8, offset: 2 }} md={{ span: 10, offset: 1 }} sm={12}>
            <br />
            <Card>
              <Image src={`https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${value}&choe=UTF-8`} alt='resolution qr' className='card-img-top' />
            </Card>
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg={{ span: 8, offset: 2 }} md={{ span: 10, offset: 1 }} sm={12}>
            <CopyableComponent>{value}</CopyableComponent>
          </Col>
        </Row>
      </Container>
    )
  }
};
