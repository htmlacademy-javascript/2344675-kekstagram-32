// ФУНКЦИИ ОБЩЕГО НАЗНАЧЕНИЯ

// Счетчик для сквозных нумераций.
const getIncreasingInt = () => {
  let counter = 0;
  return () => {
    counter++;
    return counter;
  };
};
// ?? Если переписать так, то возвраты начинаются с 0:
// const getIncreasingInt = () => {
//   let counter = 0;
//   return () => counter++;
// };
export {getIncreasingInt};

// Генераор случайных значений.
const getRandomInt = (a, b) => {
  const from = Math.floor(Math.min(a, b));
  const to = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (to - from + 1) + from);
};
export {getRandomInt};

const getUniqueInt = (a, b) => {
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
export {getUniqueInt};

// Генератор случайного элемента массива.
const getRandomArrayItem = (sourceArray) => sourceArray[getRandomInt(0, sourceArray.length - 1)];
export {getRandomArrayItem};

