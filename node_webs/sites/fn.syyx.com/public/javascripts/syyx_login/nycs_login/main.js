//--------------------------------------------------------------------------------------------------
// 检测是否登录
//--------------------------------------------------------------------------------------------------
$("a").attr("hidefocus", "true")

var ajax_url = {
    check_login   : "http://fn.syyx.com/syyx_login/nycs/check_user_login/",
    check_captcha : "http://fn.syyx.com/syyx_login/nycs/check_captcha",
    get_captcha   : "http://fn.syyx.com/syyx_login/nycs/get_captcha",
    login_out     : "http://fn.syyx.com/syyx_login/nycs/login_out",
    login         : "http://fn.syyx.com/syyx_login/nycs/login"
}

var choke = false //ajax 阻塞判断

function check_login(reset) {
    $("#verify_img").attr("src", ajax_url.get_captcha + "?r=" + Math.random())
    $.get(ajax_url.check_login + "?r=" + Math.random(), function(data){
        if(data.login == true) {
            if(!reset) {
                parent.SyyxLogin.active.load(data.UserAccount)
            }            
            $("#account").html(data.UserAccount)
            $(".int").css("display", "none")
            $(".login").css("display", "none")
            $(".login_out").fadeIn("fast")
        } else {
            if(!reset) {
                parent.SyyxLogin.active.load(null)
            }
            $(".int").css("display", "none")
            $(".login").fadeIn("fast")
            $(".login_out").css("display", "none")
        }
    }, "jsonp")
}
check_login()

//--------------------------------------------------------------------------------------------------
// 登录功能
//--------------------------------------------------------------------------------------------------

//-错误提示-------------------------------------------------------------------------------------
var is_login_action = false

var errs = {
    "user"        : "",
    "password"    : "",
    "verify_code" : ""
}

function v_err(id, info) {
    if(!id) {
        $("#err_tip").css("display", "none")
    }else if(!info) {
        $("#err_tip").html(errs[id])
        $("#err_tip").css("display", "inline")
    } else {
        errs[id] = info
        $("#err_tip").html(info)
        $("#err_tip").css("display", "inline")
    }    
}

//-帐号验证-------------------------------------------------------------------------------------
!function() {
    var user = $("#user")

    user.focus(function() {
        choke = false
        $(this).addClass("focus")
        if(is_login_action) {
            $("#err_tip").css("display", "none")
            is_login_action = false
        }
    })

    user.blur(function() {
        $(this).removeClass("focus")
        var val = $(this).val()
        if(val.length < 6){
            v_err("user", "请输入6-16位帐号！")
            $(this).addClass("err")
            return
        }
        if(!/^[A-Za-z0-9_]{6,16}$/.test(val)) {
            v_err("user", "帐号只能6-16位，只能是字母、数字和下划线！")
            $(this).addClass("err")
            return
        }
        v_err()
        $(this).removeClass("err")
    })
}()

//-密码验证-------------------------------------------------------------------------------------
!function() {
    var password = $("#password")

    password.focus(function() {
        choke = false
        $(this).addClass("focus")
        if(is_login_action) {
            $("#err_tip").css("display", "none")
            is_login_action = false
        }
    })

    password.blur(function() {
        $(this).removeClass("focus")
        var val = $(this).val()
        if(val.length < 6){
            v_err("password", "请输入6-16位密码！")
            $(this).addClass("err")
            return
        }
        if(!/^[^\s]{6,16}$/.test(val)) {
            v_err("password", "密码不能有空格！")
            $(this).addClass("err")
            return
        }
        v_err()
        $(this).removeClass("err")
    })
}()

//验证码事件------------------------------------------------------------------------------------
var err_code = {}
var captcha  = ""
!function() {
    $("#verify_code").keyup(function (event) {
        var val = $("#verify_code").val().toLowerCase().replace(/[^a-z]/g, "")
        var len = val.length
        if(len == 0 ){
            return
        }
        if(len < 4) {
            $(this).removeClass("err")
            return
        }
        if(!/^[a-zA-Z0-9]{1,4}$/g.test(val)) {
            v_err("verify_code", "请输入字母，数字")
            $(this).addClass("err")
            return
        }
        if(captcha !== "") {
            if(val !== captcha) {
                v_err("verify_code", "验证码不正确")
                $(this).addClass("err")
            }else {
                if(!event || event.which !== 13) {
                    v_err()
                }                
                $(this).removeClass("err")
            }
            return
        }
        if(!err_code[val]) {        
            check_captcha(val)
        } else {
            v_err("verify_code", "验证码不正确")
            $(this).addClass("err")
        }
    })

    function check_captcha(val) {
        $.get(ajax_url.check_captcha +"?v=" + val + "&r=" + Math.random(), function(data) {
            if(data.type == 1) {
                v_err("verify_code", "验证码不正确")
                $("#verify_code").addClass("err")
                $("#verify_code").addClass("err")
                err_code[val] = 1
            } else {
                v_err()
                $("#verify_code").removeClass("err")
                captcha = val
            }
        },"jsonp")
    }

    $("#verify_code").focus(function() {
        choke = false
        $(this).addClass("focus")
        if(is_login_action) {
            $("#err_tip").css("display", "none")
            is_login_action = false
        }
    })

    $("#verify_code").blur(function() {
        $(this).removeClass("focus")
        if($(this).val().length < 4) {
            v_err("verify_code", "请输入4位验证码！")
            $(this).addClass("err")
        }
    })


    $("#verify_img").click(function() {
        $(this).attr("src", ajax_url.get_captcha + "?r=" + Math.random())
        captcha  = ""
        err_code = {}
        $("#verify_code").val("")
    })
    $("#verify_change").click(function() {
        $("#verify_img").attr("src", ajax_url.get_captcha + "?r=" + Math.random())
        captcha  = ""
        err_code = {}
        $("#verify_code").val("")
    })
}()


//提交------------------------------------------------------------------------------------------
function crossDomainPost() {
    choke = false
    $.get(ajax_url.check_login + "?r=" + Math.random(), function(data){
        parent.$("#post_form").remove()
        parent.$("#post_iframe").remove()
        if(data.login == true) {                        
            $("#account").html(data.UserAccount)
            $(".login").css("display", "none")
            $(".login_out").fadeIn("fast", function() {
                parent.SyyxLogin.active.login(data.UserAccount)
            })
        } else {
            v_err("ret", "用户名或密码错误！")
            $("#sub").removeClass("dis")
            $("#sub").html("登 录")
        }
    }, "jsonp")
}


function login_sub(){
    choke           = true
    var user        = $("#user").val()
    var password    = $("#password").val()
    var verify_code = $("#verify_code").val().toLowerCase()
    if(user.length < 6){
        $("#user").focus()
        v_err("user","请输入6-16位帐号！")
        return
    }
    if(password.length < 6){
        $("#password").focus()
        v_err("password","请输入6-16位密码！")
        return
    }
    if(verify_code.length !== 4){
        $("#verify_code").focus()
        v_err("verify_code", "请输入4位验证码！")
        return
    }
    if($(".err").length > 0) {
        $(".err").eq(0).focus() 
        v_err($(".err").eq(0).attr("id"))
        return
    }
    is_login_action = true
    $("#sub").addClass("dis")
    $("#sub").html("登录中..")

       parent.SyyxLogin.active.submit(user, password, verify_code)
 }

//点击提交
$("#sub").click(function() {
    if(choke == true) {
        return
    }
    login_sub()
})

//回车提交
$("input").keydown(function(event){
    if(choke == true) {
        return
    }
    if(event.which == 13){
        login_sub()
    }
})

//--------------------------------------------------------------------------------------------------
// 登出功能
//--------------------------------------------------------------------------------------------------

function get_login_out(cb) {    
    reset()
    choke = true
    $.get(ajax_url.login_out + "?r=" + Math.random(), function(data) {
        if(data.type == 0) {
            choke = false
            $(".login_out").css("display", "none")
            $(".login").fadeIn("fast")
            cb()
        }
    }, "jsonp") 
}

$("#to_login").click(function() {
    if(choke == true) {
        return
    }
    get_login_out(function(){})
})

$("#login_out").click(function() {
    if(choke == true) {
        return
    }
    $(this).addClass("dis")
    $(this).html("退出中..")
    get_login_out(function() {
        $("#login_out").removeClass("dis")
        $("#login_out").html("安全退出")
        parent.SyyxLogin.active.logout($("#account").html())
    })
})

function reset() {
    $(".login input").val("").removeClass("err")
    $("#err_tip").css("display", "none")
    $("#err_tip").html("")
    $("#verify_img").attr("src", ajax_url.get_captcha + "?r=" + Math.random())
    $("#sub").removeClass("dis").html("登 录")
    captcha  = ""
    err_code = {}
    errs = {
        "user"        : "",
        "password"    : "",
        "verify_code" : ""
    }
}