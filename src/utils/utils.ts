export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getTodayDate(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}
