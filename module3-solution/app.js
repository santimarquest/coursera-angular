(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
    var ddo = {
      restrict: 'E',
      scope: {
        foundItems: '<',
        onRemove: '&'
      },
      templateUrl: 'foundItemsList.html',
      controller: FoundItemsDirectiveController,
      bindToController: true,
      controllerAs: 'list'
    };
    return ddo;
  }

  function FoundItemsDirectiveController() {
    var list = this;

    list.dontWantThisOne = function (index) {
      list.onRemove({index: index});
    };

  }

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
var narrowit = this;

    narrowit.searchTerm = '';

    narrowit.found = function (searchTerm) {
      if (searchTerm === '') {
        narrowit.menuItems = [];
        return;
      }

      MenuSearchService.getMatchedMenuItems(searchTerm)
        .then(function (foundItems) {
          narrowit.menuItems = foundItems;
        });
    };

    ctrl.dontWantThisOne = function (index) {
      narrowit.menuItems.splice(index, 1);
    };
  }

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

	service.getMatchedMenuItems = function(searchTerm) {

	 	return $http({
	      method: "GET",
	      url: (ApiBasePath + "/menu_items.json")
	    }).then(function (result) {

	    	 var items = result.data.menu_items;
  			 var foundItems = [];

	    	 for (var i=0; i < items.length; i++) {
	    	 	var name = items[i].name;
	    	 	if (name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
	    	 		foundItems.push(name);
	    	 	}
	    	 }
	    // return processed items
	    return foundItems;
		});

	}

}

})();