const pageBody = document.querySelector('body');
const modal = pageBody.querySelector('.big-picture');
const fullCard = modal.querySelector('.big-picture__preview');
const commentsShowmoreButton = fullCard.querySelector('.social__comments-loader');
const commentsList = fullCard.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');
const fullCardBtnCancel = document.querySelector('.big-picture__cancel');
const commentsBathSize = 5; // кол-во комментариев в "порции" дозагрузки

// import {data} from './main.js'; // ?? вызывает ошибку - порядок выполнения модулей?
import {mockPosts} from './mock-generation.js'; // используется вместо {data}
const sourceData = mockPosts;





// процедура отрисовки модалки с полноразмерным фото

const showModal = (evt) => {
  const smallCard = evt.target.closest('.picture');
  if (smallCard) {

    // заполняем модалку данными кликнутой миниатюры
    const matchClicked = (element) => (String(element.id) === smallCard.dataset.id);
    const clickedPost = sourceData.find(matchClicked);

    fullCard.querySelector('.big-picture__img img').src = clickedPost.url;
    fullCard.querySelector('.big-picture__img img').alt = clickedPost.description;
    fullCard.querySelector('.social__caption').textContent = clickedPost.description;
    fullCard.querySelector('.likes-count').textContent = clickedPost.likes;
    fullCard.querySelector('.social__comment-total-count').textContent = clickedPost.comments.length;

    // очищаем старые комментарии
    let drawnComments = fullCard.querySelectorAll('.social__comment');
    drawnComments.forEach((comment) => (comment.remove()));
    let commentsShown = 0;
    drawnComments = fullCard.querySelectorAll('.social__comment');

    // проверяем, есть ли комменты к показу
    const commentsAll = clickedPost.comments; // (Collection)
    fullCard.querySelector('.social__comment-shown-count').textContent = 0;

    // // процедура дозагрузки комментариев

    const loadMoreComments = () => {
      if (commentsShown < clickedPost.comments.length) {

        console.log('=====================');
        console.log('Ф-Я loadMoreComments:');
        // let commentsToShow = new DocumentFragment(); // текущая партия комментариев к выводу (наполняемый контейнер для результата)
        // console.log('commentsToShow в начале ф-ции');
        // console.log(commentsToShow);
        let nextCommentsBatch = commentsAll.slice(commentsShown, commentsShown + commentsBathSize); // следующая часть комментариев для вывода из базы, до 5 шт.
        console.log('Отобранный nextCommentsBatch:');
        console.log(nextCommentsBatch);

        nextCommentsBatch.forEach((comment) => {
          // Наполнение commentTemplate из comment
          commentTemplate.querySelector('.social__picture').src = comment.avatar;
          commentTemplate.querySelector('.social__picture').alt = comment.name;
          // commentTemplate.querySelector('.social__text').textContent = comment.message;
          commentTemplate.querySelector('.social__text').textContent = comment.id; // для отладки

          const commentToInsert = commentTemplate.cloneNode(true); // заполненный комментарий
          commentsShown++;
          console.log(`commentsShown = ${commentsShown}`);
          console.log(`Добавляем на страницу commentToInsert = ${comment.id}`);
          // commentsToShow.appendChild(commentToInsert);
          // commentsList.appendChild(commentsToShow);
          commentsList.appendChild(commentToInsert);

          fullCard.querySelector('.social__comment-shown-count').textContent = commentsShown;
        });
        // console.log('nextCommentsBatch после вставки:');
        // console.log(nextCommentsBatch);
        console.log('Отработанный nextCommentsBatch:');
        console.log(nextCommentsBatch);
        console.log('Очищаем nextCommentsBatch после вставки:');
        nextCommentsBatch = [];
        console.log(nextCommentsBatch);

        // ?? нужно очистить commentsToShow / nextCommentsBatch
      }

      // Скрываем/прячем кнопку
      if (commentsShown === commentsAll.length) {
        commentsShowmoreButton.hidden = true;
      } else {
        commentsShowmoreButton.hidden = false;
      }
    };

    commentsShowmoreButton.addEventListener('click', loadMoreComments);
    // первую партию комментариев показываем принудительно
    loadMoreComments();


    // слушатели закрытия модалки

    const closeModal = () => {
      pageBody.classList.remove('modal-open');
      modal.classList.add('hidden');
      commentsShown = 0;
      commentsShowmoreButton.hidden = false;
    };

    const onCloseModalEsc = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closeModal();
      }
    };

    const onCloseModalBtn = () => {
      closeModal();
      document.removeEventListener('keydown', onCloseModalEsc);
    };


    // показываем модалку
    pageBody.classList.add('modal-open');
    modal.classList.remove('hidden');

    // добавляем слушатели закрытия модалки
    document.addEventListener('keydown', onCloseModalEsc, { once: true });
    fullCardBtnCancel.addEventListener('click', onCloseModalBtn);

  }
};

export {showModal};
