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
    $scope.solution = {}
    $scope.solution.onmyself = 'Yes';
    $scope.solution.difficulty = 'Easy';
    $scope.solution.atype = 'algorithms';


  	$scope.save = function(){
  	  
    	console.log("save");	
  		console.log($scope.solution);
  		gapi.client.crackingleetcode.solution.insert($scope.solution).execute(function(resp) {
  			console.log(resp);
        console.log($scope.user.email + "/solution/" + resp.no);
	      $location.path($scope.user.email + "/" + $scope.solution.atype + "/solution/" + resp.no);
        $scope.$apply();
	    });
  	}
});
