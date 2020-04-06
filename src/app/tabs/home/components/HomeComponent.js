import React from 'react';
import {
  Container, Button, Row, Col,
} from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';
import { SearchBoxContainer } from '../containers';

import easeOfUse from '../../../../assets/img/home/ease-of-use.png';
import interoperability from '../../../../assets/img/home/interoperability.png';
import costEffective from '../../../../assets/img/home/cost-effective.png';
import book from '../../../../assets/img/home/book.svg';
import github from '../../../../assets/img/home/github.svg';
import integrate from '../../../../assets/img/home/integrate.svg';
import ask from '../../../../assets/img/home/ask.svg';


export default multilanguage((props) => {
  const { strings } = props;

  return (
    <>
      <Container className="search">
        <Container>
          <Row className="major-section">
            <div className="col-md-8 offset-md-2">
              <h1>{strings.get_your_domain}</h1>
              <p className="lead">{strings.home_explanation}</p>

              <SearchBoxContainer />
            </div>
          </Row>
        </Container>
      </Container>

      <Container>
        <Row className="white break-below">
          <Col md={4}>
            <img src={easeOfUse} alt={strings.ease_of_use} />
            <h2>{strings.ease_of_use}</h2>
            <p>{strings.ease_of_use_explanation}</p>
          </Col>
          <Col md={4}>
            <img src={interoperability} alt={strings.interoperability} />
            <h2>{strings.interoperability}</h2>
            <p>{strings.interoperability_explanation}</p>
          </Col>
          <Col md={4}>
            <img src={costEffective} alt={strings.cost_effective} />
            <h2>{strings.cost_effective}</h2>
            <p>{strings.cose_effective_explanation}</p>
          </Col>
        </Row>

        <Row className="developer break-above">
          <Row>
            <div className="col-md-8 offset-md-2">
              <h2>
                {strings.are_you_developer}
              </h2>
              <p className="lead blue">
                {strings.are_you_developer_explanation}
              </p>
            </div>
          </Row>
          <Row>
            <div className="col-md-2 offset-md-2">
              <Button>
                <img src={book} alt={strings.read_documentation} />
                {strings.read_documentation}
              </Button>
            </div>
            <div className="col-md-2">
              <Button>
                <img src={github} alt={strings.collaborate_github} />
                {strings.collaborate_github}
              </Button>
            </div>
            <div className="col-md-2">
              <Button>
                <img src={integrate} alt={strings.integrate_rns} />
                {strings.integrate_rns}
              </Button>
            </div>
            <div className="col-md-2">
              <Button>
                <img src={ask} alt={strings.ask_question} />
                {strings.ask_question}
              </Button>
            </div>
          </Row>
        </Row>
      </Container>
    </>
  );
});
