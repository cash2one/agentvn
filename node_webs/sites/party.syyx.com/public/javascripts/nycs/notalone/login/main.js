var url_captcha          = "/captcha"
var url_check_captcha    = "/check_captcha"
var url_register_account = "/nycs/notalone/check_login"
//-----------------------------
var login_input_data=[
    {   name          : "account_name",
        input_id      : "txtAccount",
        info_div_id   : "loginerr",
        clearvalue    : false,
        local_check   : [
            { type : 'empty', err_info : "请输入账号" },
            { type : 'length', min : 6, max : 16, err_info : "账号长度必须6-16位" },
            { type : 'regex', value : /^[A-Za-z0-9_]{6,16}$/, err_info : "只能为字母,数字,下划线" }
        ]
    },
    {   name             : "password",
        input_id         : "txtpwd",
        info_div_id      : "loginerr",
        info_cover_input : true,
        local_check      : [
            { type : 'empty', err_info : "请输入密码" },
            { type : 'length', min : 6, max : 16, err_info : "密码的长度为6-16个字符" } ,
            { type : 'regex', value : /^[^\s]{6,16}$/, err_info : "输入的密码不能包含空格" }
        ]
    },
    {   name          : "validate_pic",
        input_id      : "txtValidate",
        info_div_id      : "loginerr",
        pic_img       : { id : "validateimg", src : url_captcha,len:4 },
        local_check   : [
            { type : 'length', min : 4, max : 4, err_info : false }
        ],
        remote_check  : {
            url : url_check_captcha,
            1   : "验证码错误"
        }
    }
]

//-----------------------------
$(function(){
    // $.get("/check_user_login", function(data) {
    //     if(data.login){
    //         document.location = "/nycs/notalone/uploadphoto.html"
    //     }
    // }, "json")

    //前端验证初始化
    input_setting_inputs(login_input_data)

    //提交验证
	$("#chklogin").click(function(event) {
        account_register_request()
        event.preventDefault()
    })

    $("#loginfrom").keypress(function(event) {
        if (event.which == 13) { // 回车
            account_register_request()
        }
    })

    $("#cancel_login").click(function(){
        $("#txtAccount").val("")
        $("#txtpwd").val("")
        $("#txtValidate").val("")
        $("#loginerr").html("")
    })
});

function account_register_request() {
    
    var ret = input_local_check_inputs(login_input_data)
     if (!ret) {
         return
    }

    //检查控件状态
    //var ret = input_status_check(login_input_data)
    //if(!ret) {
    //    return
    //}

    //组装需要提交的参数
    var ret = input_get_inputs_value(login_input_data)
    if (!ret) {
        return
    }
    
    ret.r = Math.random()
    
    $.post(url_register_account, ret, function(data) {
        if(data.type != 0){
            $("#loginerr").html(data.info)
        }
        else{
            document.location = "/nycs/notalone/uploadphoto.html?r=" + Math.random()
        }
    })
}

