(function () {
"use strict";

angular.module('public')
.controller('UserInfoController', UserInfoController);

UserInfoController.$inject = ['PreferencesService', 'menuItem'];

function UserInfoController(PreferencesService, menuItem) {
  var userinfo     = this;
    
  userinfo.menu_item = menuItem;
  
  if(userinfo.menu_item) {
    userinfo.user_data_registered = PreferencesService.hasUserDataBeenRegistered();
    userinfo.info = PreferencesService.getRegisteredUserData(); 
  }
    


  
}




})();
