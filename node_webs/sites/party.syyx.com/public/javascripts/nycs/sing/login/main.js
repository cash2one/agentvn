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

    $(".fmlink").attr("href","http://party.syyx.com/nycs/sing/reg.html?type="+getParameter("type"))

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
})

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

    $.post("/check_login", ret, function(data) {
        if(data.type != 0){
            $("#loginerror").html(data.info)
            return
        }
        else{
            if(getParameter("type") == "up"){
                parent.document.location = "/nycs/sing/uploadsing.html#tp"
            }
            else{
                document.location = "/nycs/sing/vote.html?id="+ getParameter("id")
            }
        }
    })
}


