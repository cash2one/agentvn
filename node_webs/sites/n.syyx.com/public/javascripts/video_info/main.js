//------------------------video_info----------------------------------------
//-----------------
var flash_data = {
    nav   : {
        div_id : 'flash_nav',
        url    : '/flash/indexFlash_top_20120525.swf',
        width  : 664,
        height : 62
    }
}

var loading = false
//dom_loaded
$(function(){
    document.title = '视频站-《诺亚传说》官方网站'
    //--------------------------------------------------------------
    set_flash(flash_data)

    get_data()

    switch_video_type()

    global_setting()
})
//-------------------------------------------------------
//---------------------------------------------------------------------------------------
function global_setting() {
    //去掉链接虚线
    $("a").attr("hideFocus", "true");
}
//---------------------------
function get_data () {
    //取得列表
    get_cross_domain_data(remote_server_url_list.get_hot_video, { page : 1 })

    //取得播放视频
    get_video(remote_server_url_list.get_video_info, get_video_id())
}

function switch_video_type() {
    $('#switch a').click(function(event) {
        //清空高亮class
        $('#switch').attr('class','')
        //取得视频类型
        var type = $(this).attr('href').substring(1)
        //获取该类型的第一页数据
        get_cross_domain_data(remote_server_url_list[type], { page : 1 })
        //高亮该类型
        var highlight_class = $(this).attr('id')
        $('#switch').addClass(highlight_class)

        event.preventDefault()
    })
}

function set_flash(flash_data) {
    var params = { wmode : "transparent" };

    for (var key in flash_data) {
        var div_id = flash_data[key].div_id
        var url    = flash_data[key].url
        var width  = flash_data[key].width
        var height = flash_data[key].height

        swfobject.embedSWF(url, div_id, width, height, "9", null, null, params);
    }
}
function get_cross_domain_data(remote_url, parms) {
    loading = true
    $.ajax({
        dataType : 'jsonp',
        data     : parms,
        url      : remote_url,
        success  : function(data){
            if($.isEmptyObject(data)){
                return
            }

            $('#list ul').empty()
            $.each(data.video, function (key, value) {
                $('#list ul').append('<li><a rel="'
                    + value.id
                    +'" name="'
                    + value.SmallPic
                    + '" title="' 
                    + value.Title 
                    + '" href="'
                    + value.Links
                    + '"><img src="'
                    + value.SmallPic
                    + '"></a><span>'
                    + value.Title
                    + '</span></li>'
                    )
            })
            loading = false
            bind_change_video()
            set_roll_page(parms.page, data.all_page, remote_url)
        }
    })
}

function get_video(remote_url, parms, cb) {
    $.ajax({
        dataType : 'jsonp',
        data     : parms,
        url      : remote_url,
        success  : function(data){
            if($.isEmptyObject(data)){
                return
            }
            $('#title').html('正在播放：' + data.Title)
            getjwplayer(data.Links, 636, 356, '#play', data.SmallPic)
        }
    })
}

function set_roll_page(current, total, remote_url) {
    //页数为1，不显示翻页控件
    if(total == 1) {
        $('#dispaly_page_num').hide()
        return
    }

    $('#dispaly_page_num').show()
    $('#dispaly_page_num span').empty()
    //要显示的page_num存在一个数组中，存哪些页面，用一个算法来算(可改进)
    var display_page = [current]

    var range = 2

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
                + '" class="current" href="#">'
                + value 
                + '</a>')
            return
        }
        $('#dispaly_page_num span').append('<a href="#" name="'
            + value
            + '">'
            + value 
            + '</a>')
    })

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

    //bind
    $('#dispaly_page_num a').click(function(event){
        event.preventDefault()
        if(loading) {
            return
        }
        var target_page = $(this).attr('name')
        get_cross_domain_data(remote_url, { page : parseInt(target_page) })
    }) 

    $('#dispaly_page_num select').change(function(){
        if(loading) {
            return
        }
        var target_page = $(this).val()
        get_cross_domain_data(remote_url, { page : parseInt(target_page) })
    })
}

//-----------------实用工具函数--------------------------------------------------------------------
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
//取得video的id
function get_video_id() {
    var param
    if (location.hash) {
        param = { id : location.hash.substring(1) }
    } else {
        param = null
    }

    return param
}
//change_video 绑定
function bind_change_video() {
    $('#list a').click(function(event){
        var flv_link = $(this).attr('href')
        var title    = $(this).attr('title')
        var id       = $(this).attr('rel')
        var img      = $(this).attr('name')
        $('#title').html('正在播放：' + title)
        getjwplayer(flv_link, 636, 356, '#play', img)
        location.hash = id
        event.preventDefault()
    })
}