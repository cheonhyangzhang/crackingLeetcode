'use strict';

/**
 * @ngdoc function
 * @name crackingLeetcodeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the crackingLeetcodeApp
 */
angular.module('crackingLeetcodeApp')
  .controller('ProfileCtrl', function ($scope, $routeParams, $rootScope, authService, userService) {
  	console.log($scope.user);
  	console.log($rootScope);
  	console.log($scope);
    $scope.useremail = $routeParams.useremail;
    userService.get($scope.useremail, function(resp){
      $scope.userProfile = resp.result;
      $scope.$apply();
    });
  	// gapi.client.crackingleetcode.problem.list().execute(function(resp) {
   //      console.log(resp);
   //      $scope.problems = resp.problems;
   //      $scope.$apply();
   //   });

    $scope.save = function(){
      console.log("save");
      userService.patch($scope.userProfile, function(resp){
        console.log(resp)
      });
    }
});
