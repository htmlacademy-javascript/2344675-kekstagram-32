import { drawThumbs } from './draw-thumbs';
import { receivedPosts } from './download-thumbs';
import { getRandomInt } from './utils';

const RANDOM_POSTS_AMOUNT = 10;

const sortControls = document.querySelector('.img-filters');
const sortSwitchDefault = document.querySelector('#filter-default');
const sortSwitchRandom = document.querySelector('#filter-random');
const sortSwitchDiscussed = document.querySelector('#filter-discussed');

let currentSortingMode = 'default';

sortSwitchDefault.disabled = true;

const indicateSorting = (active) => {
  sortSwitchDefault.classList.remove('img-filters__button--active');
  sortSwitchRandom.classList.remove('img-filters__button--active');
  sortSwitchDiscussed.classList.remove('img-filters__button--active');
  active.classList.add('img-filters__button--active');
};

const redrawThumbs = (sorted) => {
  const presentThumbs = document.querySelectorAll('.picture');
  presentThumbs.forEach((thumb) => {
    thumb.remove();
  });
  drawThumbs(sorted);
};

const sortThumbsDefault = (evt) => {
  if (currentSortingMode !== 'default') {
    indicateSorting(evt.target);
    redrawThumbs(receivedPosts);
    sortSwitchDefault.disabled = true;
    sortSwitchDiscussed.disabled = false;
  }
  currentSortingMode = 'default';
};

const sortThumbsRandom = (evt) => {
  sortSwitchDefault.disabled = false;
  sortSwitchDiscussed.disabled = false;
  indicateSorting(evt.target);
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
  sortSwitchDefault.disabled = false;
  currentSortingMode = 'random';
};

const sortPhotosByComments = (postA, postB) => postB.comments.length - postA.comments.length;

const sortThumbsDiscussed = (evt) => {
  if (currentSortingMode !== 'discussed') {
    sortSwitchDefault.disabled = false;
    sortSwitchDiscussed.disabled = true;
    indicateSorting(evt.target);
    const discussedPosts = receivedPosts
      .slice()
      .sort(sortPhotosByComments);
    redrawThumbs(discussedPosts);
  }
  currentSortingMode = 'discussed';
};

export const initThumbsSortControl = () => {
  sortControls.classList.remove('img-filters--inactive');
  sortSwitchDefault.addEventListener('click', sortThumbsDefault);
  sortSwitchRandom.addEventListener('click', sortThumbsRandom);
  sortSwitchDiscussed.addEventListener('click', sortThumbsDiscussed);
};
