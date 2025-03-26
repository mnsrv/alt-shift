import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Control, useForm, useWatch } from 'react-hook-form';
import classNames from 'classnames';
import { nanoid } from 'nanoid';

import Button from '../components/Button';
import { Input, TextArea } from '../components/Input';
import ApplicationGenerator from '../components/ApplicationGenerator';
import Goal from '../components/Goal';
import Grid from '../components/Grid';

import { addApplication } from '../store/applications';
import { getTodayDate } from '../utils/utils';

type ApplicationFormData = {
  jobTitle: string;
  company: string;
  skills: string;
  details: string;
};

type ApplicationTitleProps = {
  control: Control<ApplicationFormData>;
};
const ApplicationTitle = ({ control }: ApplicationTitleProps) => {
  const jobTitle = useWatch({
    name: 'jobTitle',
    control,
  });
  const company = useWatch({
    name: 'company',
    control,
  });

  const isEmpty = !jobTitle && !company;
  const title = isEmpty
    ? 'New application'
    : [jobTitle, company].filter(Boolean).join(', ');

  return (
    <h2 className={classNames('nowrap', { 'color-text': isEmpty })}>{title}</h2>
  );
};

export default function NewApplication() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, isValid, errors },
  } = useForm<ApplicationFormData>({
    mode: 'onChange',
  });
  const location = useLocation();
  const [generatedText, setGeneratedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isCompleted = !!generatedText;

  useEffect(() => {
    // reset form when user navigates to the same page
    if (generatedText) {
      reset();
      setGeneratedText('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  const onSubmit = async (data: ApplicationFormData) => {
    setIsLoading(true);

    const defaultText = `Dear ${data.company} Team,

I am writing to express my interest in the ${data.jobTitle} position.

My experience in the realm combined with my skills in ${data.skills} make me a strong candidate for this role.

${data.details}

I am confident that my skills and enthusiasm would translate into valuable contributions to your esteemed organization.

Thank you for considering my application. I eagerly await the opportunity to discuss my qualifications further.`;

    let text = defaultText;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.error || `HTTP error! status: ${response.status}`,
        );
      }

      const { text: generatedText } = responseData;
      text = generatedText;
    } catch (error) {
      console.error('Error generating cover letter:', error);
    }

    setIsLoading(false);
    setGeneratedText(text);
    const id = nanoid();
    addApplication({ id, text, date: getTodayDate() });
  };

  return (
    <>
      <Grid columns={2} gap="2rem">
        <div>
          <ApplicationTitle control={control} />
          <hr />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="gap">
              <Grid columns={2} gap="1rem">
                <Input
                  label="Job title"
                  placeholder="Product manager"
                  id="jobTitle"
                  {...register('jobTitle', { required: true })}
                />
                <Input
                  label="Company"
                  placeholder="Apple"
                  id="company"
                  {...register('company', { required: true })}
                />
              </Grid>
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
                control={control}
                maxLength={1200}
                error={errors.details?.type === 'maxLength'}
                {...register('details', {
                  required: true,
                  maxLength: 1200,
                })}
              />
              {!isCompleted ? (
                <Button
                  title={isLoading ? undefined : 'Generate Now'}
                  icon={isLoading ? 'loading' : undefined}
                  buttonSize="l"
                  type="submit"
                  disabled={isSubmitting || !isValid || isLoading}
                />
              ) : (
                <Button
                  icon="repeat"
                  title="Try Again"
                  variant="secondary"
                  buttonSize="l"
                  onClick={() => {
                    reset();
                    setGeneratedText('');
                  }}
                />
              )}
            </div>
          </form>
        </div>
        <div className="new-application-content">
          <ApplicationGenerator text={generatedText} isLoading={isLoading} />
        </div>
      </Grid>
      {isCompleted && <Goal />}
    </>
  );
}
