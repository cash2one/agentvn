function default_set(){
    var jiathis_config={
        data_track_clickback:true,
        siteNum:15,
        sm:"qzone,tsina,tqq,renren,kaixin001,tieba,douban,tsohu,t163,feixin,xiaoyou,msn,tianya,mop",
        summary:"",
        boldNum:6,
        ralateuid:{
            "tsina":"nuoyachuanshuo"
        },
        showClose:true,
        hideMore:false
    }
    
    $("#login_out").click(function(){
        $.get("/login_out?r=" + Math.random(), function(data) {
            document.location.reload() 
        })
    })
    
    $("#map2").click(function(){
        $.get("/check_user_login?r=" + Math.random(), function(data) {
            if(!data.login){
                login()
                return
            }
            document.location="http://party.syyx.com/nycs/sing/uploadsing.html#tp"
        })
    })

    $("#topcy").click(function(){
        $.get("/check_user_login?r=" + Math.random(), function(data) {
            if(!data.login){
                login()
                return
            }
            document.location="http://party.syyx.com/nycs/sing/uploadsing.html#tp"
        })
    })
    

    $(".div_close").click(login_close)

    //判断登录
    $.get("/check_user_login?r=" + Math.random(), function(data) {
        if(!data.login){
            //login()
        }
        else{
            $("#login_a").show()
            $("#user_name").html(data.UserAccount)
        }
    })
}

function vote(id){
    var tops = document.documentElement.scrollTop || document.body.scrollTop;
    $("#iframe").attr("src","/nycs/sing/vote.html?id=" + id)
    //document.domain = "syyx.com";
    //document.getElementById("iframe").contentWindow.document.location.reload()
    $("#popup_bg").css("display", "block")
    $("#div_login").css("top", tops + 80)
    $("#div_login").css("display", "block")
    //$("#div_login").fadeIn("fast")
    $("html").scrollTop( $("html").scrollTop() + 1)
    $("body").scrollTop( $("body").scrollTop() + 1)
}

function login_close() {
    $("#div_login").css("display", "none")
    //$("#div_login").fadeOut("fast");
    $("#popup_bg").css("display", "none")
}

function login(){
    var tops = document.documentElement.scrollTop || document.body.scrollTop;
    $("#iframe").attr("src","/nycs/sing/login.html?type=up")
    //document.domain = "syyx.com";
    //document.getElementById("iframe").contentWindow.document.location.reload()
    $("#popup_bg").css("display", "block")
    $("#div_login").css("top", tops + 80)
    $("#div_login").css("display", "block")
    //$("#div_login").fadeIn("fast")
    $("html").scrollTop( $("html").scrollTop() + 1)
    $("body").scrollTop( $("body").scrollTop() + 1)
}