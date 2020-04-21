import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

const TextRotationComponent = ({
  heading, language, messages, timer,
}) => {
  const [counter, setCounter] = useState(0);
  const updateCounter = () => {
    // eslint-disable-next-line react/prop-types
    const next = counter === (messages.length - 1) ? 0 : counter + 1;
    setCounter(next);
  };

  useEffect(() => {
    setTimeout(() => {
      updateCounter();
    }, 6000);
    return () => clearTimeout(timer);
  }, [counter]);

  const singleMessage = messages[counter][language];
  const contentArray = singleMessage.content.split('$');
  const contentParagraph = contentArray.length === 1
    ? singleMessage.content
    : (
      <p>
        {contentArray[0]}
        <strong>{contentArray[1]}</strong>
        {contentArray[2]}
      </p>
    );

  return (
    <div className="text-rotation">
      <h3 className="blue">{`${heading}...`}</h3>
      {contentParagraph}
      <p>
        {singleMessage.link && (
          <a
            href={singleMessage.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {singleMessage.link_label}
          </a>
        )}
      </p>
    </div>
  );
};

TextRotationComponent.defaultProps = {
  timer: 1000,
};

TextRotationComponent.propTypes = {
  language: propTypes.string.isRequired,
  heading: propTypes.string.isRequired,
  messages: propTypes.arrayOf(propTypes.shape()).isRequired,
  timer: propTypes.number,
};

export default TextRotationComponent;
