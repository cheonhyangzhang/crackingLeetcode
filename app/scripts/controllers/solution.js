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
    $scope.editmode = false;
    $scope.user = auth_user;
    $scope.no = $routeParams.no;
    $scope.type = $routeParams.type;
    $scope.useremail = $routeParams.useremail;
    $scope.switchmode = function(){
      $scope.editmode = !$scope.editmode;
    }

    $scope.save = function(){
      $scope.editmode = !$scope.editmode;
      console.log("save");  
      console.log($scope.solution);
      console.log($scope.solution.solution);
      gapi.client.crackingleetcode.solution.insert($scope.solution).execute(function(resp) {
        console.log(resp);
        console.log($scope.user.email + "/solution/" + resp.no);
        $scope.solution.solutionDisplay = $sce.trustAsHtml($scope.solution.solution);
      });
    }


    gapi.client.crackingleetcode.problem.get({'no':$scope.no, 'atype':$scope.type}).execute(function(resp) {
      $scope.problem = resp.result;
      console.log("Problem:");
      console.log($scope.problem);
      $scope.problem.description = $scope.problem.description.replace(/\n/g,'<br>');
      $scope.problem.description = $scope.problem.description.replace(/{{{/g, '<div class="panel panel-default"><div class="panel-body">');
      $scope.problem.description = $scope.problem.description.replace(/}}}/g, '</div></div>');

      $scope.problem.description = $sce.trustAsHtml($scope.problem.description);
      $scope.$apply();
    });
    gapi.client.crackingleetcode.solution.get({'owner':$scope.useremail,'no':$scope.no, 'atype':$scope.type}).execute(function(resp) {
     	$scope.solution = resp.result;
      console.log("Solution:");
      // console.log($scope.solution.solution);
     	$scope.solution.solutionDisplay = $sce.trustAsHtml($scope.solution.solution);
      $scope.$apply();
    });


  });
