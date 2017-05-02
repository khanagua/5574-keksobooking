'use strict';

window.showCard = (function () {
  /**
  * Показать блок с информацией
  * @param {Object} element элемент, на котором произошло событие
  * @param {DOM-object} card карточка для отображения информации об объекте
  * @param {DOM-object} map карта, на которой будет отображаться карточка
  */
  function showCard(element, card, map) {
    // ищем, в какой пин кликнули и присваиваем модификатор
    var advertIndex;
    var elementTagName = element.tagName;
    removeActive(map);
    if (elementTagName === 'DIV') {
      element.classList.add('pin--active');
      advertIndex = element.getAttribute('data-advert-index');
    } else if (element.tagName === 'IMG') {
      element.parentNode.classList.add('pin--active');
      advertIndex = element.parentNode.getAttribute('data-advert-index');
    }
    // показываем блок с инфой
    card.removeAttribute('style', 'display');
    if (advertIndex !== null) {
      window.displayDescription(window.advertArr[advertIndex]);
    }

    /**
    * Определить нажатую кнопку
    * @param {Number} keyCode код клавиши
    * @param {Event} evt объект события
    */
    function onPopupButtonPress(keyCode, evt) {
      if (evt.keyCode === keyCode) {
        closeCurrentCard();
      }
    }

    var ESC = 27;
    var ENTER = 13;

    /**
    * Закрыть карточку по нажатию на enter
    * @param {Event} keydownEvent событие нажатия на кнопку
    */
    var onKeydownCloseCard = function (keydownEvent) {
      onPopupButtonPress(ENTER, keydownEvent);
    };

    /**
    * Закрыть карточку по нажатию на esc
    * @param {Event} keydownEvent событие нажатия на кнопку
    */
    var onKeydownDocument = function (keydownEvent) {
      onPopupButtonPress(ESC, keydownEvent);
    };


    window.closeCard.addEventListener('click', closeCurrentCard);
    window.closeCard.addEventListener('keydown', onKeydownCloseCard);
    document.addEventListener('keydown', onKeydownDocument);

    /**
    * Скрыть блок с информацией
    */
    function closeCurrentCard() {
      card.setAttribute('style', 'display: none;');
      removeActive(map);
      window.closeCard.removeEventListener('click', closeCurrentCard);
      window.closeCard.removeEventListener('keydown', onKeydownCloseCard);
      document.removeEventListener('keydown', onKeydownDocument);
    }
  }

  /**
  * Удалить признак активного пина
  * @param {DOM-object} map карта, на которой обрабатываются пины
  */
  function removeActive(map) {
  // обнуляем активные элементы
    var pinActive = map.querySelector('.pin--active');
    if (pinActive !== null) {
      pinActive.classList.remove('pin--active');
    }
  }

  return showCard;
})();
