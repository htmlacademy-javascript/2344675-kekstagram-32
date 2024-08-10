const SERVER_URL_UPLOAD = 'https://32.javascript.htmlacademy.pro/kekstagram';
const submitBtn = document.querySelector('.img-upload__submit');
const submitBtnDefaultText = submitBtn.textContent;

const sendingMsgSuccess = document.querySelector('#success').content.cloneNode(true);
const sendingMsgSuccessBtn = sendingMsgSuccess.querySelector('.success__button');

const sendingMsgError = document.querySelector('#error').content.cloneNode(true);
const sendingMsgErrorBtn = sendingMsgError.querySelector('.error__button');


// console.log('Изначальное состояние:');
// console.log(submitBtn);

const submitBtnBlock = () => {
  // console.log('============================');
  // console.log('submitBtnBlock');
  // console.log(submitBtn);
  submitBtn.disabled = true;
  // console.log('Кнопка заблокирована');
  submitBtn.textContent = 'Отправляется...';
  // console.log(submitBtn);
};

const submitBtnUnblock = () => {
  // console.log('============================');
  // console.log('submitBtnUnblock');
  // console.log(submitBtn.disabled);
  submitBtn.disabled = false;
  // console.log(submitBtn);
  // console.log('Кнопка разблокирована');
  // console.log(submitBtn.disabled);
  submitBtn.textContent = submitBtnDefaultText;
  // console.log(submitBtn);
};

export const proceedUpload = (evt) => {
  const formData = new FormData(evt.target);

  // console.log('Начали proceedUpload');
  // console.log(submitBtn); // ??? На этом шаге disabled === true, хотя такого присвоения еще не было.
  // console.log('блокируем кнопку');
  submitBtnBlock();
  // console.log(submitBtn);

  // console.log('Выполняем fetch...');
  fetch(SERVER_URL_UPLOAD,
    {
      method: 'POST',
      body: formData
    }
  )
    .then((response) => {
      // console.log('Получили response');
      if (response.ok) {
        // console.log("response = OK");
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
      // console.log('catch')
      document.body.appendChild(sendingMsgError);
      const sendingMsgErrorPlate = document.querySelector('.error');
      sendingMsgErrorBtn.addEventListener('click', () => {
        submitBtnUnblock();
        sendingMsgErrorPlate.remove();
      });
      // console.log('разблокируем кнопку');
      // console.log(submitBtn);
    });
  // submitBtnUnblock();
};

