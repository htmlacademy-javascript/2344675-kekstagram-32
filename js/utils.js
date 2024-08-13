export const getRandomInt = (a, b) => {
  const from = Math.floor(Math.min(a, b));
  const to = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (to - from + 1) + from);
};
