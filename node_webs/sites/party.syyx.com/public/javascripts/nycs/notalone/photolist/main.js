
new PCAS("province", "city", "area", "广东省", "深圳市", "南山区")

function set_roll_page(current, total, remote_url) {
    //页数为1，不显示翻页控件
    if(total == 1) {
        $('#dispaly_page_num').hide()
        return
    }
    $('#dispaly_page_num').show()
    $('#dispaly_page_num span').empty()

    $('#dispaly_page_num span').append('<a name="1" href="javascript:undefined">首页</a>&nbsp;<<&nbsp;&nbsp;')
    if(current==1){
        $('#dispaly_page_num span').append('<a href="javascript:undefined" class="noclick">上一页</a>')
    }
    else{
        $('#dispaly_page_num span').append('<a class="prev" href="javascript:undefined">上一页</a>')
    }

    
    //要显示的page_num存在一个数组中，存哪些页面，用一个算法来算(可改进)
    var display_page = [current]

    var range = 4

    while(range > 0) {
        if( current - range > 0 ) {
            display_page.push(current - range)
        }

        if( current + range <= total ) {
            display_page.push(current + range)
        }

        range -- 
    }

    display_page.sort(compare)

    //把显示的page_num显示到页面上-----------------
    $.each(display_page, function(key, value) {
        if( value == current) {
            $('#dispaly_page_num span').append('<a name="'
                + value
                + '" class="current" href="javascript:undefined">'
                + value 
                + '</a>')
            return
        }
        $('#dispaly_page_num span').append('<a href="javascript:undefined" name="'
            + value
            + '">'
            + value 
            + '</a>')
    })

    if(current == total){
        $('#dispaly_page_num span').append('<a href="javascript:undefined" class="noclick">下一页</a>')
    }
    else{
        $('#dispaly_page_num span').append('<a href="javascript:undefined" class="next">下一页</a>')
    }

    $('#dispaly_page_num span').append('&nbsp;>>&nbsp;&nbsp;<a href="javascript:undefined" class="last">末页</a>')

    //加上首页尾页上一页下一页和转到select-----------------------------

    //尾页
    $('#dispaly_page_num a.last').attr('name',total)
    //上一页
    if (current - 1 > 0) {
        $('#dispaly_page_num a.prev').attr('name',current - 1)
    }
    //下一页
    if (current + 1 <= total) {
        $('#dispaly_page_num a.next').attr('name',current + 1)
    }
    //select
    $('#dispaly_page_num select').empty()
    for(var i = 1; i <= total; i++ ) {
        if (i == current ) {
            $('#dispaly_page_num select').append('<option value="' + i + '" selected>' + i + '</option>')
            continue
        }

        $('#dispaly_page_num select').append('<option value="' + i + '">' + i + '</option>')
    }

    $('#dispaly_page_num a').click(function(event){
        event.preventDefault()
        var target_page = $(this).attr('name')
        if(target_page){
            get_photolist({ page : parseInt(target_page) })
        }
    }) 
}
 
function get_photolist(position){
    var _pagesize = 8
    var arg = {
        RoleType : $("#roletype").val(),
        Province : $("#province").val(),
        City     : $("#city").val(),
        Page     : position.page,
        PageSize : _pagesize
    }

    $.ajax({
        url     :   "/nycs/notalone/get_photolist",
        data    :   arg,
        dataType:   "json",
        type    :   "GET",
        success: function(data) {
            if(data.count != 0 && data.rows.length > 0){
                //显示图片列表
                photolist(data.rows)
            }
            else{
                photolist('')
            }
            var totalpages = 0
            if (data.count % _pagesize == 0)
            {
                totalpages = data.count / _pagesize;
            }
            else
            {
                totalpages = data.count /_pagesize + 1;
            }
            set_roll_page(position.page, totalpages, "")
        }
    })
}

function photolist(rows){
    var str = ""
    var from = ""
    for(var r in rows){
        str += '<div class="imgbox"><div class="roleimg">'
        from = "【来自"
        if(rows[r].Province != "亚洲" && rows[r].Province != "非洲" && rows[r].Province != "欧洲" && rows[r].Province != "美洲" && rows[r].Province != "大洋洲"){
            from += rows[r].Province + "-"
        }
        from += rows[r].City
        if(from.length>=15){
            from = from.substring(0, 14) + ".."
        }
        from += '】<br>'+ rows[r].NickName
        str +='<a rev="'+ from + '<br />'+ rows[r].Content.substring(0,40) +'" href="http://r.syyx.com'+ rows[r].UserPic +'"><img src="http://r.syyx.com'+ rows[r].UserPicSmall +'"></a></div>'
        str += from + '</div>'
    }

    $(".imglist").html(str)
    $('.imglist a').lightBox()
}

    //bind
$(function(){
    get_photolist({ page : 1 })
    $('#dispaly_page_num select').change(function(){
        var target_page = $(this).val()
        get_photolist({ page : parseInt(target_page) })
    })

    $('#roletype').change(function(){
        get_photolist({ page : 1 })
    })

    $('#province').change(function(){
        get_photolist({ page : 1 })
    })

    $('#city').change(function(){
        get_photolist({ page : 1 })
    })

    $("#login").click(function() {
        var tops = document.documentElement.scrollTop || document.body.scrollTop;
        //document.domain = "syyx.com";
        if(!$("#iframe").attr("src")){
            $("#iframe").attr("src", "/nycs/notalone/uploadphoto.html")
        }
        $("#roletype").css("display", "none")
        $("#province").css("display", "none")
        $("#city").css("display", "none")
        $("#popup_bg").css("display", "block")
        $("#div_login").css("top", tops + 80)
        $("#div_login").css("display", "block")
        //$("#div_login").fadeIn("fast")
    })

    $(".div_close").click(login_close)

    get_iframe_src()
})

function login_close() {
    $("#div_login").css("display", "none")
    //$("#div_login").fadeOut("fast");
    $("#popup_bg").css("display", "none")
    $("#roletype").css("display", "inline")
    $("#province").css("display", "inline")
    $("#city").css("display", "inline")
}

//数组排序函数
function compare( value1, value2) {
    if (value1 < value2 ) {
        return -1
    } else if ( value1 > value2 ) {
        return 1
    } else {
        return 0
    }
}
//利用播放器来播放视频
function getjwplayer(swf,w,h,id,img,position){
    if(!position){
        position = "over"
    }
    var object = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" hidefocus="true" id="mediaplayer" width="' + w + '" height="' + h + '" bgcolor="#000000" name="mediaplayer" tabindex="0"><param name="movie" value="http://v.nycs.syyx.com/jwplayer/player.swf"><!--[if !IE]>--><object type="application/x-shockwave-flash" hidefocus="true" data="http://v.nycs.syyx.com/jwplayer/player.swf" width="' + w + '" height="' + h + '"><!--<![endif]--><param name="allowfullscreen" value="true"><param name="seamlesstabbing" value="true"><param name="wmode" value="transparent" /><param name="flashvars" value="netstreambasepath='+document.location.href+'&id=mediaplayer&file='+swf + '&image=' + img +'&controlbar.position='+position+'&volume=41&autostart=true&repeat=SINGLE"><!--[if !IE]>--></object><!--<![endif]--></object>'
    $(id).html(object)
}


function get_iframe_src(){
    $("#iframe").attr("src", "/nycs/notalone/login.html")
    $.get("/check_user_login?r=" + Math.random(),{a:Math.random()} , function(data) {

        if(!data.login){

            $("#iframe").attr("src","/nycs/notalone/login.html")
        }
        else{
            $.get("/nycs/notalone/get_info?r=" + Math.random(),{a:Math.random()} , function(rows) {
                if(rows.length > 0){
                    $("#iframe").attr("src","/nycs/notalone/uploadsuccess.html")
                }
                else{
                    $("#iframe").attr("src","/nycs/notalone/uploadphoto.html")
                }
            }, "json")
        }
    }, "json")
}