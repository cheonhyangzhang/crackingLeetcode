'use strict';

/**
 * @ngdoc function
 * @name crackingLeetcodeApp.controller:ProblemCtrl
 * @description
 * # MainCtrl
 * Controller of the crackingLeetcodeApp
 */
angular.module('crackingLeetcodeApp')
  .controller('SolutionCtrl', function ($scope, $routeParams, $sce) {
    $scope.user = auth_user;
    $scope.no = $routeParams.no;
    $scope.type = $routeParams.type;
    $scope.useremail = $routeParams.useremail;
    gapi.client.crackingleetcode.problem.get({'no':$scope.no, 'atype':$scope.type}).execute(function(resp) {
      $scope.problem = resp;
      console.log("Problem:");
      console.log($scope.problem);
      $scope.problem.description = $scope.problem.description.replace(/\n/g,'<br>');
      $scope.problem.description = $scope.problem.description.replace(/{{{/g, '<div class="panel panel-default"><div class="panel-body">');
      $scope.problem.description = $scope.problem.description.replace(/}}}/g, '</div></div>');

      $scope.problem.description = $sce.trustAsHtml($scope.problem.description);
      $scope.$apply();
    });
    gapi.client.crackingleetcode.solution.get({'no':$scope.no, 'atype':$scope.type}).execute(function(resp) {
     	$scope.solution = resp;
      console.log("Solution:");
      // console.log($scope.solution.solution);
     	$scope.solution.solution = $sce.trustAsHtml($scope.solution.solution);
      	$scope.$apply();
    });


  });
