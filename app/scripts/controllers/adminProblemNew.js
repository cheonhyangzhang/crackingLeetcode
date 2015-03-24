'use strict';

/**
 * @ngdoc function
 * @name crackingLeetcodeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the crackingLeetcodeApp
 */
angular.module('crackingLeetcodeApp')
  .controller('AdminProblemNewCtrl', function ($scope, $location,authService) {
    authService.requireAdmin($scope); 
    $scope.problem = {}
    $scope.problem.difficulty = 'Easy';
    $scope.problem.atype = 'algorithms';
  	$scope.save = function(){
  		console.log("save");	
  		console.log($scope.problem);
      console.log($scope.problem.description);
  		gapi.client.crackingleetcode.problem.insert($scope.problem).execute(function(resp) {
  			console.log(resp);
	      	// $location.path("/admin/" + $scope.problem.atype + "/problem/"+$scope.problem.no);
          $location.path("/admin/" + $scope.problem.atype + "/problems");
          $scope.$apply();
	    });
  	}
});
