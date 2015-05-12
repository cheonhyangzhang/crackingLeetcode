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
  	$scope.count = {'Easy':0, 'Medium':0, 'Hard':0};
  	gapi.client.crackingleetcode.problem.list({'atype':$scope.type}).execute(function(resp) {
        console.log(resp);
        $scope.problems = resp.problems;
        $.each($scope.problems, function(index, value){
          $scope.count[value.difficulty]+=1;
        });
        $scope.$apply();
     });
});
