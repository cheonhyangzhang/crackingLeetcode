'use strict';

/**
 * @ngdoc function
 * @name crackingLeetcodeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the crackingLeetcodeApp
 */


angular.module('crackingLeetcodeApp')
  .controller('BaseCtrl', function ($scope, $location) {
  	console.log("BaseCtrl");
  	console.log($scope.user);
  	$scope.user = auth_user;
	$scope.requireAdmin = function(){
		if($scope.user.isadmin == false){
			$locaiton.path("/#/unauthorized");
			$scope.$apply();
		}
	}
  });
