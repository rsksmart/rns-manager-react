import React, { useState } from 'react';
import propTypes from 'prop-types';
import { multilanguage } from 'redux-multilanguage';
import {
  OverlayTrigger, Button, Popover, Row, Col, Form,
} from 'react-bootstrap';

import CopyButtonComponent from '../../../../components/CopyButtonComponent';

import shareImg from '../../../../../assets/img/share-button.svg';
import whatsappImg from '../../../../../assets/img/whatsapp.svg';
import emailImg from '../../../../../assets/img/email.svg';
import linkImg from '../../../../../assets/img/link.svg';
import linkActiveImg from '../../../../../assets/img/link-active.svg';

const ShareButtonComponent = ({ strings, domain }) => {
  const [showLink, setShowLink] = useState(false);
  const shareLink = `${process.env.REACT_APP_URL}resolve?name=${domain}`;
  const myRskDomainText = strings.my_rsk_domain.replace(/ /g, '%20');
  return (
    <>
      <OverlayTrigger
        trigger="click"
        key="share"
        placement="right"
        overlay={(
          <Popover id="share-popover">
            <Popover.Content>
              <h2>{strings.share_your_domain}</h2>
              <Row noGutters>
                <Col sm={4}>
                  <a
                    href={`whatsapp://send?text=${myRskDomainText}:%20${shareLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-link whatsapp"
                  >
                    <img src={whatsappImg} alt={strings.whatsapp} />
                    {strings.whatsapp}
                  </a>
                </Col>
                <Col sm={4}>
                  <a
                    href={`mailto:?subject=${myRskDomainText}&body=${myRskDomainText}%20${shareLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-link email"
                  >
                    <img src={emailImg} alt={strings.email} />
                    {strings.email}
                  </a>
                </Col>
                <Col sm={4}>
                  <Button
                    variant="link"
                    onClick={() => setShowLink(!showLink)}
                    className={showLink ? 'active link' : 'link'}
                  >
                    <img src={showLink ? linkActiveImg : linkImg} alt={strings.link} />
                    {strings.link}
                  </Button>
                </Col>
              </Row>

              {showLink && (
                <Row noGutters className="share-link">
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      defaultValue={shareLink}
                      onFocus={e => e.target.select()}
                    />
                  </Col>
                  <Col sm={2}>
                    <CopyButtonComponent text={shareLink} />
                  </Col>
                </Row>
              )}

            </Popover.Content>
          </Popover>
        )}
      >
        <Button className="share-button" variant="link">
          <img src={shareImg} alt="Share" oggleSwitch className="filter-primary" />
        </Button>
      </OverlayTrigger>
    </>
  );
};

ShareButtonComponent.propTypes = {
  strings: propTypes.shape({
    share_your_domain: propTypes.string.isRequired,
    my_rsk_domain: propTypes.string.isRequired,
    email: propTypes.string.isRequired,
    whatsapp: propTypes.string.isRequired,
    link: propTypes.string.isRequired,
  }).isRequired,
  domain: propTypes.string.isRequired,
};

export default multilanguage(ShareButtonComponent);
