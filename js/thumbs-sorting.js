import { drawThumbs } from "./draw-thumbs";
import { getRandomInt } from "./utils";

const sortControls = document.querySelector('.img-filters');
const sortSwitchDefault = document.querySelector('#filter-default');
const sortSwitchRandom = document.querySelector('#filter-random');
const sortSwitchDiscussed = document.querySelector('#filter-discussed');

const thumbsOrderDefault = document.querySelectorAll('.picture');
let sortedThumbs = [];

const indicateSorting = (active) => {
  sortSwitchDefault.classList.remove('img-filters__button--active');
  sortSwitchRandom.classList.remove('img-filters__button--active');
  sortSwitchDiscussed.classList.remove('img-filters__button--active');
  active.classList.add('img-filters__button--active');
};

const redrawThumbs = (sorted) => {
  console.log('redrawThumbs');

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
  // наполняем sortedThumbs случайными фото:
  //   генерируем randomPosts - массив N случайных уникальных чисел от 0 до (thumbsOrderDefault.length - 1):
  //   const N = 10;
  //   let pushed = 0;
  //   let randomPosts = [];
  //   while (pushed < N) {
  //     const random = getRandomInt(0, thumbsOrderDefault.length);
  //     if (!randomPosts.has(thumbsOrderDefault[random]) {
  //       randomPosts.push(thumbsOrderDefault[random]);
  //       pushed++;
  //     };
  //   randomPostsIndexes.forEach(item) => {
  //     sortedThumbs.push(thumbsOrderDefault[item]);
  //   });

  redrawThumbs(sortedThumbs);
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
