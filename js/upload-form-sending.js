import { isEsc } from './utils';
import {
  closeUploadModal,
  clearFormListener,
  addFormListener
} from './upload-form.js';

const SERVER_URL_UPLOAD = 'https://32.javascript.htmlacademy.pro/kekstagram';

const submitBtn = document.querySelector('.img-upload__submit');
const submitBtnDefaultText = submitBtn.textContent;
const submitBtnProcessingtText = 'Отправляется...';
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessage = successTemplate.cloneNode(true);
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessage = errorTemplate.cloneNode(true);

const blockSubmitBtn = (isBlocked = false) => {
  submitBtn.disabled = isBlocked;
  submitBtn.textContent = isBlocked ? submitBtnProcessingtText : submitBtnDefaultText;
};

function closeMsgByEsc(evt) {
  if (isEsc(evt)) {
    evt.preventDefault();
    const plate = document.querySelector('.success') || document.querySelector('.error');
    if (document.querySelector('.error')) {
      document.addEventListener('keydown', addFormListener);
    }
    plate.remove();
    document.removeEventListener('keydown', closeMsgByEsc);
    document.removeEventListener('click', closeMsgByClick);
  }
}

function closeMsgByClick(evt) {
  const closeMsgBtn = document.querySelector('.success__button') || document.querySelector('.error__button');
  const plate = document.querySelector('.success__inner') || document.querySelector('.error__inner');
  const background = document.querySelector('.success') || document.querySelector('.error');
  if ((evt.target === closeMsgBtn) || (evt.target !== plate)) {
    background.remove();
    document.removeEventListener('click', closeMsgByClick);
    document.removeEventListener('keydown', closeMsgByEsc);
  }
}

const showFeedbackPlate = (resultPlate) => {
  document.body.appendChild(resultPlate);
  document.addEventListener('click', closeMsgByClick);
  document.addEventListener('keydown', closeMsgByEsc);
};

export const proceedUpload = (evt) => {
  const formData = new FormData(evt.target);
  blockSubmitBtn(true);
  fetch(SERVER_URL_UPLOAD,
    {
      method: 'POST',
      body: formData
    })
    .then((response) => {
      if (response.ok) {
        showFeedbackPlate(successMessage);
        closeUploadModal();
      } else {
        throw new Error('Полученный ответ сервера - не 200 "OK"');
      }
    })
    .catch(() => {
      showFeedbackPlate(errorMessage);
      clearFormListener();
    })
    .finally(() => {
      blockSubmitBtn();
    });
};
