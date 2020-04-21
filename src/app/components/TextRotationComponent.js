import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

const TextRotationComponent = ({
  heading, language, messages, timer,
}) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // eslint-disable-next-line react/prop-types
      const next = counter === (messages.length - 1) ? 0 : counter + 1;
      setCounter(next);
    }, timer);
    return () => {
      clearInterval(interval);
    };
  }, [counter]);

  const singleMessage = messages[counter];
  const content = singleMessage[language].content.replace('$', '<strong>').replace('$', '</strong>');
  // eslint-disable-next-line react/no-danger
  const contentParagraph = <p dangerouslySetInnerHTML={{ __html: content }} />;

  return (
    <div className="text-rotation">
      <h3 className="blue">{heading}</h3>
      {contentParagraph}
      <p>
        {singleMessage.link && (
          <a
            href={singleMessage.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {singleMessage[language].link_label}
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
  messages: propTypes.shape({}).isRequired,
  timer: propTypes.number,
};

export default TextRotationComponent;
