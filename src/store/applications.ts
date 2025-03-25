import { computed } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';

import { getTodayDate } from '../utils/utils';

type Application = {
  id: string;
  text: string;
  date: string; // YYYY-MM-DD
};

export const $applications = persistentAtom<Application[]>('applications', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const $applicationsCount = computed($applications, (applications) => {
  const todayDate = getTodayDate();
  return applications.filter((app) => app.date === todayDate).length;
});
export const DAY_GOAL = 5;

export function addApplication(application: Application) {
  $applications.set([application, ...$applications.get()]);
}

export function deleteApplication(id: string) {
  $applications.set($applications.get().filter((a) => a.id !== id));
}
