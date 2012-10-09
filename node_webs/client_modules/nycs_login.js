//----------------------------------------------------------------------------
// dev by 火柴
// api
//----------------------------------------------------------------------------

/* 
说明：
0、注意事项
    a、当前只能用于 syyx.com域名下 诺亚传说普通版 登录框登录
    b、本js需要以jquery_1.7 为基础，需要在jquery 之后 用户js之前加载。
    c、SyyxLogin 为全局api变量，请不要修改，否则会出错。
    d、以下api的“属性”和“方法”建议在页面渲染完毕后调用。

1、事件，登录和登出事触发，带用户名参数
    SyyxLogin.onlogin = function(user) {
        alert(user)
    }
    SyyxLogin.onlogout = function(user) {
        alert(user)
    }
    SyyxLogin.onload = function(user) { //页面加载完毕触发，用户登录判断需要此函数触发后进行
        alert(user)
    }

2、属性，根据初始状况和登录情况动态变化。可以用来检测是否登录。
    SyyxLogin.user

        //返回值
        undefined   ：等待初始化
        null        : 没有登录
        "user"      : 用户名

3、方法
    SyyxLogin.dialog() //弹出登录框和登出框
    SyyxLogin.close()  //关闭登录框或者登出框
    loginout.logout()  //直接登出，无须在弹出窗点击登出，此方法为jsonp跨域请求，注意IE6下jsonp绑定在事件上的bug

4、其他附带属性（兼容所有浏览器）

    SyyxLogin.active.get_page_size.page_height()   //当前页面高度
    SyyxLogin.active.get_page_size.page_width()    //当前页面宽度
    SyyxLogin.active.get_page_size.client_width()  //当前浏览器可见区域宽度
    SyyxLogin.active.get_page_size.client_height() //当前浏览器可见区域高度
    SyyxLogin.active.get_page_size.scrolltop()     //当前页面顶端被滚去的高度
    SyyxLogin.active.get_page_size.scrollleft()    //当前页面左边被滚去的宽度

*/
//----------------------------------------------------------------------------

var SyyxLogin = {
    active : {
        get_page_size : {
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
            }, 

            client_width : function() {
                return window.innerWidth || document.documentElement.clientWidth
            },

            client_height : function() {
                return window.innerHeight || document.documentElement.clientHeight
            },

            scrolltop     : function() {
                return $("html").scrollTop() || $("body").scrollTop()
            },

            scrollleft    : function() {
                return $("html").scrollLeft() || $("body").scrollLeft()
            }
        },
        load  : function(user) {
            SyyxLogin.user = user
            if(SyyxLogin.onload) {
                SyyxLogin.onload(user)
            }
        },
        login : function(user) {
            SyyxLogin.user = user
            if(SyyxLogin.onlogin) {
                SyyxLogin.onlogin(user)            
            }
            SyyxLogin.close()
        },

        logout : function(user) {
            SyyxLogin.user = null
            if(SyyxLogin.onlogout) {
                SyyxLogin.onlogout(user)
            }
            SyyxLogin.close()
        },

        check_login : function (user) {
            $.get("http://fn.syyx.com/syyx_login/nycs/check_user_login/?r=" + Math.random(), function(data){
                if(data.login == true) {
                    SyyxLogin.user = data.UserAccount
                }
            }, "jsonp")
        },

        submit :  function (user, password, verify_code) {
            var iframe = document.createElement("iframe");
            iframe.id="post_iframe"
            document.body.appendChild(iframe);
            iframe.style.display = "none";
            iframe.contentWindow.name = "loginpost";        
            $(iframe).bind({"load" : function() {
                SyyxLogin.active.SyyxLogin_iframe.window.crossDomainPost()
            }})
            $(document.body).append('<form target="loginpost" action="http://fn.syyx.com/syyx_login/nycs/login" style="display: none;" method="POST" id="post_form"><input type="hidden" name="account_name" value="' + user + '"><input type="hidden" name="password" value="' + password + '"><input type="hidden" name="validate_pic" value="' + verify_code + '"></form>')
            $("#post_form").submit();          
        }
    },

    dialog    : function() {
        if($.browser.msie && $.browser.version < 7) {
            $("select").addClass("SyyxLogin_select").css("visibility", "hidden")
        }
        $("#SyyxLogin_dialogBg").css({
            "display" : "block",
            "width"   : SyyxLogin.active.get_page_size.page_width(),
            "height"  : SyyxLogin.active.get_page_size.page_height()
        })

        $("#SyyxLogin_box").css({
            "display"     : "none",
            "top"         : SyyxLogin.active.get_page_size.scrolltop() + SyyxLogin.active.get_page_size.client_height()/2 - 156,
            "left"        : SyyxLogin.active.get_page_size.scrollleft() + SyyxLogin.active.get_page_size.client_width()/2 - 206
        }).fadeIn(100)
    }, 

    close : function() {
        if($.browser.msie && $.browser.version < 7) {
            $(".SyyxLogin_select").css("visibility", "").removeClass("SyyxLogin_select")
        }
        $("#SyyxLogin_dialogBg").css("display" , "none")
        $("#SyyxLogin_box").fadeOut(100, function() {
            $("#SyyxLogin_box").css({
            "display"     : "block",
            "top"         : -500
            })
        })
    },

    logout : function(cb) {        
        if(SyyxLogin.user) {
            $.get("http://fn.syyx.com/syyx_login/nycs/login_out", function(data){
                if(data.type == 0) {
                    SyyxLogin.user = null
                    SyyxLogin.active.SyyxLogin_iframe.window.reset()
                    SyyxLogin.active.SyyxLogin_iframe.window.check_login("reset")
                    try{
                        cb()
                    }catch(e){}
                    try{
                        SyyxLogin.onlogout(SyyxLogin.user)
                    }catch(e){}
                }
            }, "jsonp")
        }else {
            alert("当前没有登录，不需要退出登录")
        }
    },

    user  : undefined
}



!function() {
    var SyyxLogin_dialogBg = '<div id="SyyxLogin_dialogBg" style="background:#000;opacity:.8;filter:alpha(opacity=80);position:absolute;top:0;left:0;display:none;z-index:99998"></div>'
    SyyxLogin_dialogBg    += '<div id="SyyxLogin_box" style="top:-500px;width:402px;height:302px;position:absolute;border:5px #444 solid;z-index:99999">'
    SyyxLogin_dialogBg    += '<iframe id="SyyxLogin_iframe" name="SyyxLogin_iframe" frameborder="0" scrolling="no" width="400" height="300" style="border:1px solid #000;"></iframe><div id="SyyxLogin_title" style="width:100%;height:35px;position:absolute;top:1px;left:0;cursor:move;"></div><div onclick="SyyxLogin.close()" style="position:absolute;width:22px;height:22px;right:10px;top:6px;cursor:pointer;" title="关闭"></div></div>'
    $(document.body).append(SyyxLogin_dialogBg)    

    SyyxLogin.active.SyyxLogin_iframe = window.frames["SyyxLogin_iframe"]
    SyyxLogin.active.SyyxLogin_iframe.document.write('<!DOCTYPE html><html><head><link href="http://fn.syyx.com/stylesheets/syyx_login/nycs_login/main.css" rel="stylesheet" type="text/css"></head><body><div class="main"><div class="title">登录 - 诺亚传说<span></span></div><div class="int"></div><div class="login"><div>帐&nbsp;&nbsp;号：<input id="user" type="text" tabindex="1"><a href="http://user.syyx.com/reg.aspx" target="_blank">立即注册</a></div><div>密&nbsp;&nbsp;码：<input id="password" type="password" tabindex="2"><a href="http://service.syyx.com/SelfService/GetPassword.aspx" target="_blank">找回密码</a></div><div>验证码：<input id="verify_code" type="text" maxlength="4" tabindex="3" class="verify_code"><img id="verify_img" src="" width="100" height="27"><a id="verify_change" href="javascript:undefined">换一张</a></div><div class="center"><span id="err_tip"></span></div><div class="center"><a id="sub" href="javascript:undefined" tabindex="4" class="sub">登 录</a></div></div><div class="login_out"><div class="center">检测到您当前登录的帐号为：</div><div id="account" class="user center"></div><div class="center"><a id="login_out" href="javascript:undefined" class="sub">安全退出</a></div><div class="right"><a id="to_login" href="javascript:undefined">使用其他帐号登录</a></div></div><div class="nav"><a href="http://nycs.syyx.com/index.shtml" target="_blank">官网</a> | <a href="http://user.syyx.com/reg.aspx" target="_blank">注册</a> | <a href="http://bbs.nycs.syyx.com" target="_blank">论坛</a> | <a href="http://nycs.syyx.com/DownLoad/Index.shtml" target="_blank">下载</a></div></div><script src="http://s1.syyx.com/plugins/jquery/jquery-1.7.1.min.js" type="text/javascript"></script><script src="http://fn.syyx.com/javascripts/syyx_login/nycs_login/out.js" type="text/javascript"></script></body></html>')
    SyyxLogin.active.SyyxLogin_iframe.document.close()



    drag("#SyyxLogin_box", "#SyyxLogin_title")
    function drag(target_obj, action_obj) {
        var coor1 = []
        var p1    = []
        var p2    = {"left" : 0 , "top" : 0}
        $(action_obj).mousedown(function(event) {        
            coor1 = [event.pageX, event.pageY]
            p1    = [$(target_obj).css("left").replace("px", "") - 0, $(target_obj).css("top").replace("px", "") - 0]
            event.stopPropagation()
            event.preventDefault()
            $(document).mousemove(function(event) {
                event.preventDefault()
                event.stopPropagation()
                drag_action([event.pageX, event.pageY])
            })
            $(document).one("mouseup", function() {
                $(document).unbind("mousemove")
            })
        })

        function drag_action(coor2) {     
            p2["left"] = p1[0] + coor2[0] - coor1[0]
            p2["top"]  = p1[1] + coor2[1] - coor1[1]

            var max_left = SyyxLogin.active.get_page_size.page_width() - 412
            var max_top  = SyyxLogin.active.get_page_size.page_height() - 312

            if(p2["left"] < 0) {
                p2["left"] = 0
            }
            if(p2["left"] > max_left) {
                p2["left"] = max_left
            }
            if(p2["top"] < 0 ) {
                p2["top"] = 0
            }
            if(p2["top"] > max_top) {
                p2["top"] = max_top
            }
            $(target_obj).css(p2)
        }
    }

    $(window).resize(function() {
        if($("#SyyxLogin_dialogBg").css("display") !== "blcok") {
            return
        }
        $("#SyyxLogin_dialogBg").css({
            "width"   :  "100%",
            "height"   :  "100%"
        })
        setTimeout(function() {
            $("#SyyxLogin_dialogBg").css({
                "width"   :  SyyxLogin.active.get_page_size.page_width(),
                "height"   :  SyyxLogin.active.get_page_size.page_height()
            })
        }, 1)
        
    })
}()
