import { fillModal } from './draw-fullsize.js';
import { onCloseModalBtn } from './draw-fullsize.js';

const posts = document.querySelector('.pictures');
const postTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fullCardBtnCancel = document.querySelector('.big-picture__cancel');
const localData = [];

const showModal = (evt) => {
  const smallCard = evt.target.closest('.picture');
  if (smallCard) {
    const matchClicked = (element) => (String(element.id) === smallCard.dataset.id);
    const clickedPost = localData.find(matchClicked);
    fillModal(clickedPost);
  }
};

const clearPosts = () => {
  const presentThumbs = document.querySelectorAll('.picture');
  presentThumbs.forEach((thumb) => {
    thumb.remove();
  });
}

export const drawThumbs = (source) => {
  localData.length = 0;
  localData.push(...source.slice());
  clearPosts();

  source.forEach((filledPost) => {
    const newThumb = postTemplate.cloneNode(true);
    newThumb.querySelector('.picture__img').src = filledPost.url;
    newThumb.querySelector('.picture__img').alt = filledPost.description;
    newThumb.querySelector('.picture__likes').textContent = filledPost.likes;
    newThumb.querySelector('.picture__comments').textContent = filledPost.comments.length;
    newThumb.dataset.id = filledPost.id;
    posts.appendChild(newThumb);
  });
};

posts.addEventListener('click', showModal);

fullCardBtnCancel.addEventListener('click', onCloseModalBtn);
