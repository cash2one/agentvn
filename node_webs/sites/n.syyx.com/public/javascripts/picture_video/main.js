//-----------------
var flash_data = {
    nav   : {
        div_id : 'flash_nav',
        url    : '/flash/indexFlash_top_20120525.swf',
        width  : 664,
        height : 62
    },
    fn_group : {
        div_id : 'flash_fn_group',
        url    : '/flash/indexFlash_button_20120525.swf',
        width  : 615,
        height : 172
    }
}
//dom_loaded-------------------------------------------------------------------------------------------
$(function(){
    
    get_data()

    global_setting()

    set_flash(flash_data)
     document.title = '视频图片站-《诺亚传说》官方网站-全新2012题材人气巨作，终极内测，震撼来袭！'
})

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
function get_data() {
    //推荐服务器
    get_cross_domain_data(remote_server_url_list.recommend_server,'run_recommend_server',function(data){
        $.each(data, function(index, value){
            $('#recommended_server .list').append('<span>' + value + '</span>' )
        })

        set_recommended_server()
    })
    //原画壁纸都是同一种格式
    // var screenshot = [
    //     {
    //         link : '#',
    //         src  : 'http://mat1.gtimg.com/www/iskin960/temp/bks.png',
    //         name : '必胜客欢乐餐厅'
    //     },
    //     {
    //         link : '#',
    //         src  : 'http://mat1.gtimg.com/www/iskin960/temp/bks.png',
    //         name : '必胜客欢乐餐厅'
    //     }
    // ]
    //游戏截图
    get_cross_domain_data(remote_server_url_list.screenshot,'run_screenshot',function(data){
        $.each(data, function(index, value){
            $('.screenshot').append('<div class="item"><a href="'
                + value.link
                + '"><img src="'
                + value.src
                + '"></a>'
                + value.name
                + '</div>')
        })
    })
    //游戏原画壁纸
    get_cross_domain_data(remote_server_url_list.wallpaper,'run_wall_paper',function(data){
        $.each(data, function(index, value){
            $('.wallpaper').append('<div class="item"><a href="'
                + value.link
                + '"><img src="'
                + value.src
                + '"></a>'
                + value.name
                + '</div>')
        })
    })

    //漫画
    get_cross_domain_data(remote_server_url_list.cartoon,'run_cartoon',function(data){
        $.each(data, function(index, value){
            $('.cartoon').append('<div class="item"><a href="'
                + value.link
                + '"><img src="'
                + value.src
                + '"></a>'
                + value.name
                + '</div>')
        })
    })
    //游戏视频
    // var video = [
    //     {
    //         link  : '#',
    //         src   : 'http://img1.gtimg.com/news/pics/hv1/233/114/1036/67395203.jpg',
    //         title : '幸福在路上',
    //         des   : '一大堆描述描述描述'
    //     },
    //     {
    //         link  : '#',
    //         src   : 'http://img1.gtimg.com/news/pics/hv1/233/114/1036/67395203.jpg',
    //         title : '幸福在路上',
    //         des   : '一大堆描述描述描述'
    //     }
    // ]
    get_cross_domain_data(remote_server_url_list.video,'run_video',function(data){
        $.each(data, function(index, value){
                var video_id = parseInt(index) + 1
                $('#video' + video_id + ' a').attr('href',value.link)
                $('#video' + video_id + ' img').attr('src',value.src)
                $('#video' + video_id + ' h3').html(value.title)
                $('#video' + video_id + ' .des').html(value.des)
        })
    })
}

//---------------------------------------------------------------------------------------
function global_setting() {
    //去掉链接虚线
    $("a").attr("hideFocus", "true");
}

function get_cross_domain_data(remote_url,jsonp_callback,cb) {
    $.ajax({
        dataType : 'jsonp',
        jsonpCallback : jsonp_callback,
        url      : remote_url,
        success  : function(data){
            if($.isEmptyObject(data)){
                return
            }

            cb(data)
        }
    })
}
//-----------------------------------
//scroll recommend --------------------------------------------------------------------------------------------------
function set_recommended_server(){
    var server_container = $('#recommended_server')
    var server_group     = $('#recommended_server span')
    var inline_count     = 2
    var server_count     = server_group.length
    var visible_height   = server_container.height()
    var server_width     = server_group.width()
    var scoll_timeout    = 5000
    var speed            = 1000

    init_position()

    server_container.show()

    if(server_count <= inline_count){
        return
    }

    setInterval(function(){
        move()
    },scoll_timeout)

    function init_position(){
        
        server_group.each(function(){
            var server_index = $(this).index()
            $(this).css({
                left : (server_index % inline_count * server_width) + 'px',
                top  : (Math.floor(server_index/inline_count) * visible_height) + 'px'
            })
        })
    }

    function move(){
        server_group.each(function(){
            $(this).animate({
                top : '-=' + visible_height
            },speed,function(){
                if($(this).position().top == -visible_height){
                    $(this).css('top', ((Math.ceil(server_count/inline_count)-1)*visible_height) +'px')
                }
            })
        })
    }
}