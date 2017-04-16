'use strict';

window.data = (function () {

  window.AVATARS = ['01', '02', '03', '04', '05', '06', '07', '08'];
  window.TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  window.TYPES = ['flat', 'house', 'bungalo'];
  window.CHECKIN = ['12:00', '13:00', '14:00'];
  window.CHECKOUT = ['12:00', '13:00', '14:00'];
  window.FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  /**
  * Создать массив из нескольких объявлений
  * @param {number} NUMBER_ADVERT количество комнат
  * @return {object} advertArr
  */
  function creatAdvertArr(NUMBER_ADVERT) {
    var advertArr = [];
    for (var i = 0; i < NUMBER_ADVERT; i++) {
      advertArr[i] = getAdverts();
    }
    return advertArr;
  }










  /**
  * Получить случайное число в промежутке [min, max]
  * @param {Number} min минимальное число
  * @param {Number} max максимально число
  * @return {Number}
  */
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * ((max + 1) - min)) + min;
  }

  /**
  * Получить и удалить рандомный неповторяющийся элемент из массива
  * @param {object} array массив данных
  * @return {object}
  */
  function getElementWithoutRepeat(array) {
    var randomIndex = getRandomNumber(0, array.length - 1);
    var randomElement = array[randomIndex];
    array.splice(randomIndex, 1);
    return randomElement;
  }


  /**
  * Получить массив рандомной длины из рандомных неповторяющихся элементов
  * @param {string[]} array массив данных
  * @return {object}
  */
  function getArrayRandomElement(array) {
    var randomArrayLength = getRandomNumber(0, array.length - 1);
    var randomArray = [];
    for (var i = 0; i <= randomArrayLength; i++) {
      randomArray[i] = getElementWithoutRepeat(array);
    }
    return randomArray;
  }

  /**
  * Получить массив одного объявления
  * @return {object[]}
  */
  function getAdverts() {
    var xLocation = getRandomNumber(300, 900);
    var yLocation = getRandomNumber(100, 500);
    return {
      author: {
        avatar: 'img/avatars/user' + getElementWithoutRepeat(AVATARS) + '.png'
      },
      location: {
        x: xLocation,
        y: yLocation
      },
      offer: {
        title: getElementWithoutRepeat(TITLES),
        address: (xLocation + ', ' + yLocation),
        price: getRandomNumber(1000, 1000000),
        type: TYPES[getRandomNumber(0, TYPES.length - 1)],
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 100),
        checkin: CHECKIN[getRandomNumber(0, CHECKIN.length - 1)],
        checkout: CHECKOUT[getRandomNumber(0, CHECKOUT.length - 1)],
        features: getArrayRandomElement(FEATURES),
        description: '',
        photos: []
      },
    };
  }





})();
