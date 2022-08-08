$(function(){
    $("#navbarToggle").blur(function(event){
        var scWidth = window.innerWidth;
        if(scWidth < 768){
            $("#navbarSupportedContent").collapse("hide");
            console.log("ASD");
        }
    });
});