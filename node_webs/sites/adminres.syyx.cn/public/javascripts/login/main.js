if (window.navigator.userAgent.indexOf("Firefox") == -1) {
    $(".form").eq(0).html("<span style='line-height:180px;font-size:20px;color:red;font-weight:700'>请使用Firefox浏览器继续！</span>")
}

function sub() {

    var name    = $("#name").val() 
    var pass    = $("#password").val() 
    var baojian = $("#baojian").val() 
    
    if (!name || !pass || !baojian) {
        $("info").html("请正确填写用户名密码!") 
        return false
    }

    var send    = 'name=' + name + '&pass=' + pass

    var success = function(a) {

        if (a == 1) {
            document.location = "/get"
        } 

        else if (a == 2) {
            document.location = "/mylog?active=all"
        } 

        else if (a == 3) {
            document.location = "/adminftp"
        } 

        else if (a == -1) {
            $("#info").html("您没有权限登录!") 
            return false
        } 

        else if (a == -100) {
            $("#info").html("尚方保剑无效!") 
            return false
        } 

        else {
            $("#info").html("帐号或者密码错误!") 
            return false
        }

    }

    $.post("/login_action", {
        name: name,
        pass: pass,
        baojian: baojian
    }, success, "json")
}

$("#sub").click(sub)
$(".form input").keydown(function(event) {    
    if(event.keyCode == 13){
        sub();
    }
})
