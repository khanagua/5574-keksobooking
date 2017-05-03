'use strict';

window.load = (function () {
  /**
  * Сделать запрос на сервер
  * @param {string} url адрес хоста
  * @param {function} onLoad функция обработки при положительном ответе
  */
  function load(url, onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 400:
          onError('Неверный запрос');
          break;
        case 401:
          onError('Пользователь не авторизован');
          break;
        case 404:
          onError('Ничего не найдено');
          break;
        default:
          onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Время ожидания превысило ' + xhr.timeout + ' мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open('GET', URL);
    xhr.send();
  };

  /**
  * Обработать отрицательный ответ с сервера
  * @param {string} errorMessage текст сообщения об ошибке
  */
  function onError(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; border: 2px inset black; background: #f0f0ea; width: 1196px;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '20px';
    node.textContent = errorMessage;
    var beforeBeginNode = document.querySelector('.tokyo__filters-container');
    beforeBeginNode.insertAdjacentElement('beforebegin', node);
  }

  return load;
})();
