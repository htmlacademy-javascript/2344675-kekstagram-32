const SERVER_URL_UPLOAD = 'https://32.javascript.htmlacademy.pro/kekstagram';
const submitBtn = document.querySelector('.img-upload__submit');
const submitBtnDefaultText = submitBtn.textContent;
const submitBtnProcessingtText = 'Отправляется...';




const blockSubmitBtn = () => {
  submitBtn.disabled = true;
  submitBtn.textContent = submitBtnProcessingtText;
};

const unblockSubmitBtn = () => {
  submitBtn.disabled = false;
  submitBtn.textContent = submitBtnDefaultText;
};

export const proceedUpload = (evt) => {
  console.log('proceedUpload:');
};

