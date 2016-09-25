(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
  var tobuy = this;

  tobuy.items = ShoppingListCheckOffService.getItems(ShoppingListCheckOffService.tobuyitems);

  tobuy.removeItem = function (itemstobuy, itemIndex) {
    ShoppingListCheckOffService.removeItem(itemstobuy, itemIndex);
  }
 
}

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
  var alreadybought = this;

  alreadybought.items = ShoppingListCheckOffService.getItems(ShoppingListCheckOffService.boughtitems);

}


function ShoppingListCheckOffService() {
  var service = this;

  // List of to buy items
  service.tobuyitems = [{
  name:"cookies",
  quantity:10
  }, {
  name:"coke",
  quantity: 10
  }, {
  name: "beer",
  quantity :10
  }, {
  name: "salad",
  quantity: 5
  }, {
  name:"chicken",
  quantity: 2
  }]

// List of bought items
  service.boughtitems = [];

  service.addBoughtItem = function (arrayItems, itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    arrayItems.push(item);
  };

  service.removeToBuyItem = function (arrayItems, itemIdex) {
    arrayItems.splice(itemIdex, 1);
  };

  service.getItems = function (itemsarray) {
    return itemsarray;
  };

 service.removeItem  = function (itemstobuy, itemIndex) {
    service.addBoughtItem(service.boughtitems, itemstobuy[itemIndex].name, itemstobuy[itemIndex].quantity);
    service.removeToBuyItem (itemstobuy, itemIndex);
  };


}

})();
