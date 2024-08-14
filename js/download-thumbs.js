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

export const getData = () =>{
  fetch(SERVER_URL_DATA)
    .then((response) => response.json())
    .then((posts) => {
      initThumbsSortControl(posts);
    })
    .catch(() => showMsgDOwnloadFailure());
};
