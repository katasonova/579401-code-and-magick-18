'use strict';

var WIZARDS = {
  names: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  lastNames: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  coatColor: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  eyesColor: ['black', 'red', 'blue', 'yellow', 'green']
};

var generatedWizards = [];
var wizardsList = document.querySelector('.setup-similar-list');
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

var generateWizards = function (wizardsData) {
  while (generatedWizards.length < 4) {
    var newWizard = {};
    var wizardFirstName = wizardsData.names[Math.round(Math.random() * (wizardsData.names.length - 1))];
    var wizardLastName = wizardsData.lastNames[Math.round(Math.random() * (wizardsData.lastNames.length - 1))];
    newWizard.name = wizardFirstName + ' ' + wizardLastName;
    newWizard.coatColor = wizardsData.coatColor[Math.round(Math.random() * (wizardsData.coatColor.length - 1))];
    newWizard.eyesColor = wizardsData.eyesColor[Math.round(Math.random() * (wizardsData.eyesColor.length - 1))];

    generatedWizards.push(newWizard);
  }
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

  for (var i = 0; i < wizardsGeneratedData.length; i++) {
    fragment.appendChild(renderWizard(wizardsGeneratedData[i]));
  }

  wizardsList.appendChild(fragment);
};

generateWizards(WIZARDS);
generateWizardsList(generatedWizards);
