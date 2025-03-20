import Button from '../components/Button';
import { Input, TextArea } from '../components/Input';

export default function NewApplication() {
  return (
    <div className="row">
      <div className="col">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log('123', e.target);
          }}
        >
          <Input placeholder="New application" size="m" />
          <hr />
          <div className="gap">
            <div className="row" style={{ gap: '1rem' }}>
              <div className="col">
                <Input label="Job title" placeholder="Product manager" />
              </div>
              <div className="col">
                <Input label="Company" placeholder="Apple" />
              </div>
            </div>
            <Input
              label="I am good at..."
              placeholder="HTML, CSS and doing things in time"
            />
            <TextArea
              label="Additional details"
              placeholder="Describe why you are a great fit or paste your bio"
            />
            <Button title="Generate Now" />
          </div>
        </form>
      </div>
      <div className="col">
        Your personalized job application will appear here...
      </div>
    </div>
  );
}
