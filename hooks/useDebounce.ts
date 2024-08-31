export const useDebounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: number | undefined;

  return (...args: any[]) => {
    clearTimeout(timeoutId);

    timeoutId = window.setTimeout(() => {
      func(...args);
    }, delay);
  };
};
