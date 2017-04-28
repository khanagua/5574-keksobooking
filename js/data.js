'use strict';

(function () {

  window.URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';

  /**
  * Обработать полученные данные с сервера
  * @param {object} data массив объявлений с сервера
  */
  function onLoad(data) {
    window.originData = data;
    window.advertArr = data.slice(0, 3);
    window.renderPins(window.advertArr);
  }
  window.load(URL, onLoad);

  var tokyofilters = document.querySelector('.tokyo__filters');

  tokyofilters.addEventListener('change', function () {
    var advertArrFilters = [];
    window.originData.forEach(function (advert) {
      if (!isRoomCorrect(advert.offer.rooms)) {
        return;
      }

      if (!isGuestCorrect(advert.offer.guests)) {
        return;
      }

      if (!isTypeCorrect(advert.offer.type)) {
        return;
      }

      if (!isPriceCorrect(advert.offer.price)) {
        return;
      }

      if (!isfeaturesCorrect(advert.offer.features)) {
        return;
      }

      advertArrFilters.push(advert);
    });
    for (var i = 0; i < window.addedPins.length; i++) {
      window.map.removeChild(window.addedPins[i]);
    }
    window.advertArr = advertArrFilters;
    window.debounce(window.renderPins.bind(null, window.advertArr));

  });

  /**
  * Сравнить тип жилья со значением фильтра
  * @param {string} type тип жилья
  * @return {boolean}
  */
  function isTypeCorrect(type) {
    var housingType = document.querySelector('#housing_type');
    var value = housingType.value;
    return ((type === value) || (value === 'any'));
  }

  /**
  * Сравнить цену жилья со значением фильтра
  * @param {number} price цена жилья
  * @return {boolean}
  */
  function isPriceCorrect(price) {
    var housingPrice = document.querySelector('#housing_price');
    switch (housingPrice.value) {
      case 'high': return (price > 50000);
      case 'low' : return (price < 10000);
      case 'middle' : return (price >= 10000 && price <= 50000);
      default: return true;
    }
  }

  /**
  * Сравнить количество комнат со значением фильтра
  * @param {number} rooms количество комнат
  * @return {boolean}
  */
  function isRoomCorrect(rooms) {
    var housingRoomNumber = document.querySelector('#housing_room-number');
    var value = housingRoomNumber.value;
    return ((rooms.toString() === value) || (value === 'any'));
  }

  /**
  * Сравнить количество гостей со значением фильтра
  * @param {number} guests количество гостей
  * @return {boolean}
  */
  function isGuestCorrect(guests) {
    var housingGuestsNumber = document.querySelector('#housing_guests-number');
    var value = housingGuestsNumber.value;
    return ((guests.toString() === value) || (value === 'any'));
  }

  /**
  * Сравнить набор услуг со значением фильтра
  * @param {object} features набор услуг
  * @return {boolean}
  */
  function isfeaturesCorrect(features) {

    var housingFeatures = document.querySelector('#housing_features');
    var elements = housingFeatures.elements;

    for (var i = 0; i < elements.length; i++) {
      if (elements[i].checked && features.indexOf(elements[i].value) === -1) {
        return false;
      }
    }
    return true;
  }
})();
