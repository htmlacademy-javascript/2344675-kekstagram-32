//  2.31. Нужно больше функций

// ============================================================================================
// Функция проверки длины строки.
// Принимает строку, которую нужно проверить, и максимальную длину.
// Возвращает true, если строка меньше или равна указанной длине,
//          и false, если строка длиннее.

// Короткий способ:
const shortEnough = (stringToCompare, maxLength) => stringToCompare.length <= maxLength;

// Длинный способ:
function shortEnough2(stringToCompare, maxLength) {
  console.log('Проверка строки \"', stringToCompare, '\", <=', maxLength, ' символов');

  // Приведение типов аргументов
    console.log('  Исходный тип string - ', typeof(stringToCompare));
  stringToCompare = String(stringToCompare);
    console.log('  Приведенный тип string - ', typeof(stringToCompare));
    console.log('  Исходный тип length - ', typeof(maxLength));
  maxLength = Number(maxLength);
    console.log('  Приведенный тип length - ', typeof(maxLength));

  // Сравнение, вывод
  if (stringToCompare.length <= maxLength) {
    console.log(`TRUE, строка не длиннее заданной величины. `, stringToCompare.length, ` <= `, maxLength);
    console.log();
    return(true);
  } else {
    console.log(`FALSE, строка длиннее заданной величины. `, stringToCompare.length, ` > `, maxLength);
    console.log();
    return(false);
  }
}

// console.log('==================================');
// console.log('Функция для проверки длины строки:');
// console.log('==================================');
// console.log('Строка короче. Ожидается true, возвращается ', shortEnough('проверяемая строка', 20));
// console.log('Строка равна. Ожидается true, возвращается ', shortEnough('проверяемая строка', 18));
// console.log('Строка длиннее. Ожидается false, возвращается ', shortEnough('проверяемая строка', 10));
// console.log();
// shortEnough2('проверяемая строка', 20); // false
// shortEnough2('проверяемая строка', 18); // true
// shortEnough2('проверяемая строка', 10); // true
// shortEnough2(1234, 5); // false
// shortEnough2(1234, "5"); // false
// shortEnough2(1234, 4); // true
// shortEnough2(1234, "4"); // true
// shortEnough2(1234, 3); // true
// shortEnough2(1234, "3"); // true
// shortEnough2("1234", 3); // true


// ============================================================================================
// Функция для проверки, является ли строка палиндромом.

const isPalindrom = (stringToCheck) => {
  console.log(stringToCheck);
  stringToCheck = String(stringToCheck);
  let normalizedString = stringToCheck.toLowerCase();
  normalizedString = normalizedString.replaceAll(' ', '');
  const lengthNormalized = normalizedString.length;
  const lengthToCheck = Math.ceil(lengthNormalized / 2);
  for (let i = 0; i <= lengthToCheck - 1; i++) {
    if (normalizedString[i] !== normalizedString[lengthNormalized - i - 1]) {
      console.log('НЕ ПАЛИНДРОМ');
      console.log();
      return(false);
    }
  }
  console.log('ПАЛИНДРОМ');
  console.log();
  return(true);
}

function isPalindrom2(stringToCheck1) {
  console.log();
  console.log(stringToCheck1);

  // Подготовка входящих данных.
  let stringToCheck = String(stringToCheck1); // Входная строка, приведена к типу string.
  let normalizedString = stringToCheck.toLowerCase(); // Подготовленная к анализу строка.
  // Очистка строки от не значимых символов.
  normalizedString = normalizedString.replaceAll(' ', '');
  // Очистка от остальных лишних символов.                                        ???: не работает эта фильтрация.
  const charactersExcluded = ' .,?!\"\'«»-–—_'; // Символы, которые не учитываются при анализе.
  for (let i = 0; i < charactersExcluded.length; i++) {
    console.log(`Убираем символ "${charactersExcluded[i]}"`);
    normalizedString = normalizedString.replaceAll(charactersExcluded[i], '');                    // ??? Удаляет всю нормализованную строку
    console.log(normalizedString);
  }
  // Тестовый вывод подготовленной строки
  console.log('Нормализованная строка:');
  console.log(normalizedString);

  const lengthNormalized = normalizedString.length; // Длина строки после очистки от лишних символов.
  const lengthToCheck = Math.ceil(lengthNormalized / 2); // Длина проверяемого участка строки - достаточно проверить до середины.
  if (normalizedString.length === 0) {
    console.log('Нет строки для проверки.');
    return(false);
  }

  // Проверка и вывод результата.
  console.log('  lengthToCheck =', lengthToCheck);
  for (let i = 0; i <= lengthToCheck - 1; i++) {
    if (normalizedString[i] !== normalizedString[lengthNormalized - i - 1]) {
      console.log('  ', normalizedString[i], normalizedString[lengthNormalized - i - 1], 'i =', i, 'NO');
      console.log('НЕ ПАЛИНДРОМ');
      return(false);
    } else {
      console.log('  ', normalizedString[i], normalizedString[lengthNormalized - i - 1], 'i =', i, 'YES');
    }
  }
  console.log('ПАЛИНДРОМ');
  return(true);
}

console.log();
console.log('==================================');
console.log('Функция проверки на палиндром:');
console.log('==================================');
isPalindrom('01110'); // true
isPalindrom('012310'); // true
isPalindrom('SATOR - ROTAS'); // true
console.log();
// isPalindrom2('Строка 123 , . ? ! - – — 321 акортС'); // true после очистки от лишних символов
isPalindrom2(); // нет строки для анализа
isPalindrom2(' '); // нет строки для анализа
isPalindrom2(1234); // false
// isPalindrom2('01110'); // true
// isPalindrom2('012310'); // true
isPalindrom2('SATOR - ROTAS'); // true
// isPalindrom2('«Аргентина манит негра»'/); // true после очистки от лишних символов
// isPalindrom2('Я — арка края'); // true после очистки от лишних символов
// isPalindrom2('ΝΙΨΟΝΑΝΟΜΗΜΑΤΑΜΗΜΟΝΑΝΟΨΙΝ'); // true


// ============================================================================================
// Функция извлечения цифр из строки.
// извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
// Если в строке нет ни одной цифры, возвращает NaN.

const getDigits = (str) => {
  console.log(`Входная строка: "${str}"`);
  let string = String(str);
  let digits = 0;
  for (let i = 0; i <= string.length - 1; i++) {
    // console.log('i = ', i, 'символ = ', string[i]);
    if (!Number.isNaN(parseInt(string[i], 10))) {
      digits = digits * 10 + parseInt(string[i], 10);
      // console.log('результат: ', digits);
    }
  }

  if (digits === 0) {
    console.log('NaN');
    return(NaN);
  }

  console.log(digits);
  console.log();
  return(digits);
}

console.log();
console.log('==================================');
console.log('Функция извлечения из строки цифр в виде числа:');
console.log('==================================');
getDigits('2023 год'); // 2023
getDigits('ECMAScript 2022'); // 2022                                 ???: выполнение ппадает, если вызвать вторую ф-ю с этим именем
getDigits('1 кефир, 0.5 батона'); // 105
getDigits('агент 007'); // 7
getDigits('а я томат'); // NaN
getDigits(2023); // 2023
getDigits(-1); // 1
getDigits(1.5); // 15

// ============================================================================================
// "Задача врача Скорой помощи".
// Поиск нужной квартиры по кол-ву подъездов, этажей, квартир на площадке.
//

const findRoom = (target, entrances, floors, rooms) => {
  console.log(`Ищем квартиру №`, target, `в доме на ${entrances} подъездов, ${floors} этажей, ${rooms} квартир на площадке.`);
  // Обработка ошибочного ввода:
  if (target < 1 || entrances < 1 || floors < 1 || rooms < 1) {
    console.log('Неверные данные: аргумент < 1');
    return;
  }
  if (isNaN(target) || isNaN(entrances) || isNaN(floors) || isNaN(rooms)) {
    // console.log('Неверные данные: аргумент - не число');
    if (isNaN(target)) {console.log('Неверные данные: номер искомой квартиры - не число');}
    if (isNaN(entrances)) {console.log('Неверные данные: кол-во подъездов - не число');}
    if (isNaN(floors)) {console.log('Неверные данные: кол-во этажей - не число');}
    if (isNaN(rooms)) {console.log('Неверные данные: кол-во квартир на площадке - не число');}
    return;
  }
  if (target > (entrances * floors * rooms)) {
    console.log('В доме нет квартиры с таким большим номером.');
    return;
  }
  // console.log(Math.ceil(target / rooms), 'площадка в доме,');
  console.log(Math.ceil(target / (rooms * floors)), `подъезд`);
  console.log((Math.ceil((Math.ceil(target - ((Math.ceil(target / (rooms * floors)) - 1) * (floors * rooms))) / rooms))), `этаж.`);
}

// Та же функция в одну строку, но без проверок:
let findRoom2 = (target, entrances, floors, rooms) => {
  console.log(`Ищем квартиру № ${target}, \n в доме на ${entrances} подъездов, \n ${floors} этажей,  \n ${rooms} квартир на площадке.,  \n ${Math.ceil(target / (rooms * floors))} подъезд, \n ${((Math.ceil((Math.ceil(target - ((Math.ceil(target / (rooms * floors)) - 1) * (floors * rooms))) / rooms))))} этаж.`);
}

console.log();
console.log('==================================');
console.log('"Задача врача Скорой помощи":');
console.log('==================================');
// (искомый номер, подъездов, этажей, квартир на этаже)
// findRoom(1, 1, 1, 1); // 1 подъезд, 1 этаж
// findRoom(1, 2, 2, 2); // 1 подъезд, 1 этаж
// findRoom(2, 2, 2, 2); // 1 подъезд, 1 этаж
// findRoom(3, 2, 2, 2); // 1 подъезд, 2 этаж
// findRoom(4, 2, 2, 2); // 1 подъезд, 2 этаж
// findRoom(5, 2, 2, 2); // 2 подъезд, 1 этаж
// findRoom(5, 2, 2, 2); // 2 подъезд, 1 этаж
findRoom(1, 10, 5, 2); // 2 подъезд, 1 этаж
findRoom(2, 10, 5, 2); // 2 подъезд, 1 этаж
findRoom(3, 10, 5, 2); // 2 подъезд, 1 этаж
findRoom(10, 10, 5, 2); // 2 подъезд, 1 этаж
findRoom(11, 10, 5, 2); // 2 подъезд, 1 этаж
findRoom(20, 10, 5, 2); // 2 подъезд, 1 этаж
findRoom(21, 10, 5, 2); // 2 подъезд, 1 этаж
findRoom(35, 10, 5, 2); // 2 подъезд, 1 этаж
findRoom(99, 10, 5, 2); // 2 подъезд, 1 этаж
findRoom(100, 10, 5, 2); // 2 подъезд, 1 этаж
console.log('Проверка обработки ошибок:');
findRoom(0, 1, 1, 1); // ошибка, аргумент < 1
findRoom(1, 0, 1, 1); // ошибка, аргумент < 1
findRoom(1, 1, 0, 1); // ошибка, аргумент < 1
findRoom(1, 1, 1, 0); // ошибка, аргумент < 1
findRoom(0, 0, 1, 1); // ошибка, аргумент < 1
findRoom(-1, 1, 1, 1); // ошибка, аргумент < 1
findRoom('a', 1, 1, 1); // ошибка, аргумент - не число
findRoom(1, 'a', 1, 1); // ошибка, аргумент - не число
findRoom(1, 1, 'a', 1); // ошибка, аргумент - не число
findRoom(1, 1, 1, 'a'); // ошибка, аргумент - не число
findRoom(101, 10, 5, 2); // ошибка, слишком большой номер квартиры
console.log();
findRoom2(100, 10, 5, 2); // 2 подъезд, 1 этаж

