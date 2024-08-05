// ФУНКЦИИ ОБЩЕГО НАЗНАЧЕНИЯ

// Счетчик для сквозных нумераций.
export const getIncreasingInt = () => {
  let counter = 0;
  return () => {
    counter++;
    return counter;
  };
};

// Генератор случайных значений.
export const getRandomInt = (a, b) => {
  const from = Math.floor(Math.min(a, b));
  const to = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (to - from + 1) + from);
};

export const getUniqueInt = (a, b) => {
  const usedValues = [];

  const from = Math.floor(Math.min(a, b));
  const to = Math.floor(Math.max(a, b));

  return function() {
    if (usedValues.length >= (to - from + 1)) {
      return null;
    }
    let generatedValue = getRandomInt(from, to);
    while (usedValues.includes(generatedValue)) {
      generatedValue = getRandomInt(from, to);
    }
    usedValues.push(generatedValue);

    return generatedValue;
  };
};

// Генератор случайного элемента массива.
export const getRandomArrayItem = (sourceArray) => sourceArray[getRandomInt(0, sourceArray.length - 1)];
