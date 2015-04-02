'use strict';

/**
 * @ngdoc function
 * @name crackingLeetcodeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the crackingLeetcodeApp
 */
angular.module('crackingLeetcodeApp')
  .controller('ProblemsCtrl', function ($scope, $routeParams) {
  	console.log("ProblemCtrl");
  	console.log($scope.user);
  	var type = $routeParams.type;
  	$scope.detailedProblems = {};
  	gapi.client.crackingleetcode.problem.list({'atype':type}).execute(function(resp) {
        console.log(resp);
        $scope.problems = resp.problems;
        // $.each($scope.problems, function(index, value){
        	// $scope.detailedProblems[value.no] = {'problem':value};
        // });
        $scope.$apply();
        console.log($scope.user.email);
         gapi.client.crackingleetcode.solution.list({'account':$scope.user.email, 'atype':type}).execute(function(resp) {
	      console.log("SolutionsCtrl list:");
	      console.log(resp);
	      $scope.solutions = resp.solutions;
	      $.each($scope.solutions, function(index, value){
        	$scope.detailedProblems[value.no] = {'solution' : value};
        	// $scope.detailedProblems[value.no]['solution'] = value;
	      });
	      console.log($scope.detailedProblems);
	      $scope.$apply();
	    });
    });

});
