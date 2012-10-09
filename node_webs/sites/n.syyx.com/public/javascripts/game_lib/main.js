//dom_loaded-------------------------------------------------------------------------------------------
$(function(){
    get_data()

    global_setting()
    //set_tabs
    set_tabs()

    search_game_lib()

    document.title ='游戏资料首页-《诺亚传说》官方网站'
});

//---------------------------
function get_data() {
    // var game_lib_recommend = [
    //     {
    //         link : 'http://att.syyx.com/XGame/StaticHtml/26.htm',
    //         src  : 'http://img4.cache.netease.com/cnews/2012/5/10/201205100937076a384.jpg'
    //     },
    //     {
    //         link : 'http://att.syyx.com/XGame/StaticHtml/26.htm',
    //         src  : 'http://img4.cache.netease.com/cnews/2012/5/10/201205100937076a384.jpg'
    //     },
    //     {
    //         link : 'http://att.syyx.com/XGame/StaticHtml/26.htm',
    //         src  : 'http://img4.cache.netease.com/cnews/2012/5/10/201205100937076a384.jpg'
    //     },
    //     {
    //         link : 'http://att.syyx.com/XGame/StaticHtml/26.htm',
    //         src  : 'http://img4.cache.netease.com/cnews/2012/5/10/201205100937076a384.jpg'
    //     },
    //     {
    //         link : 'http://att.syyx.com/XGame/StaticHtml/26.htm',
    //         src  : 'http://img4.cache.netease.com/cnews/2012/5/10/201205100937076a384.jpg'
    //     }
    // ]
    get_cross_domain_data(remote_server_url_list.game_lib_gameplay, 'recommend_gameplay', function(data){
        $.each(data, function(index, value) {
            $('.recommend_gameplay').append('<a href="'
                + value.link
                + '"><img src="'
                + value.src
                + '"></a>')
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
    get_cross_domain_data(remote_server_url_list.game_lib_nav, 'run_game_lib_nav', function(data){
        $.each(data, function(index, value) {
            //title
            $('.lib_border').append('<div class="title"><span>'
                + value.title
                + '</span></div><div class="lib_list"></div>'
                )

            $('#game_lib_nav ul').append('<li><a class="title" href="#">'
                + value.title
                + '</a><div class="lib_nav_content"></div><div class="arrow"></div></li>'
                )
            //list
            $.each(value.list, function(index1, value1) {
                $('.lib_list:eq(' + index +')').append('<a target="_blank" href="'
                    + value1.link
                    + '">'
                    + value1.name
                    + '</a>')

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
//---------------------------------------------------------------------------------------
function global_setting() {
    //去掉链接虚线
    $("a").attr("hideFocus", "true");
}
//-------------------------------------------
function set_tabs(){
    //幻灯片tabs
    $('#role_info').tabs()
}

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
        if(scrolled_top <= 552){
            game_lib_nav.css('top','552px')
        }
        else{
            game_lib_nav.css('top',(scrolled_top+20) + 'px')
        } 
    })
}

function search_game_lib() {
    $('.search_content input').val('')
    
    $('.search_content input').keypress(function(event){
        if(event.which == 13) {
            begin_search()
        }
    })

    $('.search_content a').click(function(event){
        begin_search()
        event.preventDefault()
    })

    function begin_search() {
        var keyword = $('.search_content input').val()
        if($.trim(keyword) == "") {
            alert('请输入关键字')
            return
        }
        location.href = remote_server_url_list.serach_game_lib + '?' + encodeURIComponent(keyword)
    }
}