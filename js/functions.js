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
//   // return () => (counter = counter + 1);
//   return () => ++counter;
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

// ======================================
// Задание 11, п. 5.16. Функции возвращаются
// Напишите функцию, которая принимает время начала и конца рабочего дня, а также время старта и продолжительность встречи в минутах и возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит.
// Время указывается в виде строки в формате часы:минуты. Для указания часов и минут могут использоваться как две цифры, так и одна. Например, 8 часов 5 минут могут быть указаны по-разному: 08:05, 8:5, 08:5 или 8:05.
// Продолжительность задаётся числом. Гарантируется, что и рабочий день, и встреча укладываются в одни календарные сутки.

const convertDate = (timeStr) => {
  const timeArr = timeStr.split(':');
  return (parseInt(timeArr[0], 10) * 60 + parseInt(timeArr[1], 10));
};

const checkTime = function(fromStr, toStr, startStr, duration) {
  console.log(fromStr, toStr, startStr, duration);
  const fromMinutes = convertDate(fromStr);
  const toMinutes = convertDate(toStr);
  const startMinutes = convertDate(startStr);
  if (startMinutes >= fromMinutes) {
    if (startMinutes + duration <= toMinutes) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

console.log(checkTime('08:00', '17:30', '14:00', 90)); // true
console.log(checkTime('8:0', '10:0', '8:0', 120)); // true
console.log(checkTime('08:00', '14:30', '14:00', 90)); // false
console.log(checkTime('14:00', '17:30', '08:0', 90)); // false
console.log(checkTime('8:00', '17:30', '08:00', 900)); // false

// ======================================
