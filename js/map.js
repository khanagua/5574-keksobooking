'use strict';

// РАЗДЕЛ: рисуем пины и один блок с информацией 

var AVATARS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var NUMBER_ADVERT = 8;  // количество объявлений

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
var map = document.querySelector('.tokyo__pin-map');

/**
* Сгенерировать пин
* @param {object} advert элемент массива объявлений
* @return {DOM-object}
*/
function createPin (advert, arrNumber) {
  var pinTemplate = map.querySelector('.pin');
  var pin = pinTemplate.cloneNode(true);
  pin.setAttribute('style', 'left: ' + (advert.location.x - 40 / 2) + 'px; top: ' + (advert.location.y - 40) + 'px');
  pin.setAttribute('data-arr-number', arrNumber);
  pin.children[0].setAttribute('src', advert.author.avatar);
  return pin;
};

/**
* Подготовить фрагмент с элементами для вставки
* @return {DOM-object}
*/
function renderFragment() {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < NUMBER_ADVERT; i++) {
    fragment.appendChild(createPin(adverts[i], i));
  }
  return fragment;
};

// Добавляем пины на карту
map.appendChild(renderFragment());

/**
* Получить тип
* @param {string} type тип недвижимости
* @return {string}
*/
function getLodgeTypeTranslation(type) {
  var LODGE_TYPE_TRANSLATIONS = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };
  return LODGE_TYPE_TRANSLATIONS[type] || '';
}

/**
* Создать набор услуг
* @param {string[]} features массив услуг
* @return {DOM-object}
*/
function createFeatures(features) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < features.length; i++) {
    fragment.appendChild(createSpanFeature(features[i]));
  }
  return fragment;
}

/**
* Создать элемент с описанием услуги
* @param {String} featureName название услуги
* @return {DOM-object}
*/
function createSpanFeature(featureName) {
  var spanFeature = document.createElement('span');
  spanFeature.classList.add('feature__image', 'feature__image--' + featureName);
  return spanFeature;
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
  description.querySelector('.lodge__type').textContent = getLodgeTypeTranslation(advert.offer.type);
  description.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + advert.offer.guests + ' гостей в ' + advert.offer.rooms + ' комнатах';
  description.querySelector('.lodge__checkin-time').textContent = 'Заезд после' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
  description.querySelector('.lodge__features').appendChild(createFeatures(advert.offer.features));
  description.querySelector('.lodge__description').textContent = advert.offer.description;
  return description;
}

/**
* Отобразить описание на карте
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


// РАЗДЕЛ: добавляем динамики - клик на пине и показ информации в блоке

map.addEventListener('click', pinClickHandler, true)

function pinClickHandler(evt) {
  // обнуляем активные элементы
  var pinActive = map.querySelector('.pin--active');
  if (pinActive !== null) {
    pinActive.classList.remove('pin--active');
  }

  // ищем, в какой пин кликнули и присваиваем модификатор
  var clickedElement = evt.target;
  if (clickedElement.tagName === 'DIV') {
    clickedElement.classList.add('pin--active');
    alert('сработало это пин');
  } else if(clickedElement.tagName === 'IMG') {
    clickedElement.parentNode.classList.add('pin--active');
    alert('сработало это аватар');
  }
}