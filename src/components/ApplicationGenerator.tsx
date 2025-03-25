import CopyButton from './CopyButton';
import AnimatedText from './AnimatedText';

import './ApplicationGenerator.css';

type ApplicationGeneratorProps = {
  text: string;
  isLoading?: boolean;
};

export default function ApplicationGenerator({
  text,
  isLoading,
}: ApplicationGeneratorProps) {
  const placeholder = 'Your personalized job application will appear here...';

  return (
    <div className="application-generator">
      {isLoading ? (
        <div className="application-generator-loading">
          <div className="application-generator-loading-blur" />
          <div className="application-generator-loading-circle" />
        </div>
      ) : (
        <>
          {text ? (
            <AnimatedText text={text} className="application-generator-text" />
          ) : (
            <p className="application-generator-text">{placeholder}</p>
          )}

          <div className="application-generator-buttons">
            <CopyButton textToCopy={text} />
          </div>
        </>
      )}
    </div>
  );
}
