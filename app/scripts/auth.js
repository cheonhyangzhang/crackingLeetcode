console.log("load auth.js");
CLIENT_ID = '686946052664-ab0boq4mu1j76sb56dfiljr2tl175vro.apps.googleusercontent.com';
SCOPES = ['https://www.googleapis.com/auth/userinfo.email',
          'https://www.googleapis.com/auth/plus.me']

PROJECT_ID = 'crackingleetcode'

var auth_user={'description':'user info'};
var api_to_load = 1;
function init(){
    //ask for oauth
    gapi.auth.authorize({client_id: CLIENT_ID, scope: SCOPES,immediate: true}, function(result){
        if (result && !result.error){
          loadPlus();
        }
        else{
          gapi.auth.authorize({client_id: CLIENT_ID,
          scope: SCOPES, immediate: false},
          function(result){
            if (result && !result.error){
              loadPlus();
            }
            else{
              console.log("Auth failed");
            }
          });
        }
  });
}
function loadEndpoints(){
  api_to_load -=1;
  if (api_to_load == 0){
    // var endpoint_url = 'http://localhost:19999/_ah/api';
    var endpoint_url = 'https://crackingleetcode.appspot.com/_ah/api';
    gapi.client.load('crackingleetcode', 'v1', boostrapAngular, endpoint_url);
  }
}
function loadPlus(){
  gapi.client.load('plus', 'v1', function () {
    gapi.client.plus.people.get( {'userId' : 'me'} ).execute(function(resp) {
        // Shows profile information
        console.log("LoadPlus");
        console.log(resp);
        auth_user.displayName = resp.displayName;
        auth_user.email = resp['emails'][0]['value'];
        console.log(auth_user);
        loadEndpoints();
    })
  });
}
function boostrapAngular(){
  angular.bootstrap(document,['crackingLeetcodeApp']);
}