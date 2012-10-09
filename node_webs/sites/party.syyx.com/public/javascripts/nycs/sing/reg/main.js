// var platform = 'iis'
var platform = 'node'

if (platform == 'node') {
    var url_account_check    = "/account_check"
    var url_captcha          = "/captcha"
    var url_check_captcha    = "/check_captcha"
    var url_register_account = "/register"
    var url_get_card         = "/get_card"
}
else {
    var url_account_check    = "/ajax/account_check.aspx"
    var url_check_idcard     = "/ajax/check_idcard.aspx"
    var url_captcha          = "/ajax/captcha.aspx"
    var url_check_captcha    = "/ajax/check_captcha.aspx"
    var url_register_account = "/ajax/register_account.aspx"
    var url_get_card         = "/ajax/get_card.aspx"
}

!function() {
    $(".reg_form input").focus(function() {
        $("#validateimg").show()
    })
}()

$("document").ready(function() {
    $(".reg_form input").val("")
})
//以下正正原来有的---------------------------------------------------------------------------------------------
var account_register_input_data = [
    {   name          : "account_name",
        input_id      : "txtUserAccount",
        info_div_id   : "loginerror",
        status_div_id : "txtUserAccountTip",
        local_check   : [
            { type : 'empty', err_info : "请输入账号" },
            { type : 'length', min : 6, max : 16, err_info : "长度必须6-16位" },
            { type : 'regex', value : /^[A-Za-z0-9_]{6,16}$/, err_info : "须字母,数字,下划线" }
        ],
        remote_check  : {
            url      : url_account_check,
            1        : '该账号已经存在',
            2        : '系统错误'
        }
    },
    {   name             : "password",
        input_id         : "txtPasswords",
        info_div_id      : "loginerror",
        status_div_id    : "txtPasswordsTip",
        info_cover_input : true,
        local_check      : [
            { type : 'empty', err_info : "请输入密码" },
            { type : 'length', min : 6, max : 16, err_info : "密码须6-16个字符" } ,
            { type : 'regex', value : /^[^\s]{6,16}$/, err_info : "密码不能包含空格" }
        ]
    },
    {   name             : "confirm_password",
        input_id         : "txtConfirm",
        info_div_id      : "loginerror",
        status_div_id    : "txtConfirmTip",
        info_cover_input : true,
        local_check      : [
            { type : 'empty', err_info : "请再输一遍密码" },
            { type : 'equal', value : "txtPasswords", err_info : "密码不一致" }
        ]
    },
    {
        name          : "id_card",
        input_id      : "txtCardID",
        info_div_id   : "loginerror",
        status_div_id : "txtCardIDTip",
        local_check   : [
            { type : 'empty', err_info : "请输入身份证信息" },
            { type : 'length', options : [ 15, 18 ], err_info : "身份证为15或18位" }
        ],
        remote_check  : {
            url : url_check_idcard,
            1   : "无效的身份证号码"
        }
    },
    {   name          : "true_name",
        input_id      : "txtTrueName",
        info_div_id   : "loginerror",
        status_div_id : "txtTrueNameTip",
        local_check   : [
            { type : 'empty', err_info : "请输入您的姓名" },
            { type : 'length', min : 2, max : 10, err_info : "须2-10个汉字" } ,
            { type : 'regex', value : /^[\u4e00-\u9fa5]{2,6}$/, err_info : "姓名必须是汉字" }
        ]
    },
    {   name          : "validate_pic",
        input_id      : "txtValidate",
        info_div_id   : "loginerror",
        status_div_id : "loginerror",
        pic_img       : { id : "validateimg", src : url_captcha },
        local_check   : [
            { type : 'length', min : 4, max : 4, err_info : false }
        ],
        remote_check  : {
            url : url_check_captcha,
            1   : "验证码错误"
        }
    }
]

function getParameter(param)
{
 var query = window.location.search;
 var iLen = param.length;
 var iStart = query.indexOf(param);
 if (iStart == -1)
  return "";
 iStart += iLen + 1;
 var iEnd = query.indexOf("&", iStart);
 if (iEnd == -1)
  return query.substring(iStart);

 return query.substring(iStart, iEnd);
}

function account_register_setting() {
    input_setting_inputs(account_register_input_data)

    $("#reg_button").click(function(event) {
        account_register_request()
        event.preventDefault()
    })
            
    $("table.reg_form").keypress(function(event) {
        if (event.which == 13) { // 回车
            account_register_request()
        }
    })
}
//---------------------------------------------------------------------------------------------------------
function account_register_request() {
    var ret = input_local_check_inputs(account_register_input_data)
    if(!ret) {
        return
    }

    // var ret = input_local_check_inputs(account_register_input_data)
    // if (!ret) {
    //     return
    // }
    if (!check_license_agreement()) {
        return
    }

    var ret = input_get_inputs_value(account_register_input_data)
    if (!ret) {
        return
    }

    set_reg_progress()
    
    ret.page_name = "index40"
    ret.r = Math.random()
    
    if (platform == 'iis') {
        $.post(url_register_account, ret, function(data) {
            var func = reg_result_func[data.type] || reg_result_func.default_
            func(data.info)
        }, "json")
    }
    else {
        $.post(url_register_account, ret, function(data) {
            var func = reg_result_func[data.type] || reg_result_func.default_
            func(data.info)
            //alert(ret.RegUser_ErrorCodeResult)
        })
    }
}
//---------------------------------------------------------------------------------------------------------
function check_license_agreement() {
    if (!$("#chk_XieYi").attr("checked")) {
        //alert("请阅读并同意注册协议！"); 
        $("#loginerror").html("请阅读并同意注册协议！")
        return false
    }

    return true
}
//---------------------------------------------------------------------------------------------------------
function set_reg_progress() {
    $("#regProcessTip").attr("class", "check_result_loading")
}

//---------------------------------------------------------------------------------------------------------
var reg_result_func = {
    ok: function(info) {
        $(".fmtitle").attr("class","")
        $(".reg_panel").hide()
        $(".fmmsg").show()
        //$("#chkbtn").attr("href","/nycs/sing/login.html?type="+ getParameter("type"))
        if(getParameter("type") == "up"){
            //top.document.location = "/nycs/sing/uploadsing.html#tp"
            $("#chkbtn").attr("href","javascript:parent.document.location = '/nycs/sing/uploadsing.html#tp'")
        }
        else{
            //document.location = "/nycs/sing/vote.html?id="+ getParameter("id")
            $("#chkbtn").attr("href","javascript:parent.document.location = '/nycs/sing/index.html#tp'")
        }
    },

    default_: function(info) {
        $("#txtPasswords").val("")
        $("#txtConfirm").val("")
        $("#txtValidate").val("")
        $("#regProcessTip").attr("class", "")
        $("#loginerror").html(info)
    }
}

account_register_setting()
