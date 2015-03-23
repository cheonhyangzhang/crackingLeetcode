'use strict';

/**
 * @ngdoc overview
 * @name crackingLeetcodeApp
 * @description
 * # crackingLeetcodeApp
 *
 * Main module of the application.
 */
angular
  .module('crackingLeetcodeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'monospaced.elastic',
    'nya.bootstrap.select',
    'ngTagsInput'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/problem/new', {
        templateUrl: 'views/problem_new.html',
        controller: 'ProblemNewCtrl'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl'
      })
      .when('/problem/:no', {
        templateUrl: 'views/problem.html',
        controller: 'ProblemCtrl'
      })
      .when('/solution/new', {
        templateUrl: 'views/solution_new.html',
        controller: 'SolutionNewCtrl'
      })
      .when('/:useremail/solution/:no', {
        templateUrl: 'views/solution.html',
        controller: 'SolutionCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
