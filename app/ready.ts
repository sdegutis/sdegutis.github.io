export const whenReady: (() => void)[] = [];

export function ready() {
  for (const fn of whenReady) {
    fn();
  }
  whenReady.length = 0;
}
