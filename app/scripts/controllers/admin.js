'use strict';

/**
 * @ngdoc function
 * @name crackingLeetcodeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the crackingLeetcodeApp
 */
angular.module('crackingLeetcodeApp')
  .controller('AdminCtrl', function ($scope, $rootScope, authService) {
  	console.log($scope.user);
  	console.log($rootScope);
  	console.log($scope);
  	authService.requireAdmin($scope);
    
    $scope.easyCount = 42;//44
    $scope.mediumCount = 96;//44
    $scope.hardCount = 45;//44

  	// gapi.client.crackingleetcode.problem.list().execute(function(resp) {
   //      console.log(resp);
   //      $scope.problems = resp.problems;
   //      $scope.$apply();
   //   });
});
