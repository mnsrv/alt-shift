import classNames from 'classnames';

import './Application.css';
import Button from './Button';
import CopyButton from './CopyButton';

type ApplicationProps = {
  text?: string;
  isCollapsed?: boolean;
};

export default function Application({ text, isCollapsed }: ApplicationProps) {
  const placeholder = 'Your personalized job application will appear here...';

  return (
    <div
      className={classNames('application', {
        application_collapsed: isCollapsed,
      })}
    >
      <div className="application-text">{text || placeholder}</div>
      <div className="application-buttons">
        {isCollapsed ? (
          <Button icon="trash" buttonSize="s" variant="link" title="Delete" />
        ) : (
          <span />
        )}
        <CopyButton textToCopy={text} />
      </div>
    </div>
  );
}
