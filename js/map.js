'use strict';

var AVATARS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var NUMBER_ADVERT = 8;  // количество объявлений

/**
* Получить рандомное целое число
* @param {Number} min минимальное число
* @param {Number} max максимально число
* @return {Number}
*/
function getRandomNumber(min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min)) + min;
  return randomNumber;
}

/**
* Получить и удалить рандомный неповторяющийся элемент из массива
* @param {object} array массив данных
* @return {object}
*/
function getElementWithoutRepeat(array) {
  var randomIndex = getRandomNumber(0, array.length);
  var randomElement = array[randomIndex];
  array.splice(randomIndex, 1);
  return randomElement;
}

/**
* Получить массив рандомной длины из рандомных неповторяющихся элементов
* @param {object} array массив данных
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
* @return {object}
*/
function getAdverts() {
  var advertItems = {};
  advertItems.author = {};
  advertItems.author.avatar = 'img/avatars/user' + getElementWithoutRepeat(AVATARS) + '.png';
  advertItems.location = {};
  advertItems.location.x = getRandomNumber(300, 900);
  advertItems.location.y = getRandomNumber(100, 500);
  advertItems.offer = {};
  advertItems.offer.title = getElementWithoutRepeat(TITLES);
  advertItems.offer.address = (advertItems.location.x + ', ' + advertItems.location.y);
  advertItems.offer.price = getRandomNumber(1000, 1000000);
  advertItems.offer.type = TYPES[getRandomNumber(0, TYPES.length)];
  advertItems.offer.rooms = getRandomNumber(1, 5);
  advertItems.offer.guests = getRandomNumber(1, 100);
  advertItems.offer.checkin = CHECKIN[getRandomNumber(0, CHECKIN.length)];
  advertItems.offer.checkout = CHECKOUT[getRandomNumber(0, CHECKOUT.length)];
  advertItems.offer.features = getArrayRandomElement(FEATURES);
  advertItems.offer.description = '';
  advertItems.offer.photos = [];
  return advertItems;
}

/**
* Создать массив из нескольких объявлений
* @return {object}
*/
function creatAdvertArr() {
  var advertArr = [];
  for (var i = 0; i < NUMBER_ADVERT; i++) {
    advertArr[i] = getAdverts();
  }
  return advertArr;
}

// создаем массив объявлений
var adverts = creatAdvertArr();

// отрисовываем элементы
var parentForPins = document.querySelector('.tokyo__pin-map');

/**
* Сгенерировать пины
* @param {object} advert элемент массива объявлений
* @return {DOM-object}
*/
var renderPin = function (advert) {
  var pinTemplate = parentForPins.querySelector('.pin');
  var pin = pinTemplate.cloneNode(true);
  pin.setAttribute('style', 'left: ' + (advert.location.x - 40 / 2) + 'px; top: ' + (advert.location.y - 40) + 'px');
  pin.children[0].setAttribute('src', advert.author.avatar);
  return pin;
};

/**
* Подготовить фрагмент с элементами для вставки
* @return {DOM-object}
*/
var renderFragment = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < NUMBER_ADVERT; i++) {
    fragment.appendChild(renderPin(adverts[i]));
  }
  return fragment;
};

// Добавляем пины на карту
parentForPins.appendChild(renderFragment());

/**
* Получить тип
* @param {object} type элемент массива из объявления
* @return {DOM-object}
*/
function getType(type) {
  var typeTanslate = '';
  if (type === 'flat') {
    typeTanslate = 'Квартира';
  } if (type === 'bungalo') {
    typeTanslate = 'Бунгало';
  } else {
    typeTanslate = 'Дом';
  }
  return typeTanslate;
}

/**
* Создать набор услуг
* @param {object} features массив услуг
* @return {DOM-object}
*/
function createFeatures(features) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < features.length; i++) {
    fragment.appendChild(renderSpanFeatures(features[i]));
  }
  return fragment;
}

/**
* Преобразовать элемен массива в span
* @param {object} featuresElement элемент массива услуг
* @return {DOM-object}
*/
function renderSpanFeatures(featuresElement) {
  var spanFeatures = document.createElement('span');
  spanFeatures.classList.add('feature__image', 'feature__image--' + featuresElement);
  return spanFeatures;
}

/**
* Создать описание объявления
* @param {object} advert элемент массива объявлений
* @return {DOM-object}
*/
function createDescription(advert) {
  var advertTemplate = document.querySelector('#lodge-template').content;
  var description = advertTemplate.cloneNode(true);
  description.querySelector('.lodge__title').textContent = advert.offer.title;
  description.querySelector('.lodge__address').textContent = advert.offer.address;
  description.querySelector('.lodge__price').innerHTML = advert.offer.price + '\&#x20bd; /ночь';
  description.querySelector('.lodge__type').textContent = getType(advert.offer.type);
  description.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + advert.offer.guests + ' гостей в ' + advert.offer.rooms + ' комнатах';
  description.querySelector('.lodge__checkin-time').textContent = 'Заезд после' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
  description.querySelector('.lodge__features').appendChild(createFeatures(advert.offer.features));
  description.querySelector('.lodge__description').textContent = advert.offer.description;
  return description;
}

/**
* Отобразить отписание на карте
* @param {object} advertInfo элемент массива объявлений
*/
function displayDescription(advertInfo) {
  var blockInfo = createDescription(advertInfo);
  var oldBlockInfo = document.querySelector('.dialog__panel');
  oldBlockInfo.parentNode.replaceChild(blockInfo, oldBlockInfo);
  var avatar = document.querySelector('.dialog__title').querySelector('img');
  avatar.setAttribute('src', advertInfo.author.avatar);
}

displayDescription(adverts[0]);
