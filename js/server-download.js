import { drawThumbs } from './draw-thumbs';

const SERVER_URL = 'https://32.javascript.htmlacademy.pro/kekstagram/data';

const downloadErrorModalShowtime = 5000;
const downloadErrorModalTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const showMsgDOwnloadFailure = () => {
  const downloadErrorModal = downloadErrorModalTemplate.cloneNode(true);
  document.body.appendChild(downloadErrorModal);
  setTimeout(() => {
    downloadErrorModal.remove();
  }, downloadErrorModalShowtime);
};

export const getData = () =>{
  fetch(SERVER_URL)
    .then((response) => response.json())
    .then((posts) => drawThumbs(posts))
    .catch(() => showMsgDOwnloadFailure());
};

