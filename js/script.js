$(function(){
    $("#navbarToggle").blur(
        function(){
            var scWidth = window.innerWidth;
            if(scWidth < 768){
                $("#navbarSupportedContent").collapse("hide");
            }
        });
});

(function(global){
    var dc = {};

    var homeHtml = "snippets/home.html";

    var insertHtml = function(selector, html){
        var targetElement = document.querySelector(selector);
        targetElement.innerHTML = html; 
    }

    var showLoading = function(selector){
        var html = "<div class='text-center'><img src='images/loading.gif'></div>";
        insertHtml(selector, html);
    }

    document.addEventListener("DOMContentLoaded", function(event){
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(homeHtml, function(responseText){
            document.querySelector("#main-content").innerHTML = responseText;
        }, false);
    });

    global.$dc = dc;
})(window);