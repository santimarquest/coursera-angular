(function () {
'use strict';

angular.module('MenuData')
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.service('MenuDataService', MenuDataService);


MenuDataService.$inject = ['$http', 'ApiBasePath'];
function MenuDataService($http, ApiBasePath) {
  var service = this;

// The MenuDataService should have 2 methods:
// getAllCategories - this method should return a promise which is a result of using the $http service, using the following REST API endpoint: https://davids-restaurant.herokuapp.com/categories.json
// getItemsForCategory(categoryShortName) - this method should return a promise which is a result of using the $http service, using the following REST API endpoint: https://davids-restaurant.herokuapp.com/menu_items.json?category=, where, before the call to the server, your code should append whatever categoryShortName value was passed in as an argument into the getItemsForCategory method.

 // MenuSearchService.$inject = ['$http', 'ApiBasePath'];
 //  function MenuSearchService($http, ApiBasePath) {
 //    var service = this;

 //    service.getMatchedMenuItems = function (searchTerm) {
 //      return $http({
 //        url: ApiBasePath + '/menu_items.json'
 //      })
 //        .then(function (result) {
 //          var dishes = result.data.menu_items;
 //          return dishes.filter(function (dish) {
 //            return dish.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
 //          });
 //        });
 //    };
 //  }



  service.getAllCategories = function () {
     return $http({
        url: ApiBasePath + '/categories.json'
      }).then(function (result) {
            return result.data.categories;
          });
  };

   service.getItemsForCategory = function (categoryShortName) {
    return $http({
        url: ApiBasePath + '/menu_items.json?category=' + categoryShortName
      }).then(function (result) {
            return result.data.menu_items;
          });
  };
}

})();
