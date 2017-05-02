'use strict';

window.renderPins = (function () {
  // отрисовываем элементы
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
  * @param {object[]} data массив объектов объявлений
  * @return {DOM-object}
  */
  function renderFragment(data) {
    window.addedPins = [];
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      var pin = createPin(data[i], i);
      window.addedPins.push(pin);
      fragment.appendChild(pin);
    }
    return fragment;
  }

  /**
  * Добавить пины на карту
  * @param {object[]} data массив объектов объявлений
  * @return {DOM-object}
  */
  var renderPins = function (data) {
    return window.map.appendChild(renderFragment(data));
  };

  return renderPins;
})();
