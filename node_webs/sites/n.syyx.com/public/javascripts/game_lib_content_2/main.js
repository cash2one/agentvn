//dom_loaded-------------------------------------------------------------------------------------------
$(function(){
    get_data()

    global_setting()

    document.title ='游戏资料 -《诺亚传说》官方网站'
})
//-------------------------------------------------
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
    get_cross_domain_data(remote_server_url_list.get_task_class, 'get_task_class', null, function(data){
        var parms = get_url_parm()
        $.each(data, function(index, value){
            $('.lib_nav').append('<a href="#sub_nav'
                + value.ID
                + '">'
                + value.Title
                + '</a>')
            if( value.ID == parms[0]){
                $('.lib_nav a:last').addClass('current')
            }

            $('.lib_sub_nav').append('<div id="sub_nav'
                + value.ID
                + '"></div>')
            $.each(value.list, function(index1, value1){
                $('#sub_nav' + value.ID).append('<a href="'
                    + remote_server_url_list.game_lib_task
                    + '?'
                    + value1.ParentID
                    + '&'
                    + value1.ID
                    + '">'
                    + value1.Title
                    + '</a>')
                if( value1.IsUrl == 'False') {
                    $('#sub_nav' + value.ID + ' a:last').attr('name','table')
                }
                if( value1.ID == parms[1]){
                    $('#sub_nav' + value.ID + ' a:last').addClass('current')
                    $('#sub_nav' + value.ID).show()
                    var content_type = $('#sub_nav' + value.ID + ' a:last').attr('name')
                    get_task_content(content_type,value1.ID)
                }
            })
        })
        tab_task_class()
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

function tab_task_class() {
    $('.lib_nav a').mouseover(function(){
        $(this).siblings().removeClass('current')
        $(this).addClass('current')
        var target_dom_id = $(this).attr('href').substring(1)
        $('.lib_sub_nav div').hide()
        $('#' + target_dom_id).show()
    })

    $('.lib_nav a').click(function(event){
        event.preventDefault()
    })
}

function get_url_parm() {
    //兼容旧地址
    if( location.pathname.indexOf('.shtml') > -1 ) {
        var old_group = []
        old_group.push(location.pathname.split('_')[1])
        old_group.push(location.pathname.split('_')[2])
        return old_group
    }
    
    var parms     = location.search.split('&')
    var parent_id = parms[0].substring(1)
    var id        = parms[1]
    var group     = []
    group.push(parent_id)
    group.push(id)
    if( group.length < 2){
        return [1,1]
    }
    else{
        return group    
    }
}

function get_task_content(type,task_id) {
    if(type == 'table') {
        get_cross_domain_data(remote_server_url_list.get_task_list, 'run_task_list', {cid : task_id}, function(data){
            $('.lib_text').html('<table class="task_table"><tr><th>任务名称</th><th>开始地点</th><th>开始NPC</th><th>任务奖励</th></tr></table>')
            $.each(data, function(index,value){
                $('table.task_table').append('<tr><td>'
                    + value.Title
                    + '</td><td>'
                    + value.Map
                    + '</td><td>'
                    + value.BeginNpc
                    + '</td><td>'
                    + value.Reward
                    + '</td></tr>')
            })
            $('table.task_table tr:even').addClass('even')
        })
    }
    else{
        get_cross_domain_data(remote_server_url_list.get_task_info, 'run_task_info', {id : task_id}, function(data){
            $('.lib_text').append(data.Content)
        })
    }
}