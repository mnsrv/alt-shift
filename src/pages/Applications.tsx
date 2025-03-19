import Button from '../components/Button';
import Goal from '../components/Goal';
import './Applications.css';

export default function Applications() {
  return (
    <>
      <div className="applications-title">
        <h1>Applications</h1>
        <Button icon="plus" title="Create New" size="s" />
      </div>
      <Goal />
    </>
  );
}
