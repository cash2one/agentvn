function getflash(swf, w, h, id) {
    var object = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + w + '" height="' + h + '" ><param name="movie" value="' + swf + '" /><!--[if !IE]>--><object type="application/x-shockwave-flash" data="' + swf + '" width="' + w + '" height="' + h + '"><!--<![endif]--><param name="wmode" value="transparent" /><!--[if !IE]>--></object><!--<![endif]--></object>'
    $(id).html(object)
}

function getjwplayer(swf,w,h,id,position){
    if(!position){
        position = "over"
    }
    var object = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" hidefocus="true" id="mediaplayer" width="' + w + '" height="' + h + '" bgcolor="#000000" name="mediaplayer" tabindex="0"><param name="movie" value="http://v.nycs.syyx.com/jwplayer/player.swf"><!--[if !IE]>--><object type="application/x-shockwave-flash" hidefocus="true" data="http://v.nycs.syyx.com/jwplayer/player.swf" width="' + w + '" height="' + h + '"><!--<![endif]--><param name="allowfullscreen" value="true"><param name="seamlesstabbing" value="true"><param name="wmode" value="transparent" /><param name="flashvars" value="netstreambasepath='+document.location.href+'&id=mediaplayer&file='+swf+'&controlbar.position='+position+'&volume=41&autostart=true&repeat=SINGLE"><!--[if !IE]>--></object><!--<![endif]--></object>'
    $(id).html(object)
}

$("a").attr("hidefocus", "true")
try{
    document.execCommand("BackgroundImageCache", false, true);
}catch(e){}

getflash("http://r.syyx.com/party/nycs/special201208/sp201208.swf",356 ,138, "#swf")
getflash("http://r.syyx.com/party/nycs/special201208/swfplay.swf",356 ,138, "#play")
getflash("http://r.syyx.com/party/nycs/special201208/banner.swf",456 ,282, "#banner")

$("#flash_btn").click(function(event) {
    $("#pop_flash_dialog").html("<div id=\"pop_flash\"></div>")
    getjwplayer('http://v.nycs.syyx.com/nycs/flv/zxdzz_640x360_20120803.flv', 640, 360, "#pop_flash") 
    $("#pop_flash_dialog").dialog({
        width       : 656,
        height      : 415,
        modal       : true,
        resizable   : false,
        dialogClass : "pop_video_detail",
        close       : function() {
            $("#pop_flash_dialog").html("");
            if($("#video_but").length){
                $("#video_but").removeAttr("style")
            }            
        }
    });
    event.preventDefault()
})
+function () {
    var curr = 0
    for(var i = 0 ; i < 4 ; i++) {
        $("#tab_aMap area").eq(i).mouseover(function(index) {
            return function() {
                if(index == curr) {
                    return
                }
                $("#tab div").eq(curr).stop().removeAttr("style")
                $("#tab div").eq(index).fadeIn(500)
                $("#con .con").eq(index).css("visibility" ,"visible")
                $("#con .scroll").stop().animate({"margin-top" : -476 * index}, 500, function() {
                    $("#con .con").removeAttr("style")
                    $("#con .con").eq(curr).css("visibility" ,"visible")
                })
                curr = index
            }
        }(i))
    }
    $("#friend_name").focus(function() {
        if($(this).val() == "他(她)的姓名"){
            $(this).val("")
        }
    })
    $("#friend_name").blur(function() {
        if($(this).val() == ""){
            $(this).val("他(她)的姓名")
        }
    })
    $("#submits").click(function() {
        var friend_name     = $("#friend_name").val()
        var friend_qq       = $("#friend_qq").val()
        var friend_email    = $("#friend_email").val()
        var name            = $("#name").val()
        var server          = $("#server").val()
        if(friend_name == "他(她)的姓名") {
            alert("请输入您兄弟的姓名")
            return
        }
        if(friend_name.length > 12 || friend_name.length == 0){
            alert("您兄弟的姓名必须为1到12个字!")
            return
        }
        if(!/^\d{5,11}$/.test(friend_qq)) {
            alert("QQ只能输入5到11个数字")
            return
        }
        if(! /^[a-zA-Z0-9_+.-]+\@(([a-zA-Z0-9-]+\.)+)?([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,4}$/.test(friend_email)) {
            alert("请输入正确的邮箱地址！")
            return
        }
        if(name == "") {
            alert("请填写您的昵称！")
            return
        }
        if(server == 0) {
            alert("请选择您所在的服务器！")
            return
        }
        $.post("/nycs/special201208/addrecord",{
            friend_name  : friend_name , 
            friend_qq    : friend_qq , 
            friend_email : friend_email , 
            name         : name , 
            server       : server
        }, function(data) {
            if(data != "0") {
                alert("提交成功")
                $(".con1 input").val("")
                $("#server").val("0")
            } else {
                alert("提交失败")
            }
        }, "html")
    })
    
    $.get("/nycs/special201208/time_int", function(data) {
        var urls = ["http://party.syyx.com/nycs/notalone/index.html", "http://activity.syyx.com/ValentinesDay/index.html", "http://nycs.syyx.com/news_content.html?2512", "http://event.weibo.com/556096", "http://event.t.qq.com/45538"]
        for(var i = 0 ; i < 5 ; i++) {
            var status = data.status[i]
            $("#a" + i).css("display", "inline")
            if(status !== "no") {
                $("#a" + i).addClass("a" + i)
            }
            if(status === "yes") {
                $("#a" + i).attr("href", urls[i])
            }
            if(status === "end") {
                $("#a" + i).click(function() {
                    alert("此活动已结束！")
                })
                $("#a" + i).css("cursor", "pointer")
            }
        }
    }, "json")

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
        $("#server").append(html)
    }, "json")
}()