(function () {
'use strict'

angular.module('MenuApp')
.component('categories', {
  templateUrl: 'components/categories-component/templates/categoryList.html',
  bindings: {
    categories: '<'
  }
});


})();
