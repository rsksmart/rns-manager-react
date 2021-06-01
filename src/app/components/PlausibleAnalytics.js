import React, { useState, useEffect } from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';

const Decision = {
  DENIED: 'DENIED',
  GRANTED: 'GRANTED',
  DEFAULT: 'DEFAULT',
};

const APP_NAME = 'RNS_MANAGER';

const PlausibleAnalytics = ({ strings, domain }) => {
  const [show, setShow] = useState(false);

  const addAnalyticsScript = () => {
    const script = document.createElement('script');
    script.setAttribute('src', 'https://plausible.io/js/plausible.js');
    script.setAttribute('async', 'true');
    script.setAttribute('data-domain', domain);
    document.head.appendChild(script);
  };

  useEffect(() => {
    const answer = localStorage.getItem(`PLAUSIBLE_${APP_NAME}`) || Decision.DEFAULT;

    setShow(answer === Decision.DEFAULT);
    if (answer === Decision.GRANTED) {
      addAnalyticsScript();
    }
  }, []);

  const handleClick = (event) => {
    const decision = event.currentTarget.id === 'accept' ? Decision.GRANTED : Decision.DENIED;
    localStorage.setItem(`PLAUSIBLE_${APP_NAME}`, decision);

    setShow(false);
    if (decision === Decision.GRANTED) {
      addAnalyticsScript();
    }
  };

  const linkProps = { target: '_blank', rel: 'noopener' };

  return show ? (
    <div id="analytics">
      <p>
        {strings.plausible}
        <a href="https://plausible.io/data-policy" {...linkProps}>Plausible Policies</a>
        <a href="https://www.rsk.co/privacy-policy" {...linkProps}>RSK policies</a>
.
      </p>
      <p>{strings.plausible2}</p>
      <p>
        <button type="button" onClick={handleClick} id="accept">{strings.accept}</button>
        <button type="button" onClick={handleClick} id="reject">{strings.reject}</button>
      </p>
    </div>
  ) : <></>;
};

PlausibleAnalytics.propTypes = {
  strings: propTypes.shape().isRequired,
  domain: propTypes.string.isRequired,
};

export default multilanguage(PlausibleAnalytics);
