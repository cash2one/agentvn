// var platform = 'iis'
var platform = 'node'

if (platform == 'node') {
    var url_account_check    = "/account_check"
    var url_check_idcard     = "/check_idcard"
    var url_captcha          = "/captcha"
    var url_check_captcha    = "/check_captcha"
    var url_register_account = "/register_account"
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
//-------------------------------------net client---------------------------------------
var page_name = "index_360"

var subject_area_flash_data = {
    ad_video : {
        div_id : "video_info",
        url    : "http://s.syyx.com/nycs/flash/defaule_video_summary.swf",
        width  : 154,
        height : 94
    },
    launch_game : {
        div_id : "flash_effect",
        url    : "http://s.syyx.com/events/type1_0502/netbar.swf",
        width  : 240,
        height : 70
    },
    pop      : {
        div_id : "pop_flash",
        url    : "http://s.syyx.com/nycs/flash/player2.swf?autostart=true&repeat=false&file=http://v.nycs.syyx.com/nycs/flv/yindaoye_l_20110609.flv",
        width  : 640,
        height : 360
    }
}
//---------------------------------------------------------------------------------------------------------
var role_intro_flash_data = {
    role_yineng : {
        div_id : "yineng_video",
        url    : "http://v.nycs.syyx.com/nycs/swf/yi_5_8.swf",
        width  : 256,
        height : 144
    },
    role_jianwu : {
        div_id : "jianwu_video",
        url    : "http://v.nycs.syyx.com/nycs/swf/jian_5_8.swf",
        width  : 256,
        height : 144
    },
    role_gedou : {
        div_id : "gedou_video",
        url    : "http://v.nycs.syyx.com/nycs/swf/ge_5_8.swf",
        width  : 256,
        height : 144
    },
    role_qiangxie : {
        div_id : "qiangxie_video",
        url    : "http://v.nycs.syyx.com/nycs/swf/qiang_5_8.swf",
        width  : 256,
        height : 144
    }
}


//-----------------------------------dom Loaded ----------------------------------------
$(function() {
    global_setting()
    account_register_setting()
    $(".reg_form input").focus(function() {
        $("#validateimg").show()
    })
})
//---------------------------------------------------------------------------------------
function global_setting() {
    //去掉链接虚线
    $("a").attr("hideFocus", "true");
}

//---------------------------------------------------------------------------------------------------------
var account_register_input_data = [
    {   name          : "account_name",
        input_id      : "txtUserAccount",
        info_div_id   : "txtUserAccount",
        status_div_id : "txtUserAccountTip",
        local_check   : [
            { type : 'empty', err_info : "请输入账号" },
            { type : 'length', min : 6, max : 16, err_info : "账号长度必须6-16位" },
            { type : 'regex', value : /^[A-Za-z0-9_]{6,16}$/, err_info : "只能为字母,数字,下划线" }
        ],
        remote_check  : {
            url      : url_account_check,
            1        : '该账号已经存在',
            2        : '系统错误'
        }
    },
    {   name             : "password",
        input_id         : "txtPasswords",
        info_div_id      : "txtPasswordsVal",
        status_div_id    : "txtPasswordsTip",
        info_cover_input : true,
        local_check      : [
            { type : 'empty', err_info : "请输入密码" },
            { type : 'length', min : 6, max : 16, err_info : "密码的长度为6-16个字符" } ,
            { type : 'regex', value : /^[^\s]{6,16}$/, err_info : "输入的密码不能包含空格" }
        ]
    },
    {   name             : "confirm_password",
        input_id         : "txtConfirm",
        info_div_id      : "txtConfirmVal",
        status_div_id    : "txtConfirmTip",
        info_cover_input : true,
        local_check      : [
            { type : 'empty', err_info : "请再输入一遍密码" },
            { type : 'equal', value : "txtPasswords", err_info : "两次输入的密码不一致" }
        ]
    },
    {
        name          : "id_card",
        input_id      : "txtCardID",
        info_div_id   : "txtCardID",
        status_div_id : "txtCardIDTip",
        local_check   : [
            { type : 'empty', err_info : "请输入您的身份证信息" },
            { type : 'length', options : [ 15, 18 ], err_info : "身份证应为15位或18位" }
        ],
        remote_check  : {
            url : url_check_idcard,
            1   : "无效的身份证号码"
        }
    },
    {   name          : "true_name",
        input_id      : "txtTrueName",
        info_div_id   : "txtTrueName",
        status_div_id : "txtTrueNameTip",
        local_check   : [
            { type : 'empty', err_info : "请输入您的姓名" },
            { type : 'length', min : 2, max : 10, err_info : "姓名必须2-10个汉字" } ,
            { type : 'regex', value : /^[\u4e00-\u9fa5]{2,6}$/, err_info : "姓名必须是汉字" }
        ]
    },
    {   name          : "validate_pic",
        input_id      : "txtValidate",
        status_div_id : "txtValidateVal",
        pic_img       : { id : "validateimg", src : url_captcha },
        local_check   : [
            { type : 'length', min : 4, max : 4, err_info : false }
        ],
        remote_check  : {
            url : url_check_captcha,
            1   : ""
        }
    }
]
//---------------------------------------------------------------------------------------------------------
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
function check_license_agreement() {
    if (!$("#chk_XieYi").attr("checked")) {
        alert("请阅读并同意注册协议！"); 
        return false
    }

    return true
}
//---------------------------------------------------------------------------------------------------------
function set_reg_progress() {
    $("#regProcessTip").attr("class", "check_result_loading")
}
//---------------------------------------------------------------------------------------------------------
function clear_reg_progress() {
    $("#regProcessTip").attr("class", "")
}
//---------------------------------------------------------------------------------------------------------
var reg_result_func = {
    ok: function(info) {
        $("#reg_account").html(info[0])
        $('#active_code').html(info[1])
        $(".reg").hide()
        $("#reg_step2").show()

        $("#active_link").click(function(event) {
            var basic_active_url = "http://activity.syyx.com/nycs_activate/activate_giftbag.shtml" //以上6行 火柴修改。为了组合网吧获取礼包的路径。
            var whole_url_to_active = basic_active_url + "?" + info[0] + "&" + info[1]
            window.open(whole_url_to_active)
            event.preventDefault()
        })
    },

    no_card  : function(info) {
        $(".reg").hide()
        $("#reg_step3").show()
        $('#reg_account3').html(info[0])
    },

    failed   : function(info) {
        alert(info)
    },

    default_ : function(info) {
        $("#txtPasswords").val("")
        $("#txtConfirm").val("")
        $("#txtValidate").val("")
        $("#regProcessTip").attr("class", "")
        alert(info)
    }
}
//---------------------------------------------------------------------------------------------------------
function account_register_request() {
    var ret = input_status_check(account_register_input_data)
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
    
    ret.page_name = page_name
    ret.r = Math.random()
    
    if (platform == 'iis') {
        $.post(url_register_account, ret, function(data) {
            clear_reg_progress()

            var func = reg_result_func[data.type] || reg_result_func.default_
            func(data.info)
        }, "json")
    }
    else {
        $.post(url_register_account, ret, function(data) {
            clear_reg_progress()

            var func = reg_result_func[data.type] || reg_result_func.default_
            func(data.info)
        })
    }
}
//---------------------------------------------------------------------------------------------------------