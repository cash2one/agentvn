//-------------------------------------------------------------------------------------------------
var src_path = "http://r.syyx.com/party/nycs/dating/index2/"
var image_info = {}
//-------------------------------------------------------------------------------------------------
var init = function() {
    $("a").attr("hidefocus", "true")
    $("a.ignore").click(function(event) {
        event.preventDefault()
    })        

    init_flash()
    init_show_images()
    init_first()
    init_second()


    $("#close_third").click(function(event) {
        close_surface("#third")
        event.preventDefault()
    })
}
//-------------------------------------------------------------------------------------------------
var init_first = function() {
    var selected_job = null

    $("#join,#join_").click(function(event) {
        open_surface("#first")
    })

    $("#close_first").click(function(event) {
        close_surface("#first")
    })

    $("#first a.job").click(function(event) {
        $("#first a.job").removeClass("hover")
        $(this).addClass("hover")

        selected_job = $(this).attr("id")
    })

    $("#next_step").click(function(event) {
        var nickname = $("#first #nickname").val()

        if( !nickname ) {
            $("#first #tag2").html("请填写昵称") 
            return
        }

        if( !selected_job ) {
            $("#first #tag2").html("请选择头像") 
            return 
        }
         
        $("#first #tag2").html("")         
        jump_second(nickname, selected_job)
    })
}
//-------------------------------------------------------------------------------------------------
var jump_second = function(name, job) {
    var name_map = {
        gedoujia    : "格斗家",
        yinengzhe   : "异能者",
        qiangxieshi : "枪械师",
        jianwushi   : "剑武士"
    }

    $("#second #image img").attr("src", src_path + job + ".jpg")
    $("#second #tag").html(name)
    $("#third  #tag span").html(name_map[job])
    $("#third  img").attr("src", src_path + job + ".jpg")

    var lines = ["first_line", "second_line", "third_line", "fourth_line"]
    
    for(var i in lines) {
        var random_line = Math.floor(Math.random() * 10)
        $("#second #image ." + lines[i]).css("background-position", "0px " + -15*random_line + "px")
    
        image_info[lines[i]] = random_line
    }

    image_info.bg = job

    close_surface("#first")
    open_surface("#second")
}
//-------------------------------------------------------------------------------------------------
var init_second = function() {
    $("#second #tel").focus(function(event) {
        if($(this).val() == "请输入正确的手机号码") {
            $(this).val("")
        }
    })

    $("#close_second").click(function(event) {
        close_surface("#second")
    })

    $("#reset").click(function(event) {
        close_surface("#second")
        open_surface("#first")
    })

    $("#sina, #tencent").click(function(event) {
        var tel = $("#second #tel").val()

        if(/^1(([358]{1}[0-9]{1})|47)[0-9]{8}$/.test(tel) == false) {
            $("#second #tel").val("请输入正确的手机号码")
            return
        }

        var data = { nickname : $("#first #nickname").val(), tel : tel, image_info : image_info }
        $.get("/nycs/dating/add_record?r=" + Math.random(), data, function(data) {})

        var image_path = src_path + "images/" + image_info.bg  + "/" + image_info.first_line + image_info.second_line + image_info.third_line + image_info.fourth_line + ".png"
        share($(this).attr("id"), image_path)
        reset_input()

        close_surface("#second")
        open_surface("#third")
    })
}
//-------------------------------------------------------------------------------------------------
var reset_input = function() {
    $("#first #nickname").val("")
    $("#second #tel").val("")
    $("#first a.job").removeClass("hover")   
}
//-------------------------------------------------------------------------------------------------
var init_flash = function() {
    init_main_flash()

    get_flash_button(".flash_player", 126,70)
    var cur_index = 0
    replace_flash(cur_index)

    $("#prev_flash").click(function() {
        cur_index = (cur_index+1)%8
        replace_flash(cur_index)
    })

    $("#next_flash").click(function() {
        cur_index = (cur_index+8-1)%8
        replace_flash(cur_index)        
    })

    $("#dating_flash .flash_div").click(function() {
        var flv_src = $(this).attr("flv_src")
        play_flash(flv_src)
    })
}
//-------------------------------------------------------------------------------------------------
// get_page_size.client_width()  //当前浏览器可见区域宽度
// get_page_size.client_height() //当前浏览器可见区域高度
//-------------------------------------------------------------------------------------------------
var open_surface = function(id) {
    var tops = document.documentElement.scrollTop || document.body.scrollTop;
    $("#popup_bg").css({
        "width"   : get_page_size.page_width(),
        "height"  : get_page_size.page_height(),
        "display" : "block"
    })

    $(id).css("top", tops + 100)
    $(id).css("display", "block")    
}
//-------------------------------------------------------------------------------------------------
var close_surface = function(id) {
    $(id).css("display", "none")
    $("#popup_bg").css("display", "none")
}
//-------------------------------------------------------------------------------------------------
function get_flash_button(id, w, h) {
    var src = "http://r.syyx.com/events/p023/flash_but.swf"
    var object = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + w + '" height="' + h + '" ><param name="movie" value="' + src + '" /><!--[if !IE]>--><object type="application/x-shockwave-flash" data="' + src + '" width="' + w + '" height="' + h + '"><!--<![endif]--><param name="wmode" value="transparent" /><!--[if !IE]>--></object><!--<![endif]--></object>'
    $(id).html(object)
}
//-------------------------------------------------------------------------------------------------
function get_jwplayer(swf,w,h,id,position){
    if(!position){
        position = "over"
    }
    var object = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" hidefocus="true" id="mediaplayer" width="' + w + '" height="' + h + '" bgcolor="#000000" name="mediaplayer" tabindex="0"><param name="movie" value="http://v.nycs.syyx.com/jwplayer/player.swf"><!--[if !IE]>--><object type="application/x-shockwave-flash" hidefocus="true" data="http://v.nycs.syyx.com/jwplayer/player.swf" width="' + w + '" height="' + h + '"><!--<![endif]--><param name="allowfullscreen" value="true"><param name="seamlesstabbing" value="true"><param name="wmode" value="transparent" /><param name="flashvars" value="netstreambasepath='+document.location.href+'&id=mediaplayer&file='+swf+'&controlbar.position='+position+'&volume=41&autostart=true&repeat=SINGLE"><!--[if !IE]>--></object><!--<![endif]--></object>'
    $(id).html(object)
}
//-------------------------------------------------------------------------------------------------
function get_flash(swf, w, h, id) {
    var object = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + w + '" height="' + h + '" ><param name="movie" value="' + swf + '" /><param name="allowScriptAccess" value="always" /><!--[if !IE]>--><object type="application/x-shockwave-flash" data="' + swf + '" width="' + w + '" height="' + h + '"><param name="allowScriptAccess" value="always" /><!--<![endif]--><param name="wmode" value="transparent" /><!--[if !IE]>--></object><!--<![endif]--></object>'
    $(id).html(object)
}
//-------------------------------------------------------------------------------------------------
var play_flash = function(src) {
    $(document.body).append('<div id="pop_flash_dialog"><div id="pop_flash"></div></div>')
    get_jwplayer(src, 640, 355, "#pop_flash") 
    
    $("#pop_flash_dialog").dialog({
        width       : 656,
        height      : 405,
        modal       : true,
        resizable   : false,
        dialogClass : "pop_video_detail",
        close       : function() {
            $("#pop_flash_dialog").remove()
        }
    })    

    $("#jiangxi").click(function(){
        alert("good")
        $("#pop_flash_dialog").remove()
    })
}
//-------------------------------------------------------------------------------------------------
var init_main_flash = function() {
    var swf = "http://v.nycs.syyx.com/nycs/swf/29thzhengyou_1024X576_0924.swf"
    var flv_btn = "http://r.syyx.com/events/p023/flash_but.swf"
    get_flash(flv_btn, 129, 71, "#little_flash_player")
    get_flash(swf, 1024, 576, "#flash1")

    var bg_swf = "http://v.nycs.syyx.com/nycs/swf/29thzhengyouguangxiao_650X500_0927.swf"
    get_flash(bg_swf, 650, 500, "#bg_swf")

    $("#little_flash_div").click(function(event) {
        $("body").css("background-color", "black")
        $(".container").hide()
        get_flash(swf, 1024, 576, "#flash1")
        $("#main_flash").show()
    })
}
//-------------------------------------------------------------------------------------------------
var close = function() {
    $("body").css("background-color", "#0C0D0F")
    $("#flash1").html("")            
    $("#main_flash").hide()
    $(".container").show()
}
//-------------------------------------------------------------------------------------------------
var replace_flash = function(start) {
    var img_src = [
        src_path + "flv_img/flv_1.jpg",
        src_path + "flv_img/flv_2.jpg",
        src_path + "flv_img/flv_3.jpg",
        src_path + "flv_img/flv_4.jpg",
        src_path + "flv_img/flv_5.jpg",
        src_path + "flv_img/flv_6.jpg",
        src_path + "flv_img/flv_7.jpg",
        src_path + "flv_img/flv_8.jpg"
    ]

    var flv_src = [
        "http://v.nycs.syyx.com/nycs/flv/zhengyou01_640x360_0917.flv",
        "http://v.nycs.syyx.com/nycs/flv/zhengyou02_640x360_0917.flv",
        "http://v.nycs.syyx.com/nycs/flv/zhengyou03_640x360_0917.flv",
        "http://v.nycs.syyx.com/nycs/flv/zhengyou04_640x360_0917.flv",
        "http://v.nycs.syyx.com/nycs/flv/zhengyou05_640x360_0917.flv",
        "http://v.nycs.syyx.com/nycs/flv/zhengyou06_640x360_0917.flv",
        "http://v.nycs.syyx.com/nycs/flv/zhengyou07_640x360_0917.flv",
        "http://v.nycs.syyx.com/nycs/flv/zhengyou08_640x360_0917.flv"
    ]

    $("#dating_flash img").each(function(index) {
        $(this).attr("src", img_src[(index+start)%8])
    })    

    $("#dating_flash .flash_div").each(function(index) {
        $(this).attr("flv_src", flv_src[(index+start)%8])
    })   
}
//-------------------------------------------------------------------------------------------------
var get_show_images = function() {
    $("a.mini_img").removeClass("hover")
    
    $.get("/nycs/dating/get_show_images?r=" + Math.random(), function(data) {
        if(data == "-1"){
            return
        }
        show_image(data[0].image_info)

        $("a.mini_img").each(function(index) {
            if(!data[index]) {
                return
            }

            $(this).children("img").attr("src", src_path + data[index].image_info.bg + ".jpg")
            $(this).children(".nickname").html(data[index].nickname)

            $(this).off("mouseover").on("mouseover", function() {
                show_image(data[index].image_info)
            })
        
            $(this).off("click").on("click", function(event) {
                show_image(data[index].image_info)
                $("a.mini_img").removeClass("hover")
                $("a.mini_img").unbind("mouseover")
                $(this).addClass("hover")
                event.preventDefault()
            })
        })
    })
}
//-------------------------------------------------------------------------------------------------
var init_show_images = function() {
    get_show_images()
    $("#refresh_img").click(get_show_images)
}
//-------------------------------------------------------------------------------------------------
var show_image = function(image_info) {
    $("#cur_img img").attr("src", src_path + image_info.bg + ".jpg")

    for(var i in image_info) {
        if(i == "bg") {
            continue
        }

        var y_pos = -15 *  image_info[i]
        $("#cur_img ." + i).css("background-position", "0px " + y_pos + "px")
    }         
}
//-------------------------------------------------------------------------------------------------
var share = function(id, src){
    var title = encodeURIComponent("多亏了#蔡依林征友#！我今天才明白，原来我要找的人是TA！那么...你一直在找的人又是谁呢？直接点击了解详情：")

    if(id == "sina") {
        window.open('http://v.t.sina.com.cn/share/share.php?url=http://party.syyx.com/nycs/dating/index.html&title=' + title  + '&pic=' + src + '&ralateUid=1703998792&appkey=3783886085', 'newwindow', 'height=487,width=642,top=100,left=300,toolbar=no,menubar=no,status=no')
    }    
    else {
        window.open('http://share.v.t.qq.com/index.php?c=share&a=index&url=http://party.syyx.com/nycs/dating/index.html&title=' + title + '&pic=' + src + '&appkey=801152397', 'newwindow', 'height=487,width=642,top=100,left=300,toolbar=no,menubar=no,status=no')
    }
}
//-------------------------------------------------------------------------------------------------
init()