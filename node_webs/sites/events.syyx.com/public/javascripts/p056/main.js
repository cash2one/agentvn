
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

getflash('http://r.syyx.com/events/p056/prize.swf', 284, 55, "#prize")

function img_focus() {
    var imgfocus = 0
    for (var i = 5; i--;) {
        $("#img_focus_tab a").eq(i).mouseover(function(a) {
            return function() {
                $("#img_focus_tab a").eq(imgfocus).removeClass("check_" + imgfocus)
                $(this).addClass("check_" + a)

                $("#img_focus_img div").eq(imgfocus).css({
                    "opacity" : "0",
                    "filter"  : "alpha(opacity:0)",
                    "z-index" : "0"
                })
                $("#img_focus_img div").eq(a).css({
                    "opacity" : "1",
                    "filter"  : "alpha(opacity:100)",
                    "z-index" : "1"
                })

                imgfocus = a;
            }
        }(i))
    }
}
img_focus()

function job_focus() {
    var imgfocus = 0
    var job = ["#ynz", "#jws", "#qxs", "#gdj"]
    var vid =[
    'http://v.nycs.syyx.com/nycs/swf/yi_5_8.swf',
    'http://v.nycs.syyx.com/nycs/swf/jian_5_8.swf',
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

function scroll_text(i) {
    if(i == 5) {
        $("#com_con").css("marginTop", "0")
        i = 1
    }
    $("#com_con").animate({"marginTop" : -i * 240 +"px"}, 1500, function() {
        setTimeout(function() {scroll_text( ++i )}, 10000)
    })
}
setTimeout(function(){
    scroll_text(1)
    for(var j = 0; j < 16 ; j++){
        if(j < 4){
            $("#com_con").append("<li>" + $("#com_con li").eq(j).html() + "</li>")
        } else {
            $("#com_con img").eq(j).attr("src", $("#com_con img").eq(j).attr("delay"))
            $("#com_con img").eq(j).removeAttr("delay")  
        }
    }
}, 10000)

function toreg() {
    $("#reg_box").css("display", "block")
    $("#reg_but").css("display", "none")
    $("#reg_scroll").css("width", 361)
    $("#reg_scroll").css("height", 450)
}

$("#reg_but").click(toreg)


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

function pup() {
    $("#pup_bg").css({
        width : get_page_size.page_width(),
        height : get_page_size.page_height(),
        display :"block"
    })
    $("#pup").css("top", get_page_size.scrolltop() + 150).fadeIn()
}
$("#more, #gift").click(pup)

$("#close2").click(function() {
    $("#pup_bg").css("display", "none")
    $("#pup").fadeOut()
})

$("#reg3, #to_reg_3").click(toreg)
$("#reg3").click(function() {
    $("#pup_bg").css("display", "none")
    $("#pup").fadeOut()
})

$(window).resize(function() {
    $("#pup_bg").css({
        width : 0,
        height : 0
     }).css({
        width : get_page_size.page_width(),
        height : get_page_size.page_height()
     })
})

$("#sub_phone").click(function() {
    if(!$("#reg_account").val()) {
        alert("非法用户名")
        return
    }
    if(!/^1(([358]{1}[0-9]{1})|47)[0-9]{8}$/.test($("#phone").val())) {
        alert("请填写正确的手机号码。前面不需填0")
    } else {
        $.post("/add_phone", {user : $("#reg_account").val(), phone : $("#phone").val()}, function(data) {
            if(data.type==0) {
                $(".phone").css("display", "none")
                $(".phone_su").css("display", "block")
            } else {
                alert("系统错误！")
            }
        },"json")
    }
})