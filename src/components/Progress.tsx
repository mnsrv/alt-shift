import classNames from 'classnames';

import Icons from './Icons';

import './Progress.css';

type ProgressProps = {
  value: number;
  max: number;
  isSmall?: boolean;
};

export default function Progress({ value, max, isSmall }: ProgressProps) {
  if (value >= max) {
    return (
      <div className="progress-circle">
        <Icons.check />
      </div>
    );
  }

  return (
    <div
      className={classNames('progress-container', {
        'progress-container_small': isSmall,
      })}
    >
      {Array.from({ length: max }).map((_, index) => (
        <div
          key={index}
          className={classNames('progress', {
            progress_active: index < value,
          })}
        />
      ))}
    </div>
  );
}
