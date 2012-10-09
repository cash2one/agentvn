$(document).ready(function(){


    getmusic()
    get_spokesmaninfo(1);
    get_spokesmaninfo(2);
    get_spokesmaninfo(3);
    get_spokesmaninfo(4);

    // $("#jplayer_inspector").jPlayerInspector({jPlayer:$("#jquery_jplayer_1")});
});
function getmusic(){
    var myCirclePlayer = new CirclePlayer("#jquery_jplayer_1",
    {
        mp3: "http://r.syyx.com/party/nycs/spokesman/jplayer/dr.jolin.mp3"
    }, {
        cssSelectorAncestor: "#music_player",
        swfPath: "http://r.syyx.com/party/nycs/spokesman/jplayer/",
        supplied: "mp3",
        wmode: "window"
    });
    
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


getjwplayer('http://v.nycs.syyx.com/nycs/flv/JolinIntro_small_201209.flv', 358, 201, "#flash", "none");
getflash('http://r.syyx.com/party/nycs/spokesman/flash_but.swf', 358, 201, "#flash_but")

$("#flash_btn").click(function(event) {
    $(document.body).append('<div id="pop_flash_dialog"><div id="pop_flash"></div></div>')
    getjwplayer('http://v.nycs.syyx.com/nycs/flv/JolinIntro_big_201209.flv', 640, 355, "#pop_flash") 
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
$("#voting_1").click(function(event){
    savespokesman(1);
})

$("#voting_2").click(function(event){
    savespokesman(2);
})

$("#voting_3").click(function(event){
    savespokesman(3);
})

$("#voting_4").click(function(event){
    savespokesman(4);
})

function get_spokesmaninfo(votingtype){
$.ajax({
        url     :   "/nycs/spokesman/get_spokesmaninfo?r=" + Math.random(),
        data    :   { a : votingtype },
        dataType:   "json",
        type    :   "GET",
        success: function(data) {
            if(data.amount > 0){
                $("#voting_amount"+votingtype).html(data.amount)
            }else{
                $("#voting_amount"+votingtype).html(0)
            }
        }
    })
}
function savespokesman(votingtype){

$.ajax({
        url     :   "/nycs/spokesman/savespokesman?r=" + Math.random(),
        data    :   { votingtype : votingtype },
        dataType:   "json",
        type    :   "POST",
        success: function(data) {
            if(data.err){
                alert(data.err)
            }
            else {
                var amount = parseInt($("#voting_amount"+votingtype).html()) + 1
                $("#voting_amount"+votingtype).html(amount)
            }
        }
    })
}
function img_scroll() {

    var scr = $("#scroll_body")
    var k   = 0
    var ok  = true
    var cli = 1
    var args=[1,2,3,4,5]
    function delay(a,argss) {
        ok = true
        var focus = $("#scroll_body img").eq(a)
        if(focus.attr("delay")){
            focus.attr("src", focus.attr("delay"))
            focus.removeAttr("delay")
            focus.load(function(){
                $(this).css("display", "inline")
            })
        }
        for(var i =1;i<=argss.length;i++){
            $("#link_"+i).attr("href","http://r.syyx.com/party/nycs/spokesman/img_"+(a+1)+"_link_"+i+".jpg")
            }
    }

    $("#prev").click(function() {
        var po = scr.css("marginLeft").replace("px","")
        if(po == 0 || ok == false) {
            return
        }
        ok = false
        scr.animate({marginLeft : po - 0 + 313 + "px"},function() {
            delay(--k,args)
        })
    }) 
    $("#next").click(function() {
        var po = scr.css("marginLeft").replace("px","")
        if(po == -1252 || ok == false){
            return
        }
        ok = false
        scr.animate({marginLeft : po - 313 + "px"}, function() {
            delay(++k,args)
        })
    })
    $("#scroll_body a").lightBox();
}
img_scroll()
