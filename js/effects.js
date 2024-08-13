const Effect = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};

const sliderEffectsOptions = {
  [Effect.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1
  },
  [Effect.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1,
    style: 'grayscale',
    unit: ''
  },
  [Effect.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1,
    style: 'sepia',
    unit: ''
  },
  [Effect.MARVIN]: {
    min: 0,
    max: 100,
    step: 1,
    style: 'invert',
    unit: '%'
  },
  [Effect.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1,
    style: 'blur',
    unit: 'px'
  },
  [Effect.HEAT]: {
    min: 0,
    max: 3,
    step: 0.1,
    style: 'brightness',
    unit: ''
  }
};

const modal = document.querySelector('.img-upload');
const previewImage = modal.querySelector('.img-upload__preview img');
const effectsControl = modal.querySelector('.effects');
const sliderLanding = modal.querySelector('.effect-level__slider');
const sliderContainer = modal.querySelector('.img-upload__effect-level');
const effectLevelElement = modal.querySelector('.effect-level__value');

let selectedEffect = Effect.DEFAULT;

const isDefault = () => selectedEffect === Effect.DEFAULT;

const setImageStyle = () => {
  if (isDefault()) {
    previewImage.style.filter = null;
    return;
  }
  const {value} = effectLevelElement;
  const {style, unit} = sliderEffectsOptions[selectedEffect];
  previewImage.style.filter = `${style}(${value}${unit})`;
};

const showSlider = () => {
  sliderContainer.classList.remove('hidden');
};

const hideSlider = () => {
  sliderContainer.classList.add('hidden');
};

const onSliderUpdate = () => {
  effectLevelElement.value = sliderLanding.noUiSlider.get();
  setImageStyle();
};

const createSlider = ({ min, max, step}) => {
  noUiSlider.create(sliderLanding, {
    range: { min, max },
    step,
    start: max,
    connect: 'lower',
    format: {
      to: (value) => Number(value),
      from: (value) => Number(value)
    }
  });
  sliderLanding.noUiSlider.on('update', onSliderUpdate);
  hideSlider();
};

const updateSlider = ({ min, max, step}) => {
  sliderLanding.noUiSlider.updateOptions({
    range: { min, max },
    step,
    start: max
  });
};

const setSlider = () => {
  if (isDefault()) {
    hideSlider();
  } else {
    updateSlider(sliderEffectsOptions[selectedEffect]);
    showSlider();
  }
};

const setEffect = (effect) => {
  selectedEffect = effect;
  setSlider();
  setImageStyle();
};

export const resetEffect = () => {
  setEffect(Effect.DEFAULT);
};

const onEffectsChange = (evt) => {
  setEffect(evt.target.value);
};

let sliderCreatedFlag = false;

export const sliderInit = () => {
  if (!sliderCreatedFlag) {
    createSlider(sliderEffectsOptions[selectedEffect]);
  }
  effectsControl.addEventListener('change', onEffectsChange);
  sliderCreatedFlag = true;
};
