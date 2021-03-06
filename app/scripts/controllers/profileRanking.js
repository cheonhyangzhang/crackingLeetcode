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
    $scope.loading = true;
    userService.list(function(resp){
      console.log("users");
      console.log(resp);
      $scope.users = resp.users;
      $.each($scope.users, function(index, value){
      	console.log(value);
        if (typeof(value.sovled_statics) !== 'undefined'){
      	 value.sovled_statics = JSON.parse(value.sovled_statics);
        }
      });
      $scope.loading = false;
      $scope.$apply();
    });
});
