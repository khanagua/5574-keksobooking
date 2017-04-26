'use strict';

(function () {

  window.URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';

  /**
  * Обработать полученные данные с сервера
  * @param {object} data массив объявлений с сервера
  */
  function onLoad(data) {
    window.advertArr = data;
    window.renderPins(window.advertArr);
  }
  window.load(URL, onLoad);

})();
