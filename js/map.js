'use strict';

(function () {
  window.NUMBER_ADVERT = 8;  // количество объявлений

  // создаем массив объявлений
  window.adverts = window.creatAdvertArr(window.NUMBER_ADVERT);
  window.renderPins();

  // РАЗДЕЛ: добавляем динамики - клик на пине и показ информации в блоке

  var card = document.querySelector('.dialog');
  var closeCard = card.querySelector('.dialog__close');

  window.map.addEventListener('click', function (evt) {
    openElementCard(evt.target);
  });

  window.map.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      openElementCard(evt.target);
    }
  });

  /**
  * Показать блок с информацией
  * @param {Object} element элемент, на котором произошло событие
  */
  function openElementCard(element) {
    // ищем, в какой пин кликнули и присваиваем модификатор
    var advertIndex;
    var elementTagName = element.tagName;
    if (elementTagName === 'DIV') {
      element.classList.add('pin--active');
      advertIndex = element.getAttribute('data-advert-index');
    } else if (element.tagName === 'IMG') {
      element.parentNode.classList.add('pin--active');
      advertIndex = element.parentNode.getAttribute('data-advert-index');
    }
    // показываем блок с инфой
    card.removeAttribute('style', 'display');
    window.displayDescription(window.adverts[advertIndex]);

    closeCard.addEventListener('click', function (evt) {
      closeCurrentCard();
    });

    closeCard.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 13) {
        closeCurrentCard();
      }
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        closeCurrentCard();
      }
    });
  }


  /**
  * Скрыть блок с информацией
  */
  function closeCurrentCard() {
    card.setAttribute('style', 'display: none;');
      // обнуляем активные элементы
    var pinActive = window.map.querySelector('.pin--active');
    if (pinActive !== null) {
      pinActive.classList.remove('pin--active');
    }
  }


})();
