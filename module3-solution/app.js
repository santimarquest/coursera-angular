(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
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
    link : FoundItemsDirectiveLink
  };

  return ddo;
}

function FoundItemsDirectiveLink(scope, element, attrs, controller) {

	scope.$watch('list.items', function () {

		//list.items = element.found;
    
  });

}


function FoundItemsDirectiveController() {
  var list = this;

  list.items = [];

 //list.items = narrowit.found;

 list.onRemove = function(index) {
 	list.items.splice(index, 1);
 }
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowit = this;

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
  			 var foundItems = [];

	    	 for (var i=0; i < result.length; i++) {
	    	 	var name = result[i].name;
	    	 	if (name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
	    	 		foundItems.push(result[i].name);
	    	 	}
	    	 }
	    // return processed items
	    return foundItems;
		});

	}

}

})();