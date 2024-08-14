import { drawThumbs } from './draw-thumbs';
import {
  getRandomInt,
  debounce
} from './utils';

const RANDOM_POSTS_AMOUNT = 10;
const DEBOUNCE_TIME = 500;

const sortControls = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');

const receivedPosts = [];

const setActiveButton = (activeSortingBtn) => {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  activeSortingBtn.classList.add('img-filters__button--active');
};

const redrawThumbs = (sortedPosts) => {
  drawThumbs(sortedPosts);
};

const sortThumbsDefault = () => {
  redrawThumbs(receivedPosts);
};

const sortThumbsRandom = () => {
  let randomizedPostsAmount = 0;
  const randomPosts = [];
  while (randomizedPostsAmount < RANDOM_POSTS_AMOUNT) {
    const random = getRandomInt(0, receivedPosts.length - 1);
    if (!randomPosts.includes(receivedPosts[random])) {
      randomPosts.push(receivedPosts[random]);
      randomizedPostsAmount++;
    }
  }
  redrawThumbs(randomPosts);
};

const sortPhotosByComments = (postA, postB) => postB.comments.length - postA.comments.length;

const sortThumbsDiscussed = () => {
  const discussedPosts = receivedPosts
    .slice()
    .sort(sortPhotosByComments);
  redrawThumbs(discussedPosts);
};

const filters = {
  'filter-default': sortThumbsDefault,
  'filter-random': sortThumbsRandom,
  'filter-discussed': sortThumbsDiscussed
};

filtersForm.addEventListener('click', debounce((evt) => {
  const clickedModeButton = evt.target.closest('.img-filters__button');
  if (clickedModeButton) {
    const id = clickedModeButton.id;
    filters[id]();
  }
}, DEBOUNCE_TIME));

filtersForm.addEventListener('click', (evt) => {
  const clickedModeButton = evt.target.closest('.img-filters__button');
  if (clickedModeButton) {
    setActiveButton(clickedModeButton);
  }
});

export const initThumbsSortControl = (data) => {
  receivedPosts.length = 0;
  receivedPosts.push(...data.slice());
  sortControls.classList.remove('img-filters--inactive');
  redrawThumbs(receivedPosts);
};
