'use strict';

window.filterAdverts = (function () {
  /**
  * Отфильтровать массив
  * @param {object[]} filterArray массив объявлений
  * @return {object[]}
  */
  function filterFunction(filterArray) {
    var advertArrFilters = [];
    filterArray.forEach(function (advert) {
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
    return advertArrFilters;
  }

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
  * @param {string[]} features набор услуг
  * @return {boolean}
  */
  function isfeaturesCorrect(features) {
    var housingFeatures = document.querySelector('#housing_features');
    var elements = housingFeatures.elements;

    for (var index = 0; index < elements.length; index++) {
      if (elements[index].checked && features.indexOf(elements[index].value) === -1) {
        return false;
      }
    }
    return true;
  }

  return filterFunction;
})();
