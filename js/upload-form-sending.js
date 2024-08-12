import {closeUploadModal, clearFormListener, addFormListener} from './upload-form.js';
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
      document.addEventListener('keydown', addFormListener)
    }
    plate.remove();

  }
  document.removeEventListener('keydown', closeMsgByEsc);
};

// (временно) Закрытие плашки по кнопке
// function closeMsgByBtn() {
//   const plate = document.querySelector('.success') || document.querySelector('.error');
//   plate.remove();
// };

function closeMsgByClick(evt) {
  console.log('closeMsgByClick');
  const closeMsgBtn = document.querySelector('.success__button') || document.querySelector('.error__button');
  const plate = document.querySelector('.success') || document.querySelector('.error');
  console.log(plate);
  if (evt.target === closeMsgBtn) {
    console.log('Отрабатываем клик по кнопке или фону');
    console.log(evt);


    plate.remove();
  } else [console.log('Клик не по кнопке/фону')];
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
        const closeMsgBtn = document.querySelector('.success__button') || document.querySelector('.error__button');
        // closeMsgBtn.addEventListener('click', closeMsgByBtn);
        closeMsgBtn.addEventListener('click', closeMsgByClick);

        document.addEventListener('keydown', closeMsgByEsc);

      } else {
        throw new Error('Полученный ответ сервера <> "OK"');
      }
    })
    .catch(() => {
      document.body.appendChild(errorMessage);

      const closeMsgBtn = document.querySelector('.error__button') || document.querySelector('.error__button');
      // closeMsgBtn.addEventListener('click', closeMsgByBtn);
      closeMsgBtn.addEventListener('click', closeMsgByClick);
      document.addEventListener('keydown', closeMsgByEsc);
      clearFormListener();
    }
    )
    .finally (() => {
      unblockSubmitBtn();
    })
  ;


};

