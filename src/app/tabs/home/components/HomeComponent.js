import React from 'react';
import propTypes from 'prop-types';
import {
  Container, Button, Row, Col,
} from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';
import { SearchBoxContainer, SearchResultsContainer } from '../containers';

import easeOfUse from '../../../../assets/img/home/ease-of-use.svg';
import interoperability from '../../../../assets/img/home/interoperability.svg';
import costEffective from '../../../../assets/img/home/cost-effective.svg';
import book from '../../../../assets/img/home/book.svg';
import github from '../../../../assets/img/home/github.svg';
import integrate from '../../../../assets/img/home/integrate.svg';
import ask from '../../../../assets/img/home/ask.svg';

const HomeComponent = ({ strings }) => (
  <div className="home">
    <Container className="search">
      <Container>
        <Row>
          <div className="col-md-8 offset-md-2">
            <h1>{strings.get_your_domain}</h1>
            <p className="lead">{strings.home_explanation}</p>
            <SearchBoxContainer />
          </div>
        </Row>
      </Container>
    </Container>
    <div className="spacer">&nbsp;</div>

    <Container>
      <SearchResultsContainer />
      <Row className="white break-below">
        <Col md={4}>
          <div className="imageWraper">
            <img src={easeOfUse} alt={strings.ease_of_use} />
          </div>
          <h2>{strings.ease_of_use}</h2>
          <p>{strings.ease_of_use_explanation}</p>
        </Col>
        <Col md={4}>
          <div className="imageWraper">
            <img src={interoperability} alt={strings.interoperability} />
          </div>
          <h2>{strings.interoperability}</h2>
          <p>{strings.interoperability_explanation}</p>
        </Col>
        <Col md={4}>
          <div className="imageWraper">
            <img src={costEffective} alt={strings.cost_effective} />
          </div>
          <h2>{strings.cost_effective}</h2>
          <p>{strings.cose_effective_explanation}</p>
        </Col>
      </Row>

      <Row className="developer break-above">
        <Row>
          <div className="col-md-8 offset-md-2">
            <h2 className="break-below">
              {strings.are_you_developer}
            </h2>
            <p className="lead blue">
              {strings.are_you_developer_explanation}
            </p>
          </div>
        </Row>
        <Row className="major-section">
          <div className="col-md-2 offset-md-2">
            <a
              className="btn btn-outline-primary"
              href="https://developers.rsk.co/rif/rns"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={book} alt={strings.read_documentation} />
              <span>{strings.read_documentation}</span>
            </a>
          </div>
          <div className="col-md-2">
            <a
              className="btn btn-outline-primary"
              href="https://github.com/rnsdomains"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={github} alt={strings.collaborate_github} />
              <span>{strings.collaborate_github}</span>
            </a>
          </div>
          <div className="col-md-2">
            <a
              className="btn btn-outline-primary"
              href="https://developers.rsk.co/rif/rns/integrate"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={integrate} alt={strings.integrate_rns} />
              <span>{strings.integrate_rns}</span>
            </a>
          </div>
          <div className="col-md-2">
            <a
              className="btn btn-outline-primary"
              href="https://gitter.im/rsksmart/rif-name-service"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={ask} alt={strings.ask_question} />
              <span>{strings.ask_question}</span>
            </a>
          </div>
        </Row>
      </Row>
    </Container>
  </div>
);

HomeComponent.propTypes = {
  strings: propTypes.shape({
    get_your_domain: propTypes.string.isRequired,
    home_explanation: propTypes.string.isRequired,
    interoperability: propTypes.string.isRequired,
    interoperability_explanation: propTypes.string.isRequired,
    ease_of_use: propTypes.string.isRequired,
    ease_of_use_explanation: propTypes.string.isRequired,
    cost_effective: propTypes.string.isRequired,
    cose_effective_explanation: propTypes.string.isRequired,
    are_you_developer: propTypes.string.isRequired,
    are_you_developer_explanation: propTypes.string.isRequired,
    read_documentation: propTypes.string.isRequired,
    collaborate_github: propTypes.string.isRequired,
    integrate_rns: propTypes.string.isRequired,
    ask_question: propTypes.string.isRequired,
  }).isRequired,
};

export default multilanguage(HomeComponent);
