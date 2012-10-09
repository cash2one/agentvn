var pathname = document.location.pathname.toLowerCase()
var pagename = pathname.substring(pathname.lastIndexOf("/") + 1).replace(".html", "")
if(/nycs360/.test(pathname)) {
    pagename = "index_360"
}

var stat_id  = {
    "index"          : 3224992,
    "index31"        : 3171333,
    "index32"        : 3190993,
    "index34"        : 3257232,
    "index35"        : 3243019,
    "index40"        : 3208005,
    "index5"         : 2625354,
    "index_173"      : 4097942,
    "index_dw"       : 4200748,
    "index_xq"       : 4535836,
    "index_zfgc"     : 2001608,
    //"index_bd"     : 4005964,

    // "index_bd_1"  : 4005964,
    // "index_bd_2"  : 4005964,
    // "index_bd_3"  : 4005964,
    // "index_bd_4"  : 4005964,
    // "index_bd_5"  : 4005964,
    // "index_bd_6"  : 4005964,
    // "index_bd_7"  : 4005964,
    // "index_bd_8"  : 4005964,
    // "index_bd_9"  : 4005964,
    // "index_bd_10" : 4433832,
    // "index_bd_11" : 4433832,
    // "index_bd_12" : 4005964,
    // "index_bd_13" : 4005964,
    // "index_bd_14" : 4005964,
    // "index_bd_15" : 4005964,
    // "index_bd_16" : 4005964,
    // "index_bd_17" : 4005964,
    // "index_bd_18" : 4005964,
    // "index_bd_19" : 4005964,
    // "index_bd_20" : 4005964,
    // "index_bd_wm" : 4005964,

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
    }else if(pagename == "index_yy") {
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
    if(/index_bd_/.test(pathname)) {
        pn = "index_bd"
    }

    if(/index_sg_/.test(pathname)) {
        pn = "index_sg"
    }

    if(/index_sw_/.test(pathname)) {
        pn = "index_sw"
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
        $("#reg_account").html(info[0])
        $('#active_code').html(info[1])
        $(".reg").hide()
        $("#reg_step2").show()

        $(".tip").css("display", "none")
        $("#tip2").css("display", "block")

        $("#active_link").click(function(event) {

            $.post('/activate_card', {account : info[0] , card : info[1]}, function(data) {
                $("#reg_step2").hide()
                switch (data){
                    case "0"://激活成功                            
                        $("#reg_step4").show()
                        $(".tip").css("display", "none")
                        $("#tip3").css("display", "block")
                        break;
                    case "1"://帐号已激活
                        $("#active_tip").html("对不起，帐号错误");
                        $("#reg_step5").show()
                        break;
                    case "-2"://礼包卡已使用
                        $("#active_tip").html("对不起，新手卡错误");
                        $("#reg_step5").show()
                        break;
                    default://异常错误
                        $("#active_tip").html("对不起，服务器异常");
                        $("#reg_step5").show()
                        break;
                }
                $("#back").click(function() {
                    $("#reg_step2").show()
                    $("#reg_step5").hide()
                })
            }, 'html')

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