import CopyButton from './CopyButton';
import DeleteButton from './DeleteButton';

import { deleteApplication } from '../store/applications';

import './ApplicationCard.css';

type ApplicationCardProps = {
  id: string;
  text: string;
};

export default function ApplicationCard({ id, text }: ApplicationCardProps) {
  return (
    <div className="application-card">
      <p className="application-card-text">{text}</p>
      <div className="application-card-buttons">
        <DeleteButton onDelete={() => deleteApplication(id)} />
        <CopyButton textToCopy={text} />
      </div>
    </div>
  );
}
