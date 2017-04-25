'use strict';

window.renderPins = (function () {

  // отрисовываем элементы
  window.map = document.querySelector('.tokyo__pin-map');

  /**
  * Сгенерировать пин
  * @param {object} advert элемент массива объявлений
  * @param {number} advertIndex индекс объявления
  * @return {DOM-object}
  */
  function createPin(advert, advertIndex) {
    var pinTemplate = window.map.querySelector('.pin');
    var pin = pinTemplate.cloneNode(true);
    pin.setAttribute('style', 'left: ' + (advert.location.x - 40 / 2) + 'px; top: ' + (advert.location.y - 40) + 'px');
    pin.classList.remove('pin__main');
    pin.setAttribute('data-advert-index', advertIndex);
    pin.setAttribute('tabindex', 0);
    pin.children[0].setAttribute('src', advert.author.avatar);
    return pin;
  }

  /**
  * Подготовить фрагмент с элементами для вставки
  * @return {DOM-object}
  */
  function renderFragment() {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.NUMBER_ADVERT; i++) {
      fragment.appendChild(createPin(window.adverts[i], i));
    }
    return fragment;
  }

  /**
  * Добавить пины на карту
  * @return {DOM-object}
  */
  function renderPins() {
    return window.map.appendChild(renderFragment());
  }

  return renderPins;

})();
