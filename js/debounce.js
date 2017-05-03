'use strict';

window.debounce = (function () {
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

  /**
  * Устраняет "дребезг" функции
  * @param {function} callback функция
  */
  var debounce = function (callback) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(callback, DEBOUNCE_INTERVAL);
  };
  return debounce;
})();
