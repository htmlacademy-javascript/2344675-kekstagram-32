const SERVER_URL_UPLOAD = 'https://32.javascript.htmlacademy.pro/kekstagram';
const submitBtn = document.querySelector('.img-upload__submit');
const submitBtnDefaultText = submitBtn.textContent;

const submitBtnBlock = () => {
  submitBtn.disabled = 'true';
  // console.log('Кнопка заблокирована');
  submitBtn.textContent = 'Отправляется...';
};

const submitBtnUnblock = () => {
  submitBtn.disabled = 'false';
  // console.log('Кнопка разблокирована');
  submitBtn.textContent = submitBtnDefaultText;
};

const sendingMsgSuccess = document.querySelector('#success').content.cloneNode(true);
const sendingMsgSuccessBtn = sendingMsgSuccess.querySelector('.success__button');

const sendingMsgError = document.querySelector('#error').content.cloneNode(true);
const sendingMsgErrorBtn = sendingMsgError.querySelector('.error__button');


export const proceedUpload = (evt) => {
  const formData = new FormData(evt.target);

  submitBtnBlock();
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
          submitBtnUnblock();
          sendingMsgSuccessPlate.remove();
        });
      }
    })
    .catch(() => {
      document.body.appendChild(sendingMsgError);
      const sendingMsgErrorPlate = document.querySelector('.error');
      sendingMsgErrorBtn.addEventListener('click', () => {
        sendingMsgErrorPlate.remove();
      });
      // console.log('разблокируем кнопку');
      // console.log(submitBtn);
      submitBtnUnblock();
    })
    // .finally(() => {
    // submitBtnUnblock();
    // })
    ;
  // submitBtnUnblock();
};

