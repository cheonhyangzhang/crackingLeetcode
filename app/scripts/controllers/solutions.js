'use strict';

/**
 * @ngdoc function
 * @name crackingLeetcodeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the crackingLeetcodeApp
 */
angular.module('crackingLeetcodeApp')
  .controller('SolutionsCtrl', function ($scope, $rootScope, $routeParams) {
    console.log("SolutionsCtrl");
    $scope.type = $routeParams.type;
    $scope.useremail = $routeParams.useremail;  
    console.log($scope.useremail);


  	$rootScope.title = $scope.user.displayName + " - " + $scope.type + " solutions";
  	
    gapi.client.crackingleetcode.solution.list({'account':$scope.useremail, 'atype':$scope.type}).execute(function(resp) {
      console.log("resp");
      console.log(resp);
      $scope.solutions = resp.solutions;
      $scope.$apply();
    });


  });
