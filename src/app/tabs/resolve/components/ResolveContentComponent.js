import React from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import { Row, Col } from 'react-bootstrap';
import { CopyableComponent } from '../../../components';

const ResolveContentComponent = ({ strings, content }) => {
  if (!content) {
    return <></>;
  }

  const contentHashRow = item => (
    <Row style={{ width: '100%' }}>
      <hr />
      <Col md={4}>
        <h2>{strings.content_hash}</h2>
      </Col>
      <Col md={8}>
        <CopyableComponent>{`${item[1].value.protocolType}://${item[1].value.decoded}`}</CopyableComponent>
      </Col>
    </Row>
  );

  return Object.entries(content).map((item) => {
    if (item[1].loading || item[1].content === '' || item[1].value === null) {
      return (<></>);
    }
    switch (item[0]) {
      case 'CONTENT_HASH': return contentHashRow(item);
      default: return <></>;
    }
  });
};

ResolveContentComponent.propTypes = {
  content: propTypes.shape(),
  strings: propTypes.shape({
    content_hash: propTypes.string.isRequired,
  }).isRequired,
};


export default multilanguage(ResolveContentComponent);
