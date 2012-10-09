//----------------------------------------------------
var page_name = 'nycs_gameFeature'
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
            url      : remote_server_url_list.check_account,
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
            url : remote_server_url_list.check_idcard,
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
        pic_img       : { id : "validateimg", src : remote_server_url_list.get_captcha },
        local_check   : [
            { type : 'length', min : 4, max : 4, err_info : false }
        ],
        remote_check  : {
            url : remote_server_url_list.check_captcha,
            1   : ""
        }
    }
]
//dom_loaded------------------------------------------------------------------------------
$(function(){
    //bind_open_reg_panel
    if ($.cookie('first_get') != null){ 
        $("#float_reg_panel").hide() 
        $('#float_reg_btn').show()
    }
    else {
        $("#float_reg_panel").show()
        $.cookie('first_get','no_first')
    }
    
    $('#float_reg_btn').click(function(event){
        $(this).hide()
        $('#float_reg_panel').show()
        event.preventDefault()
    })

    $('#float_reg_panel .close a').click(function(event){
        $('#float_reg_panel').hide()
        $('#float_reg_btn').show()
        event.preventDefault()
    })

    support_ie6_position_fixed([$('#float_reg_btn'),$('#float_reg_panel')])
    //设定注册功能
    account_register_setting()


})
//----------------------------------------------------------
function support_ie6_position_fixed(fix_elements){
    if(window.XMLHttpRequest) {
        return
    }

    //init
    var css_top = 200

    $(window).scroll(function(){
        var scrolled_top = $(window).scrollTop()
        $(fix_elements).each(function(){
            this.css('top',(scrolled_top + css_top) + 'px')
        })
    })
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

    $('#reg_step3 a').click(function(event){
        location.href = location.href
        event.preventDefault()
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
    
    $.post(remote_server_url_list.register_account, ret, function(data) {
        clear_reg_progress()

        var func = reg_result_func[data.type] || reg_result_func.default_
        func(data.info)
    },'json')
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
        $("#reg_account1").html(info[0])
        $('#active_code').html(info[1])
        $("#reg_step1").hide()
        $("#reg_step2").show()

        $("#active_link").click(function(event) {
            //var basic_active_url = remote_server_url_list.active_gift
            //var whole_url_to_active = basic_active_url + "?" + info[0] + "&" + info[1]
            $.get('http://nycs.syyx.com/ajax/register/activate.aspx?ac='+ info[0] + '&cn=' + info[1], function(data){
                if(data.isok=='yes'){
                    $("#reg_step2").hide()
                    $("#reg_step4").show()
                }else{
                    $("#gittip").html(data.content)
                    $("#gittip").attr("style", "color:red")
                    return
                }
            },'json')
            //window.open(whole_url_to_active)
            event.preventDefault()
        })
    },

    no_card  : function(info) {
        $("#reg_step1").hide()
        $("#reg_step3").show()
        $('#reg_account2').html(info[0])
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