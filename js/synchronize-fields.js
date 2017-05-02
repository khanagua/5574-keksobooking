'use strict';

window.synchronizeFields = (function () {

  /**
  * Синхронизация значения полей в форме
  * @param {object} node1 первое поле
  * @param {object} node2 второе поле
  * @param {object} mapOfValues значения первого поля
  * @param {function} callback вызов callback
  */
  var synchronizeFields = function (node1, node2, mapOfValues, callback) {
    node1.addEventListener('change', function () {
      callback(node1, node2, mapOfValues);
    });
  };
  return synchronizeFields;
})();
