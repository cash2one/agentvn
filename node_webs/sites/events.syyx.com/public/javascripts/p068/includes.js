//--------------------------------------------------------------------------------------------------------
// input_check.js
//--------------------------------------------------------------------------------------------------------
_G_all_input_checks = {
    empty : function(value, check_info) {
        if (value == "") {
            return check_info.err_info
        }
    },

    length : function(value, check_info) {
        if (check_info.options) {
            for (var i in check_info.options) {
                if (value.length == check_info.options[i]) {
                    return
                }
            }

            return check_info.err_info
        }

        check_info.min = check_info.min || 0
        check_info.max = check_info.max || Math.pow(2, 32)

        if (value.length < check_info.min || value.length > check_info.max) {
            return check_info.err_info
        }
    },

    regex : function(value, check_info) {
        if (!check_info.value.test(value)) {
            return check_info.err_info
        }
    },

    equal : function(value, check_info) {
        if (check_info.side == 'server') {
            var compare_value = check_info.req.body[check_info.value]
            if (compare_value != value) {
                return check_info.err_info
            }
        }
        else if (check_info.side == 'session') {
            var compare_value = check_info.req.session[check_info.value]
            if (compare_value != value) {
                return check_info.err_info
            }
        }
        else {
            var input_id = '#' + check_info.value
            if ($(input_id).val() != value) {
                return check_info.err_info
            }
        }
    }
}
//--------------------------------------------------------------------------------------------------------
_G_check_request_data = function(req, input_checks) {
    for (var key in req.body) {
        if (!input_checks[key]) {
            continue
        }
        
        var value = req.body[key]

        var checks = input_checks[key].checks
        for (var i in checks) {
            var type = checks[i].type
            var check_info = checks[i]

            check_info.req = req

            var check_func = _G_all_input_checks[type]
            if (!check_func) {
                var ret = {}
                ret[key] = type

                return ret
            }

            var ret = check_func(value, check_info)
            if (ret != undefined) {
                var ret = {}
                ret[key] = type

                return ret
            }
        }
    }
}
//--------------------------------------------------------------------------------------------------------//--------------------------------------------------------------------------------------------------------
// input.js 一个通用的input控件处理模块
//--------------------------------------------------------------------------------------------------------
/*
var example_input_data = [
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
            url      : '/account_check',
            1        : '该账号已经存在'
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
            { type : 'length', options : [ 15, 18 ], err_info : "身份证应为15位或18位" },
        ],
        remote_check  : {
            url : "",
            1   : ""
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
        pic_img       : { id : "validateimg", src : "" },
        local_check   : [
            { type : 'length', min : 4, max : 4, err_info : false }
        ],
        remote_check  : {
            url : "",
            1   : ""
        }
    }
]
*/
//--------------------------------------------------------------------------------------------------------
var input_config = {
    background_highlight_class : "focus_in_inut",
    error_tag_class            : "input_wrong",
    status_class               : {
        ok       : "check_result_right",
        error    : "check_result_wrong",
        checking : "check_result_loading"
    }
}

var captcha_dom
//--------------------------------------------------------------------------------------------------------
var input_local_check_func = _G_all_input_checks
//--------------------------------------------------------------------------------------------------------
function input_highlight_background(input) {
    input.addClass(input_config.background_highlight_class)
}

function input_recover_background(input) {
    input.removeClass(input_config.background_highlight_class)
}
//--------------------------------------------------------------------------------------------------------
function input_recover(input, input_data) {
    var input_err = input.hasClass(input_config.error_tag_class)
    if (input_err) {
        input.removeClass(input_config.error_tag_class)
        input.val("")
        
        var status_div_id = input_data.status_div_id
        if (status_div_id) {
            status_div_id = '#' + status_div_id
            $(status_div_id).attr('class', '')
        }
    }
}
//--------------------------------------------------------------------------------------------------------
function input_check_ok(input, input_data) {
    var status_div_id = input_data.status_div_id
    if (status_div_id) {
        status_div_id = '#' + status_div_id
        $(status_div_id).attr("class", input_config.status_class.ok)
    }
}

function input_check_error(input, input_data, err_info) {
    input.addClass(input_config.error_tag_class)

    var status_div_id = input_data.status_div_id
    if (status_div_id) {
        status_div_id = '#' + status_div_id
        $(status_div_id).attr("class", input_config.status_class.error)
    }

    var info_div_id = input_data.info_div_id
    if (info_div_id) {
        info_div_id = '#' + info_div_id

        if ($(info_div_id).is(":hidden")) {
            input.hide()
            $(info_div_id).show()
        }

        if (err_info) {
            $(info_div_id).val(err_info)
        }
    }
}
//--------------------------------------------------------------------------------------------------------
function input_local_check(input, input_data) {
    var value = input.val()

    for (var i in input_data.local_check) {
        var check_info = input_data.local_check[i]
        var key = check_info.type
        var check_func = input_local_check_func[key]

        var err_info = check_func(value, check_info)
        if (err_info !== undefined) {
            input_check_error(input, input_data, err_info)
            return false
        }
    }

    input_check_ok(input, input_data)

    return true
}

function input_remote_check(input, input_data) {
    if (!input_data.remote_check) {
        return true
    }

    var value = input.val()
    var check_url = input_data.remote_check.url

    var status_div_id = '#' + input_data.status_div_id
    $(status_div_id).attr("class", input_config.status_class.checking)


    $.ajax({
        type     : 'GET',
        cache    : false,
        url      : check_url,
        data     : { v : value },
        dataType : 'json',
        success  : function(data){
            if (data.type == 0) {
                input_check_ok(input, input_data)
                return
            }

            var err_info = input_data.remote_check[data.type + '']
            input_check_error(input, input_data, err_info)
        }
        
    });
}
//--------------------------------------------------------------------------------------------------------
function input_show_pic(input, input_data) {
    get_captcha(captcha_dom)

    $('#' + input_data.pic_img.id).show()
}

function input_pic_setting(input, input_data) {
    var input_id = '#' + input_data.input_id
    var img_id = '#' + input_data.pic_img.id

    //$(img_id).attr("src", input_data.pic_img.src + "?r=" + Math.random())

    $(input_id).keyup(function() {
        if($(input_id).val().length >= 4){
            var ret = input_local_check(input, input_data)
            if (!ret) {
                return
            }
            
            input_remote_check(input, input_data)
        }
        
    })
            
    $(img_id).click(function() {
        var status_div_id = '#' + input_data.status_div_id
        $(img_id).attr("src", input_data.pic_img.src + "?r=" + Math.random())
        $(status_div_id).attr("class", input_config.status_class.error)
    })
}
//--------------------------------------------------------------------------------------------------------
function input_info_cover_input_setting(input, input_data) {
    var info_div_id = input_data.info_div_id
    if (info_div_id) {
        info_div_id = '#' + info_div_id

        $(info_div_id).focus(function() {
            if (input.is(':hidden')) {
                $(this).hide()
                input.show()
                input.focus()
            }
        })
    }
}
//--------------------------------------------------------------------------------------------------------
function input_setting(input_data) {
    var input_id = '#' + input_data.input_id
    var input = $(input_id)

    input.val("")
 
    input.focus(function() {
        get_captcha(captcha_dom)

        if (input_data.pic_img) {
            input_show_pic(input, input_data)
        }

        input_highlight_background(input)
        input_recover(input, input_data)
    })

    input.blur(function() {
        input_recover_background(input)

        if (input_data.pic_img) {
            return
        }

        var ret = input_local_check(input, input_data)
        if (!ret) {
            return
        }

        input_remote_check(input, input_data)
    })

    if (input_data.pic_img) {
        input_pic_setting(input, input_data)
    }

    if (input_data.info_cover_input) {
        input_info_cover_input_setting(input, input_data)
    }
}
//--------------------------------------------------------------------------------------------------------
function input_setting_inputs(inputs_data) {
    for(var j in inputs_data) {
        if(inputs_data[j].pic_img){
           captcha_dom = inputs_data[j]
        }
    }
    for (var i in inputs_data) {
        var input_data = inputs_data[i]
        input_setting(input_data)
    }

}
//--------------------------------------------------------------------------------------------------------
function input_get_inputs_value(inputs_data) {
    var ret = false

    for (var i in inputs_data) {
        var input_data = inputs_data[i]
        var input_id = '#' + input_data.input_id
        var key = input_data.name
        var value = $(input_id).val()

        ret = ret || {}
        ret[key] = value
    }

    return ret
}
//--------------------------------------------------------------------------------------------------------
function input_local_check_inputs(inputs_data) {
    var ret = true

    for (var i in inputs_data) {
        var input_data = inputs_data[i]
        var input_id = '#' + input_data.input_id
        if (!input_local_check($(input_id), input_data)) {
            ret = false
        }
    }

    return ret
}
//--------------------------------------------------------------------------------------------------------
function input_status_check(inputs_data) {
    var ret = true

    for (var i in inputs_data) {
        var input_data = inputs_data[i]
        var status     = check_unit_status(input_data)
        
        if(status == false) {
            ret = false
            break
        }  
    }

    return ret
}
//--------------------------------------------------------------------------------------------------------
function get_captcha(input_data) {
    var img_id = '#' + input_data.pic_img.id
    if (!$(img_id).attr("src")) {
        $(img_id).attr("src", input_data.pic_img.src + "?r=" + Math.random())
    }
}
//------------------------------------------------------------------------------------------------
function check_unit_status(input_data) {            //  add by jiangxi
    var status_div_id = '#' + input_data.status_div_id
    var ok_status     =  $(status_div_id).hasClass(input_config.status_class.ok)
    
    if(ok_status) {
        return true
    } 

    if(!input_data.pic_img) {
        return false
    }

    var input_id     = '#' + input_data.input_id
    var char_num     = $(input_id).val().length

    if(char_num != 4) {
        return false
    }
    
    var err_status   = $(status_div_id).hasClass(input_config.status_class.error)
    var check_status = $(status_div_id).hasClass(input_config.status_class.checking)
    
    if(err_status || check_status) {
        return false
    }

    return true
    
}
//------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------
// dev by 火柴
// api
//----------------------------------------------------------------------------
/* 

兼容所有浏览器

    get_page_size.page_height()   //当前页面高度
    get_page_size.page_width()    //当前页面宽度
    get_page_size.client_width()  //当前浏览器可见区域宽度
    get_page_size.client_height() //当前浏览器可见区域高度
    get_page_size.scrolltop()     //当前页面顶端被滚去的高度
    get_page_size.scrollleft()    //当前页面左边被滚去的宽度

*/
//----------------------------------------------------------------------------

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
}
var pathname = document.location.pathname.toLowerCase()
var pagename = pathname.substring(pathname.lastIndexOf("/") + 1).replace(".html", "")
if(/nycs360/.test(pathname)) {
    pagename = "index_360"
}

var stat_id  = {
    "index"          : 3224992,
    "index31"        : 3171333,
    "index31_2"      : 4623897,
    "index32"        : 3190993,
    "index34"        : 3257232,
    "index35"        : 3243019,
    "index40"        : 3208005,
    "index40_cn"     : 3208005,
    "index40_tq"     : 4600768,
    "index5"         : 2625354,
    "index_173"      : 4097942,
    "index_173_1"    : 4623902,
    "index_173_tqg"  : 4623910,
    "index_dw"       : 4200748,
    "index_xq"       : 4535836,
    "index_zfgc"     : 2001608,
    "index_xlzt"     : 4616406,

    "index_i8"       : 3771802,
    "index_i8_embed" : 3519134,
    "index_sw"       : 3915789,
    "index_sw_embed" : 4304121,
    "index_sw_bt"    : 4560333,
    "index_yy"       : 3915783,
    "index_xs"       : 4246749,
    "index_360"      : 3396138
}

if(stat_id[pagename]){
    var script  = document.createElement("script")
    script.src  = 'http://s21.cnzz.com/stat.php?id=' + stat_id[pagename] + '&amp;web_id=' + stat_id[pagename]
    script.type = 'text/javascript'
    var stat    = document.getElementById("stat")
    stat.appendChild(script)
}

if(pagename == "index_xs"){
    $("#stat").append('<object name="x" id="x" classid="clsid:EDB8FAC0-ED79-4B27-AE51-FB19D8348087"></object>')
}

if(/index_bd/.test(pagename) || /index_sg/.test(pagename)) {
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-27991465-1']);
    _gaq.push(['_trackPageview']);

    (function() {
        var ga = document.createElement('script'); 
        ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; 
        s.parentNode.insertBefore(ga, s);
    })();

}

if("index_bd_wm" == pagename) {
    var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
    document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3Fe8d1b8ee3e36c619631565174aec8aa0' type='text/javascript'%3E%3C/script%3E"));
}

function rungame(){
    if(pagename == "index_i8" || pagename == "index_i8_embed") {
        window.open("i8desk://gid=40863")
        $("#card_type").html("VIP网吧礼包")
    }else if(pagename == "index_sw" || pagename == "index_sw_bt" || pagename == "index_sw_embed") {
        window.open("barclientview://-Package 13420/")
        $("#card_type").html("VIP网吧礼包")
    }else if(pagename == "index_yy" || pagename == "index_yy_1") {
        window.open("gamerun://127.0.0.1/game/run.php?game=917B50C4702CFFA3")
    }else if(pagename == "index_xs"){
        $("#card_type").html("VIP网吧礼包")
        var x = document.getElementById("x");
        !function(){
            if(x.IsCanRunGame){
                x.RunGame('102849');}
             else{
                alert('本机没有安装迅闪客户端，不支持从网页启动游戏');
            }
        }()
    }
}

//-以上与页面属性相关------------------------------------------------------------------------------------------------------------------------
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

$("document").ready(function() {
    $(".reg_form input").val("")
})

$(".reg_form input").focus(function() {
        $("#validateimg").show()
})

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

    
    if (!check_license_agreement()) {
        return
    }

    var ret = input_get_inputs_value(account_register_input_data)
    if (!ret) {
        return
    }

    set_reg_progress()
    var pn = pagename

    if(/index_.*?_/.test(pagename)) {
        pn = pagename.substring(0, pagename.lastIndexOf("_"))
    }

    ret.page_name = pn
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
    ok: function(info) {
        $("#reg_account").val(info[0])
        $('#active_code').val(info[1])
        if($("#reg_account3").length) {
            $("#reg_account3").html(info[0])
        }
        $(".reg").hide()
        $("#reg_step2").show()

        $("#active_link").click(function(event) {
            var reg_account = $("#reg_account").val()
            var active_code = $("#active_code").val()
            if(reg_account == "" || active_code == "" ){
                alert('请输入帐号或者激活码')
            }else {
                $.post('/activate_card', {account : $("#reg_account").val() , card : $("#active_code").val()}, function(data) {
                    $("#reg_step2").hide()
                    switch (data){
                        case "0"://激活成功                            
                            $("#reg_step4").show()
                            break;
                        case "1"://帐号已激活
                            if($("#active_tip").length) {
                                $("#active_tip").html("对不起，帐号错误");
                            }
                            
                            $("#reg_step5").show()
                            break;
                        case "-2"://礼包卡已使用
                            if($("#active_tip").length) {
                                $("#active_tip").html("对不起，新手卡错误");
                            }
                            $("#reg_step5").show()
                            break;
                        default://异常错误
                            if($("#active_tip").length) {
                                $("#active_tip").html("对不起，服务器异常");
                            }
                            $("#reg_step5").show()
                            break;
                    }
                    $("#back").click(function() {
                        $("#reg_step2").show()
                        $("#reg_step5").hide()
                    })
                }, 'html')
            }
            return false
        })
    },

    no_card: function(info) {
        $(".reg").hide()
        $("#reg_step3").show()
        $('#reg_account3').html(info[0])
    },

    failed: function(info) {
        alert(info)
    },

    default_: function(info) {
        $("#txtPasswords").val("")
        $("#txtConfirm").val("")
        $("#txtValidate").val("")
        $("#regProcessTip").attr("class", "")
        alert(info)
    }
}

account_register_setting();

$("a").attr("hidefocus", "true");

try{
    document.execCommand('BackgroundImageCache',false,true);
}catch(e){}