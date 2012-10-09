//-------------------------------------------------------------------------------------------------
$("a").attr("hidefocus", "true")
$("a.ignore").click(function(event) {
    event.preventDefault()
})        
//-------------------------------------------------------------------------------------------------
function get_flash_button(id, w, h) {
    var src = "http://r.syyx.com/events/p023/flash_but.swf"
    var object = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + w + '" height="' + h + '" ><param name="movie" value="' + src + '" /><!--[if !IE]>--><object type="application/x-shockwave-flash" data="' + src + '" width="' + w + '" height="' + h + '"><!--<![endif]--><param name="wmode" value="transparent" /><!--[if !IE]>--></object><!--<![endif]--></object>'
    $(id).html(object)
}
//-------------------------------------------------------------------------------------------------
function get_jwplayer(swf,w,h,id,position){
    if(!position){
        position = "over"
    }
    var object = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" hidefocus="true" id="mediaplayer" width="' + w + '" height="' + h + '" bgcolor="#000000" name="mediaplayer" tabindex="0"><param name="movie" value="http://v.nycs.syyx.com/jwplayer/player.swf"><!--[if !IE]>--><object type="application/x-shockwave-flash" hidefocus="true" data="http://v.nycs.syyx.com/jwplayer/player.swf" width="' + w + '" height="' + h + '"><!--<![endif]--><param name="allowfullscreen" value="true"><param name="seamlesstabbing" value="true"><param name="wmode" value="transparent" /><param name="flashvars" value="netstreambasepath='+document.location.href+'&id=mediaplayer&file='+swf+'&controlbar.position='+position+'&volume=41&autostart=true&repeat=SINGLE"><!--[if !IE]>--></object><!--<![endif]--></object>'
    $(id).html(object)
}
//-------------------------------------------------------------------------------------------------
var play_flash = function(src) {
    $(document.body).append('<div id="pop_flash_dialog"><div id="pop_flash"></div></div>')
    get_jwplayer(src, 640, 355, "#pop_flash") 
    
    $("#pop_flash_dialog").dialog({
        width       : 656,
        height      : 405,
        modal       : true,
        resizable   : false,
        dialogClass : "pop_video_detail",
        close       : function() {
            $("#pop_flash_dialog").remove()
            get_jwplayer("http://v.nycs.syyx.com/nycs/flv/zhengyou80s_640x360_0917.flv", 476, 265, "#main_flv")
        }
    })    

    $("#jiangxi").click(function(){
        alert("good")
        $("#pop_flash_dialog").remove()
    })
}
//-------------------------------------------------------------------------------------------------
$("a").attr("hidefocus", "true")
$("a.ignore").click(function(event) {
    event.preventDefault()
})       
//-------------------------------------------------------------------------------------------------
$("a.tab").mouseover(function(event) {
    $("a.tab").removeClass("hover")
    $(this).addClass("hover")

    var img = $(this).attr("id")
    var src = $("img." + img).attr("src")
    $("#main_img").attr("src", src)
})       
//-------------------------------------------------------------------------------------------------
get_jwplayer("http://v.nycs.syyx.com/nycs/flv/zhengyou80s_640x360_0917.flv", 476, 265, "#main_flv")
//-------------------------------------------------------------------------------------------------
get_flash_button("#down_flash .flash_player", 184, 103)
//-------------------------------------------------------------------------------------------------
$("#down_flash .flash_div").click(function() {
    $("#main_flv").html("")
    var flv_src = $(this).attr("flv_src")
    play_flash(flv_src)
})
//-------------------------------------------------------------------------------------------------
var open_surface = function() {
    var tops = document.documentElement.scrollTop || document.body.scrollTop;
    $("#popup_bg").css({
        "width"   : get_page_size.page_width(),
        "height"  : get_page_size.page_height(),
        "display" : "block"
    })

    $("#dialog").css("top", tops + 200)
    $("#dialog").css("display", "block")    
}
//-------------------------------------------------------------------------------------------------
var close_surface = function() {
    $("#dialog").css("display", "none")
    $("#popup_bg").css("display", "none")
}
//-------------------------------------------------------------------------------------------------
$(".gift").click(function() {
    var tel = $("#tel").val()

    if(/^1(([358]{1}[0-9]{1})|47)[0-9]{8}$/.test(tel) == false) {
        $("#tel").css({
            "color" : "#ff0000",
            "font-weight" : "bold"
        })

        $("#tel").val("请填写正确的手机号码")
    }

    else{
        $.post("/add_phone", {user : "index_xlzt", phone : tel}, function(data) {
            if(data.type==0) {
                var tag = "提交成功！礼包将不久后通过短信发送到您的手机，请注意查收！"
            } else {
                var tag = "系统错误！"
            }

            $("#dialog .tag").html(tag)
            open_surface()
        },"json")
    }
})
//-------------------------------------------------------------------------------------------------
$("#dialog .close, #dialog .confirm").click(function(){
    close_surface()
})
//-------------------------------------------------------------------------------------------------
$("#tel").on("focus",function(){
    if($(this).val() == "请填写正确的手机号码") {
        $(this).val("")
        $("#tel").removeAttr("style")
    }    
})