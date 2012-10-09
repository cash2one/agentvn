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

function img_focus() {
    var imgfocus = 0
    for (var i = 4; i--;) {
        $("#img_focus_tab a").eq(i).mouseover(function(a) {
            return function() {
                $("#img_focus_tab a").eq(imgfocus).removeClass("check_" + imgfocus) 
                $(this).addClass("check_" + a) 
                $("#img_focus_img img").eq(imgfocus).fadeOut("fast") 
                var focus = $("#img_focus_img img").eq(a)            
                focus.fadeIn("fast")
                if(focus.attr("delay")){
                    $("#img_focus_img").css("display","none")
                    focus.attr("src",focus.attr("delay"))
                    focus.removeAttr('delay')
                    focus.on('load',function(){
                        $("#img_focus_img").css("display","block")
                        $(this).unbind('load')
                    })
                }
                imgfocus = a;
            }
        }(i))
    }
}

function img_scroll() {
    var scr = $("#scroll_body") 
    $("#prev1").click(function() {
        var po = scr.css("marginLeft")
        if (po == "-936px") {
            scr.animate({
                marginLeft: "0px"
            })
        }
    }) 
    $("#next1").click(function() {
        var po = scr.css("marginLeft")
        if (po == "0px" || po == "0") {
            scr.animate({
                marginLeft: "-936px"
            })
        }
    })
    $("#scroll_body a").lightBox();
}

function text_scroll() {
    var com     = $("#comment") 
    var p       = 0
    var first   = $("#comment div").eq(0) 
    var dh      = first[0].offsetHeight
    function sc() {
        p -= 4
        if (p == -dh) {
            setTimeout(arguments.callee, 4000);
            p = 0;
            com.append(first);
            first   = $("#comment div").eq(0) 
            dh      = first[0].offsetHeight
        }
        else {
            setTimeout(arguments.callee, 40)
        }
        com.css("margin-top", p + "px")
    }
    setTimeout(sc, 4000)
}

//-延迟加载------------------------------------------------------------------------------------
window.onscroll = delay;
window.onresize = delay;
function delay(){
    var img = $("#scroll_body img");
    var l   = img.length;
    var wd  = document.documentElement.clientHeight;
    for(var i = 0; i < l; i++){
        var imgi = img.eq(i)
        if(imgi.attr("delay")&&imgi[0].getBoundingClientRect().top <= wd){
            imgi.css("display",'none');
            imgi.on('load', function() {
                $(this).css("display",'inline');
                $(this).unbind('load')
            })
            imgi.attr('src', imgi.attr("delay"));
            imgi.removeAttr("delay");
        }
    }
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

!function() {
    img_focus()
    text_scroll()
    img_scroll()

    if($("#flash").length){
        getjwplayer('http://v.nycs.syyx.com/nycs/flv/tibuflash_186x106_20120530.flv', 186, 105, "#flash", "none");
    }
    if($("#flash_but").length){
        getflash('http://s.syyx.com/events/201206/flash_but.swf', 186, 105, "#flash_but")
    }
}()