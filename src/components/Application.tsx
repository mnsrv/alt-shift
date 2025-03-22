import classNames from 'classnames';

import './Application.css';
import Button from './Button';

type ApplicationProps = {
  text?: string;
  isCollapsed?: boolean;
};

export default function Application({ text, isCollapsed }: ApplicationProps) {
  const placeholder = 'Your personalized job application will appear here...';
  return (
    <div
      className={classNames('application', {
        'application-collapsed': isCollapsed,
      })}
    >
      <div className="application-text">{text || placeholder}</div>
      <div className="application-buttons">
        {isCollapsed ? (
          <Button icon="trash" buttonSize="s" variant="link" title="Delete" />
        ) : (
          <span />
        )}
        <Button
          icon="copy"
          iconPosition="right"
          buttonSize="s"
          variant="link"
          title="Copy to clipboard"
        />
      </div>
    </div>
  );
}
