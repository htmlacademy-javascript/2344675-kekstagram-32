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
  console.log('Кнопка заблокирована');
};

const unblockSubmitBtn = () => {
  submitBtn.disabled = false;
  submitBtn.textContent = submitBtnDefaultText;
  console.log('Кнопка разблокирована');
};


function closeMsgByEsc(evt) {
    console.log(evt);
  if (evt.key === 'Escape') {
      console.log ('Нажат Esc');
    evt.preventDefault();
    const plate = document.querySelector('.success') || document.querySelector('.error');
      console.log('plate:');
      console.log(plate);
    plate.remove();
    // удалить слушатель клика
    // удалить слушатель Esc
  } else {console.log('Нажат не Esc')}
};

// function closeMsgByBtn() {
//     console.log('Отрабатываем клик');
//   const plate = document.querySelector('.success') || document.querySelector('.error');
  // plate.remove();
// };

function closeMsgByClick(evt) {
  console.log('closeMsgByClick');
  const closeMsgBtn = document.querySelector('.success__button') || document.querySelector('.error__button');
  const plate = document.querySelector('.success') || document.querySelector('.error');
    console.log(closeMsgBtn);
    console.log(plate);
  if (evt.target === closeMsgBtn) {
      console.log('Отрабатываем клик по кнопке или фону');
      console.log(evt);


    plate.remove();
  } else [console.log('Клик не по кнопке/фону')];
}




export const proceedUpload = (evt) => {
  console.log('proceedUpload:');
  const formData = new FormData(evt.target);

  // блокируем кнопку отправки

  fetch(SERVER_URL_UPLOAD,
    {
      method: 'POST',
      body: formData
    })
    .then((response) => {
      if (response.ok) {
        console.log('responce === ok');
        document.body.appendChild(successMessage);

        // вешаем слушатель Esc на документ:
        //   console.log('Добавляем слушатель Esc');
        // document.addEventListener('keydown', closeMsgByEsc(evt));
        //   удалить плашку
        //   удалить слушатель клика по кнопке/фону с документа

        // (временно) вешаем слушатель на только кнопку
        //   удалить плашку
        // const closeMsgBtn = document.querySelector('.success__button') || document.querySelector('.error__button');
        // closeMsgBtn.addEventListener('click', closeMsgByBtn);

        // вешаем слушатель на документ (клик на кнопку/фон плашки успеха):
        document.addEventListener('click', closeMsgByClick(evt));
        //   удалить плашку
        //   удалить слушатель Esc с документа

      } else {
        throw new Error('Полученный ответ сервера <> "OK"');
      }
    })
    .catch((err) => {
      console.log(err.message);
      document.body.appendChild(errorMessage);

        // (временно) вешаем слушатель на только кнопку
      // const closeMsgBtn = document.querySelector('.success__button') || document.querySelector('.error__button');
      // closeMsgBtn.addEventListener('click', closeMsgByBtn);

    }
    )
    .finally (() => {
      // разблокируем кнопку отправки
    })
  ;


};

