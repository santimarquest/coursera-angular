(function () {
"use strict";

angular.module('common')
.service('PreferencesService', PreferencesService);

function PreferencesService() {
  var service = this;
  service.user_data = {};
  service.has_data_registered = false;

  service.getRegisteredUserData = function () {
    return service.user_data;
  };
  
  service.setRegisteredUserData = function (new_user_data) {
    service.user_data = new_user_data;
    service.has_data_registered = true;
  };
  
  service.hasUserDataBeenRegistered = function (){
      return service.has_data_registered;
  };
  
  service.getUserFavouriteDish = function (){
      return service.user_data.favorite_dish;
  };

}



})();
