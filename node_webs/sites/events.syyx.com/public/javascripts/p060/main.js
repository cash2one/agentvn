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

getflash('http://r.syyx.com/events/p060/prize.swf', 250, 72, "#prize")
getflash('http://r.syyx.com/events/p060/to_reg_flash.swf', 221, 72, "#to_reg_flash")
getflash('http://r.syyx.com/events/p060/to_reg_flash2.swf', 221, 72, "#to_reg_flash2")
getjwplayer('http://v.nycs.syyx.com/nycs/flv/tibuflash_186x106_20120530.flv', 186, 105, "#flash", "none");
getflash('http://r.syyx.com/events/p060/flash_but.swf', 186, 105, "#flash_but")
$("#regs").mouseover(function() {
    $("#to_reg_flash2").css("visibility", "visible")
})
$("#regs").mouseout(function() {
    $("#to_reg_flash2").css("visibility", "hidden")
})
$("#flash_btn").click(function(event) {
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
    for (var i = 4; i--;) {
        $("#j_tab span").eq(i).mouseover(function(a) {
            return function() {
                $("#j_tab span").eq(imgfocus).removeClass("check_" + imgfocus) 
                $(this).addClass("check_" + a)
                $("#j_con .con").eq(imgfocus).css("visibility", "hidden")
                var focus = $("#j_con .con").eq(a)            
                focus.css("visibility", "visible") 
                imgfocus = a;                
            }
        }(i))
    }
}
job_focus()

getflash("http://v.nycs.syyx.com/nycs/swf/yi_5_8.swf", 238, 134, "#ynz")
getflash("http://v.nycs.syyx.com/nycs/swf/jian_5_8.swf", 238, 134, "#jws")
getflash("http://v.nycs.syyx.com/nycs/swf/ge_5_8.swf", 238, 134, "#gdj")
getflash("http://v.nycs.syyx.com/nycs/swf/qiang_5_8.swf", 238, 134, "#qxs")


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
        scr.animate({marginLeft : po - 0 + 235 + "px"},function() {
            delay(--k)

        })
    }) 
    $("#next").click(function() {
        var po = scr.css("marginLeft").replace("px","")
        if(po == -1175 || ok == false){
            return
        }
        ok = false
        scr.animate({marginLeft : po - 235 + "px"}, function() {
            delay(++k)
        })
    })
    $("#scroll_body a").lightBox();
}
img_scroll()

$(".to_reg").click(function() {
    $("#reg1").hide()
    $("#reg2").show()

})

$("#close").click(function() {
    $("#reg1").show()
    $("#reg2").hide()
    $(".reg_box").css("width", "")
    $("#reg2").css("height","361px")
    $("#reg2").css("height","")
})


function sc(){
    var top = $("body").scrollTop() || $("html").scrollTop()
    $(".reg_box").css("top", top + 50 + "px")
}

function size(){
    c_left  = document.body.clientWidth
    if(c_left < 980){
         $(".reg_box").css("left", "916px")
         return
    }
    c_width = $(".reg_box").css("width").replace("px", "")
    $(".reg_box").css("left", c_left - c_width + "px")
}

$(window).scroll(sc)
$(window).resize(size)

$("a").attr("hidefocus", "true")