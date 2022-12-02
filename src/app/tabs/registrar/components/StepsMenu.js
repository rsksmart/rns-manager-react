import React from 'react';
import { multilanguage } from 'redux-multilanguage';
import propTypes from 'prop-types';

const StepsMenu = ({
  strings,
  committed,
  waiting,
  revealConfirmed,
  domain,
  shouldCommit,
}) => {
  const activeClass = 'btn-active';
  const defaultClass = 'btn-outline-primary';

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <h1 className="sub-heading">
            {strings.registering}
            {': '}
            <br />
            <span className="domain">{`${domain}.rsk`}</span>
          </h1>
        </div>
      </div>
      <ul className="list-inline steps">
        <li>
          <div className={`btn ${!committed || waiting ? activeClass : defaultClass}`}>
            1.
            {' '}
            {shouldCommit ? strings.request_domain : strings.register_domain}
          </div>
        </li>
        {shouldCommit && (
        <li>
          <div className={`btn ${(committed && !waiting && !revealConfirmed) ? activeClass : defaultClass}`}>
            {`2. ${strings.register_domain}`}
          </div>
        </li>
        )}
        <li>
          <div className={`btn ${revealConfirmed ? activeClass : defaultClass}`}>
            {shouldCommit ? '3.' : '2.'}
            {' '}
            {strings.login}
          </div>
        </li>
      </ul>
    </>
  );
};

StepsMenu.propTypes = {
  strings: propTypes.shape().isRequired,
  committed: propTypes.bool.isRequired,
  waiting: propTypes.bool.isRequired,
  shouldCommit: propTypes.bool.isRequired,
  revealConfirmed: propTypes.bool.isRequired,
  domain: propTypes.string.isRequired,
};

export default multilanguage(StepsMenu);
