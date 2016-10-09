(function () {
'use strict'

angular.module('MenuApp')
.controller('ItemsComponentController', ItemsComponentController);

ItemsComponentController.$inject = ['MenuDataService', 'items'];
function ItemsComponentController(MenuDataService, items) {
  var $ctrl = this;

  $ctrl.items = items.data;
}


})();
