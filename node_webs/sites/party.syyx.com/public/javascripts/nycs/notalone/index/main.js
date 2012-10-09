$(function(){
    $("#login").click(function() {
        var tops = document.documentElement.scrollTop || document.body.scrollTop;
        //document.domain = "syyx.com";
        //document.getElementById("iframe").contentWindow.document.location.reload()
        $("#popup_bg").css("display", "block")
        $("#div_login").css("top", tops + 80)
        $("#div_login").css("display", "block")
        //$("#div_login").fadeIn("fast")
        $("html").scrollTop( $("html").scrollTop() + 1)
        $("body").scrollTop( $("body").scrollTop() + 1)
    })

    get_iframe_src()

    $(".more").click(function(){
        document.location = "http://party.syyx.com/nycs/notalone/photolist.html"
    })

    $(".div_close").click(login_close)
    getflash("http://r.syyx.com/party/nycs/notalone/index.swf",692 ,589, "#swf")

    $(".indexlink").click(function(){
        $("html").animate({ scrollTop: "520" }, "normal")
        $("body").animate({ scrollTop: "520" }, "normal")
        return false
    })
})

function login_close() {
    $("#div_login").css("display", "none")
    //$("#div_login").fadeOut("fast");
    $("#popup_bg").css("display", "none")
    get_iframe_src()
}

function getflash(swf, w, h, id) {
    var object = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + w + '" height="' + h + '" ><param name="movie" value="' + swf + '" /><!--[if !IE]>--><object type="application/x-shockwave-flash" data="' + swf + '" width="' + w + '" height="' + h + '"><!--<![endif]--><param name="wmode" value="transparent" /><!--[if !IE]>--></object><!--<![endif]--></object>'
    $(id).html(object)
}

function get_iframe_src(){
    $("#iframe").attr("src", "/nycs/notalone/login.html")
    $.get("/check_user_login?r=" + Math.random(),{a:Math.random()} , function(data) {

        if(!data.login){

            $("#iframe").attr("src","/nycs/notalone/login.html")
        }
        else{
            $("#user_name").html(data.UserAccount)
            $("#login_a").css("display", "inline")
            $("#login_out").click(function() {
                var date = new Date();
                date.setTime(date.getTime() + 10000);
                document.cookie = "shangyoo2=a; expires=" + date.toGMTString() + ";domain=syyx.com;path=/"; 
                $("#login_a").css("display", "none")
                $("#iframe").attr("src","/nycs/notalone/login.html")
            })
            $.get("/nycs/notalone/get_info?r=" + Math.random(),{a:Math.random()} , function(rows) {
                if(rows.length > 0){
                    $("#iframe").attr("src","/nycs/notalone/uploadsuccess.html")
                }
                else{
                    $("#iframe").attr("src","/nycs/notalone/uploadphoto.html")
                }
            }, "json")
        }
    }, "json")
}