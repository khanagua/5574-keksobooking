'use strict';

window.map = (function (form) {
  var map = document.querySelector('.tokyo__pin-map');
  // добавляем динамики - клик на пине и показ информации в блоке
  var card = document.querySelector('.dialog');

  map.addEventListener('click', function (evt) {
    window.showCard(evt.target, card, map);
  });

  map.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      window.showCard(evt.target, card, map);
    }
  });

  // Перетаскивание пина по карте пользователем
  var pinHandle = map.querySelector('.pin__main');
  var pinHandleWidth = pinHandle.offsetWidth;
  var pinHandleHeight = pinHandle.offsetHeight;
  var address = form.elements.address;
  pinHandle.addEventListener('mousedown', function (evt) {
    // получаем первичные координаты пина
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
      pinHandle.style.left = (pinHandle.offsetLeft - shift.x) + 'px';
      pinHandle.style.top = (pinHandle.offsetTop - shift.y) + 'px';

      // передаем координаты в форму с поправкой на хвостик пина
      var actualX = pinHandle.offsetLeft - shift.x + (pinHandleWidth / 2);
      var actualY = pinHandle.offsetTop - shift.y + pinHandleHeight;

      if ((actualX <= 1210) && (actualY <= 645)) {
        address.value = 'x: ' + actualX + ', y: ' + actualY;
      } else {
        map.removeEventListener('mousemove', onMouseMove);
        map.removeEventListener('mouseup', onMouseUp);
      }
    };

    /**
    * Перестать отслеживать движения курсора
    * @param {Event} upEvt объект события
    */
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      map.removeEventListener('mousemove', onMouseMove);
      map.removeEventListener('mouseup', onMouseUp);
    };

    map.addEventListener('mousemove', onMouseMove);
    map.addEventListener('mouseup', onMouseUp);
  });

  // передача координат подвижному пину из поля адрес
  address.addEventListener('change', function () {
    var coordsArray = address.value.split(',');
    for (var i = 0; i < coordsArray.length; i++) {
      while (isNaN(coordsArray[i])) {
        coordsArray[i] = coordsArray[i].slice(1);
      }
      coordsArray[i] = Number(coordsArray[i]);
    }

    if ((coordsArray[0] <= 1210) && (coordsArray[1] <= 645)) {
      pinHandle.style.left = coordsArray[0] - (pinHandleHeight / 2) + 'px';
      pinHandle.style.top = coordsArray[1] - pinHandleWidth + 'px';
    }
  });

  return map;
})(window.form);
