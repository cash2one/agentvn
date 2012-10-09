function banner() {
    var cur = 0
    var timeout
    for(var i = 0 ; i < 5 ; i++) {
        $("#banner a").eq(i).mouseover(function(a) {
            return function() {
                if(a == cur) {
                    return
                }
                clearTimeout(timeout);
                $("#banner img").eq(cur).stop().fadeOut("fast")
                $("#banner img").eq(a).stop().removeAttr("style").fadeIn("fast")
                cur = a
            }
        }(i))
        $("#banner a").eq(i).mouseout(function() {
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                fade(++cur)
            }, 5000);
        })
    }

    function fade(i) {
        if(i == 5) {
            i = 0
        }
        $("#banner img").eq(i - 1).stop().fadeOut("fast")
        $("#banner img").eq(i).stop().removeAttr("style").fadeIn("fast", function() {
            timeout = setTimeout(function() {
                fade(++i)
            }, 5000);
        })
        cur = i
    }

    fade(0)
}

banner();

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

getjwplayer('http://v.nycs.syyx.com/nycs/flv/tvc_640x360_20120907.flv', 592, 334, "#video");

function toreg() {
    $("#reg_box").css("display", "block")
    $("#reg_but").css("display", "none")
    $("#reg_scroll").css("width", 266)
    $("#reg_scroll").css("height", 383)
}

$("#reg_but").click(toreg)
$("#reg_1").click(toreg)
$("#reg_2").click(toreg)

$("#close").click(function() {
    $("#reg_box").css("display", "none")
    $("#reg_but").css("display", "block")
    $("#reg_scroll").css("width", "")
    $("#reg_scroll").css("height", "")
})


function sc(){
    var top = $("body").scrollTop() || $("html").scrollTop()
    $("#reg_scroll").css("top", top + 100)
}

$(window).scroll(sc)