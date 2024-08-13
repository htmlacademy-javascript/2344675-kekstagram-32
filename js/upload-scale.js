const scaleIndicator = document.querySelector('.scale__control--value');
const scaleDowmBtn = document.querySelector('.scale__control--smaller');
const scaleUpBtn = document.querySelector('.scale__control--bigger');
const scalablePicture = document.querySelector('.img-upload__preview img');

const SCALE_MIN = 0.25;
const SCALE_MAX = 1;
const SCALE_STEP = 0.25;
const SCALE_DEFAULT = 1;

let scale = SCALE_DEFAULT;

const applyScale = (scaleToApply) => {
  scalablePicture.style.transform = `scale(${scaleToApply})`;
  scaleIndicator.value = `${scaleToApply * 100}%`;
};

scaleDowmBtn.addEventListener('click', () => {
  if (scale > SCALE_MIN) {
    scale -= SCALE_STEP;
    applyScale(scale);
  }
});

scaleUpBtn.addEventListener('click', () => {
  if (scale < SCALE_MAX) {
    scale += SCALE_STEP;
    applyScale(scale);
  }
});

export const scaleReset = () => {
  scale = SCALE_DEFAULT;
  applyScale(SCALE_DEFAULT);
};
