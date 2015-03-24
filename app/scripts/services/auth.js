angular.module('crackingLeetcodeApp')
  .factory('authService', function ($resource, $location) {
    return {
        requireAdmin: function ($scope) {
        	if($scope.user.isadmin == false){
        		console.log("")
				$location.path("/unauthorized");
			}
        }
    };
});
