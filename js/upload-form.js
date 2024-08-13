import {scaleReset} from './upload-scale.js';
import {
  sliderInit,
  resetEffect
} from './effects.js';
import {proceedUpload} from './upload-form-sending.js';

const pageBody = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancelUploadBtn = document.querySelector('.img-upload__cancel');
const uploadFileInput = document.querySelector('.img-upload__input');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const fileField = document.querySelector('.img-upload__input');
const photoPreview = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

const MAX_HASHTAGS_COUNT = 5;
const HASHTAD_ALLOWED_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const SPACELIKE_CHARS = /\s+/g;
const VALIDATE_ERROR_MESSAGES = {
  EXCEED_MAX_COUNT: `Не более ${MAX_HASHTAGS_COUNT} хештегов`,
  MISMATCH_PATTERN: 'Только буквы и цифры, до 19 знаков после «#»',
  NOT_UNIQUE: 'Хештеги не должны повторяться',
};
const PHOTO_TYPES = ['png', 'jpg', 'jpeg'];

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

export const clearFormListener = () => {
  document.removeEventListener('keydown', onUploadEsc);
};

export const addFormListener = () => {
  document.addEventListener('keydown', onUploadEsc);
};

export const closeUploadModal = () => {
  uploadForm.reset();
  pristine.reset();
  scaleReset();
  resetEffect();
  uploadOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onUploadEsc);
};

function onUploadEsc(evt) {
  if (evt.key === 'Escape' && document.activeElement !== hashtagInput && document.activeElement !== commentInput) {
    evt.preventDefault();
    closeUploadModal();
  }
}

const onUploadCancelBtn = () => {
  closeUploadModal();
  document.removeEventListener('keydown', onUploadEsc);
};

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return PHOTO_TYPES.some((fileExtention) => fileName.endsWith(fileExtention));
};

const onFileChange = () => {
  uploadOverlay.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  const file = fileField.files[0];
  if (file && isValidType(file)) {
    photoPreview.src = URL.createObjectURL(file);
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${photoPreview.src}')`;
    });
  }

  sliderInit();
  document.addEventListener('keydown', onUploadEsc);
};

const normalizeHashtags = (tagString) => tagString
  .replaceAll(SPACELIKE_CHARS, ' ')
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

const hasValidTags = (value) => normalizeHashtags(value).every((tag) => HASHTAD_ALLOWED_SYMBOLS.test(tag));

const hasValidCount = (value) => normalizeHashtags(value).length <= MAX_HASHTAGS_COUNT;

const hasUniqueTags = (value) => {
  const LowerCaseTags = normalizeHashtags(value).map((tag) => tag.toLowerCase());
  return LowerCaseTags.length === new Set(LowerCaseTags).size;
};

const onUploadSubmit = (evt) => {
  evt.preventDefault();
  if(pristine.validate()) {
    proceedUpload(evt);
  }
};

pristine.addValidator(
  hashtagInput,
  hasValidCount,
  VALIDATE_ERROR_MESSAGES.EXCEED_MAX_COUNT,
  3,
  false
);

pristine.addValidator(
  hashtagInput,
  hasUniqueTags,
  VALIDATE_ERROR_MESSAGES.NOT_UNIQUE,
  2,
  false
);

pristine.addValidator(
  hashtagInput,
  hasValidTags,
  VALIDATE_ERROR_MESSAGES.MISMATCH_PATTERN,
  1,
  false
);

uploadFileInput.addEventListener('change', onFileChange);
uploadCancelUploadBtn.addEventListener('click', onUploadCancelBtn);
uploadForm.addEventListener('submit', onUploadSubmit);
