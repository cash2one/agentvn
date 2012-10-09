//---------------------------------------------------------------------------------------------------------------------------------
var close = function() {
    $("body").css("background-color", "#0C0D0F")
    $("#flash1").html("")
    $("#flash").hide()    
    $(".container").show()   
}
//---------------------------------------------------------------------------------------------------------------------------------
function getflash(swf, w, h, id) {
    var object = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + w + '" height="' + h + '" ><param name="movie" value="' + swf + '" /><param name="allowScriptAccess" value="always" /><!--[if !IE]>--><object type="application/x-shockwave-flash" data="' + swf + '" width="' + w + '" height="' + h + '"><param name="allowScriptAccess" value="always" /><!--<![endif]--><param name="wmode" value="transparent" /><!--[if !IE]>--></object><!--<![endif]--></object>'
    $(id).html(object)
}
//---------------------------------------------------------------------------------------------------------------------------------
var swf = "http://v.nycs.syyx.com/nycs/swf/25thzhenyou_1024X576_0924.swf"
var flv_btn = "http://r.syyx.com/events/p023/flash_but.swf"
//---------------------------------------------------------------------------------------------------------------------------------
getflash(flv_btn, 129, 71, "#flash_player")
getflash(swf, 1024, 576, "#flash1")
//---------------------------------------------------------------------------------------------------------------------------------
var play_flash = function() {
    $(".container").after("<div id = 'flash'><div id = 'flash1'></div><div id = 'skip'></div></div>")
    getflash(swf, 1024, 576, "#flash1")
}
//---------------------------------------------------------------------------------------------------------------------------------
$("#flash_div,#replay").click(function(event) {
    $("body").css("background-color", "black")
    $(".container").hide()
    getflash(swf, 1024, 576, "#flash1")
    $("#flash").show()   
})
//---------------------------------------------------------------------------------------------------------------------------------
!function(){
    var title = encodeURIComponent("蔡依林试过很多方式，却都找不到那个人。高矮胖瘦，帅与不帅都不重要。那个人到底在哪里？长什么样子呢？直接点击了解#蔡依林征友#详情：")
    var src   = "http://r.syyx.com/party/nycs/dating/jolin.jpg"

    $("#sina").click(function() {
        window.open('http://v.t.sina.com.cn/share/share.php?url=http://party.syyx.com/nycs/dating/index.html&title=' + title  + '&pic=' + src + '&ralateUid=1703998792&appkey=3783886085', 'newwindow', 'height=487,width=642,top=100,left=300,toolbar=no,menubar=no,status=no')
    })
    $("#tencent").click(function() {
      window.open('http://share.v.t.qq.com/index.php?c=share&a=index&url=http://party.syyx.com/nycs/dating/index.html&title=' + title + '&pic=' + src + '&appkey=801152397', 'newwindow', 'height=487,width=642,top=100,left=300,toolbar=no,menubar=no,status=no')
    })
}()
//---------------------------------------------------------------------------------------------------------------------------------

