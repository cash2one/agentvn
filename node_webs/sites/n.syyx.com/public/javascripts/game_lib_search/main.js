//dom_loaded-------------------------------------------------------------------------------------------
$(function(){
    get_data()

    global_setting()

    document.title ='游戏资料 -《诺亚传说》官方网站'
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
    get_cross_domain_data(remote_server_url_list.get_serach_game_lib, 'get_game_lib_search', { k : decodeURIComponent(get_url_parm()) }, function(data){
        $.each(data, function(index, value){
            if(!$.isArray(value)) {
                return
            }
            switch(index) {
                case 0 :
                    $('.result_nav a:eq(0)').append('(' + value.length + ')').show()
                    $.each(value, function(index1, value1){
                        $('#renwu table').append('<tr><td><a target="_blank" href="'
                            + remote_server_url_list.game_lib_task
                            + '?' + value1.ParentID + '&' + value1.ClassID
                            + '">'
                            + value1.Title
                            + '</a></td><td>'
                            + value1.Introduction
                            + '</td></tr>')
                    })
                    break
                case 1 :
                    $('.result_nav a:eq(1)').append('(' + value.length + ')').show()
                    $.each(value, function(index1, value1){
                        $('#zhuangbei table').append('<tr><td><img src="http://att.syyx.com/xgame/gameinfo/'
                            + value1.Thumbnails
                            + '"></td><td>'
                            + value1.Title
                            + '</td><td>'
                            + value1.Ranking
                            + '</td><td>'
                            + value1.Content
                            + '</td></tr>')
                    })
                    break
                case 2 :
                    $('.result_nav a:eq(2)').append('(' + value.length + ')').show()
                    $.each(value, function(index1, value1){
                        $('#jineng table').append('<tr><td><img src="http://att.syyx.com/xgame/gameinfo/'
                            + value1.Thumbnails
                            + '"></td><td>'
                            + value1.Title
                            + '</td><td>'
                            + value1.MaxRanking
                            + '</td><td>'
                            + value1.Ranking
                            + '</td><td>'
                            + value1.Content
                            + '</td></tr>')
                    })
                    break
                case 3 :
                    $('.result_nav a:eq(3)').append('(' + value.length + ')').show()
                    $.each(value, function(index1, value1){
                        $('#wupin table').append('<tr><td><img src="http://att.syyx.com/xgame/gameinfo/'
                            + value1.Thumbnails
                            + '"></td><td>'
                            + value1.Title
                            + '</td><td>'
                            + value1.Content
                            + '</td></tr>')
                    })
                    break
                case 4 :
                    $('.result_nav a:eq(4)').append('(' + value.length + ')').show()
                    $.each(value, function(index1, value1){
                        $('#ditu table').append('<tr><td>'
                            + value1.Title
                            + '</td><td>'
                            + value1.Content
                            + '</td></tr>')
                    })
                    break
                case 5 :
                    $('.result_nav a:eq(5)').append('(' + value.length + ')').show()
                    $.each(value, function(index1, value1){
                        $('#guaiwu table').append('<tr><td><img src="http://att.syyx.com/xgame/gameinfo/'
                            + value1.Thumbnails
                            + '"></td><td>'
                            + value1.Title
                            + '</td><td>'
                            + value1.MaxRanking
                            + '</td><td>'
                            + value1.Content
                            + '</td></tr>')
                    })
                    break
                case 6 :
                    $('.result_nav a:eq(6)').append('(' + value.length + ')').show()
                    $.each(value, function(index1, value1){
                        $('#qita table').append('<tr><td><a target="_blank" href="'
                            + remote_server_url_list.game_lib_info
                            + '?'
                            + value1.ID
                            + '">'
                            + value1.Title
                            + '</a></td><td>'
                            + value1.Introduction
                            + '</td></tr>')
                    })
                    break
            }
        })

        var fist_show_table = $('.result_nav a:visible:first').addClass('current').attr('href')
        $(fist_show_table + ' table').show()

        $('.result_nav a').click(function(event){
            $(this).siblings().removeClass('current')
            $(this).addClass('current')
            var target_table = $(this).attr('href')
            $('.result_area table').hide()
            $(target_table + ' table').show()
            event.preventDefault()
        })

    },function(){
        $('.result_nav').html('很抱歉！没有搜索到您需要的资料。')
    })

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

function get_cross_domain_data(remote_url,jsonp_callback,parms,cb,blank) {
    $.ajax({
        data     : parms,
        dataType : 'jsonp',
        jsonpCallback : jsonp_callback,
        url      : remote_url,
        success  : function(data){
            if($.isEmptyObject(data)){
                if(blank) {
                    blank()
                }
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
    var keyword = location.search.substring(1)
    if(keyword) {
        $('#keyword_tip').html(decodeURIComponent(keyword))
        return keyword
    }
    else{
        return '新手入门'
    }
}