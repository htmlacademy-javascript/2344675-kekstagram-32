export const getRandomInt = (a, b) => {
  const from = Math.floor(Math.min(a, b));
  const to = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (to - from + 1) + from);
};

export function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export const isEsc = (evt) => evt.key === 'Escape';
