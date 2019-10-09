'use strict';

(function () {
  window.util = {
    getRandomArrayElement: function (array) {
      return Math.round(Math.random() * (array.length - 1));
    }
  };
})();
