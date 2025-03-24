import { Link } from 'react-router';
import { useStore } from '@nanostores/react';

import Icons from './Icons';
import Progress from './Progress';

import { $applicationsCount, DAY_GOAL } from '../store/applications';

import './Header.css';

export default function Header() {
  const applicationsCount = useStore($applicationsCount);

  return (
    <header className="header">
      <Link to="/">
        <Icons.logo />
      </Link>

      <div className="header-progress">
        <p>{`${applicationsCount}/${DAY_GOAL} applications generated`}</p>
        <Progress value={applicationsCount} max={DAY_GOAL} isSmall />
      </div>
    </header>
  );
}
