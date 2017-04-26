'use strict';

window.showCard = (function () {

  /**
  * Показать блок с информацией
  * @param {Object} element элемент, на котором произошло событие
  */
  function showCard(element) {
    // ищем, в какой пин кликнули и присваиваем модификатор
    var advertIndex;
    var elementTagName = element.tagName;
    removeActive();
    if (elementTagName === 'DIV') {
      element.classList.add('pin--active');
      advertIndex = element.getAttribute('data-advert-index');
    } else if (element.tagName === 'IMG') {
      element.parentNode.classList.add('pin--active');
      advertIndex = element.parentNode.getAttribute('data-advert-index');
    }
    // показываем блок с инфой
    window.card.removeAttribute('style', 'display');
    if (advertIndex !== null) {
      window.displayDescription(window.advertArr[advertIndex]);
    }

    window.closeCard.addEventListener('click', function (evt) {
      closeCurrentCard();
    });

    window.closeCard.addEventListener('keydown', function (evt) {
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
    window.card.setAttribute('style', 'display: none;');
    removeActive();
  }

  /**
  * Удалить признак активного пина
  */
  function removeActive() {
  // обнуляем активные элементы
    var pinActive = window.map.querySelector('.pin--active');
    if (pinActive !== null) {
      pinActive.classList.remove('pin--active');
    }
  }

  return showCard;

})();
