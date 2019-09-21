'use strict';

var WIZARDS = {
  names: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  lastNames: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  coatColor: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  eyesColor: ['black', 'red', 'blue', 'yellow', 'green']
};

var LENGTH_OF_GENERATED_ARRAY = 4;

var wizardsList = document.querySelector('.setup-similar-list');
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var generateOneWizard = function (wizardsData) {
  var wizardFirstName = wizardsData.names[Math.round(Math.random() * (wizardsData.names.length - 1))];
  var wizardLastName = wizardsData.lastNames[Math.round(Math.random() * (wizardsData.lastNames.length - 1))];

  return {
    name: wizardFirstName + ' ' + wizardLastName,
    coatColor: wizardsData.coatColor[Math.round(Math.random() * (wizardsData.coatColor.length - 1))],
    eyesColor: wizardsData.eyesColor[Math.round(Math.random() * (wizardsData.eyesColor.length - 1))]
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

  wizardsGeneratedData.forEach(function (el) {
    fragment.appendChild(renderWizard(el));
  });

  wizardsList.appendChild(fragment);
};

generateWizardsList(generateWizards());

document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');
