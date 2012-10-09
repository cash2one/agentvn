
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

getflash('http://r.syyx.com/events/p019/prize.swf', 284, 55, "#prize")
getjwplayer("http://v.nycs.syyx.com/nycs/flv/zhiyezonghe_640x360_20120809.flv", 425, 238 ,"#flash")


function job_focus() {
    var imgfocus = 0
    for (var i = 4; i--;) {
        $("#j_tab span").eq(i).mouseover(function(a) {
            return function() {
                $("#j_tab span").eq(imgfocus).removeClass("check_" + imgfocus) 
                $(this).addClass("check_" + a)
                $("#job .con").eq(imgfocus).stop().attr("style", "display:none")
                $("#j_swf span").eq(imgfocus).css("visibility", "hidden")
                var focus = $("#job .con").eq(a)            
                focus.fadeIn("fast")
                $("#j_swf span").eq(a).css("visibility", "visible")
                imgfocus = a;
            }
        }(i))
    }
}
job_focus()

try{
    document.execCommand('BackgroundImageCache',false,true);
}catch(e){}



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

    var qxs = ynz = gdj = jws = ""
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

function sc(){
    var top = $("body").scrollTop() || $("html").scrollTop()
    $(".reg_box").css("top", top + 80 + "px")
}

$(window).scroll(sc)


function to_reg() {
    $("#reg2").css("display", "block")
    $("#reg1").css("display", "none")
    $("#txtUserAccount").select()
}

$("#reg1").click(to_reg)
$("#reg_1").click(to_reg)
$("#reg_2").click(to_reg)

$("#close").click(function() {
    $("#reg1").css("display", "block")
    $("#reg2").css("display", "none")
})
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