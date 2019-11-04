'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout;
  var useDebounce = function (newWizards) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(newWizards, DEBOUNCE_INTERVAL);
  };

  window.debounce = {
    useDebounce: useDebounce
  };
})();
