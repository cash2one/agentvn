
function getjwplayer(swf,w,h,id,position){
    if(!position){
        position = "over"
    }
    var object = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" hidefocus="true" id="mediaplayer" width="' + w + '" height="' + h + '" bgcolor="#000000" name="mediaplayer" tabindex="0"><param name="movie" value="http://v.nycs.syyx.com/jwplayer/player.swf"><!--[if !IE]>--><object type="application/x-shockwave-flash" hidefocus="true" data="http://v.nycs.syyx.com/jwplayer/player.swf" width="' + w + '" height="' + h + '"><!--<![endif]--><param name="allowfullscreen" value="true"><param name="seamlesstabbing" value="true"><param name="wmode" value="transparent" /><param name="flashvars" value="netstreambasepath='+document.location.href+'&id=mediaplayer&file='+swf+'&controlbar.position='+position+'&volume=41&autostart=true&repeat=SINGLE"><!--[if !IE]>--></object><!--<![endif]--></object>'
    $(id).html(object)
}

!function() {
    if($("#flash").length){
        getjwplayer('http://v.nycs.syyx.com/nycs/flv/smallvideo_284x162_20120530.flv', 388, 219, "#flash");
    }
}()

window.onscroll = delay;
function delay(){
    var img = $("#img_scroll img");
    var l = img.length;
    var wd = document.documentElement.clientHeight;
    for(var i=0;i<l;i++){
        var imgi = img.eq(i)
        if(imgi.attr("delay")&&imgi[0].getBoundingClientRect().top<=wd){
            imgi.css("display",'none');
            imgi.on('load',function(){
                $(this).css("display",'inline');
                $(this).unbind('load')
            })
            imgi.attr('src',imgi.attr("delay"));
            imgi.removeAttr("delay");
        }
    }
}