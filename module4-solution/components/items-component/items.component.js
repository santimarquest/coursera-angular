(function () {
'use strict'

angular.module('MenuApp')
.component('items', {
  templateUrl: 'components/items-component/templates/itemsList.html',
  bindings: {
    items: '<'
  }
});

})();
