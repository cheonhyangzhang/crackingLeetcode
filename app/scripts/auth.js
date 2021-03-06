console.log("load auth.js");
CLIENT_ID = '686946052664-ab0boq4mu1j76sb56dfiljr2tl175vro.apps.googleusercontent.com';
SCOPES = ['https://www.googleapis.com/auth/userinfo.email',
          'https://www.googleapis.com/auth/plus.me']

PROJECT_ID = 'crackingleetcode'
var roles = {
            admin: 0
};
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
        auth_user.image = resp.image;
        auth_user.email = resp['emails'][0]['value'];
        if (auth_user.email == 'cenhiangapply@gmail.com'){
          auth_user.isadmin = true;
        }
        else{
          auth_user.isadmin = false;
        }
        console.log(auth_user);
        loadEndpoints();
    })
  });
}
reminder = function(){
  setTimeout(function(){
    var now = new Date();
    gapi.client.crackingleetcode.problem.reminder().execute(function(resp){
      console.log("reminder"); 
      console.log(resp);
        Notification.requestPermission(function (permission) {
          if (permission !== 'granted') return;
          var notification = new Notification(resp.no + " : " + resp.title , {
            icon: '../favicon.ico',
            body: "Sovled : " + resp.onmyself,
          });
          notification.onclick = function () {
            window.focus();
            console.log(window.location.host);
            var redirect_url = "http://" + window.location.host + "/#/" +auth_user.email + "/" + resp.atype + "/solution/" + resp.no;
            console.log(redirect_url);
            window.location.replace(redirect_url);
          };
        });
    });

    reminder();
  }, 1800000);
  // }, 10000);
}

// Notification.requestPermission(function (permission) {
//   if (permission !== 'granted') return;
// });

function boostrapAngular(){
  // reminder();
  gapi.client.crackingleetcode.user.get({'email':auth_user.email, 'displayName': auth_user.displayName, 'avatar':auth_user.image.url}).execute(function(resp) {
      console.log("user.get");
      console.log(resp);
      auth_user.profile = resp.result;
      angular.bootstrap(document,['crackingLeetcodeApp']);
  });
 
}