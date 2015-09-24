'use strict';

/**
 * @ngdoc function
 * @name crackingLeetcodeApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the crackingLeetcodeApp
 */
angular.module('crackingLeetcodeApp')
  .controller('ProfileCtrl', function ($scope, $routeParams, $rootScope, authService, userService) {
    $rootScope.title ="Profile - " + $routeParams.useremail;
    $scope.useremail = $routeParams.useremail;
    userService.get($scope.useremail, function(resp){
      $scope.userProfile = resp.result;
      $scope.$apply();
    });

    $scope.save = function(){
      console.log("save");
      userService.patch($scope.userProfile, function(resp){
        console.log(resp)
        $scope.user.profile = resp.result;
      });
    }
});
