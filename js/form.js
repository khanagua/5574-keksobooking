'use strict';

(function () {

  // синхронизация времен заезда и выезда
  var form = document.forms[1];
  var timeIn = form.elements.time;
  var timeOut = form.elements.timeout;

  /**
  * Синхронизировать значения двух полей
  * @param {object} time1 первое поле
  * @param {object} time2 второе поле
  */
  function syncValuestimeIntimeOut(time1, time2) {
    time2.selectedIndex = time1.selectedIndex;
  }

  window.synchronizeFields(timeIn, timeOut, null, syncValuestimeIntimeOut);
  window.synchronizeFields(timeOut, timeIn, null, syncValuestimeIntimeOut);

  // синхронизация значения стоимости
  var type = form.elements.type;
  var price = form.elements.price;
  var MIN_PRICE = {
    flat: 1000,
    hovel: 0,
    palace: 10000
  };

  /**
  * Синхронизировать минимальную цену жилья в соответствии с ее типом
  * @param {object} nodeType поле тип жилья
  * @param {object} nodePrice поле цена жилья
  * @param {object} mapOfPrice возможные значения поля цена
  */
  function syncValuesTypePrice(nodeType, nodePrice, mapOfPrice) {
    var minPrice = mapOfPrice[nodeType.value];
    nodePrice.setAttribute('min', minPrice);
    nodePrice.setAttribute('placeholder', minPrice);
  }

  window.synchronizeFields(type, price, MIN_PRICE, syncValuesTypePrice);

  // синхронизация значений количества комнат и гостей
  var roomNumber = form.elements.room_number;
  var capacity = form.elements.capacity;
  var GUESTS_OF_ROOM = {
    1: '0',
    2: '3',
    100: '3'
  };

  /**
  * Синхронизировать количество гостей в соответствии с количеством комнат
  * @param {object} nodeRoom поле количество комнат
  * @param {object} nodeCapacity поле количество гостей
  * @param {object} mapOfRoom возможные значения поля гости
  */
  function syncValuesRoomCapacity(nodeRoom, nodeCapacity, mapOfRoom) {
    nodeCapacity.value = mapOfRoom[nodeRoom.value];
  }

  window.synchronizeFields(roomNumber, capacity, GUESTS_OF_ROOM, syncValuesRoomCapacity);

  // передача координат подвижному пину из поля адрес
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
    }
  });

  // Сбрасываем значения при отправке
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    form.reset();
  });

})();
