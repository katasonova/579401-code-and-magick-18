'use strict';

(function () {
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var dialogWindow = document.querySelector('.setup');
  var openDialogWindow = document.querySelector('.setup-open');
  var closeDialogWindow = dialogWindow.querySelector('.setup-close');
  var dialogWindowInput = dialogWindow.querySelector('.setup-user-name');
  var wizardCoat = dialogWindow.querySelector('.wizard-coat');
  var wizardEyes = dialogWindow.querySelector('.wizard-eyes');
  var fireball = dialogWindow.querySelector('.setup-fireball-wrap');

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
    var coatColor = window.WIZARDS.coatColor[window.util.getRandomArrayElement(window.WIZARDS.coatColor)];
    wizardCoat.style.fill = coatColor;
    dialogWindow.querySelector('input[name="coat-color"]').value = coatColor;
  };

  var svgEyesColorClickHandler = function () {
    var eyeColor = window.WIZARDS.eyesColor[window.util.getRandomArrayElement(window.WIZARDS.eyesColor)];
    wizardEyes.style.fill = eyeColor;
    dialogWindow.querySelector('input[name="eyes-color"]').value = eyeColor;
  };

  var divFireballClickHandler = function () {
    var newColor = FIREBALL_COLOR[window.util.getRandomArrayElement(FIREBALL_COLOR)];
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
})();
