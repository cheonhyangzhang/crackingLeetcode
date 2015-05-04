angular.module('crackingLeetcodeApp')
  .factory('userService', function ($resource, $location) {
    return {
        get: function (useremail, callback) {
			gapi.client.crackingleetcode.user.get({'email':useremail}).execute(function(resp) {
				callback(resp);
			});
        },
        patch: function (user, callback) {
			gapi.client.crackingleetcode.user.patch(user).execute(function(resp) {
				callback(resp);
			});
        },
        list: function (callback) {
            gapi.client.crackingleetcode.user.list({}).execute(function(resp) {
                callback(resp);
            });
        }
    };
});
