'use strict';

window.data = (function (renderPins, map, load, filterAdverts, debounce) {

  window.URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';
  var originData = [];
  /**
  * Обработать полученные данные с сервера
  * @param {object} data массив объявлений с сервера
  */
  function onLoad(data) {
    originData = data;
    window.advertArr = data.slice(0, 3);
    renderPins(window.advertArr);
  }
  load(URL, onLoad);

  var tokyofilters = document.querySelector('.tokyo__filters');

  tokyofilters.addEventListener('change', function () {
    window.advertArr = filterAdverts(originData);
    for (var i = 0; i < window.addedPins.length; i++) {
      map.removeChild(window.addedPins[i]);
    }

    debounce(renderPins.bind(null, window.advertArr));
  });

})(window.renderPins, window.map, window.load, window.filterAdverts, window.debounce);
