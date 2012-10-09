function getflash(swf, w, h, id) {
    var object = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + w + '" height="' + h + '" ><param name="movie" value="' + swf + '" /><!--[if !IE]>--><object type="application/x-shockwave-flash" data="' + swf + '" width="' + w + '" height="' + h + '"><!--<![endif]--><param name="wmode" value="transparent" /><!--[if !IE]>--></object><!--<![endif]--></object>'
    $(id).html(object)
}

getflash('http://r.syyx.com/events/p020/banner.swf', 1436, 658, "#banner_swf")
getflash('http://r.syyx.com/events/p020/prize.swf', 138, 70, "#prize")


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
    $("#com_con").animate({"marginTop" : -i * 360 +"px"}, 1500, function() {
        setTimeout(function() {scroll_text( ++i )}, 10000)
    })
}
setTimeout(function(){
    scroll_text(1)
    for(var j = 0; j < 24 ; j++){
        if(j < 6){
            $("#com_con").append("<li>" + $("#com_con li").eq(j).html() + "</li>")
        } else {
            $("#com_con img").eq(j).attr("src", $("#com_con img").eq(j).attr("delay"))
            $("#com_con img").eq(j).removeAttr("delay")  
        }
    }
}, 10000)

$("#game_img a").lightBox();

function sc(){
    var top = $("body").scrollTop() || $("html").scrollTop()
    $(".reg_box").css("top", top + 80 + "px")
}

$(window).scroll(sc)

function to_reg() {
    $("#reg2").css("display", "block")
    $("#reg1").css("display", "none")
}

$("#reg1").click(to_reg)
$("#reg_0").click(to_reg)
$("#reg_1").click(to_reg)
$("#reg_2").click(to_reg)

$("#close").click(function() {
    $("#reg1").css("display", "block")
    $("#reg2").css("display", "none")
})

try{
    document.execCommand('BackgroundImageCache',false,true);
}catch(e){}

$("a").attr("hidefocus", "true")

if($.browser.webkit == true){
    function container() {
        $(".container").css("width", "")
        var w = $(".container")[0].offsetWidth
        setTimeout(function() {
            if(w%2 == 1){
                $(".container").css("width", w-1)
            }
        },10)

    }
    container()
    $(window).resize(container)
}