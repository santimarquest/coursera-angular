(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesController', CategoriesController);

CategoriesController.$inject = ['MenuDataService'];
function CategoriesController(MenuDataService) {
  var categorieslist = this;
  categorieslist.items = MenuDataService.getAllCategories();
}

})();
