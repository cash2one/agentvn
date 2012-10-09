
//dom_loaded-------------------------------------------------------------------------------------------
$(function(){
    get_data()

    global_setting()

    document.title ='游戏资料 -《诺亚传说》官方网站'
});
//-----------------------------------
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
    get_cross_domain_data(remote_server_url_list.get_map_npc, 'get_npc', { mid : get_url_parm() }, function(data){
        $.each(data, function(index, value){
            //添加页面最后的双table
            if(index == data.length-1) {
                if($.isArray(value.npclist)) {
                    var table_format = '<table><tr><th>名称</th><th>坐标</th></tr></table>'
                    if(value.npclist.length < 2) {
                        $('.map_table .clear').before(table_format)
                    }
                    else{
                        $('.map_table .clear').before(table_format + table_format)
                    }
                    $.each(value.npclist, function(index, value){
                        $('.map_table table:eq('+index%2+')').append('<tr><td>'
                            + value.Title
                            + '</td><td>'
                            + value.X
                            + ','
                            + value.Y
                            + '</td></tr>')
                    })
                }
                return
            }
            //添加地图怪物
            $('.lib_nav').append('<a href="'
                + remote_server_url_list.game_lib_map_npc
                + '?'
                + value.ID
                + '">'
                + value.Title
                + '</a>')
            //获取当前地图怪物信息
            if( value.ID == get_url_parm()){
                $('.lib_nav a:last').addClass('current')
                $('.map_title').html(value.Title)
                $('.map_des').html(value.Content)
                $('.map_img img').attr('src', 'http://att.syyx.com/xgame/gameinfo/' + value.Thumbnails)
                $('.map_btn a:eq(0)').attr('href',remote_server_url_list.game_lib_map_npc + '?' + value.ID)
                $('.map_btn a:eq(1)').attr('href',remote_server_url_list.game_lib_map_monster + '?' + value.ID)
                $('.map_btn a:eq(2)').attr('href',remote_server_url_list.game_lib_map_task + '?' + value.ID)
            }
        })

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