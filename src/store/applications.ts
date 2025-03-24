import { computed } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';

type Application = {
  id: string;
  text: string;
  date: string; // YYYY-MM-DD
};

export const $applications = persistentAtom<Application[]>('applications', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export function getTodayDate(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

export const $applicationsCount = computed($applications, (applications) => {
  const todayDate = getTodayDate();
  return applications.filter((app) => app.date === todayDate).length;
});
export const DAY_GOAL = 5;

export function addApplication(application: Application) {
  $applications.set([...$applications.get(), application]);
}

export function deleteApplication(id: string) {
  $applications.set($applications.get().filter((a) => a.id !== id));
}
