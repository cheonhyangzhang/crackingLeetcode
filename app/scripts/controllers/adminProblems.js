'use strict';

/**
 * @ngdoc function
 * @name crackingLeetcodeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the crackingLeetcodeApp
 */
angular.module('crackingLeetcodeApp')
  .controller('AdminProblemsCtrl', function ($scope, $routeParams, authService) {
    authService.requireAdmin($scope); 
  	console.log($scope.user);
  	$scope.type = $routeParams.type;
  	
  	gapi.client.crackingleetcode.problem.list({'atype':$scope.type}).execute(function(resp) {
        console.log(resp);
        $scope.problems = resp.problems;
        $scope.$apply();
     });
});
