'use strict';

(function () {
  // добавляем динамики - клик на пине и показ информации в блоке
  window.card = document.querySelector('.dialog');
  window.closeCard = window.card.querySelector('.dialog__close');

  window.map.addEventListener('click', function (evt) {
    window.showCard(evt.target);
  });

  window.map.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      window.showCard(evt.target);
    }
  });

  // Перетаскивание пина по карте пользователем
  window.pinHandle = window.map.querySelector('.pin__main');

  window.pinHandle.addEventListener('mousedown', function (evt) {
    // получаем первычные координаты пина
    evt.preventDefault();
    var pinCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    /**
    * Определить новое положение пина и прописать его координаты в поле адрес
    * @param {Event} moveEvt объект события
    */
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: pinCoords.x - moveEvt.clientX,
        y: pinCoords.y - moveEvt.clientY
      };

      pinCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      // перемещаем пин по новым координатам
      window.pinHandle.style.left = (window.pinHandle.offsetLeft - shift.x) + 'px';
      window.pinHandle.style.top = (window.pinHandle.offsetTop - shift.y) + 'px';

      // передаем координаты в форму с поправкой на хвостик пина
      window.pinHandleWidth = window.pinHandle.offsetWidth;
      window.pinHandleHeight = window.pinHandle.offsetHeight;
      var actualX = window.pinHandle.offsetLeft - shift.x + (window.pinHandleWidth / 2);
      var actualY = window.pinHandle.offsetTop - shift.y + window.pinHandleHeight;

      if ((actualX <= 1210) && (actualY <= 645)) {
        window.address.value = 'x: ' + actualX + ', y: ' + actualY;
      } else {
        window.map.removeEventListener('mousemove', onMouseMove);
        window.map.removeEventListener('mouseup', onMouseUp);
      }
    };

    /**
    * Перестать отслеживать движения курсора
    * @param {Event} upEvt объект события
    */
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.map.removeEventListener('mousemove', onMouseMove);
      window.map.removeEventListener('mouseup', onMouseUp);
    };

    window.map.addEventListener('mousemove', onMouseMove);
    window.map.addEventListener('mouseup', onMouseUp);
  });

})();
