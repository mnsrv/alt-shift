import classNames from 'classnames';

import CopyButton from './CopyButton';
import DeleteButton from './DeleteButton';

import { deleteApplication } from '../store/applications';

import './Application.css';

type ApplicationProps = {
  id?: string;
  text?: string;
  isCollapsed?: boolean;
  isLoading?: boolean;
};

export default function Application({
  id,
  text,
  isCollapsed,
  isLoading = false,
}: ApplicationProps) {
  const placeholder = 'Your personalized job application will appear here...';

  return (
    <div
      className={classNames('application', {
        application_collapsed: isCollapsed,
      })}
    >
      {isLoading && (
        <div className="application-loading">
          <div className="application-loading-blur" />
          <div className="application-loading-circle" />
        </div>
      )}
      {!isLoading && <p className="application-text">{text || placeholder}</p>}
      {!isLoading && (
        <div className="application-buttons">
          {id ? (
            <DeleteButton onDelete={() => deleteApplication(id)} />
          ) : (
            <span />
          )}
          <CopyButton textToCopy={text} />
        </div>
      )}
    </div>
  );
}
