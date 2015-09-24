'use strict';

/**
 * @ngdoc function
 * @name crackingLeetcodeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the crackingLeetcodeApp
 */
angular.module('crackingLeetcodeApp')
  .controller('ProblemsCtrl', function ($rootScope, $scope, $routeParams, userService) {
  	console.log("ProblemCtrl");
    $rootScope.title = "Problems - Cracking Leetcode";
    $scope.loading = true;
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
          $scope.solutions[index].no = parseInt($scope.solutions[index].no);
	      });
        $.each($scope.problems, function(index, value){
          if (value.no in $scope.detailedProblems){
            value.no = parseInt(value.no);
            $scope.solvedProblems.push(value);
            $scope.solved[value.difficulty] +=1;
          } 
          else{
            value.no = parseInt(value.no);
            $scope.toSolveProblems.push(value);
          }
          $scope.totals[value.difficulty] +=1;
        });
	      // console.log($scope.detailedProblems);
        $scope.loading = false;
	      $scope.$apply();
	    });
    });

});
