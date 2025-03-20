import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import { Input, TextArea } from '../components/Input';

type ApplicationFormData = {
  title: string;
  jobTitle: string;
  company: string;
  skills: string;
  details: string;
};

export default function NewApplication() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useForm<ApplicationFormData>({
    mode: 'onChange',
  });

  const onSubmit = (data: ApplicationFormData) => {
    console.log('Form submitted:', data);
  };

  return (
    <div className="row">
      <div className="col">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="New application"
            inputSize="m"
            id="title"
            {...register('title', { required: true })}
          />
          <hr />
          <div className="gap">
            <div className="row" style={{ gap: '1rem' }}>
              <div className="col">
                <Input
                  label="Job title"
                  placeholder="Product manager"
                  id="jobTitle"
                  {...register('jobTitle', { required: true })}
                />
              </div>
              <div className="col">
                <Input
                  label="Company"
                  placeholder="Apple"
                  id="company"
                  {...register('company', { required: true })}
                />
              </div>
            </div>
            <Input
              label="I am good at..."
              placeholder="HTML, CSS and doing things in time"
              id="skills"
              {...register('skills', { required: true })}
            />
            <TextArea
              label="Additional details"
              placeholder="Describe why you are a great fit or paste your bio"
              rows={9}
              id="details"
              maxLength={50}
              error={errors.details?.type === 'maxLength'}
              {...register('details', {
                required: true,
                maxLength: 50,
              })}
            />
            <Button
              title={isSubmitting ? 'Saving...' : 'Generate Now'}
              type="submit"
              disabled={isSubmitting || !isValid}
            />
          </div>
        </form>
      </div>
      <div className="col">
        Your personalized job application will appear here...
      </div>
    </div>
  );
}
