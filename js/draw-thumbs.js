import {mockPosts} from './mock-generation.js';

const posts = document.querySelector('.pictures'); // контейнер в разметке для наполнения элементами
const postTemplate = document.querySelector('#picture').content.querySelector('.picture'); // шаблон фото, исходный

const drawThumbs = (source) => {
  source.forEach((filledPost) => {
    const sourcePost = postTemplate.cloneNode(true); // шаблон фото - для заполнения
    sourcePost.querySelector('.picture__img').src = filledPost.url;
    sourcePost.querySelector('.picture__img').alt = filledPost.description;
    sourcePost.querySelector('.picture__likes').textContent = filledPost.likes;
    sourcePost.querySelector('.picture__comments').textContent = filledPost.comments.length;
    posts.appendChild(sourcePost);
  }
  );
};

drawThumbs(mockPosts);
