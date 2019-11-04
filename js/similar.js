'use strict';

(function () {
  var dialogWindow = document.querySelector('.setup');
  var wizardCoat = dialogWindow.querySelector('.wizard-coat');
  var wizardEyes = dialogWindow.querySelector('.wizard-eyes');
  var fireball = dialogWindow.querySelector('.setup-fireball-wrap');
  var allWizards;
  var newCoatColor;
  var newEyesColor;

  var getRank = function (wizards) {
    var rank = 0;

    if (wizards.colorCoat === newCoatColor) {
      rank += 2;
    }
    if (wizards.colorEyes === newEyesColor) {
      rank += 1;
    }
    return rank;
  };

  var rankNames = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {

    window.wizard.renderSimilarWizads(allWizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = rankNames(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  var svgCoatColorClickHandler = function () {
    var coatColor = allWizards[window.util.getRandomArrayElement(allWizards)].colorCoat;
    wizardCoat.style.fill = coatColor;
    dialogWindow.querySelector('input[name="coat-color"]').value = coatColor;
    newCoatColor = coatColor;
    window.debounce.useDebounce(updateWizards);
  };

  var svgEyesColorClickHandler = function () {
    var eyeColor = allWizards[window.util.getRandomArrayElement(allWizards)].colorEyes;
    wizardEyes.style.fill = eyeColor;
    dialogWindow.querySelector('input[name="eyes-color"]').value = eyeColor;
    newEyesColor = eyeColor;
    window.debounce.useDebounce(updateWizards);
  };

  var divFireballClickHandler = function () {
    var newColor = allWizards[window.util.getRandomArrayElement(allWizards)].colorFireball;
    fireball.style.backgroundColor = newColor;
    fireball.querySelector('input').value = newColor;
  };

  var successHandler = function (wizards) {
    allWizards = wizards;
    updateWizards();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  window.similar = {
    errorHandler: errorHandler,
    closeButtonClickHandler: function () {
      dialogWindow.classList.add('hidden');
      wizardCoat.removeEventListener('click', svgCoatColorClickHandler);
      wizardEyes.removeEventListener('click', svgEyesColorClickHandler);
      fireball.removeEventListener('click', divFireballClickHandler);
    },
    openDialogWindowClickHandler: function () {
      dialogWindow.classList.remove('hidden');
      wizardCoat.addEventListener('click', svgCoatColorClickHandler);
      wizardEyes.addEventListener('click', svgEyesColorClickHandler);
      fireball.addEventListener('click', divFireballClickHandler);
    }
  };
})();
