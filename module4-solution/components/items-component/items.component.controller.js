(function () {
'use strict'

angular.module('MenuApp')
.controller('ItemsComponentController', ItemsComponentController);

ItemsComponentController.$inject = ['items'];
function ItemsComponentController(items) {
  var $ctrl = this;

  $ctrl.items = items.data;
}

})();
