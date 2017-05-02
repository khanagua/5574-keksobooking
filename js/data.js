'use strict';

(function () {

  window.URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';

  /**
  * Обработать полученные данные с сервера
  * @param {object} data массив объявлений с сервера
  */
  function onLoad(data) {
    window.originData = data;
    window.advertArr = data.slice(0, 3);
    window.renderPins(window.advertArr);
  }
  window.load(URL, onLoad);

  var tokyofilters = document.querySelector('.tokyo__filters');

  tokyofilters.addEventListener('change', function () {
    window.advertArr = window.filterAdverts(window.originData);
    for (var i = 0; i < window.addedPins.length; i++) {
      window.map.removeChild(window.addedPins[i]);
    }

    window.debounce(window.renderPins.bind(null, window.advertArr));
  });
})();
