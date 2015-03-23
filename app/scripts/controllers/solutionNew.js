'use strict';

/**
 * @ngdoc function
 * @name crackingLeetcodeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the crackingLeetcodeApp
 */
angular.module('crackingLeetcodeApp')
  .controller('SolutionNewCtrl', function ($scope, $location) {
    $scope.user = auth_user;
    $scope.problem = {}
    $scope.problem.onmyself = 'Yes';
    $scope.problem.difficulty = 'Easy';
  	$scope.save = function(){
  		console.log("save");	
  		console.log($scope.problem);
  		gapi.client.crackingleetcode.solution.insert($scope.problem).execute(function(resp) {
  			console.log(resp);
	      	// $location.path("/problem/"+problem.no);
	    });
  	}
});
