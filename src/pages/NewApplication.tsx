import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Control, useForm, useWatch } from 'react-hook-form';
import classNames from 'classnames';
import { nanoid } from 'nanoid';

import Button from '../components/Button';
import { Input, TextArea } from '../components/Input';
import Application from '../components/Application';
import Goal from '../components/Goal';
import Grid from '../components/Grid';

import { addApplication, getTodayDate } from '../store/applications';

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
  const [application, setApplication] = useState('');

  useEffect(() => {
    // reset form when user navigates to the same page
    if (application) {
      reset();
      setApplication('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  const onSubmit = (data: ApplicationFormData) => {
    console.log('Form submitted:', data);
    const id = nanoid();
    const text = `Dear ${data.company} Team,

I am writing to express my interest in the ${data.jobTitle} position.

My experience in the realm combined with my skills in ${data.skills} make me a strong candidate for this role.

${data.details}

I am confident that my skills and enthusiasm would translate into valuable contributions to your esteemed organization.

Thank you for considering my application. I eagerly await the opportunity to discuss my qualifications further.`;
    addApplication({ id, text, date: getTodayDate() });
    setApplication(text);
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
              {!application ? (
                <Button
                  title={isSubmitting ? 'Saving...' : 'Generate Now'}
                  buttonSize="l"
                  type="submit"
                  disabled={isSubmitting || !isValid}
                />
              ) : (
                <Button
                  icon="repeat"
                  title="Try Again"
                  variant="secondary"
                  buttonSize="l"
                  onClick={() => {
                    reset();
                    setApplication('');
                  }}
                />
              )}
            </div>
          </form>
        </div>
        <Application text={application} />
      </Grid>
      {application && <Goal />}
    </>
  );
}
