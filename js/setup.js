'use strict';

var WIZARDS = {
  names: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  lastNames: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  coatColor: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  eyesColor: ['black', 'red', 'blue', 'yellow', 'green']
};

var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var LENGTH_OF_GENERATED_ARRAY = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var wizardsList = document.querySelector('.setup-similar-list');
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var dialogWindow = document.querySelector('.setup');
var openDialogWindow = document.querySelector('.setup-open');
var closeDialogWindow = dialogWindow.querySelector('.setup-close');
var dialogWindowInput = dialogWindow.querySelector('.setup-user-name');
var wizardCoat = dialogWindow.querySelector('.wizard-coat');
var wizardEyes = dialogWindow.querySelector('.wizard-eyes');
var fireball = dialogWindow.querySelector('.setup-fireball-wrap');

var getRandomArrayElement = function (array) {
  return Math.round(Math.random() * (array.length - 1));
};

var generateOneWizard = function (wizardsData) {
  var wizardFirstName = wizardsData.names[getRandomArrayElement(wizardsData.names)];
  var wizardLastName = wizardsData.lastNames[getRandomArrayElement(wizardsData.lastNames)];

  return {
    name: wizardFirstName + ' ' + wizardLastName,
    coatColor: wizardsData.coatColor[getRandomArrayElement(wizardsData.coatColor)],
    eyesColor: wizardsData.eyesColor[getRandomArrayElement(wizardsData.eyesColor)]
  };
};

var generateWizards = function () {
  var generatedWizards = [];

  while (generatedWizards.length < LENGTH_OF_GENERATED_ARRAY) {
    generatedWizards.push(generateOneWizard(WIZARDS));
  }

  return generatedWizards;
};

var renderWizard = function (wizard) {
  var wizardElement = wizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var generateWizardsList = function (wizardsGeneratedData) {
  var fragment = document.createDocumentFragment();

  wizardsGeneratedData.forEach(function (wizard) {
    fragment.appendChild(renderWizard(wizard));
  });

  wizardsList.appendChild(fragment);
};


var imgClickHandler = function () {
  dialogWindow.classList.remove('hidden');
  wizardCoat.addEventListener('click', svgCoatColorClickHandler);
  wizardEyes.addEventListener('click', svgEyesColorClickHandler);
  fireball.addEventListener('click', divFireballClickHandler);
};

var closeButtonClickHandler = function () {
  dialogWindow.classList.add('hidden');
  wizardCoat.removeEventListener('click', svgCoatColorClickHandler);
  wizardEyes.removeEventListener('click', svgEyesColorClickHandler);
  fireball.removeEventListener('click', divFireballClickHandler);
};

var svgCoatColorClickHandler = function () {
  var coatColor = WIZARDS.coatColor[getRandomArrayElement(WIZARDS.coatColor)];
  wizardCoat.style.fill = coatColor;
  dialogWindow.querySelector('input[name="coat-color"]').value = coatColor;
};

var svgEyesColorClickHandler = function () {
  var eyeColor = WIZARDS.eyesColor[getRandomArrayElement(WIZARDS.eyesColor)];
  wizardEyes.style.fill = eyeColor;
  dialogWindow.querySelector('input[name="eyes-color"]').value = eyeColor;
};

var divFireballClickHandler = function () {
  var newColor = FIREBALL_COLOR[getRandomArrayElement(FIREBALL_COLOR)];
  fireball.style.backgroundColor = newColor;
  fireball.querySelector('input').value = newColor;
};

openDialogWindow.addEventListener('click', imgClickHandler);

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    imgClickHandler();
  }
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE && !(dialogWindowInput === document.activeElement)) {
    closeButtonClickHandler();
  }
});

closeDialogWindow.addEventListener('click', closeButtonClickHandler);

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeButtonClickHandler();
  }
});

dialogWindowInput.addEventListener('invalid', function () {
  if (dialogWindowInput.validity.tooShort) {
    dialogWindowInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (dialogWindowInput.validity.tooLong) {
    dialogWindowInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (dialogWindowInput.validity.valueMissing) {
    dialogWindowInput.setCustomValidity('Обязательное поле');
  } else {
    dialogWindowInput.setCustomValidity('');
  }
});

dialogWindowInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});

generateWizardsList(generateWizards());

document.querySelector('.setup-similar').classList.remove('hidden');
