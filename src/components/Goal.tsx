import { useStore } from '@nanostores/react';
import { useNavigate } from 'react-router';

import Button from './Button';
import Progress from './Progress';

import { $applicationsCount, DAY_GOAL } from '../store/applications';

import './Goal.css';

export default function Goal() {
  const navigate = useNavigate();
  const applicationsCount = useStore($applicationsCount);
  const count = applicationsCount > DAY_GOAL ? DAY_GOAL : applicationsCount;

  if (count >= DAY_GOAL) {
    return null;
  }

  return (
    <div className="goal">
      <div className="goal-content">
        <div className="goal-top">
          <h2>Hit your goal</h2>
          <p>
            Generate and send out couple more job applications today to get
            hired faster
          </p>
          <Button
            icon="plus"
            buttonSize="l"
            title="Create New"
            onClick={() => {
              navigate('/new');
            }}
          />
        </div>
        <div className="goal-progress">
          <Progress value={count} max={DAY_GOAL} />
          <p>{`${count} out of ${DAY_GOAL}`}</p>
        </div>
      </div>
    </div>
  );
}
