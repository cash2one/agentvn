
function getflash(swf, w, h, id) {
    var object = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + w + '" height="' + h + '" ><param name="movie" value="' + swf + '" /><!--[if !IE]>--><object type="application/x-shockwave-flash" data="' + swf + '" width="' + w + '" height="' + h + '"><!--<![endif]--><param name="wmode" value="transparent" /><!--[if !IE]>--></object><!--<![endif]--></object>'
    $(id).html(object)
}

getflash('http://r.syyx.com/events/p025/banner.swf', 970, 371, "#banner")
getflash('http://r.syyx.com/events/p025/time.swf', 953, 221, "#time")

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

$("#scroll").click(function() {
    $("html").animate({ scrollTop: 574 }, "normal")
    $("body").animate({ scrollTop: 574 }, "normal")
})
