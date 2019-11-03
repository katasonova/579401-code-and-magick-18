'use strict';

(function () {
  var LENGTH_OF_GENERATED_ARRAY = 4;

  var wizardsList = document.querySelector('.setup-similar-list');
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = wizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var renderSimilarWizads = function (wizards) {
    var limitRenderedWizardsAmount = wizards.length > LENGTH_OF_GENERATED_ARRAY ? LENGTH_OF_GENERATED_ARRAY : wizards.length;
    wizardsList.innerHTML = '';
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < limitRenderedWizardsAmount; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    var dialogWindow = document.querySelector('.setup');

    wizardsList.appendChild(fragment);

    dialogWindow.querySelector('.setup-similar').classList.remove('hidden');
  };

  window.render = {
    renderSimilarWizads: renderSimilarWizads
  };
})();
