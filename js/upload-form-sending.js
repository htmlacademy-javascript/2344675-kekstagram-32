const SERVER_URL_UPLOAD = 'https://32.javascript.htmlacademy.pro/kekstagram';
const submitBtn = document.querySelector('.img-upload__submit');
const submitBtnDefaultText = submitBtn.textContent;

const sendingMsgSuccess = document.querySelector('#success').content.cloneNode(true);
const sendingMsgSuccessBtn = sendingMsgSuccess.querySelector('.success__button');

const sendingMsgError = document.querySelector('#error').content.cloneNode(true);
const sendingMsgErrorBtn = sendingMsgError.querySelector('.error__button');


console.log('Изначальное состояние:');
console.log(submitBtn);

const submitBtnBlock = () => {
  console.log('============================');
  console.log('submitBtnBlock');
  console.log(submitBtn);
  submitBtn.disabled = 'true';
  console.log('Кнопка заблокирована');
  submitBtn.textContent = 'Отправляется...';
  console.log(submitBtn);
};

const submitBtnUnblock = () => {
  console.log('============================');
  console.log('submitBtnUnblock');
  submitBtn.disabled = 'false';
  console.log(submitBtn);
  console.log('Кнопка разблокирована');
  submitBtn.textContent = submitBtnDefaultText;
  console.log(submitBtn);
};

export const proceedUpload = (evt) => {
  const formData = new FormData(evt.target);

  console.log('Начали proceedUpload');
  console.log(submitBtn);
  console.log('блокируем кнопку');
  submitBtnBlock();
  console.log(submitBtn);

  console.log('Выполняем fetch...');
  fetch(SERVER_URL_UPLOAD,
    {
      method: 'POST',
      body: formData
    }
  )
    .then((response) => {
      if (response.ok) {
        document.body.appendChild(sendingMsgSuccess);
        const sendingMsgSuccessPlate = document.querySelector('.success');
        sendingMsgSuccessBtn.addEventListener('click', () => {
          // console.log('разблокируем кнопку');
          // console.log(submitBtn);
          sendingMsgSuccessPlate.remove();
          submitBtnUnblock();
        });
      }
    })
    .catch(() => {
      document.body.appendChild(sendingMsgError);
      const sendingMsgErrorPlate = document.querySelector('.error');
      sendingMsgErrorBtn.addEventListener('click', () => {
        submitBtnUnblock();
        sendingMsgErrorPlate.remove();
      });
      // console.log('разблокируем кнопку');
      // console.log(submitBtn);
    })
    // .finally(() => {
    // submitBtnUnblock();
    // })
    ;
  // submitBtnUnblock();
};

