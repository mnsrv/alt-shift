import { useNavigate } from 'react-router';
import { useStore } from '@nanostores/react';

import Button from '../components/Button';
import Goal from '../components/Goal';
import Grid from '../components/Grid';
import Application from '../components/Application';

import { $applications } from '../store/applications';

import './Applications.css';

export default function Applications() {
  const navigate = useNavigate();
  const applications = useStore($applications);

  return (
    <>
      <div className="applications-title">
        <h1>Applications</h1>
        <Button
          icon="plus"
          title="Create New"
          onClick={() => {
            navigate('/new');
          }}
        />
      </div>
      <hr />
      <Grid columns={2} gap="1.5rem 1rem">
        {applications.map((a) => (
          <Application key={a.id} id={a.id} text={a.text} isCollapsed />
        ))}
      </Grid>

      <Goal />
    </>
  );
}
