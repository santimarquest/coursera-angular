(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.textmenu = '';
  $scope.message = '';
  $scope.color= '';

  $scope.checkMenu = function () {
  var textmenu =   $scope.textmenu.trim();
  var message = '';
  var color = '';

  if (textmenu.length == 0) {
    message = 'Please enter data first';
    color = 'red';
  } else {

  var menu = textmenu.split(',').filter(String);

  if (menu.length == 0) {
    message = 'Please enter data first';
    color = 'red';
  }

  if (menu.length > 0 && menu.length <= 3) {
    message = 'Enjoy!';
    color = 'green';
  }

  if (menu.length > 3) {
    message = 'Too much!';
    color = 'green';
  }
}
  $scope.message = message;
  $scope.color = color;
  console.log(menu);
}

}

})();
