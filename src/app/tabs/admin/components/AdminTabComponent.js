import React, { Component } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { OwnerContainer, ResolverContainer, TtlContainer, SubdomainsListContainer } from '../containers';
import { multilanguage } from 'redux-multilanguage';
import { AuthTabWrapper } from '../../../auth';
import { publicResolver, multiChainResolver } from '../../../../config/contracts.json';

class AdminTabComponent extends Component {
  constructor (props) {
    super(props);

    this.state = { showAdvanced: false };

    this.changeShowAdvanced = this.changeShowAdvanced.bind(this);
  }

  changeShowAdvanced () {
    this.setState(state => ({ showAdvanced: !state.showAdvanced }));
  }

  render () {
    const { strings, name, resolver } = this.props;
    const { showAdvanced } = this.state;

    return (
      <AuthTabWrapper>
        <Container>
          <h2>{strings.admin} <code>{name}</code></h2>
          <Row>
            <Col>
              <ResolverContainer />
            </Col>
          </Row>
          <Row>
            <Col>
              {resolver === publicResolver && <Link to='/publicResolver'>{strings.admin_resolution}</Link>}
              {resolver === multiChainResolver && <Link to='/multiChainResolver'>{strings.admin_resolution}</Link>}
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <h3>{strings.subdomains}</h3>
              <SubdomainsListContainer />
            </Col>
          </Row>
          <hr />
          <Button variant='link' onClick={this.changeShowAdvanced}>{showAdvanced ? 'simple -' : 'advanced +'}</Button>
          {
            showAdvanced &&
            <React.Fragment>
              <Row>
                <Col>
                  <OwnerContainer />
                </Col>
              </Row>
              <hr />
              <Row>
                <Col>
                  <TtlContainer />
                </Col>
              </Row>
            </React.Fragment>
          }
        </Container>
      </AuthTabWrapper>
    );
  }
}

export default multilanguage(AdminTabComponent);
