'use strict';

/**
 * @ngdoc function
 * @name crackingLeetcodeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the crackingLeetcodeApp
 */
angular.module('crackingLeetcodeApp')
  .controller('AdminProblemCtrl', function ($scope, $location,$routeParams,authService) {
    authService.requireAdmin($scope);
    console.log("AdminProblemCtrl");
    $scope.type = $routeParams.type;
    console.log($scope.type);
  	$scope.save = function(){
  		gapi.client.crackingleetcode.problem.insert($scope.problem).execute(function(resp) {
  			console.log(resp);
	      	$location.path("/admin/" + $scope.type +"/problem/"+problem.no);
          $scope.$apply();
	    });
  	}
    gapi.client.crackingleetcode.problem.get({'no':$routeParams.no, 'atype':$scope.type}).execute(function(resp) {
        console.log(resp);
        $scope.problem = resp;
        $scope.$apply();
      });
});
