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
                                  // I´ll ask for result["error"] existence, but
                                  // it´s really not necessary. I could do with
                                  // just $q.resolve();
                                  return (result["error"])? $q.reject() : $q.resolve();
                              }, function () {
                                 return $q.reject();
                              });
                            
              
          };
        }
    };
   
}
    
})();