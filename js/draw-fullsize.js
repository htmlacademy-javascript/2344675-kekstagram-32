const pageBody = document.querySelector('body');
const modal = pageBody.querySelector('.big-picture');
const fullCard = modal.querySelector('.big-picture__preview');
const commentsShowmoreButton = fullCard.querySelector('.social__comments-loader');
const commentsList = fullCard.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');
const fullCardBtnCancel = document.querySelector('.big-picture__cancel');
const commentsBathSize = 5;
let commentsShown = 0;
let currentPost;

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
export { onCloseModalBtn }; // вызывается из draw-thumbs.js

// ===============================================================

// // процедура дозагрузки комментариев
const loadMoreComments = (clickedPost) => {
  const commentsAll = clickedPost.comments;

  // проверяем, есть ли комменты к показу
  if (commentsShown < clickedPost.comments.length) {

    let nextCommentsBatch = commentsAll.slice(commentsShown, commentsShown + commentsBathSize);

    nextCommentsBatch.forEach((comment) => {
      // Наполнение commentTemplate из comment
      commentTemplate.querySelector('.social__picture').src = comment.avatar;
      commentTemplate.querySelector('.social__picture').alt = comment.name;
      commentTemplate.querySelector('.social__text').textContent = comment.id; // для отладки; должно быть = comment.message

      commentsList.appendChild(commentTemplate.cloneNode(true)); // заполненный комментарий
      commentsShown++;
      fullCard.querySelector('.social__comment-shown-count').textContent = commentsShown;
    });
    nextCommentsBatch = [];
  }

  // Скрываем/прячем кнопку
  if (commentsShown === commentsAll.length) {
    commentsShowmoreButton.hidden = true;
  } else {
    commentsShowmoreButton.hidden = false;
  }
};

// ===============================================================

// // процедура наполнения модаки
const fillModal = (clickedPost) => {

  // заполняем модалку данными кликнутой миниатюры
  fullCard.querySelector('.big-picture__img img').src = clickedPost.url;
  fullCard.querySelector('.big-picture__img img').alt = clickedPost.description;
  fullCard.querySelector('.social__caption').textContent = clickedPost.description;
  fullCard.querySelector('.likes-count').textContent = clickedPost.likes;
  fullCard.querySelector('.social__comment-total-count').textContent = clickedPost.comments.length;

  // очищаем старые комментарии
  commentsList.innerHTML = '';
  commentsShown = 0;
  fullCard.querySelector('.social__comment-shown-count').textContent = 0;

  // первую партию комментариев показываем принудительно
  loadMoreComments(clickedPost);

  // передаем текущий пост в слуташель дозагрузки
  currentPost = clickedPost;

  // скрываем кнопку, если к посту нет комментариев
  if (clickedPost.comments.length === 0) {
    commentsShowmoreButton.hidden = true;
  }

  // показываем модалку
  pageBody.classList.add('modal-open');
  modal.classList.remove('hidden');

  // добавляем слушатели закрытия модалки
  document.addEventListener('keydown', onCloseModalEsc, { once: true });
};
export { fillModal }; // вызывается из dwar-thumbsjs

// добавляем слушатель на кнопку для дозагрузки
commentsShowmoreButton.addEventListener('click', () => {
  loadMoreComments(currentPost);
});

fullCardBtnCancel.addEventListener('click', onCloseModalBtn);
