'use strict';

/**
 * @ngdoc function
 * @name crackingLeetcodeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the crackingLeetcodeApp
 */
angular.module('crackingLeetcodeApp')
  .controller('AdminCtrl', function ($scope, $routeParams) {
  	console.log($scope.user);
  	var type = $routeParams.type;
  	gapi.client.crackingleetcode.problem.list({'atype':type}).execute(function(resp) {
        console.log(resp);
        $scope.problems = resp.problems;
        $scope.$apply();
     });
});
