//-----------------------------
var login_input_data=[
    {   name          : "phone",
        input_id      : "txtPnone",
        info_div_id   : "loginerror",
        clearvalue    : true,
        local_check   : [
            { type : 'empty', err_info : "请输入手机号" },
            { type : 'regex', value : /^[0-9]{11}$/, err_info : "手机号只能是11位数字" }
        ]
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

//-----------------------------
$(function(){
    $(".fmbtn2").click(function(){
        parent.login_close()
    })
    var singid = getParameter("id")
    //前端验证初始化
    input_setting_inputs(login_input_data)

    //提交验证
    $("#chkloginrole").click(function(event) {
        $("#loginerror").html("")
        account_register_request(singid)
        event.preventDefault()
    })

    $(".fmtab").keypress(function(event) {
        if (event.which == 13) { // 回车
            account_register_request(singid)
        }
    })

    //判断登录
    $.get("/check_user_login?r=" + Math.random(), function(data) {
        if(!data.login){
            document.location = "http://party.syyx.com/nycs/sing/login.html?id="+singid
        }
        else{
            $.get("/nycs/sing/isvote?r=" + Math.random(), function(data) {
                if(data.err){
                    $(".fmtitle").hide()
                    $(".singvote").hide()
                    $("#fmmsg2").show()
                }
                else{
                    $(".fmtitle").show()
                    $(".singvote").show()
                }
            })
        }
    })

    
})

function account_register_request(singid) {
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
    ret.singid = singid

    $.post("/nycs/sing/check_vote", ret, function(data) {
        if(data.err){
            $("#loginerror").html(data.ret)
            return
        }
        else{
            $(".fmtitle").html("")
            $(".singvote").hide()
            $("#fmmsg1").show()
        }
    })
}


