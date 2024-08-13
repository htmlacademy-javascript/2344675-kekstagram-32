import { drawThumbs } from './draw-thumbs';
import { receivedPosts } from './download-thumbs';
import {
  getRandomInt,
  debounce } from './utils';

const RANDOM_POSTS_AMOUNT = 10;
const DEBOUNCE_TIME = 500;

const sortControls = document.querySelector('.img-filters');
const sortSwitchDefault = document.querySelector('#filter-default');
const sortSwitchRandom = document.querySelector('#filter-random');
const sortSwitchDiscussed = document.querySelector('#filter-discussed');

let currentSortingMode = 'default';

sortSwitchDefault.disabled = true;

const indicateSorting = (activeSortingBtn) => {
  sortSwitchDefault.classList.remove('img-filters__button--active');
  sortSwitchRandom.classList.remove('img-filters__button--active');
  sortSwitchDiscussed.classList.remove('img-filters__button--active');
  activeSortingBtn.classList.add('img-filters__button--active');
};

const redrawThumbs = (sortedPosts) => {
  const presentThumbs = document.querySelectorAll('.picture');
  presentThumbs.forEach((thumb) => {
    thumb.remove();
  });
  drawThumbs(sortedPosts);
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
  sortSwitchRandom.addEventListener('click', debounce((evt) => sortThumbsRandom(evt)), DEBOUNCE_TIME);
  sortSwitchDiscussed.addEventListener('click', sortThumbsDiscussed);
};
