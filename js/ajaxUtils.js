(function(main){
    const request = new XMLHttpRequest();
    var ajaxUtils = {};

    ajaxUtils.sendGetRequest = function(requestUrl, responseHandler, isJsonReponse){
        request.onreadystatechange = function(){
            handleResponse(requestUrl, responseHandler, isJsonReponse);
        }

        request.open("GET", requestUrl, true);
        request.send(null);
    };

    function handleResponse(requestUrl, responseHandler, isJsonReponse){
        if(request.readyState == 4 && request.status == 200){
            if(isJsonReponse == undefined){
                isJsonReponse = true;
            }

            if(isJsonReponse){
                responseHandler(JSON.parse(request.responseText));
            } else {
                responseHandler(request.responseText);
            }
        }
    }

    main.$ajaxUtils = ajaxUtils;
})(window)
