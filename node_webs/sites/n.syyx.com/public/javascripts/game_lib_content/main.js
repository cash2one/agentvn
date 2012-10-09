//dom_loaded-------------------------------------------------------------------------------------------
$(function(){
    get_data()

    global_setting()

    
});

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
//---------------------------
function get_data() {
    get_cross_domain_data(remote_server_url_list.get_goods_list, 'get_goods', { cid : get_url_parm() }, function(data){
        $.each(data, function(index, value){
            if(index == data.length-1) {
                $.each(value.goodlist, function(index1,value1) {
                    $('.lib_text table').append('<tr><td>'
                    + value1.Title
                    + '</td><td><img src="http://att.syyx.com/xgame/gameinfo/'
                    + value1.Thumbnails
                    + '"></td><td>'
                    + value1.Ranking
                    + '</td><td class="des">'
                    + value1.Content
                    + '</td></tr>')
                })
                $('.lib_text table tr:even').addClass('even')
                $('.lib_text table').show()
            }
            else {
                $('.lib_nav').append('<a href="'
                    + remote_server_url_list.game_lib_goods + '?' + value.ID
                    + '">'
                    + value.Title
                    + '</a>')
                if( value.ID == get_url_parm()) {
                    $('.game_lib_detail h1').html(value.Title)
                    $('.game_lib_detail .lib_nav a:last').addClass('current')
                }
            }
        })
    })
    // var game_lib_nav = [
    //     {
    //         title : '入门资料',
    //         list  : [
    //             {
    //                 link : 'http://att.syyx.com/XGame/StaticHtml/26.htm',
    //                 name : '游戏资料'
    //             },
    //             {
    //                 link : 'http://att.syyx.com/XGame/StaticHtml/26.htm',
    //                 name : '游戏资料'
    //             }
    //         ]
    //     },
    //     {
    //         title : '入门资料',
    //         list  : [
    //             {
    //                 link : 'http://att.syyx.com/XGame/StaticHtml/26.htm',
    //                 name : '游戏资料'
    //             },
    //             {
    //                 link : 'http://att.syyx.com/XGame/StaticHtml/26.htm',
    //                 name : '游戏资料'
    //             }
    //         ]
    //     }
    // ]
    get_cross_domain_data(remote_server_url_list.game_lib_nav, 'run_game_lib_nav', null, function(data){
        $.each(data, function(index, value) {
            //title
            $('#game_lib_nav ul').append('<li><a class="title" href="#">'
                + value.title
                + '</a><div class="lib_nav_content"></div><div class="arrow"></div></li>'
                )
            //list
            $.each(value.list, function(index1, value1) {
                $('.lib_nav_content:eq(' + index +')').append('<a target="_blank" href="'
                    + value1.link
                    + '">'
                    + value1.name
                    + '</a>')
            })
        })
        //set_game_lib_nav
        set_game_lib_nav()
    })
}

function get_cross_domain_data(remote_url,jsonp_callback,parms,cb) {
    $.ajax({
        data     : parms,
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
//---------------------------------------------------------------------------------------
function global_setting() {
    //去掉链接虚线
    $("a").attr("hideFocus", "true");
}
//-------------------------------------------
function set_game_lib_nav() {
    var nav_title    = $('#game_lib_nav li')

    //hover_event
    nav_title.hover(
        function(){
            nav_title.find('div').hide()
            $(this).find('div').show()
        },
        function(){
            nav_title.find('div').hide()
        }
    );

    //scroll_game_lib_nav
    $(window).scroll(function(){
        var scrolled_top = $(window).scrollTop()
        var game_lib_nav = $('#game_lib_nav')
        if(scrolled_top <= 550){
            game_lib_nav.css('top','550px')
        }
        else{
            game_lib_nav.css('top',(scrolled_top+20) + 'px')
        } 
    })
}

function get_url_parm() {
    //兼容旧地址
    if( location.pathname.indexOf('.shtml') > -1 ) {
        return location.pathname.split('_')[2].split('.')[0]
    }

    var id = location.search.substring(1)
    if(id) {
        return id
    }
    else{
        return 1
    }
}