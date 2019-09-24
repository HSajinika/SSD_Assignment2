$(document).ready(function(){
    

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const redirect_uri = "http://localhost/SSD_GoogleDriveUpload/upload.html" //redirect_uri;
    const client_secret = "AVpKFPZeSyi-GeKs6KUoPPGB"; //client secret
    const scope = "https://www.googleapis.com/auth/drive";
    var access_token= "";
    var client_id = "571595437241-tok882khk6ks6s8qa1bggj48s5tl5v73.apps.googleusercontent.com"//client id;
    

    $.ajax({
        type: 'POST',
        url: "https://www.googleapis.com/oauth2/v4/token",
        data: {code:code
            ,redirect_uri:redirect_uri,
            client_secret:client_secret,
        client_id:client_id,
        scope:scope,
        grant_type:"authorization_code"},
        dataType: "json",
        success: function(resultData) {
           //save access token in local storage
           localStorage.setItem("accessToken",resultData.access_token);
           localStorage.setItem("refreshToken",resultData.refreshToken);
           localStorage.setItem("expires_in",resultData.expires_in);
           window.history.pushState({}, document.title, "/GitLoginApp/" + "upload.html");
           
        }
  });

    function stripQueryStringAndHashFromPath(url) {
        return url.split("?")[0].split("#")[0];
    }   

    var Upload = function (file) {
        this.file = file;
    };
    
    //get file type
    Upload.prototype.getType = function() {
        localStorage.setItem("type",this.file.type);
        return this.file.type;
    };

    //get file size
    Upload.prototype.getSize = function() {
        localStorage.setItem("size",this.file.size);
        return this.file.size;
    };

    //get file name
    Upload.prototype.getName = function() {
        return this.file.name;
    };

    Upload.prototype.doUpload = function () {
        var that = this;
        var formData = new FormData();
    
        // add assoc key values, this will be posts values
        formData.append("file", this.file, this.getName());
        formData.append("upload_file", true);
    
        $.ajax({
            type: "POST",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", "Bearer" + " " + localStorage.getItem("accessToken"));
                
            },
            url: "https://www.googleapis.com/upload/drive/v2/files",
            data:{
                uploadType:"media"
            },
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', that.progressHandling, false);
                }
                return myXhr;
            },
            success: function (data) {
                console.log(data); //success msg
            },
            error: function (error) {
                console.log(error);//error msg
            },
            async: true,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            timeout: 60000
        });
    };
    
    //progressbar handling
    Upload.prototype.progressHandling = function (event) {
        var percent = 0;
        var position = event.loaded || event.position;
        var total = event.total;
        var progress_bar_id = "#progress-wrp";
        if (event.lengthComputable) {
            percent = Math.ceil(position / total * 100);
        }
        // update progressbars classes to make it fits the code
        $(progress_bar_id + " .progress-bar").css("width", +percent + "%");
        $(progress_bar_id + " .status").text(percent + "%");
    };

    $("#upload").on("click", function (e) {
        var file = $("#files")[0].files[0];
        var upload = new Upload(file);
                
        // execute upload
        upload.doUpload();
    });
    
});