
reg_result_func.ok = function(info) {
    $("#reg_account").val(info[0])
    $('#active_code').val(info[1])
    $(".reg").hide()
    $("#reg_step2").show()

    if($("#t2").hasClass("t2_dis")) {
        $("#t2").attr("class","t2_1_dis")
    }
    $("#t1").addClass("t1_dis")

    $("#active_link").click(function(event) {
        var reg_account = $("#reg_account").val()
        var active_code = $("#active_code").val()
        if(reg_account == "" || active_code == "" ){
            alert('请输入帐号或者激活码')
        }else {
            $.post('/activate_card', {account : $("#reg_account").val() , card : $("#active_code").val()}, function(data) {
                $("#reg_step2").hide()
                switch (data){
                    case "0"://激活成功                            
                        $("#reg_step4").show()
                        break;
                    case "1"://帐号已激活
                        $("#active_tip").html("对不起，帐号错误");
                        $("#reg_step5").show()
                        break;
                    case "-2"://礼包卡已使用
                        $("#active_tip").html("对不起，新手卡错误");
                        $("#reg_step5").show()
                        break;
                    default://异常错误
                        $("#active_tip").html("对不起，服务器异常");
                        $("#reg_step5").show()
                        break;
                }
                $("#back").click(function() {
                    $("#reg_step2").show()
                    $("#reg_step5").hide()
                })
            }, 'html')
        }
        return false
    })
}


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
getjwplayer('http://v.nycs.syyx.com/nycs/flv/tibuflash_186x106_20120530.flv', 186, 105, "#flash", "none");
getflash('http://r.syyx.com/events/p026/flash_but.swf', 186, 105, "#flash_but")

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

function toreg() {
    $("#reg_box").css("display", "block")
    $("#reg_but").css("display", "none")
    $("#reg_scroll").css("width", 284)
    $("#reg_scroll").css("height", 455)
}

$("#reg1").click(toreg)
$("#reg_but").click(toreg)
$("#to_reg_3").click(toreg)

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

function regd() {
    if($("#t2").hasClass("t2_dis")) {
        $("#t2").attr("class","t2_1_dis")
    }
    $("#t1").addClass("t1_dis")
}

$(".mini_download").add(".mini").add(".mini_download").click(function() {
    if($("#t1").hasClass("t1_dis")) {
        $("#t2").addClass("t2_1_dis")
    } else {
        $("#t2").addClass("t2_dis")
    }
})

$.get("/get_rush_reg", function(html) {
    $("#rush").html(html.ret)
},"json")