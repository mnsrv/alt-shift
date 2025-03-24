import classNames from 'classnames';

import CopyButton from './CopyButton';
import DeleteButton from './DeleteButton';

import { deleteApplication } from '../store/applications';

import './Application.css';

type ApplicationProps = {
  id?: string;
  text?: string;
  isCollapsed?: boolean;
};

export default function Application({
  id,
  text,
  isCollapsed,
}: ApplicationProps) {
  const placeholder = 'Your personalized job application will appear here...';

  return (
    <div
      className={classNames('application', {
        application_collapsed: isCollapsed,
      })}
    >
      <p className="application-text">{text || placeholder}</p>
      <div className="application-buttons">
        {id ? (
          <DeleteButton onDelete={() => deleteApplication(id)} />
        ) : (
          <span />
        )}
        <CopyButton textToCopy={text} />
      </div>
    </div>
  );
}
