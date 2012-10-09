
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

getflash('http://r.syyx.com/events/p055/prize.swf', 284, 55, "#prize")
getjwplayer('http://v.nycs.syyx.com/nycs/flv/chuizhi_164x92_20120927.flv', 164, 92, "#flash", "none");
getflash('http://r.syyx.com/events/p055/flash_but.swf', 164, 92, "#flash_but")

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
    $("#com_con").animate({"marginTop" : -i * 320 +"px"}, 1500, function() {
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

!function() {
    var job_skill = {
        qxs : [
            '高效杀伤：BUFF技能，增加自身以及一定范围内队友的攻击伤害。',
            '精确打击：花一定时间瞄准，对目标造成非常大的伤害，射程极远。',
            '连射：枪械师中级攻击技能，10%几率触发四连击。',
            '扫射：枪械师中级技能，对目标及目标周围的敌人造成伤害。',
            '毒雾陷阱：放置一个陷阱，被敌方触发后，在陷阱区域内的敌对目标将获得减速及受到伤害加深的效果',
            '隐身：进入隐身状态一段时间，隐身期间移动速度加快。',
            '专注射击：BUFF技能，提高自身的命中与忽闪，减少自身的闪避。'
        ],
        ynz : [
            '乱雷穿空：对自身一定范围内的可攻击目标造成群体伤害。',
            '漫天惊雷：异能者雷电技能，对目标及目标周围的敌人造成伤害。',
            '闪电诱爆：提高攻击暴击几率。',
            '能量护盾：获得技能效果后，用精神值抵消部分的所受伤害。',
            '怒雷闪：异能者高级攻击技能，一定几率对攻击目标周围的敌对目标进行额外攻击。',
            '瞬间移动：瞬间移动到指定地点，以追击或躲避。',
            '天雷陨：使用怒雷闪时有一定几率召唤一个从天而降的巨大陨石对目标造成伤害，并在目标当前位置形成持续掉血的灼烧区域。'
        ],
        jws : [
            '剑术精通：提高剑武士物理攻击。',
            '破甲：攻击出现连斩时，降低目标防御一定时间。',
            '焚心斩：消耗一定生命值与精神值对目标造成巨大伤害。',
            '剑武战意：全面提升剑武士属性。',
            '掠影：冲向目标并对目标造成一定伤害。',
            '嗜血：使用极光刃影时有一定几率将造成的伤害按比例在2秒内转化为自己的生命值。',
            '死里逃生：当剑武士受到将会导致死亡的伤害时，将有一定几率触发此技能来忽略此伤害，触发间隔30秒。'
        ],
        gdj : [
            '风刃乱舞：格斗家群体技能，攻击自身周围目标。',
            '复仇魂爆：使用技能后，持续时间结束造成范围伤害。持续时间内受到的伤害如果超过一定值，格斗家会按一定比例对附近目标造成巨大的反弹伤害。',
            '减速：一段时间内减少对方移动速度。',
            '怒意强袭：格斗家中级攻击技能，几率触发攻击加速。',
            '破敌：攻击加速被触发时，增加暴击值。',
            '嘲讽：咒骂目标及目标周边单位，强行让目标攻击自己。',
            '灵魂链接：BUFF技能，格斗家可以分担目标单位的伤害，自身生命值低于30%时，断开锁链。'
        ]
    }

    var qxs = ""
    var ynz = ""
    var gdj = ""
    var jws = ""
    for(var i = 0 ; i < 7 ; i++){
        qxs += '<em title="' + job_skill.qxs[i] + '"></em>'
        ynz += '<em title="' + job_skill.ynz[i] + '"></em>'
        gdj += '<em title="' + job_skill.gdj[i] + '"></em>'
        jws += '<em title="' + job_skill.jws[i] + '"></em>' 
    }

    $(".qxs .skill").html(qxs)
    $(".jws .skill").html(jws)
    $(".gdj .skill").html(gdj)
    $(".ynz .skill").html(ynz)

    getflash('http://r.syyx.com/events/p019/qxs.swf', 188, 105, "#j_swf .qxs")
    getflash('http://r.syyx.com/events/p019/ynz.swf', 188, 105, "#j_swf .ynz")
    getflash('http://r.syyx.com/events/p019/jws.swf', 188, 105, "#j_swf .jws")
    getflash('http://r.syyx.com/events/p019/gdj.swf', 188, 105, "#j_swf .gdj")
}()

function video(url ,cb) {
    $(document.body).append('<div id="pop_flash_dialog"><div id="pop_flash" style="height:370px"></div></div>')
    getjwplayer(url, 640, 370, "#pop_flash") 
    $("#pop_flash_dialog").dialog({
        width       : 656,
        height      : 420,
        modal       : true,
        resizable   : false,
        dialogClass : "pop_video_detail",
        close       : function() {
            $("#pop_flash_dialog").remove();
            if(cb){
                cb()
            }
        }
    });
}

function job_focus() {

        getflash('http://r.syyx.com/events/p055/flash_but.swf', 168, 98, "#flash_but_2")

        var imgfocus = 0
        var job = ["#jws", "#ynz", "#qxs", "#gdj"]
        var vid =[
        'http://v.nycs.syyx.com/nycs/flv/jianwushi_169x98_20120808.flv',
        'http://v.nycs.syyx.com/nycs/flv/yinengzhe_169x98_20120808.flv',
        'http://v.nycs.syyx.com/nycs/flv/qiangxieshi_169x98_20120808.flv',
        'http://v.nycs.syyx.com/nycs/flv/gedoujia_169x98_20120808.flv']
        
        var vid2 = [
        'http://v.nycs.syyx.com/nycs/flv/jianwushi_640x360_20120803.flv',        
        'http://v.nycs.syyx.com/nycs/flv/yineng_640x360_20120803.flv',
        'http://v.nycs.syyx.com/nycs/flv/qiangxieshi_640x360_20120803.flv',
        'http://v.nycs.syyx.com/nycs/flv/gedou_640x360_20120803.flv'
        ]

        getjwplayer(vid[0], 169, 98, "#jws", "none");

        $("#j_video").click(function() {
            video(vid2[0])
        })

        for (var i = 4; i--;) {
            $("#j_tab span").eq(i).mouseover(function(a) {
                return function() {
                    $("#j_tab span").eq(imgfocus).removeClass("check_" + imgfocus) 
                    $(this).addClass("check_" + a)
                    $("#j_con .con").eq(imgfocus).css("display", "none")
                    var focus = $("#j_con .con").eq(a)            
                    focus.css("display", "block")
                    if($(job[a]).html()==""){
                        getjwplayer(vid[a], 169, 98, job[a], "none");
                    }
                    $("#j_video").unbind("click").click(function(a) {
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

$.get("/get_rush_reg", function(html) {
    $("#num").html(html.ret)
},"json")