'use strict';

/**
 * @ngdoc function
 * @name crackingLeetcodeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the crackingLeetcodeApp
 */
angular.module('crackingLeetcodeApp')
  .controller('ProblemsCtrl', function ($scope, $routeParams, userService) {
  	console.log("ProblemCtrl");
  	console.log($scope.user);
  	$scope.type = $routeParams.type;
    $scope.toSolveProblems = [];
    $scope.solvedProblems = [];
  	$scope.detailedProblems = {};
    $scope.solved = {'Easy':0, 'Medium':0, 'Hard':0};
    $scope.totals = {'Easy':0, 'Medium':0, 'Hard':0};

    userService.get($routeParams.useremail, function(resp){
      $scope.userProfile = resp.result;
      console.log("userProfile");
      console.log($scope.userProfile);
      $scope.$apply();
    });

  	gapi.client.crackingleetcode.problem.list({'atype':$scope.type}).execute(function(resp) {
        console.log(resp);
        if (typeof(resp.problems) != 'undefined'){
          $scope.problems = resp.problems;
        }
        else{
          $scope.problems = [];
        }
        // $.each($scope.problems, function(index, value){
        	// $scope.detailedProblems[value.no] = {'problem':value};
        // });
        $scope.$apply();
        console.log($scope.user.email);
         gapi.client.crackingleetcode.solution.list({'account':$routeParams.useremail, 'atype':$scope.type}).execute(function(resp) {
	      console.log("SolutionsCtrl list:");
	      console.log(resp);
         if (typeof(resp.solutions) != 'undefined'){
            $scope.solutions = resp.solutions;
          }
          else{
            $scope.solutions = [];
          }
	      $.each($scope.solutions, function(index, value){
        	$scope.detailedProblems[value.no] = {'solution' : value};
        	// $scope.detailedProblems[value.no]['solution'] = value;
	      });
        $.each($scope.problems, function(index, value){
          if (value.no in $scope.detailedProblems){
            $scope.solvedProblems.push(value);
            $scope.solved[value.difficulty] +=1;
          } 
          else{
            $scope.toSolveProblems.push(value);
          }
          $scope.totals[value.difficulty] +=1;
        });
	      // console.log($scope.detailedProblems);
	      $scope.$apply();
	    });
    });

});
