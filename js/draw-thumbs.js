const posts = document.querySelector('.pictures');
const postTemplate = document.querySelector('#picture').content.querySelector('.picture');

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
};

export {posts, drawThumbs};

// слушатель для открытия модалки
import {showModal} from './draw-fullsize.js';
posts.addEventListener('click', showModal);
