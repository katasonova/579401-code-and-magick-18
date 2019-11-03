'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var dialogWindow = document.querySelector('.setup');
  var openDialogWindow = document.querySelector('.setup-open');
  var closeDialogWindow = dialogWindow.querySelector('.setup-close');
  var dialogWindowInput = dialogWindow.querySelector('.setup-user-name');
  var dialogImg = dialogWindow.querySelector('.upload');
  var dialogForm = dialogWindow.querySelector('.setup-wizard-form');

  var imgClickHandler = function () {
    window.similar.openDialogWindowClickHandler();

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE && !(dialogWindowInput === document.activeElement)) {
        closeButtonClickHandler();
      }
    });
  };

  var closeButtonClickHandler = function () {
    window.similar.closeButtonClickHandler();
  };

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      imgClickHandler();
    }
  });

  openDialogWindow.addEventListener('click', imgClickHandler);
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

  dialogImg.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var imgMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      dialogWindow.style.top = (dialogWindow.offsetTop - shift.y) + 'px';
      dialogWindow.style.left = (dialogWindow.offsetLeft - shift.x) + 'px';
    };

    var imgMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', imgMouseMoveHandler);
      document.removeEventListener('mouseup', imgMouseUpHandler);

      if (dragged) {
        var imgClickPreventDefaultHandler = function (evtClick) {
          evtClick.preventDefault();
          dialogImg.removeEventListener('click', imgClickPreventDefaultHandler);
        };
        dialogImg.addEventListener('click', imgClickPreventDefaultHandler);
      }
    };

    document.addEventListener('mousemove', imgMouseMoveHandler);
    document.addEventListener('mouseup', imgMouseUpHandler);
  });

  var successHandler = function () {
    dialogWindow.classList.add('hidden');
  };

  dialogForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(dialogForm), successHandler, window.similar.errorHandler);
    evt.preventDefault();
  });
})();
