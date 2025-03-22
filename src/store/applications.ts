import { persistentAtom } from '@nanostores/persistent';

type Application = {
  id: string;
  text: string;
};

export const $applications = persistentAtom<Application[]>('applications', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export function addApplication(application: Application) {
  $applications.set([...$applications.get(), application]);
}

export function deleteApplication(id: string) {
  $applications.set($applications.get().filter((a) => a.id !== id));
}
