'use strict';

(function () {

  // РАЗДЕЛ Валидация формы
  var form = document.forms[1];
  var timeIn = form.elements.time;
  var timeOut = form.elements.timeout;

  timeIn.addEventListener('change', function () {
    timeOut.selectedIndex = timeIn.selectedIndex;
  });

  timeOut.addEventListener('change', function () {
    timeIn.selectedIndex = timeOut.selectedIndex;
  });

  var type = form.elements.type;
  var price = form.elements.price;
  var MIN_PRICE = {
    flat: 1000,
    hovel: 0,
    palace: 10000
  };

  type.addEventListener('change', function () {
    var minPrice = MIN_PRICE[type.value];
    price.setAttribute('min', minPrice);
  });

  var roomNumber = form.elements.room_number;
  var capacity = form.elements.capacity;
  var GUESTS_OF_ROOM = {
    1: '0',
    2: '3',
    100: '3'
  };

  roomNumber.addEventListener('change', function () {
    capacity.value = GUESTS_OF_ROOM[roomNumber.value];
  });

  window.address = form.elements.address;
  window.address.addEventListener('change', function () {
    var coordsArray = window.address.value.split(',');
    for (var i = 0; i < coordsArray.length; i++) {
      while (isNaN(coordsArray[i])) {
        coordsArray[i] = coordsArray[i].slice(1);
      }
      coordsArray[i] = +coordsArray[i];
    }

    if ((coordsArray[0] <= 1210) && (coordsArray[1] <= 645)) {
      window.pinHandle.style.left = coordsArray[0] - (window.pinHandleHeight / 2) + 'px';
      window.pinHandle.style.top = coordsArray[1] - window.pinHandleWidth + 'px';
    } else {
      alert('Значения не должны превышать 1210 и 645 соответственно');
    }
  });

  // Сбрасываем значения при отправке
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    form.reset();
  });

})();
