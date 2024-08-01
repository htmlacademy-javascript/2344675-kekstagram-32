const posts = document.querySelector('.pictures');
const postTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fullCardBtnCancel = document.querySelector('.big-picture__cancel');

// import { data } from './main.js'; // ?? иначе ReferenceError в main.js:8
import { mockPosts as data} from './mock-generation.js'; // взамен строки выше
import {fillModal} from './draw-fullsize.js';
import {onCloseModalBtn} from './draw-fullsize.js';

const showModal = (evt) => {
  const smallCard = evt.target.closest('.picture');
  if (smallCard) {
    const matchClicked = (element) => (String(element.id) === smallCard.dataset.id);
    const clickedPost = data.find(matchClicked);
    fillModal(clickedPost);
  }
};

const drawThumbs = (source) => {
  source.forEach((filledPost) => {
    const newThumb = postTemplate.cloneNode(true);
    newThumb.querySelector('.picture__img').src = filledPost.url;
    newThumb.querySelector('.picture__img').alt = filledPost.description;
    newThumb.querySelector('.picture__likes').textContent = filledPost.likes;
    newThumb.querySelector('.picture__comments').textContent = filledPost.comments.length;
    newThumb.dataset.id = filledPost.id;
    posts.appendChild(newThumb);
  }
  );
  posts.addEventListener('click', showModal);
};
export {drawThumbs}; // вызывается из main.js

fullCardBtnCancel.addEventListener('click', onCloseModalBtn);
