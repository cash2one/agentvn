
!function() {
    if(pagename == "index_dw") {
        $("#reg2").css("background", "url(http://r.syyx.com/events/p016/duowan.jpg) no-repeat 0 0 #11406C")
        $("#card_type").html("多玩专属礼包")
    }
    //以上为页面专用
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

    getjwplayer('http://v.nycs.syyx.com/nycs/flv/tibuflash_186x106_20120530.flv', 186, 105, "#video", "none");
    getflash('http://r.syyx.com/events/p016/flash_but.swf', 186, 105, "#flash_but_1")
    getflash('http://r.syyx.com/events/p016/flash_but.swf', 168, 98, "#flash_but_2")
    getflash('http://r.syyx.com/events/p016/prize.swf', 151, 74, "#prize")
    getflash('http://r.syyx.com/events/p016/reg.swf', 221, 72, "#swf")
    getflash('http://r.syyx.com/events/p016/reg2.swf', 221, 72, "#reg_but_hover")


    $("#to_reg").mouseover( function() {
        $("#reg_but_hover").css("visibility", "visible")
    })
    $("#to_reg").mouseout( function() {
        $("#reg_but_hover").css("visibility", "hidden")
    })
    $("#to_reg").click(function() {
        $("#reg1").css("display","none")
        $("#reg2").css("display","block")
        $(".download_btn").css("display","none")
    })

    $("#to_reg_3").click(function() {
        $("#reg1").css("display","none")
        $("#reg2").css("display","block")
        $(".download_btn").css("display","none")
    })

    $("#flash_active").click(function() {
        $("#flash_but_1").css("background", "#000000")
        video('http://v.nycs.syyx.com/nycs/flv/8big_640x360_20120807.flv', function() {
            $("#flash_but_1").removeAttr("style")
        })
    })

    function video(url ,cb) {
        $("#pop_flash_dialog").html("<div id=\"pop_flash\"></div>")
        getjwplayer(url, 640, 360, "#pop_flash") 
        $("#pop_flash_dialog").dialog({
            width       : 656,
            height      : 405,
            modal       : true,
            resizable   : false,
            dialogClass : "pop_video_detail",
            close       : function() {
                $("#pop_flash_dialog").html("");
                if(cb){
                    cb()
                }                    
            }
        });
    }

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
        if(i == 21) {
            $("#com_con").css("marginTop", "0")
            i = 1
        }
        $("#com_con").stop().animate({"marginTop" : -i * 112 +"px"}, 500, function() {
            setTimeout(function() {scroll_text( ++i )}, 4000)
        })
    }
    setTimeout(function(){
        scroll_text(1)
        for(var j = 0; j < 20 ; j++){
            if(j < 4){
                $("#com_con").append("<li>" + $("#com_con li").eq(j).html() + "</li>")
            } else {
                $("#com_con img").eq(j).attr("src", $("#com_con img").eq(j).attr("delay"))
                $("#com_con img").eq(j).removeAttr("delay")  
            }
        }
    }, 4000)


    function job_focus() {
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
            scr.animate({marginLeft : po - 0 + 235 + "px"},function() {
                delay(--k)

            })
        }) 
        $("#next").click(function() {
            var po = scr.css("marginLeft").replace("px","")
            if(po == -1410 || ok == false){
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
        $("#reg1").css("display","none")
        $("#reg2").css("display","block")
        $(".download_btn").css("display","none")
    })

    $("#close").click(function() {
        $("#reg1").css("display","block")
        $("#reg2").css("display","none")
        $(".download_btn").css("display","block")
        $(".reg_box").css("width", "")
        $("#reg2").css("height","361px")
        $("#reg2").css("height","")
    })


    function sc(){
        var top = $("body").scrollTop() || $("html").scrollTop()
        $(".reg_box").css("top", top + 100 + "px")
    }

    $(window).scroll(sc)

    function size(){
        c_left  = document.body.clientWidth
        if(c_left < 1000){
             $(".container").css("width", "1000px")
             return
        } else {
            $(".container").css("width", "")
        }
    }
    size()
    $(window).resize(size)


    $("a").attr("hidefocus", "true")

}()