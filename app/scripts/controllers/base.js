'use strict';

/**
 * @ngdoc function
 * @name crackingLeetcodeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the crackingLeetcodeApp
 */
angular.module('crackingLeetcodeApp')
  .controller('BaseCtrl', function ($scope) {
  	console.log("BaseCtrl");
  	console.log($scope.user);
  	$scope.user = auth_user;
  });
