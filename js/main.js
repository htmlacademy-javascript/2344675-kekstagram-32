// КОНСТАНТЫ ДЛЯ МОКОВЫХ ДАННЫХ
const MOCK_PHOOTOS_AMOUNT = 25; // Кол-во фотографий в генерации.
const MOCK_PHOTOS_DESCRIPTIONS = [
  'Наш отель!',
  'На пути к секретному месту.',
  'Нашли секретный пляж.',
  'Ловим вечернее солнце.',
  'Завтрак в нашем отеле.',
  'Интересно, в ней не жарко? А плитка точно как у нас в райцентре.',
  'Десерт.',
  'И компот!',
  'Самолетный пляж, вы про него слышали.',
  'Какая удобная штука, надо домой заказать такую же.',
  'Проход на пляж отеля – через сады местных жителей.',
  'Зеленоглазое такси.',
  'Перекус в летнем кафе.',
  'Нет, это не десерт от повара. Это зимняя грелка для кота.',
  'А это зимняя грелка для хозяйки кота.',
  'Полетели в новый город!',
  'Местный хор. Исполняют отличные каверы.',
  'Наследие колониальной эпохи.',
  'Еще одна классная штука. Кто нашел такие в продаже, скиньте ссылку!',
  'Пошли изучать старый город.',
  'В новом отеле вот такие завтраки.',
  'И вот такие закаты!',
  'Этот краб чуть нас не поймал. Но мы были быстрее.',
  '\m/',
  'Встреча с природой.'
]
const MOCK_LIKES_AMOUNT_MIN = 15; // Мин. число лайков на фотографии.
const MOCK_LIKES_AMOUNT_MAX = 200; // Макс. число лайков на фотографии.
const MOCK_COMMENTS_AMOUNT_MIN = 0; // Мин. число комментариев к фотографии.
const MOCK_COMMENTS_AMOUNT_MAX = 30; // Макс. число комментариев к фотографии.
const MOCK_AVATAR_ID_MIN = 1; // Мин. ID аватара (может повторяться).
const MOCK_AVATAR_ID_MAX = 6; // Макс. ID аватара (может повторяться).
const MOCK_COMMENTS_TEXTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
]
const MOCK_USERNAMES = [
  'Анна',
  'Борис',
  'Виктор',
  'Галина',
  'Дмитрий',
  'Екатерина',
  'Женя',
  'Зоя',
  'Иван',
  'Катя',
  'Лёша',
  'Миша',
  'Нина',
  'Олеся',
  'Пётр',
  'Роман',
  'Сергей',
  'Татьяна',
  'Ульяна',
  'Филипп'
]


// ПРОЦЕДУРЫ ДЛЯ МОКОВЫХ ДАННЫХ

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

// Генераор случайных значений.
const getRandomInt = (a, b) => {
  const from = Math.floor(Math.min(a, b));
  const to = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (to - from + 1) + from);
};

const getUniqueInt = (a, b) => { // ?? Можно ли выполнить стрелочней ф-ю?
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
}

// Генератор случайного элемента массива.
const getRandomArrayItem = (sourceArray) => sourceArray[getRandomInt(0, sourceArray.length - 1)];

// ГЕНЕРАЦИЯ МОКОВЫХ ОБЪЕКТОВ

// Задание сквозной нумерации ID
const getNextPhotoId = getIncreasingInt(); // Сквозная нумерация фотографий (одинаковый для фото, URL, выбора описания)
const getNextCommentId = getIncreasingInt(); // Сквозная нумерация комментариев

// Генерация  мокового фото
const createPhotoMock = () => {
  const photoId = getNextPhotoId();

  // Генерация мокового комментария
  const getMockComment = () => ({
    'id': getNextCommentId(),
    'avatar': `img/avatar-${getRandomInt(MOCK_AVATAR_ID_MIN, MOCK_AVATAR_ID_MAX)}.svg`,
    'message': getRandomArrayItem(MOCK_COMMENTS_TEXTS), // TODO: от одного до нескольких предложений в message, с использованием getUniqueInt.
    'name': getRandomArrayItem(MOCK_USERNAMES)
  }
  );

  return {
    'id': photoId,
    'url': `photos/${photoId}.jpg`,
    'description': MOCK_PHOTOS_DESCRIPTIONS[photoId - 1],
    'likes': getRandomInt(MOCK_LIKES_AMOUNT_MIN, MOCK_LIKES_AMOUNT_MAX),
    'comments': Array.from({length: getRandomInt(MOCK_COMMENTS_AMOUNT_MIN, MOCK_COMMENTS_AMOUNT_MAX)}, getMockComment)
  };
}

// ГЕНЕРАЦИЯ НАБОРА МОКОВЫХ ФОТО

const mockPosts = Array.from({length: MOCK_PHOOTOS_AMOUNT}, createPhotoMock);
console.log(mockPosts);
