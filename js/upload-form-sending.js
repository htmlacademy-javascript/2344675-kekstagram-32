import {
  closeUploadModal,
  clearFormListener,
  addFormListener}
  from './upload-form.js';

const SERVER_URL_UPLOAD = 'https://32.javascript.htmlacademy.pro/kekstagram';

const submitBtn = document.querySelector('.img-upload__submit');
const submitBtnDefaultText = submitBtn.textContent;
const submitBtnProcessingtText = 'Отправляется...';
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessage = successTemplate.cloneNode(true);
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessage = errorTemplate.cloneNode(true);

const blockSubmitBtn = () => {
  submitBtn.disabled = true;
  submitBtn.textContent = submitBtnProcessingtText;
};

const unblockSubmitBtn = () => {
  submitBtn.disabled = false;
  submitBtn.textContent = submitBtnDefaultText;
};

function closeMsgByEsc(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    const plate = document.querySelector('.success') || document.querySelector('.error');
    if(document.querySelector('.error')){
      document.addEventListener('keydown', addFormListener);
    }
    plate.remove();
  }
  document.removeEventListener('keydown', closeMsgByEsc);
}

function closeMsgByClick(evt) {
  const closeMsgBtn = document.querySelector('.success__button') || document.querySelector('.error__button');
  const plate = document.querySelector('.success__inner') || document.querySelector('.error__inner');
  const background = document.querySelector('.success') || document.querySelector('.error');
  if ((evt.target === closeMsgBtn) || (evt.target !== plate)) {
    background.remove();
    document.removeEventListener('click', closeMsgByClick);
  }
  document.removeEventListener('keydown', closeMsgByEsc);
}

export const proceedUpload = (evt) => {
  const formData = new FormData(evt.target);
  blockSubmitBtn();
  fetch(SERVER_URL_UPLOAD,
    {
      method: 'POST',
      body: formData
    })
    .then((response) => {
      if (response.ok) {
        document.body.appendChild(successMessage);
        closeUploadModal();
        document.addEventListener('click', closeMsgByClick);
        document.addEventListener('keydown', closeMsgByEsc);
      } else {
        throw new Error('Полученный ответ сервера <> "OK"');
      }
    })
    .catch(() => {
      document.body.appendChild(errorMessage);
      document.addEventListener('click', closeMsgByClick);
      document.addEventListener('keydown', closeMsgByEsc);
      clearFormListener();
    })
    .finally (() => {
      unblockSubmitBtn();
    });
};
