import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import {
  Row, Col, Image, Card,
} from 'react-bootstrap';
import {
  CopyableComponent, UserErrorComponent, UserWaitingComponent,
} from '../../../components';

const ResolutionComponent = ({
  error, loading, value, strings,
}) => {
  if (error) {
    return <UserErrorComponent message={error} />;
  }

  if (loading) {
    return <UserWaitingComponent />;
  }

  if (!value) {
    return <div>{strings.no_resolution}</div>;
  }

  return (
    <Row>
      <Col md={{ span: 10, offset: 1 }} sm={12}>
        <Card className="break-below">
          <Image
            src={`https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${value}&choe=UTF-8`}
            alt="resolution qr"
            className="card-img-top"
          />
        </Card>
        <CopyableComponent>{value}</CopyableComponent>
      </Col>
    </Row>
  );
};

ResolutionComponent.propTypes = {
  error: propTypes.string,
  loading: propTypes.bool.isRequired,
  value: propTypes.string,
  strings: propTypes.shape({
    no_resolution: propTypes.string.isRequired,
  }).isRequired,
};

ResolutionComponent.defaultProps = {
  error: null,
  value: null,
};

export default multilanguage(ResolutionComponent);
