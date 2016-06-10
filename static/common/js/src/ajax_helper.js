var base_url = window.location.protocol+'//'+window.location.hostname;
var ajaxFactory = {

    ajaxHandler : function(url,method,data,callback){

        var ajax_data = {
            'url':url,
            'type':method,
            'contentType':'application/json',
            'success':function(response){
                if(typeof callback!='undefined' && response){
                    callback(response)

                }
            },
            'error':function(response){
                if(typeof callback!='undefined' && response){
                    callback(response.responseJSON)

                }
            }
        };

        if(data!=undefined){
             ajax_data['data'] = JSON.stringify(data)
        }

        var csrf_token = ajaxFactory.getCookie('csrftoken');
        if(csrf_token!=''){
            ajax_data['beforeSend'] = function(xhr, settings) {
                xhr.setRequestHeader("X-CSRFToken", csrf_token);
            }
        }

        $.ajax(ajax_data)
    },
    ajaxHandlerFile : function(url,method,data,callback){
        var ajax_data = {
            'url':url,
            'type':method,
            'data':data,
            'contentType':false,
            'processData':false,
            xhr: function() {
                var xhr = $.ajaxSettings.xhr();

                if (xhr.upload) {
                    xhr.upload.addEventListener('progress', function(evt) {
                        var percent = (evt.loaded / evt.total) * 100;
                        console.log(percent)
                    }, false);
                }
                return xhr;
            },
            'success':function(response){
                if(typeof callback!='undefined' && response){
                    callback(response)

                }
            },
            'error':function(response){
                if(typeof callback!='undefined' && response){
                    callback(response.responseJSON)

                }
            }
        };

        var csrf_token = ajaxFactory.getCookie('csrftoken');
        if(csrf_token!=''){
            ajax_data['beforeSend'] = function(xhr, settings) {
                xhr.setRequestHeader("X-CSRFToken", csrf_token);
            }
        }

        $.ajax(ajax_data)
    },
    ajaxHandlerJWTImage : function(url,method,data,token,callback){

        var csrf_token = ajaxFactory.getCookie('csrftoken');

        $.ajax({
            'url':url,
            'type':method,
            'data':data,
            'contentType':false,
            'processData':false,
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader("X-CSRFToken", csrf_token);
                xhr.setRequestHeader("Authorization", "JWT "+ token);
            },
            'success':function(response){
                if(typeof callback!='undefined' && response){
                    callback(response)
                }

            },
            error: function(response,status,error){
                if(response.status==401){
                    ajaxFactory.secureHTTPRequestHandlerImage(url,method,data,callback,'expired');
                }
            }
        })
    },

    ajaxHandlerJWT : function(url,method,data,token,callback){

        var csrf_token = ajaxFactory.getCookie('csrftoken');

        $.ajax({
            'url':url,
            'type':method,
            'data':JSON.stringify(data),
            'contentType':'application/json',
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader("X-CSRFToken", csrf_token);
                xhr.setRequestHeader("Authorization", "JWT "+ token);
            },
            'success':function(response,status,xhr){
                callback(response)
            },
            error: function(response,status,error){
                ajaxFactory.secureHTTPRequestHandler(url,method,data,callback,'expired')
            }


        })
    },

    getCookie : function(name){
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    },

    secureHTTPRequestHandler : function(url,method,data,callback,type){
        var token = localStorage.getItem('jwt_token');

        if(token=='' || type=='expired'){
            ajaxFactory.ajaxHandler(base_url+'/accounts/token/','GET',{},function(response){
                localStorage.setItem('token',response.token);
                ajaxFactory.ajaxHandlerJWT(url,method,data,response.token,callback)
            })
        }
        else{
           ajaxFactory.ajaxHandlerJWT(url,method,data,token,callback)
        }
    },

    secureHTTPRequestHandlerImage : function(url,method,data,callback,type){
        var token = localStorage.getItem('jwt_token');
        if(token=='' || type=='expired'){
            ajaxFactory.ajaxHandler(base_url+'/accounts/token/','GET',{},function(response){
                localStorage.setItem('token',response.token);
                ajaxFactory.ajaxHandlerJWTImage(url,method,data,response.token,callback)
            })
        }
        else{
           ajaxFactory.ajaxHandlerJWTImage(url,method,data,token,callback)
        }
    }

};