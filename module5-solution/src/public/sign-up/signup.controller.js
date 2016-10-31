(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['PreferencesService'];

function SignUpController(PreferencesService) {
  var signup = this;
  
  signup.submit = function () {
      
    PreferencesService.setRegisteredUserData(signup.user);
    signup.completed = true; 
    
  };
  
}

})();
