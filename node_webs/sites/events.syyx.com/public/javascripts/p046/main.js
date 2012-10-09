
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

getflash('http://r.syyx.com/events/p046/prize.swf', 156, 80, "#prize")
getjwplayer('http://v.nycs.syyx.com/nycs/flv/tibuflash_186x106_20120530.flv', 169, 98, "#flash", "none");
getflash('http://r.syyx.com/events/p046/flash_but.swf', 169, 98, "#flash_but")

$("#flash_btn").click(function(event) {
    $(document.body).append('<div id="pop_flash_dialog"><div id="pop_flash"></div></div>')
    getjwplayer('http://v.nycs.syyx.com/nycs/flv/bigvideo_642x342_20120530.flv', 640, 355, "#pop_flash") 
    $("#pop_flash_dialog").dialog({
        width       : 656,
        height      : 405,
        modal       : true,
        resizable   : false,
        dialogClass : "pop_video_detail",
        close       : function() {
            $("#pop_flash_dialog").remove();
        }
    });
    event.preventDefault()
})


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
img_focus()

function scroll_text(i) {
    if(i == 5) {
        $("#com_con").css("marginTop", "0")
        i = 1
    }
    $("#com_con").animate({"marginTop" : -i * 300 +"px"}, 1500, function() {
        setTimeout(function() {scroll_text( ++i )}, 10000)
    })
}
setTimeout(function(){
    scroll_text(1)
    for(var j = 0; j < 20 ; j++){
        if(j < 5){
            $("#com_con").append("<li>" + $("#com_con li").eq(j).html() + "</li>")
        } else {
            $("#com_con img").eq(j).attr("src", $("#com_con img").eq(j).attr("delay"))
            $("#com_con img").eq(j).removeAttr("delay")
        }
    }
}, 10000)


function job_focus() {
    var imgfocus = 0
    var job = ["#jws", "#ynz", "#qxs", "#gdj"]
    var vid =[
    'http://v.nycs.syyx.com/nycs/swf/jian_5_8.swf',
    'http://v.nycs.syyx.com/nycs/swf/yi_5_8.swf',    
    'http://v.nycs.syyx.com/nycs/swf/qiang_5_8.swf',
    'http://v.nycs.syyx.com/nycs/swf/ge_5_8.swf'
    ]

    getflash(vid[0], 238, 134, job[0]);

    for (var i = 4; i--;) {
        $("#j_tab span").eq(i).mouseover(function(a) {
            return function() {
                $("#j_tab span").eq(imgfocus).removeClass("check_" + imgfocus)
                $(this).addClass("check_" + a)
                $("#j_con .con").eq(imgfocus).css("display", "none")
                var focus = $("#j_con .con").eq(a)
                focus.css("display", "block")
                if($(job[a]).html()==""){
                    getflash(vid[a], 238, 134, job[a]);
                }
                $("#j_video").click(function(a) {
                    return function() {
                        video(vid2[a])
                    }
                }(a))
                imgfocus = a;
            }
        }(i))
    }
}
job_focus()

function img_scroll() {

    var scr = $("#scroll_body")
    var k   = 0
    var ok  = true

    function delay(a) {
        ok = true
        var focus = $("#scroll_body img").eq(a)
        if(focus.attr("delay")){
            focus.attr("src", focus.attr("delay"))
            focus.removeAttr("delay")
            focus.load(function(){
                $(this).css("display", "inline")
            })
        }
    }

    $("#prev").click(function() {
        var po = scr.css("marginLeft").replace("px","")
        if(po == 0 || ok == false) {
            return
        }
        ok = false
        scr.animate({marginLeft : po - 0 + 222 + "px"},function() {
            delay(--k)

        })
    }) 
    $("#next").click(function() {
        var po = scr.css("marginLeft").replace("px","")
        if(po == -1332 || ok == false){
            return
        }
        ok = false
        scr.animate({marginLeft : po - 222 + "px"}, function() {
            delay(++k)
        })
    })
    $("#scroll_body a").lightBox();
}
img_scroll()

function toreg() {
    $("#reg_box").css("display", "block")
    $("#reg_but").css("display", "none")
    $("#reg_scroll").css("width", 284)
    $("#reg_scroll").css("height", 455)
}

$("#reg_but").click(toreg)
$("#to_reg_3").click(toreg)
$("#reg3").click(toreg)

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
