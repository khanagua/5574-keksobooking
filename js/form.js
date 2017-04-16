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

  // Сбрасыаем значения при отправке
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    form.reset();
  });

})();
