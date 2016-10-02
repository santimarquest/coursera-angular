(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItemsList.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true,
    link : FoundItemsDirectiveLink,
    transclude: true
  };

  return ddo;
}

function FoundItemsDirectiveLink(scope, element, attrs, controller) {

	scope.$watch('element.items', function () {

	element.items = attr.items;		
    
  });

}


function FoundItemsDirectiveController() {
  var list = this;

 list.onRemove = function(index) {
 	list.items.splice(index, 1);
 }
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowit = this;

  narrowit.searchterm = '';

  narrowit.found = function (searchTerm) {
  	return MenuSearchService.getMatchedMenuItems(searchTerm);

}

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