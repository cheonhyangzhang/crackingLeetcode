'use strict';

/**
 * @ngdoc function
 * @name crackingLeetcodeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the crackingLeetcodeApp
 */
angular.module('crackingLeetcodeApp')
  .controller('ProblemNewCtrl', function ($scope, $location) {
    $scope.problem = {}
    $scope.problem.difficulty = 'Easy';
  	$scope.save = function(){
  		console.log("save");	
  		console.log($scope.problem);
      console.log($scope.problem.description);
  		gapi.client.crackingleetcode.problem.insert($scope.problem).execute(function(resp) {
  			console.log(resp);
	      	// $location.path("/problem/"+problem.no);
	    });
  	}
});
