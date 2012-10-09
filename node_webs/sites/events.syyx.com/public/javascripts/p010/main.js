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
//--------------------------------------- ad index js---------------------------------
var page_name = "index_360"
//--------------------------------------- config_data ----------------------------------
var subject_area_flash_data = {
    ad_video : {
        div_id : "video_info",
        url    : "http://s.syyx.com/nycs/flash/defaule_video_summary.swf",
        width  : 174,
        height : 106
    },

    popFlash : {
        div_id : 'pop_flash',
        url    : 'http://s.syyx.com/nycs/flash/player2.swf?autostart=true&repeat=false&file=http://v.nycs.syyx.com/nycs/flv/360hezuo_l_20110829.flv',
        width  : 640,
        height : 360
    }

}

$("document").ready(function() {
    $(".reg_form input").val("")
})

$(".reg_form input").focus(function() {
        $("#validateimg").show()
})

!function () {
    var script  = document.createElement("script")
    script.src  = 'http://s21.cnzz.com/stat.php?id=3396138&amp;web_id=3396138'
    script.type = 'text/javascript'
    var stat    = document.getElementById("stat")
    stat.appendChild(script)
}()
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
//-----------------------------------dom Loaded ----------------------------------------
$(function() {
    global_setting()
    flash_setting()
    old_user_setting()
    tabs_setting()
    account_register_setting()
})
//---------------------------------------------------------------------------------------
function global_setting() {
    //去掉链接虚线
    $("a").attr("hideFocus", "true");
}
//----------------------------------------------------------------------------------------
function flash_setting(){

    set_flash(subject_area_flash_data)

    //preloadflv
    $("#pop_flash_dialog").html("<div id=\"pop_flash\"></div>");
    set_flash({ pop : subject_area_flash_data.popFlash});

    //addEventListenerToFlash
    $("#flash_video").click(function() {
        $("#pop_flash_dialog").html("<div id=\"pop_flash\"></div>")
        set_flash({ pop : subject_area_flash_data.popFlash});
        $("#pop_flash_dialog").dialog({
            width: 656,
            height: 400,
            modal: true,
            resizable: false,
            dialogClass: "pop_video_detail",
            close: function() { $("#pop_flash_dialog").html(""); }
        });
        return false;
    });
}

function old_user_setting(){
    //old user get code
    $("#olduser_get_code_input").focus(function(){
        $("#olduser_get_code_validate_img").attr("src","/captcha?r=" +Math.random());
        $("#olduser_get_code_validate_img").show();
    });
    $("#olduser_get_code_input").val("");
    $("#olduser_get_code_input").keypress(function(event) {
            if (event.which == 13) {
                checkOldUser();
            }
    });
    $(".olduser_get_code_btn").click(function(){
        checkOldUser();
        return false;
    });
    $("#olduser_get_code_validate_img").click(function(){
        $(this).attr("src","/captcha?r=" +Math.random());
    });

    function checkOldUser(){
        var validate_num = $("#olduser_get_code_input").val();
        if(validate_num == ""){
            alert("请输入验证码");
        }
        else{
            $.get(url_get_card, {  validate_pic: validate_num, page_name : page_name, r: Math.random() }, function(data) {
                if (data.type == 1) {
                    alert('验证码错误')
                    return
                }
                if (data.type == 'no_card'){
                    alert('卡暂时已发完，请稍候领卡')
                    return
                }
                if(data.type == 'ok') {
                    $("#old_user_code_num").html(data.info);
                    $("#olduser_get_code").hide();
                    $("#olduser_get_code_success").show();
                    var basic_active_url = $("#old_user_active").attr("href");
                    $("#old_user_active").click(function(event){
                        var whole_url_to_active = basic_active_url + "?&" + data.info;
                        window.open(whole_url_to_active);
                        event.preventDefault()
                    })
                }
            });
        }
    }
}
//---------------------------------------------------------------------------------------
function set_flash(flash_data) {
    var params = { wmode : "transparent" };

    for (var key in flash_data) {
        var div_id = flash_data[key].div_id
        var url    = flash_data[key].url
        var width  = flash_data[key].width
        var height = flash_data[key].height

        swfobject.embedSWF(url, div_id, width, height, "9", null, null, params);
    }
}
//-----------------------------------------------------
function tabs_setting(){
    //tabs
    $("#gamefeature").tabs({
        event: 'mouseover',
        fx: { opacity: 'toggle', duration: 125}
    });
    //tabs rotate
    $("#gamefeature").tabs("rotate", 5000);
}
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
    ok       : function(info) {
        $("#reg_account").html(info[0])
        $('#active_code').html(info[1])
        $(".reg").hide()
        $("#reg_step2").show()

        $("#active_link").click(function(event) {
            var basic_active_url = "http://activity.syyx.com/nycs_activate/activate_giftbag.shtml"  
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
