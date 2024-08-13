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

export const onCloseModalBtn = () => {
  closeModal();
  document.removeEventListener('keydown', onCloseModalEsc);
};

const loadMoreComments = (clickedPost) => {
  const commentsAll = clickedPost.comments;
  if (commentsShown < clickedPost.comments.length) {
    let nextCommentsBatch = commentsAll.slice(commentsShown, commentsShown + commentsBathSize);
    nextCommentsBatch.forEach((comment) => {
      commentTemplate.querySelector('.social__picture').src = comment.avatar;
      commentTemplate.querySelector('.social__picture').alt = comment.name;
      commentTemplate.querySelector('.social__text').textContent = comment.message;
      commentsList.appendChild(commentTemplate.cloneNode(true));
      commentsShown++;
      fullCard.querySelector('.social__comment-shown-count').textContent = commentsShown;
    });
    nextCommentsBatch = [];
  }
  commentsShowmoreButton.hidden = commentsShown === commentsAll.length;
};

export const fillModal = (clickedPost) => {
  fullCard.querySelector('.big-picture__img img').src = clickedPost.url;
  fullCard.querySelector('.big-picture__img img').alt = clickedPost.description;
  fullCard.querySelector('.social__caption').textContent = clickedPost.description;
  fullCard.querySelector('.likes-count').textContent = clickedPost.likes;
  fullCard.querySelector('.social__comment-total-count').textContent = clickedPost.comments.length;
  commentsList.innerHTML = '';
  commentsShown = 0;
  fullCard.querySelector('.social__comment-shown-count').textContent = 0;
  loadMoreComments(clickedPost);
  currentPost = clickedPost;
  if (clickedPost.comments.length === 0) {
    commentsShowmoreButton.hidden = true;
  }
  pageBody.classList.add('modal-open');
  modal.classList.remove('hidden');
  document.addEventListener('keydown', onCloseModalEsc, { once: true });
};

commentsShowmoreButton.addEventListener('click', () => {
  loadMoreComments(currentPost);
});

fullCardBtnCancel.addEventListener('click', onCloseModalBtn);
