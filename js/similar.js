'use strict';

(function () {
    window.WIZARDS = {
    coatColor:[
    'rgb(146, 100, 161)',
    'rgb(215, 210, 55)',
    'rgb(241, 43, 107)',
    'rgb(101, 137, 164)',
    'rgb(0, 0, 0)',
    'rgb(215, 210, 55)',
    'rgb(56, 159, 117)',
    'rgb(241, 43, 107)'
  ],
    eyesColor: [
    'red',
    'orange',
    'yellow',
    'green',
    'lightblue',
    'blue',
    'purple'
  ]
  };
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var dialogWindow = document.querySelector('.setup');
  var wizardCoat = dialogWindow.querySelector('.wizard-coat');
  var wizardEyes = dialogWindow.querySelector('.wizard-eyes');
  var fireball = dialogWindow.querySelector('.setup-fireball-wrap');
  var allWizards = [];
  var newCoatColor;
  var newEyesColor;
  var newFireballColor;
  // var LENGTH_OF_GENERATED_ARRAY = 4;

  // var wizardsList = document.querySelector('.setup-similar-list');
  // var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // var renderWizard = function (wizard) {
  //   var wizardElement = wizardTemplate.cloneNode(true);

  //   wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  //   wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  //   wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  //   return wizardElement;
  // };
  var updateWizards = function () {
    var sameCoatWizards = allWizards.filter(function(element) {
      return element.coatColor === newCoatColor;
    });

    console.log('filtered array' + sameCoatWizards);
    console.log('server data' + allWizards)

    window.render.renderSimilarWizads(sameCoatWizards);
  }

  var svgCoatColorClickHandler = function () {
    var coatColor = window.WIZARDS.coatColor[window.util.getRandomArrayElement(window.WIZARDS.coatColor)];
    wizardCoat.style.fill = coatColor;
    dialogWindow.querySelector('input[name="coat-color"]').value = coatColor;
    newCoatColor = coatColor;
    updateWizards();
    console.log('new color' + newCoatColor)
  };

  var svgEyesColorClickHandler = function () {
    var eyeColor = window.WIZARDS.eyesColor[window.util.getRandomArrayElement(window.WIZARDS.eyesColor)];
    wizardEyes.style.fill = eyeColor;
    dialogWindow.querySelector('input[name="eyes-color"]').value = eyeColor;
    newEyesColor = eyeColor;
    updateWizards();
  };

  var divFireballClickHandler = function () {
    var newColor = FIREBALL_COLOR[window.util.getRandomArrayElement(FIREBALL_COLOR)];
    fireball.style.backgroundColor = newColor;
    fireball.querySelector('input').value = newColor;
    newFireballColor = newColor;
    updateWizards();
  };

  var successHandler = function (wizards) {
    allWizards = wizards;
    updateWizards();
    // var dialogWindow = document.querySelector('.setup');
    // var fragment = document.createDocumentFragment();

    // for (var i = 0; i < LENGTH_OF_GENERATED_ARRAY; i++) {
    //   fragment.appendChild(renderWizard(wizards[i]));
    // }
    // wizardsList.appendChild(fragment);

    // dialogWindow.querySelector('.setup-similar').classList.remove('hidden');
    // window.render.renderSimilarWizads(allWizards);

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

  //document.querySelector('.setup-similar').classList.remove('hidden');

  window.similar = {
    errorHandler: errorHandler,
    // svgCoatColorClickHandler: svgCoatColorClickHandler,
    // svgEyesColorClickHandler: svgEyesColorClickHandler,
    // divFireballClickHandler: divFireballClickHandler
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
