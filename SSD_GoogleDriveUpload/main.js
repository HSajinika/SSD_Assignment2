//571595437241-tok882khk6ks6s8qa1bggj48s5tl5v73.apps.googleusercontent.com -> Client ID
//AVpKFPZeSyi-GeKs6KUoPPGB -> Client Secret

$(document).ready(function(){
     
    // client id of the project
    var clientId = "571595437241-tok882khk6ks6s8qa1bggj48s5tl5v73.apps.googleusercontent.com";

    // redirect_uri of the project
    var redirect_uri = "http://localhost/SSD_GoogleDriveUpload/upload.html";

    // scope of the project
    var scope = "https://www.googleapis.com/auth/drive";

    // url to which the user is redirected to
    var url = "";


    // event click listener for the access button
    $("#accessToUpload").click(function(){

       // method which will be invoked it takes four parameters
       signInToUpload(clientId,redirect_uri,scope,url);

    });

    function signInToUpload(clientId,redirect_uri,scope,url){
     
       // the actual url to which the user is redirected to 
       url = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri="+redirect_uri
       +"&prompt=consent&response_type=code&client_id="+clientId+"&scope="+scope
       +"&access_type=offline";

       // makes the user redirected to the url
       window.location = url;

    }

});