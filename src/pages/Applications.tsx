import { useNavigate } from 'react-router';

import Button from '../components/Button';
import Goal from '../components/Goal';
import './Applications.css';

export default function Applications() {
  const navigate = useNavigate();

  return (
    <>
      <div className="applications-title">
        <h1>Applications</h1>
        <Button
          icon="plus"
          title="Create New"
          buttonSize="s"
          onClick={() => {
            navigate('/new');
          }}
        />
      </div>
      <hr />
      <Goal />
    </>
  );
}
