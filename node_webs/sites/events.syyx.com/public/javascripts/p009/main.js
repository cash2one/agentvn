function getjwplayer(swf,w,h,id,position){
    if(!position){
        position = "over"
    }
    var object = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" hidefocus="true" id="mediaplayer" width="' + w + '" height="' + h + '" bgcolor="#000000" name="mediaplayer" tabindex="0"><param name="movie" value="http://v.nycs.syyx.com/jwplayer/player.swf"><!--[if !IE]>--><object type="application/x-shockwave-flash" hidefocus="true" data="http://v.nycs.syyx.com/jwplayer/player.swf" width="' + w + '" height="' + h + '"><!--<![endif]--><param name="allowfullscreen" value="true"><param name="seamlesstabbing" value="true"><param name="wmode" value="transparent" /><param name="flashvars" value="netstreambasepath='+document.location.href+'&id=mediaplayer&file='+swf+'&controlbar.position='+position+'&volume=41&autostart=true&repeat=SINGLE"><!--[if !IE]>--></object><!--<![endif]--></object>'
    $(id).html(object)
}

function getflash(swf, w, h, id) {
    var object = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + w + '" height="' + h + '" ><param name="movie" value="' + swf + '" /><!--[if !IE]>--><object type="application/x-shockwave-flash" data="' + swf + '" width="' + w + '" height="' + h + '"><!--<![endif]--><param name="wmode" value="transparent" /><!--[if !IE]>--></object><!--<![endif]--></object>'
    $(id).html(object)
}


!function() {
    if($("#flash").length){
        getjwplayer('http://v.nycs.syyx.com/nycs/flv/tibuflash_186x106_20120530.flv', 186, 105, "#flash", "none");
    }
    if($("#run_flash").length){
        getflash('http://s.syyx.com/events/t5/btn.swf', 192, 57, "#run_flash")
    }
    $("#to_reg").click(function(){
        $(".middle").append("<div id='reg_tips'></div>")
        $("#reg_tips").animate({left:"10px",top:"90px",width:"280px",height:"80px",opacity:"show"},"normal",function(){
            $("#reg_tips").html("快在右边注册，领取VIP网吧礼包！")
            setTimeout(function(){
                $("#reg_tips").html("")
                $("#reg_tips").animate({left:"780px",top:"83px",width:"147px",height:"20px",opacity:"hide"},"normal",function(){
                    $("#txtUserAccount")[0].select()
                     $("#reg_tips").remove()
                    })
                },1000)
            })
    })
    
    function to_phone() {
        var phone = $("#phone").val()
        document.domain = 'syyx.com';
        $("#phone").val("")
        if(/^\d{5,15}$/.test(phone)){
            $("#phone_result").attr("src","http://activity.syyx.com/role/adduserphone.aspx?userphone=" + phone )
        }else {
            alert("请输入正确的手机号码！")
        }
    }
    $("#to_phone").click(to_phone)

    $("#phone").focus(function (){
        if($(this).val()=="请输入手机号码"){
            $(this).val("")
        }
        $("#phone").keydown(function(event){
            if(event.keyCode == "13"){
                to_phone()
            }
        })
    })

    $("#phone").blur(function (){
        if($(this).val()==""){
            $(this).val("请输入手机号码")
        }
        $("#phone").unbind("keydown")
    })



    if($("#flash_but").length){
        getflash('http://s.syyx.com/events/201206/flash_but.swf', 186, 105, "#flash_but")
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
}()

$("document").ready(function() {
    $(".reg_form input").val("")
    $("#phone").val("请输入手机号码")
})
