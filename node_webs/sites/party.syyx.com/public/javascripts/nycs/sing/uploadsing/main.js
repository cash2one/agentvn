//-----------------------------
var login_input_data=[
    {   name          : "Nickname",
        input_id      : "txtNickname",
        info_div_id   : "loginerr",
        clearvalue    : false,
        local_check   : [
            { type : 'empty', err_info : "请输入昵称" },
            { type : 'length', min : 2, max : 20, err_info : "昵称长度必须2-20位" }
        ]
    },
    {   name          : "phone",
        input_id      : "txtPhone",
        info_div_id   : "loginerr",
        clearvalue    : false,
        local_check   : [
            { type : 'empty', err_info : "请输入手机号码" },
            { type : 'regex', value : /^[0-9]{11}$/, err_info : "手机号码只能是11位数字" }
        ]
    },
    {   name          : "content",
        input_id      : "txtContent",
        info_div_id   : "loginerr",
        clearvalue    : false,
        local_check   : [
            //{ type : 'empty', err_info : "请输入拉票宣言" },
            { type : 'length', min : 0, max : 18, err_info : "拉票宣言不能超过18字" }
        ]
    },
    {   name          : "txtFile",
        input_id      : "txtFile",
        info_div_id   : "loginerr",
        clearvalue    : false,
        local_check   : [
            { type : 'empty', err_info : "请选择上传作品" }
        ]
    }
    ,
    {   name          : "mp3url",
        input_id      : "mp3url",
        info_div_id   : "loginerr",
        clearvalue    : false,
        local_check   : [
            { type : 'empty', err_info : "请选择上传作品" }
        ]
    }
]

//-----------------------------
$(function(){

    $("#map2").addClass("map2hover")
    $("#iframe1").attr("src","/nycs/sing/uploadmp3.html?r="+Math.random())
    default_set()


    $.get("/check_user_login?r=" + Math.random(), function(data) {
        if(!data.login){
            document.location = "http://party.syyx.com/nycs/sing/index.html"
            return
        }
        
        page_load()
        $.get("/nycs/sing/get_myinfo?UserID="+ data.UserID +"&r=" + Math.random(), function(rows) {
            if(rows.length > 0){
                if(!rows[0]["IsCheck"]){
                    $("#uploadmp3").html("")  
                    //$("#singdiv").html("")  
                    $("#uploadok").show()
                    return
                }

                if(rows[0]["IsCheck"] && rows[0]["IsPass"] && !rows[0]["IsDelete"]){
                    $("#uploadmp3").html("")  
                    //$("#singdiv").html("")   
                    $("#mylink").attr("href","/nycs/sing/singshow.html?id="+ rows[0]["ID"] + "#tp")          
                    $("#uploadone").show()
                    return
                }

                if(rows[0]["IsCheck"] && (!rows[0]["IsPass"] || rows[0]["IsDelete"])){
                    $("#uploadmp3").hide()  
                    //$("#singdiv").html("")             
                    $("#upload2").show()
                    return
                }

            }

            $("#singdiv").show()          
            $("#uploadmp3").show()
        })
    }, "json")
})

function state_up(){
    $("#loginerr").html("<img src='http://r.syyx.com/party/nycs/sing/loading.gif' /><span>作品上传中</span>")
}

function state_clear(iferr){
    if(iferr){
        $("#loginerr").html("作品格式为MP3格式音频，不得大于5M")
    }
    else{
        $("#loginerr").html("")
    }
}

function page_load(){
    //前端验证初始化
    input_setting_inputs(login_input_data)

    $("#txtContent").val("支持Jolin，支持《诺亚传说》")
    $("#txtContent").focus(function(){
        if($("#txtContent").val() == "支持Jolin，支持《诺亚传说》"){
            $("#txtContent").val("")
        }
    })

    $("#txtContent").blur(function(){
        if($("#txtContent").val() == ""){
            $("#txtContent").val("支持Jolin，支持《诺亚传说》")
        }
    })
        

    //提交验证
    $("#chkupload").click(function(event) {
        account_register_request()
        event.preventDefault()
    })

    $("#loginfrom").keypress(function(event) {
        if (event.which == 13) { // 回车
            account_register_request()
            event.preventDefault()
        }
    })

    $("#fake_1").val("")

    $("#txtFile").change(function() {
        $("#fake_1").val($(this).val())
    })

    $("#reupload").click(function(){
        $("#uploadmp3").show()
        $("#upload2").hide()
    })
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
    $.post("/nycs/sing/savesing", ret, function(data) {
        if(data == "notlogin"){
            $("#loginerr").html("请先登录!")
            return
        }

        if(data.err){
            if(data.ret == -1 || data.ret == -2){
                $("#loginerr").html("请不要重复提交!")    
            }
            else{
                $("#loginerr").html(data.ret)    
            }
        }
        else{
            $("#loginerr").html("保存成功!")
            $("#uploadmp3").html("")
            $("#uploadok").show()
        }
    })
}


function get_upstate(r,mp3url){
    if(r == "success"){
        $("#mp3url").val(mp3url)
    }
}