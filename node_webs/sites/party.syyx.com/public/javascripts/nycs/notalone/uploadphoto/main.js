
new PCAS("province", "city", "area", "广东省", "深圳市", "南山区")

var url_register_account = "/nycs/notalone/check_upload"
//-----------------------------
var login_input_data=[
    {   name          : "Servername",
        input_id      : "txtServername",
        info_div_id   : "loginerr",
        clearvalue    : false,
        local_check   : [
            { type : 'empty', err_info : "参与行动需要账号至少在一个服务器建立过角色" }
        ]
    },
    {   name          : "Nickname",
        input_id      : "txtNickname",
        info_div_id   : "loginerr",
        clearvalue    : false,
        local_check   : [
            { type : 'empty', err_info : "请输入昵称参与行动" },
            { type : 'length', min : 2, max : 20, err_info : "昵称长度必须2-20位" }
        ]
    },
    {   name          : "province",
        input_id      : "province",
        info_div_id   : "loginerr",
        clearvalue    : false,
        local_check   : [
            { type : 'empty', err_info : "请选择省份参与行动" }
        ]
    },
    {   name          : "city",
        input_id      : "city",
        info_div_id   : "loginerr",
        clearvalue    : false,
        local_check   : [
            { type : 'empty', err_info : "请选择城市参与行动" }
        ]
    },
    {   name          : "Content",
        input_id      : "txtContent",
        info_div_id   : "loginerr",
        clearvalue    : false,
        local_check   : [
            { type : 'empty', err_info : "请书写你的故事参与行动" },
            { type : 'length', min : 1, max : 100, err_info : "故事长度不能超过100字" }
        ]
    },
    {   name          : "txtFile",
        input_id      : "txtFile",
        info_div_id   : "loginerr",
        clearvalue    : false,
        local_check   : [
            { type : 'empty', err_info : "请选择图片参与行动" }
        ]
    },
    {   name          : "UserPic",
        input_id      : "txtUserPic",
        info_div_id   : "loginerr",
        clearvalue    : false,
        local_check   : [
            { type : 'empty', err_info : "请选择图片参与行动" }
        ]
    },
    {   name          : "UserPicSmall",
        input_id      : "txtUserPicSmall",
        info_div_id   : "loginerr",
        clearvalue    : false,
        local_check   : [
            { type : 'empty', err_info : "请选择图片参与行动" }
        ]
    },
    {   name          : "imgw",
        input_id      : "imgw",
        info_div_id   : "loginerr",
        clearvalue    : false,
        local_check   : [
            { type : 'empty', err_info : "请选择图片参与行动" }
        ]
    },
    {   name          : "imgh",
        input_id      : "imgh",
        info_div_id   : "loginerr",
        clearvalue    : false,
        local_check   : [
            { type : 'empty', err_info : "请选择图片参与行动" }
        ]
    },
    {   name          : "roletype",
        input_id      : "roletype",
        info_div_id   : "loginerr",
        clearvalue    : false,
        local_check   : [
            { type : 'empty', err_info : "请选择职业参与行动" }
        ]
    }
]

//-----------------------------
$(function(){
    $.get("/check_user_login?r=" + Math.random(), function(data) {

        if(!data.login){
            document.location = "/nycs/notalone/login.html"
        }
        else{
            $.get("/nycs/notalone/get_info?r=" + Math.random(), function(rows) {
                if(rows.length > 0){
                    document.location = "/nycs/notalone/uploadsuccess.html"
                }
                else{
                    page_load()
                }
            }, "json")
        }
    }, "json")
})

function page_load(){
    //前端验证初始化
    input_setting_inputs(login_input_data)

    //获取服务器列表
    get_serverlist()

    $("#txtFile").change(function(){
        //$(".viewimg").html("<img src='file:///" + getvl(document.getElementById("txtFile")) + "' />")
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

    $("#cancel_upload").click(function(){
        delete_txt()
    })
}


function delete_txt(){
    $("#txtNickname").val("")
    $("#txtContent").val("")
    $("#txtUserPic").val("")
    $("#province option[0]").attr("selected","selected")
    window.frames["iframe1"].$("#fake_1").val("")
    window.frames["iframe1"].$("#txtFile").val("")
}

function get_serverlist(){
	$.get("/nycs/notalone/get_serverlist?r=" + Math.random(), function(data) {
        if(data.length == 0){
            $("#txtServername").append("<option value=''>暂无</option>")
            $("#loginerr").html("行动需要账号至少在一个服务器建立过角色")
            $("#chkupload").attr("disabled","disabled")
            window.frames["iframe1"].$("#txtFile").attr("disabled","disabled")
            window.frames["iframe1"].$(".selectimg").html("<a class='upimgs' href='javascript:void(0)'>上传图片</a>")
            return
        }
        for(v in data){
            $("#txtServername").append("<option value='" + data[v] + "'>" + data[v] + "</option>")
        }
    }, "json")
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
    
    $.post(url_register_account, ret, function(data) {
        if(data == "notlogin"){
            $("#loginerr").html("请先登录!")
            return
        }

        if(data.err){
            if(data.ret == -1){
                $("#loginerr").html("请不要重复提交!")    
            }
            else{
                $("#loginerr").html("保存失败!")    
            }
        }
        else{
            $("#loginerr").html("保存成功!")
            document.location = "/nycs/notalone/uploadsuccess.html"
        }
    })
}


function get_upstate(str, pic_url, pic_url_small, imgw, imgh){
    if(str == "0"){
        $("#loginerr").html("图片上传失败!")
        return
    }

    if(str == "1"){
        $("#loginerr").html("图片格式不正确!")
        return
    }

    if(str == "2"){
        $("#loginerr").html("图片大小不能超过1M!")
        return
    }

    if(str != "success"){
        $("#loginerr").html("图片上传失败!")
        return;
    }

    $(".viewimg").html("<img src='http://r.syyx.com/party/nycs/_att/notalone/"+ pic_url_small +"' />")
    $("#txtUserPic").val(pic_url)
    $("#imgw").val(imgw)
    $("#imgh").val(imgh)
    $("#txtUserPicSmall").val(pic_url_small)
}