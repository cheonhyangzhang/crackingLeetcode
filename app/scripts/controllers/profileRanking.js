'use strict';

/**
 * @ngdoc function
 * @name crackingLeetcodeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the crackingLeetcodeApp
 */
angular.module('crackingLeetcodeApp')
  .controller('ProfileRankingCtrl', function ($scope, $routeParams, $rootScope, authService, userService) {
  	console.log($scope.user);
    userService.list(function(resp){
      console.log("users");
      console.log(resp);
      $scope.users = resp.users;
      $scope.$apply();
    });
});
