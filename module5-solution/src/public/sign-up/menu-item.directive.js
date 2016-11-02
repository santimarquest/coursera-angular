(function (){
"use strict";
    
angular.module('public')
       .directive('validMenuItem', validMenuItem);

validMenuItem.$inject = ['$q' ,'MenuService'];

function validMenuItem($q, MenuService){
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
          
          ctrl.$asyncValidators.validMenuItem = function(modelValue, viewValue) {

            if (ctrl.$isEmpty(modelValue)) {
                return $q.when();
            }
             
            return MenuService.getMenuItemForShortName(modelValue)
                              .then(
                                 function (result){
                                  return $q.resolve();
                              }, function () {
                                 return $q.reject();
                              });
                            
              
          };
        }
    };
   
}
    
})();