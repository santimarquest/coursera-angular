(function () {
'use strict'

angular.module('MenuApp')
.controller('CategoriesComponentController', CategoriesComponentController);

CategoriesComponentController.$inject = ['categories'];
function CategoriesComponentController(categories) {
  var $ctrl = this;

  $ctrl.categories = categories.data;
}


})();
