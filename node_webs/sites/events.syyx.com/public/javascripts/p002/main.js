function getjwplayer(swf,w,h,id,position){
    if(!position){
        position = "over"
    }
    var object = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" hidefocus="true" id="mediaplayer" width="' + w + '" height="' + h + '" bgcolor="#000000" name="mediaplayer" tabindex="0"><param name="movie" value="http://v.nycs.syyx.com/jwplayer/player.swf"><!--[if !IE]>--><object type="application/x-shockwave-flash" hidefocus="true" data="http://v.nycs.syyx.com/jwplayer/player.swf" width="' + w + '" height="' + h + '"><!--<![endif]--><param name="allowfullscreen" value="true"><param name="seamlesstabbing" value="true"><param name="wmode" value="transparent" /><param name="flashvars" value="netstreambasepath='+document.location.href+'&id=mediaplayer&file='+swf+'&controlbar.position='+position+'&volume=41&autostart=true&repeat=SINGLE"><!--[if !IE]>--></object><!--<![endif]--></object>'
    $(id).html(object)
}

function getflash(swf, w, h, id) {
    var object = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + w + '" height="' + h + '" ><param name="movie" value="' + swf + '" /><!--[if !IE]>--><object type="application/x-shockwave-flash" data="' + swf + '" width="' + w + '" height="' + h + '"><!--<![endif]--><param name="wmode" value="transparent" /><!--[if !IE]>--></object><!--<![endif]--></object>'
    $(id).html(object)
}


!function() {

    if($("#flash").length){
        getjwplayer('http://v.nycs.syyx.com/nycs/flv/tibuflash_186x106_20120530.flv', 186, 105, "#flash", "none");
    }
    if($("#run_flash").length){
        getflash('http://s.syyx.com/events/t8/btn.swf', 192, 57, "#run_flash")
    }    

    if($("#flash_but").length){
        getflash('http://s.syyx.com/events/201206/flash_but.swf', 186, 105, "#flash_but")
    }

    $("#flash_play").click(function(event) {
        $("#flash_but").css("background","#000")
        $("#pop_flash_dialog").html("<div id=\"pop_flash\"></div>")
        getjwplayer('http://v.nycs.syyx.com/nycs/flv/bigvideo_642x342_20120530.flv', 640, 355, "#pop_flash") 
        $("#pop_flash_dialog").dialog({
            width       : 656,
            height      : 400,
            modal       : true,
            resizable   : false,
            dialogClass : "pop_video_detail",
            close       : function() {
                $("#pop_flash_dialog").html("");
                if($("#flash_but").length){
                    $("#flash_but").removeAttr("style")
                }            
            }
        });
        event.preventDefault()
    })
}()

$("document").ready(function() {
    $(".reg_form input").val("")
    $("#phone").val("请输入手机号码")
})
