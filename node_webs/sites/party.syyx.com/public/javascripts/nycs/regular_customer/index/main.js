function img_scroll() {
    var scr = $("#scroll_body")
    // $("#scroll_body a").lightBox(); 
    $("#prev").click(function() {
        var po = scr.css("marginLeft")
        if (po == "-532px") {
            scr.animate({
                marginLeft: "0px"
            })
        }
    }) 
    $("#next").click(function() {
        var po = scr.css("marginLeft")
        if (po == "0px" || po == "0") {
            scr.animate({
                marginLeft: "-532px"
            })
        }
    })
}

!function() {
    img_scroll()
$.get("/nycs/special201208/serverlist", function(data) {
        var html = ""
        for(var v in data) {
            html += '<optgroup label="' + v + '">'
            var len = data[v].length
            for(var i = 0 ; i < len ; i++) {
                html += '<option value ="' + data[v][i] + '">' + data[v][i] + '</option>'
            }
            html += "</optgroup>"
        }
        $("#servername").append(html)
    }, "json")

}()



$("#login_btn").click(function(event){
    var tops = document.documentElement.scrollTop || document.body.scrollTop;
    $("#popup_bg").css("display", "block")
        $("#div_date").css("top", tops + 80)
        $("#div_date").css("display", "block")
})
$(".div_close").click(function(event){
    $("#div_date").css("display", "none")
    $("#popup_bg").css("display", "none")
    $("#txtrole").val("")
    $("#txtmobile").val("")
    $("#txtemail").val("")
    $("#txtservername").val("")
    $("#txtrolename").val("")
})
$("#btndate").click(function(event){
    var role=$("#txtrole").val()
    var mobile=$("#txtmobile").val()
    var email=$("#txtemail").val()
    var servername=$("#txtservername").val()
    var rolename=$("#txtrolename").val()
    if(role==""||role==null){
        alert("TA的角色名不能为空！")
        return
    }
    if(role.length>12){
        alert("角色名最大长度为六个汉字！")
        return
    }
    if(mobile==""||mobile==null){
        alert("TA的手机号不能为空！")
        return
    }
    if(!/^1(([358]{1}[0-9]{1})|47)[0-9]{8}$/.test(mobile)) {
        alert("请输入正确的手机号！")
        return
    }
    if(email==""||email==null){
        alert("TA的电子邮箱不能为空！")
        return
    }
    if(! /^[a-zA-Z0-9_+.-]+\@(([a-zA-Z0-9-]+\.)+)?([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,4}$/.test(email)) {
        alert("请输入正确的邮箱地址！")
        return
    }
    if(servername==0){
        alert("你们的服务器不能为空！")
        return
    }
    
    if(rolename==""||rolename==null){
        alert("你的角色名不能为空！")
        return
    }
    if(rolename.length>12){
        alert("角色名最大长度为六个汉字！")
        return
    }
    savesaveregular(role,mobile,email,servername,rolename)
})

function savesaveregular(role,mobile,email,servername,rolename){
$.ajax({
        url     :   "/nycs/regular_customer/saveregular_customer?r=" + Math.random(),
        data    :   { rolename: role,mobile:mobile,email:email,servername:servername,merolename: rolename },
        dataType:   "json",
        type    :   "POST",
        success: function(data) {
            if(data.err){
                alert(data.err)
            }
            $("#txtrole").val("")
            $("#txtmobile").val("")
            $("#txtemail").val("")
            $("#txtservername").val("")
            $("#txtrolename").val("")
            $("#div_date").css("display", "none")
            $("#popup_bg").css("display", "none") 
        }
    })
}
$("#back_box").mouseover(function(event){
    //var tops = document.documentElement.scrollTop || document.body.scrollTop;
    $("#pop").css("top", 180)
    $("#pop").css("display", "block")
    $("#back_box").css("display","none")
    
})
$("#pop").mouseout(function(event){
    event.stopPropagation()
    $("#back_box").css("display","block")
    $("#pop").css("display", "none")
    
})

$("#pop").mouseover(function(event){
    event.stopPropagation()
    $("#pop").css("display", "block")
    $("#back_box").css("display","none")
})

function back(){
    var top = $("body").scrollTop() || $("html").scrollTop()
    $("#back_scroll").css("top", top + 180)
}

$(window).scroll(back) 