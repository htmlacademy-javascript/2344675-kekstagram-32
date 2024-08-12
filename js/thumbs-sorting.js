import { drawThumbs } from "./draw-thumbs";
import { receivedPosts } from './download-thumbs';
import { getRandomInt } from "./utils";

const RANDOM_POSTS_AMOUNT = 10;

const sortControls = document.querySelector('.img-filters');
const sortSwitchDefault = document.querySelector('#filter-default');
const sortSwitchRandom = document.querySelector('#filter-random');
const sortSwitchDiscussed = document.querySelector('#filter-discussed');

let sortedThumbs = [];
let thumbsOrderDefault = [];

const indicateSorting = (active) => {
  sortSwitchDefault.classList.remove('img-filters__button--active');
  sortSwitchRandom.classList.remove('img-filters__button--active');
  sortSwitchDiscussed.classList.remove('img-filters__button--active');
  active.classList.add('img-filters__button--active');
  thumbsOrderDefault = receivedPosts;
};

const redrawThumbs = (sorted) => {

  // очищаем существующие миниатюры
  const presentThumbs = document.querySelectorAll('.picture');
  // console.log(presentThumbs);
  presentThumbs.forEach((thumb) => {
    // console.log(thumb);
    thumb.remove();
  });

  // отрисовываем миниатюры из sorted;
  drawThumbs(sorted);


};

const sortThumbsDefault = (evt) => {
  indicateSorting(evt.target);
  sortedThumbs = thumbsOrderDefault;
  redrawThumbs(sortedThumbs);
};

const sortThumbsRandom = (evt) => {
  indicateSorting(evt.target);
  let randomizedPostsAmount = 0;
  const randomPosts = [];
  while (randomizedPostsAmount < RANDOM_POSTS_AMOUNT) {
    const random = getRandomInt(0, thumbsOrderDefault.length - 1);
    if (!randomPosts.includes(thumbsOrderDefault[random])) {
      randomPosts.push(thumbsOrderDefault[random]);
      randomizedPostsAmount++;
    }
  }
  redrawThumbs(randomPosts);
};

const compareNumeric = (a, b) => {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
};

const sortThumbsDiscussed = (evt) => {
  indicateSorting(evt.target);
  // наполняем sortedThumbs отобранными фото:
  // const discussedPosts = thumbsOrderDefault
  //                        .slice()
  //                        .sort(compareNumeric()) ????? аргументы? .comments.length
  //                        .reverse();
  //  discussedPosts.forEach(item) => {
  //    sortedThumbs.push(item);
  //  });

  redrawThumbs(sortedThumbs);
};

export const initThumbsSortControl = () => {
  sortControls.classList.remove('img-filters--inactive');
  sortSwitchDefault.addEventListener('click', sortThumbsDefault);
  sortSwitchRandom.addEventListener('click', sortThumbsRandom);
  sortSwitchDiscussed.addEventListener('click', sortThumbsDiscussed);
};
