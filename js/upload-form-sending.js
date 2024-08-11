const SERVER_URL_UPLOAD = 'https://32.javascript.htmlacademy.pro/kekstagram';
const submitBtn = document.querySelector('.img-upload__submit');
const submitBtnDefaultText = submitBtn.textContent;

const sendingMsgSuccessTemplate
 = document.querySelector('#success').content;
const sendingMsgSuccess
 = sendingMsgSuccessTemplate.cloneNode(true);
const sendingMsgSuccessBtn
 = sendingMsgSuccess.querySelector('.success__button');

const sendingMsgError = document.querySelector('#error').content.cloneNode(true);
const sendingMsgErrorBtn = sendingMsgError.querySelector('.error__button');


const blockSubmitBtn = () => {
  submitBtn.disabled = true;
  submitBtn.textContent = 'Отправляется...';
};

const unblockSubmitBtn = () => {
  submitBtn.disabled = false;
  submitBtn.textContent = submitBtnDefaultText;
};

export const proceedUpload = (evt) => {
  console.log('Запущен proceedUpload');
  const formData = new FormData(evt.target);

  blockSubmitBtn();

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
        // console.log(sendingMsgSuccessPlate); // ??? На второй итерации возвращает null
        sendingMsgSuccessBtn.addEventListener('click', () => {
          sendingMsgSuccessPlate.remove();
        });
        unblockSubmitBtn();
      }
    })
    .catch(() => {
      document.body.appendChild(sendingMsgError);

      const sendingMsgErrorPlate = document.querySelector('.error');
      sendingMsgErrorBtn.addEventListener('click', () => {
        sendingMsgErrorPlate.remove();
      });
      unblockSubmitBtn();
    });

};

