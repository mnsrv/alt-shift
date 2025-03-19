import Button from './Button';
import './Goal.css';

export default function Goal() {
  return (
    <div className="goal">
      <div className="goal-content">
        <h2>Hit your goal</h2>
        <p className="text">
          Generate and send out couple more job applications today to get hired
          faster
        </p>
        <Button icon="plus" title="Create New" />
      </div>
    </div>
  );
}
