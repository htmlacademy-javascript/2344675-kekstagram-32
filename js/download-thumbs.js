import { drawThumbs } from './draw-thumbs';
import { initThumbsSortControl } from './thumbs-sorting';

const SERVER_URL_DATA = 'https://32.javascript.htmlacademy.pro/kekstagram/data';
const DOWNLOAD_ERROR_SHOWTIME = 5000;

const downloadErrorModalTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const showMsgDOwnloadFailure = () => {
  const downloadErrorModal = downloadErrorModalTemplate.cloneNode(true);
  document.body.appendChild(downloadErrorModal);
  setTimeout(() => {
    downloadErrorModal.remove();
  }, DOWNLOAD_ERROR_SHOWTIME);
};

export let receivedPosts = [];

export const getData = () =>{
  fetch(SERVER_URL_DATA)
    .then((response) => response.json())
    .then((posts) => {
      drawThumbs(posts);
      receivedPosts = posts;
    })
    .then(() => initThumbsSortControl())
    .catch(() => showMsgDOwnloadFailure());
};
