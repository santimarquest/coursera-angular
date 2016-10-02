(function() {
  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
    .directive('foundItems', FoundItemsDirective);

  // controller

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrowit = this;

    narrowit.searchTerm = '';

    narrowit.searchMenu = function (searchTerm) {
      if (searchTerm === '') {
        narrowit.menuItems = [];
        return;
      }

      MenuSearchService.getMatchedMenuItems(searchTerm)
        .then(function (foundItems) {
          narrowit.menuItems = foundItems;
        });
    };

    narrowit.dontWantThisOne = function (index) {
      narrowit.menuItems.splice(index, 1);
    };
  }

// service

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        url: ApiBasePath + '/menu_items.json'
      })
        .then(function (result) {
          var dishes = result.data.menu_items;
          return dishes.filter(function (dish) {
            return dish.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
          });
        });
    };
  }

  // directive

  function FoundItemsDirective() {
    var ddo = {
      restrict: 'E',
      scope: {
        foundItems: '<',
        onRemove: '&'
      },
      templateUrl: 'founditems.html',
      controller: FoundItemsDirectiveController,
      bindToController: true,
      controllerAs: 'dishesFound'
    };
    return ddo;
  }

  function FoundItemsDirectiveController() {
    var dishesFound = this;

    dishesFound.dontWantThisOne = function (index) {
      dishesFound.onRemove({index: index});
    };

    dishesFound.noDishes = function () {
      return dishesFound.foundItems &&
        dishesFound.foundItems.length === 0;
    };
  }
})();
