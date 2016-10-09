(function () {
'use strict'

angular.module('MenuApp')
.controller('CategoriesComponentController', CategoriesComponentController);

CategoriesComponentController.$inject = ['MenuDataService', 'categories'];
function CategoriesComponentController(MenuDataService, categories) {
  var $ctrl = this;

  $ctrl.categories = categories.data;
}


})();
