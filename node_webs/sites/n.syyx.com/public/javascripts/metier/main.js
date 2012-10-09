//dom_loaded-------------------------------------------------------------------------------------------
$(function(){
    getjwplayer("http://v.nycs.syyx.com/nycs/flv/zyjj_ynz_20120630.flv", 464, 262, "#c_video")
    getskill("http://nycs.syyx.com/Ajax/Metier/MetierCraf.aspx?mid=3")
    getflash("/flash/indexFlash_top_20120525.swf", 664, 62, "#nav")
    swf = {
        "s60": "http://s.syyx.com/nycs/GameInfo/flash/ynz/60.swf",
        "s70": "http://s.syyx.com/nycs/GameInfo/flash/ynz/70.swf",
        "s80": "http://s.syyx.com/nycs/GameInfo/flash/ynz/80.swf",
        "s90": "http://s.syyx.com/nycs/GameInfo/flash/ynz/90.swf"
    }  
    getgrade(swf)

    $("#pro_tab span").eq(0).click(function() { 
        $("#pro_tab span").removeAttr("class")
        $(this).addClass("video")
        $("#pro_con .con").css("display", "none")
        $("#c_video").css("display", "block")
    })

    $("#pro_tab span").eq(1).click(function() {
        $("#pro_tab span").removeAttr("class")
        $(this).addClass("skill")
        $("#pro_con .con").css("display", "none")
        $("#pro_con .con").css("display", "none")
        $("#c_skill").css("display", "block")
    })

    $("#pro_tab span").eq(2).click(function() {
        $("#pro_tab span").removeAttr("class")
        $(this).addClass("item")
        $("#pro_con .con").css("display", "none")
        $("#pro_con .con").css("display", "none")
        $("#c_item").css("display", "block")
    })
});
//---------------------------------------------------------------------------------------
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

function getskill(url) {
    $.get(url, function(html){
        $("#c_skill").html(html)
    }, "html")
}

function getgrade(url){
    $("#grades span").click(function() {
        var id = $(this).attr("id")
        $("#grades span").removeAttr("class")
        $(this).addClass(id)
        getflash(url[id], 218, 228,"#grade_flash")
    })
    getflash(url["s60"], 218, 228,"#grade_flash")
}