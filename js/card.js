'use strict';

window.displayDescription = (function () {

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

  /*
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

  return displayDescription;
})();
