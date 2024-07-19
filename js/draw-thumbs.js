import {mockPosts} from './mock-generation.js';

const posts = document.querySelector('.pictures'); // контейнер в разметке для наполнения элементами
const postTemplate = document.querySelector('#picture').content.querySelector('.picture'); // шаблон фото, исходный

const drawThumbs = (source) => {
  for (let i = 0; i < source.length; i++) {
    const filledPost = postTemplate.cloneNode(true); // шаблон фото для наполнения, текущего - для заполнения
    filledPost.querySelector('.picture__img').src = source[i].url;
    filledPost.querySelector('.picture__img').alt = source[i].description;
    filledPost.querySelector('.picture__likes').textContent = source[i].likes;
    filledPost.querySelector('.picture__comments').textContent = source[i].comments.length;
    posts.appendChild(filledPost);
  };
};

drawThumbs(mockPosts);
