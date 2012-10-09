//--------------------------------------- config_flash_data ----------------------------------
var flash_data = {
    nav   : {
        div_id : 'flash_nav',
        url    : '/flash/indexFlash_top_20120525.swf',
        width  : 664,
        height : 62
    }
}
//dom_loaded-------------------------------------------------------------------------------------------
$(function(){
    get_data()

    global_setting()
    
});
//---------------------------
function get_data() {
    get_cross_domain_data(remote_server_url_list.get_data_class, 'get_data_class', { id : get_url_parm() }, function(data){
        $.each(data, function(index, value){
            if(index == data.length-1) {
                $('.lib_text').html(value.Content)
                $('.game_lib_detail h1').html(value.Title)
                 document.title =value.Title + '-《诺亚传说》官方网站'
            }
            else {
                $('.lib_nav').append('<a href="'
                    + remote_server_url_list.game_lib_info + '?' + value.RelatedID
                    + '">'
                    + value.Title
                    + '</a>')
                if( value.RelatedID == get_url_parm()) {
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
                location.href = 'http://nycs.syyx.com/game_lib.html' 
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
        return location.pathname.split('_')[1].split('.')[0]
    }
    
    var id = location.search.substring(1)
    if(id) {
        return id
    }
    else{
        return 2
    }
}