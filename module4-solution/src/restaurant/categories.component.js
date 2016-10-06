(function () {
'use strict';

angular.module('Categories')
.component('categories', {
  templateUrl: 'src/categories/templates/categories.template.html',
  bindings: {
    items: '<'
  }
});

})();
