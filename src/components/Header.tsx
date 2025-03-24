import { Link, useNavigate } from 'react-router';
import { useStore } from '@nanostores/react';

import Button from './Button';
import Icons from './Icons';
import Progress from './Progress';

import { $applicationsCount, DAY_GOAL } from '../store/applications';

import './Header.css';

export default function Header() {
  const navigate = useNavigate();
  const applicationsCount = useStore($applicationsCount);
  const count = applicationsCount > DAY_GOAL ? DAY_GOAL : applicationsCount;

  return (
    <header className="header">
      <Link to="/">
        <Icons.logo />
      </Link>

      <div className="header-right">
        <div className="header-progress">
          <p className="mobile-hidden">{`${count}/${DAY_GOAL} applications generated`}</p>
          <Progress value={count} max={DAY_GOAL} isSmall />
        </div>

        <Button
          icon="home"
          buttonSize="s"
          variant="secondary"
          onClick={() => {
            navigate('/');
          }}
        />
      </div>
    </header>
  );
}
