'use strict';

/**
 * @ngdoc function
 * @name crackingLeetcodeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the crackingLeetcodeApp
 */
angular.module('crackingLeetcodeApp')
  .controller('AdminCtrl', function ($scope) {
  	console.log($scope.user);
  	gapi.client.crackingleetcode.problem.list().execute(function(resp) {
        console.log(resp);
        $scope.problems = resp.problems;
        $scope.$apply();
     });
});
