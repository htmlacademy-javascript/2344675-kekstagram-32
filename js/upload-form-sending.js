const SERVER_URL_UPLOAD = 'https://32.javascript.htйmlacademy.pro/kekstagram';
const submitBtn = document.querySelector('.img-upload__submit');
const submitBtnDefaultText = submitBtn.textContent;

const sendingMsgSuccess = document.querySelector('#success').content.cloneNode(true);
const sendingMsgSuccessBtn = sendingMsgSuccess.querySelector('.success__button');

const sendingMsgError = document.querySelector('#error').content.cloneNode(true);
const sendingMsgErrorBtn = sendingMsgError.querySelector('.error__button');


const submitBtnBlock = () => {
  submitBtn.disabled = true;
  submitBtn.textContent = 'Отправляется...';
};

const submitBtnUnblock = () => {
  submitBtn.disabled = false;
  submitBtn.textContent = submitBtnDefaultText;
};

const CloseMsgPlateEsc = (evt, plate) => {
  console.log(evt);
  if (evt.key === 'Escape') {
    console.log('Нажат Esc');

  }
};

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
          sendingMsgSuccessPlate.remove();
        });
        submitBtnUnblock();
        document.addEventListener('keydown', CloseMsgPlateEsc(evt, sendingMsgSuccessPlate));
      }
    })
    .catch(() => {
      document.body.appendChild(sendingMsgError);

      const sendingMsgErrorPlate = document.querySelector('.error');
      sendingMsgErrorBtn.addEventListener('click', () => {
        sendingMsgErrorPlate.remove();
      });
      submitBtnUnblock();
      document.addEventListener('keydown', CloseMsgPlateEsc(evt, sendingMsgErrorPlate));
    });

};

