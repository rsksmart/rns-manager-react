import React, { Component } from 'react';
import { Row, Col, Button, Form, FormControl, InputGroup, Alert } from 'react-bootstrap';

class DomainOwnerComponent extends Component {
  render () {
    const { loading,
      address,
      viewEdit,
      onViewEdit,
      onEditOwner,
      domain,
      error
    } = this.props;

    let input;

    return (
      <React.Fragment>
        <Row>
          <Col>
            <label>Owner: {loading ? '...' : address}</label>
          </Col>
        </Row>
        {!viewEdit ?
          <Row>
            <Col>
              <Button onClick={onViewEdit} variant="link">edit</Button>
            </Col>
          </Row> :
          <Row>
            <Col>
              <Form onSubmit={e => {
                e.preventDefault();
                onEditOwner(domain, input.value);
              }}>
                <InputGroup>
                  <FormControl ref={node => (input = node)} />
                  <InputGroup.Append>
                    <Button type="submit">Edit owner</Button>
                  </InputGroup.Append>
                </InputGroup>
              </Form>
            </Col>
          </Row>
        }
        {error &&
          <Row>
            <Col>
              <Alert key='error' variant='danger'>
                {error.message}
              </Alert>
            </Col>
          </Row>
        }
      </React.Fragment>
    )
  }
}

export default DomainOwnerComponent;
