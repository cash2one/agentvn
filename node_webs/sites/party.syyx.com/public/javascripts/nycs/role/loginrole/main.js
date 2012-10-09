//-----------------------------
var login_input_data=[
    {   name          : "account_name",
        input_id      : "txtAccount",
        info_div_id   : "loginerror",
        status_div_id : "accountTip",
        clearvalue    : true,
        local_check   : [
            { type : 'empty', err_info : "请输入账号" },
            { type : 'length', min : 6, max : 16, err_info : "账号长度必须6-16位" },
            { type : 'regex', value : /^[A-Za-z0-9_]{6,16}$/, err_info : "只能为字母,数字,下划线" }
        ]
    },
    {   name             : "password",
        input_id         : "txtpwd",
        info_div_id      : "loginerror",
        status_div_id    : "pwdTip",
        info_cover_input : true,
        local_check      : [
            { type : 'empty', err_info : "请输入密码" },
            { type : 'length', min : 6, max : 16, err_info : "密码的长度为6-16个字符" } ,
            { type : 'regex', value : /^[^\s]{6,16}$/, err_info : "输入的密码不能包含空格" }
        ]
    },
    {   name          : "validate_pic",
        input_id      : "txtValidate",
        status_div_id : "loginerror",
        info_div_id      : "loginerror",
        pic_img       : { id : "validateimg", src : "/captcha",len:4 },
        local_check   : [
            { type : 'empty', err_info : "请输入验证码" },
            { type : 'length', min : 4, max : 4, err_info : false }
        ],
        remote_check  : {
            url : "/check_captcha",
            1   : "验证码错误"
        }
    }
]

//-----------------------------
$(function(){
    //前端验证初始化
    input_setting_inputs(login_input_data)

    //提交验证
    $("#chkloginrole").click(function(event) {
        $("#loginerror").html("")
        account_register_request()
        event.preventDefault()
    })

    $("table.loginfrom").keypress(function(event) {
        if (event.which == 13) { // 回车
            account_register_request()
        }
    })

    $(".msgback").click(function(event) {
        $("#validateimg").click()
        $("#validateimg").css("display", "block")
        $("#loginerror").html("")
        $("#txtAccount").val("")
        $("#txtpwd").val("")
        $("#txtValidate").val("")
        $(".fmcontent").css("display", "block")
        $("#sendok").css("display", "none")
        $("#noemail").css("display", "none")
        
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

    $.get("/nycs/role/check_role", ret, function(data) {
        if(data.type == "emailerr"){
            $(".username").html($("#txtAccount").val())            
            $(".openemail").attr("href","http://user.syyx.com/email/sendvalidateemail.aspx")
            $(".fmcontent").css("display", "none")
            $("#noemail").css("display", "block")
            return
        }

        if(data.type != "ok"){
            $("#loginerror").html(data.info)
            $("#txtValidate").val("")
            $("#validateimg").click()
        }
        else{
            $(".username").html($("#txtAccount").val())
            $("#useremail").html(email_hide(data.info,1,7))
            $(".openemail").attr("href",get_mail_site(data.info))
            $(".fmcontent").css("display", "none")
            $("#sendok").css("display", "block")
        }
    }, "json")
}

function email_hide(sEmail, iShowLen, iMaskLen)
{
    var sTemp1 = sEmail.substring(0, iShowLen);
    
    var i = sEmail.indexOf('@');
    var sTemp2 = sEmail.substring(i, sEmail.Length);

    var sTemp3 = "";
    for (var x = 0; x < iMaskLen; x++)
    {
        sTemp3 += "*";
    }

    return sTemp1 + sTemp3 + sTemp2;
}

function get_mail_site(sEmail){
    var sValue = "";
    var ss= new Array();
    ss = sEmail.split('@');

    switch (ss[1].toLocaleLowerCase())
    {
        case "126.com":
            sValue = "http://www.126.com/";
            break;
        case "yeah.net":
            sValue = "http://www.yeah.net/";
            break;
        case "vip.qq.com":
            sValue = "http://mail.qq.com/";
            break;
        case "foxmail.com":
            sValue = "http://www.foxmail.com/";
            break;
        case "gmail.com":
            sValue = "https://mail.google.com/";
            break;
        case "yahoo.com.cn":
            sValue = "http://cn.mail.yahoo.com/";
            break;
        case "yahoo.cn":
            sValue = "http://cn.mail.yahoo.com/";
            break;
        case "hotmail.com":
            sValue = "http://www.hotmail.com/";
            break;
        case "live.cn":
            sValue = "http://www.hotmail.com/";
            break;
        case "sina.com":
            sValue = "http://mail.sina.com.cn/";
            break;
        case "sina.cn":
            sValue = "http://mail.sina.com.cn/";
            break;
        case "vip.sina.com":
            sValue = "http://mail.sina.com.cn/";
            break;
        case "my3ia.sina.com":
            sValue = "http://mail.sina.com.cn/";
            break;
        case "189.cn":
            sValue = "http://www.189.cn/";
            break;
        case "eyou.com":
            sValue = "http://www.eyou.com/";
            break;
        case "188.com":
            sValue = "http://www.188.com/";
            break;
        default:
            sValue = "http://mail." + ss[1].toLocaleLowerCase();
            break;
    }
    return sValue;
}