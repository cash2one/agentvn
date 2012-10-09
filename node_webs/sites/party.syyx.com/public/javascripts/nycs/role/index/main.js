$(function(){
    var get_page_size = {
        page_height : function() {
            if($.browser.msie && $.browser.version < 7) {
                var b = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
                var c = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight)
                if(b < c) {
                    return $(window).height()
                } else {
                    return b
                }
            } else {
                return $(document).height()
            }
        },
        page_width : function() {
            if($.browser.msie) {
                var b = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth)
                var c = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth)
                if(b < c) {
                    return $(window).width()
                } else {
                    return b
                }

            }else {
                return $(document).width()
            }
        }
    }



    $("#forgotrole").click(function() {
        var tops = document.documentElement.scrollTop || document.body.scrollTop
        // if(!$("#iframe").attr("src")){
        //     $("#iframe").attr("src", "/nycs/role/loginrole.html")
        // }
        $("#iframe").attr("src", "/nycs/role/loginrole.html")
        $("#popup_bg").css({
            "display":"block",
            "width"  : get_page_size.page_width(),
            "height" : get_page_size.page_height()
        })
        $("#div_login").css("top", tops + 80)
        $("#div_login").css("display", "block")
        $("html").scrollTop( $("html").scrollTop() + 1)
        $("body").scrollTop( $("body").scrollTop() + 1)
    })

    $(window).resize(function() {
        $("#popup_bg").css({
            "width"   :  0,
            "height"   :  0
        })
        setTimeout(function() {
            $("#popup_bg").css({
                "width"   :  get_page_size.page_width(),
                "height"   :  get_page_size.page_height()
            })
        }, 1)
        
    })


    $("#forgotserver").click(function() {
        var tops = document.documentElement.scrollTop || document.body.scrollTop
        $("#iframeserver").attr("src", "/nycs/role/loginserver.html")
        $("#popup_bg").css("display", "block")
        $("#div_loginserver").css("top", tops + 80)
        $("#div_loginserver").css("display", "block")
        $("html").scrollTop( $("html").scrollTop() + 1)
        $("body").scrollTop( $("body").scrollTop() + 1)
    })

    $(".div_close").click(login_close)
})

function login_close() {
    $("#div_login").css("display", "none")
    $("#div_loginserver").css("display", "none")
    $("#popup_bg").css("display", "none")
}

