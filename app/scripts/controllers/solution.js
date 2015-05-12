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
    $scope.problem_loaded = false;
    $scope.solution_loaded = false;
    $scope.switchmode = function(){
      $scope.editmode = !$scope.editmode;
    }
    $scope.htmlcode = function(text){
      return (
        text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
    );
    }

    $scope.save = function(){
      $scope.editmode = !$scope.editmode;
      console.log("save");  
      $scope.solution.difficulty = $scope.problem.difficulty;
      gapi.client.crackingleetcode.solution.insert($scope.solution).execute(function(resp) {
        console.log(resp);
        $scope.$apply();
        $('#code-snippet').html($scope.htmlcode($scope.solution.solution));
        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });
        gapi.client.crackingleetcode.user.count({'email':$scope.user.email}).execute(function(resp) {
            console.log("count finished");
        });
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
      $scope.problem_loaded = true;
    });
    gapi.client.crackingleetcode.solution.get({'owner':$scope.useremail,'no':$scope.no, 'atype':$scope.type}).execute(function(resp) {
      console.log("solution.get resp");
      console.log(resp);
      if (resp.code){
        $scope.editmode = true;
        $scope.solution = {};
        $scope.solution.onmyself = 'Yes';
        $scope.solution.no = $scope.problem.no;
        $scope.solution.atype = $scope.problem.atype;
        $scope.solution.lang = $scope.user.profile.main_lang;
        console.log($scope.problem.difficulty);
        $scope.solution.difficulty = $scope.problem.difficulty;
        
      }
      else{
       	$scope.solution = resp.result;
        console.log("Solution:");
        console.log($scope.solution);
        // $('#code-snippet').innerHTML = $scope.solution.solution;
        $('#code-snippet').html($scope.htmlcode($scope.solution.solution));
        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });
      }
      $scope.solution_loaded = true;
      $scope.$apply();
    });


  });
