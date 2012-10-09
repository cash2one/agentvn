//--------------------------------------- config_flash_data ----------------------------------
var arr_arming = [3,4,1,5]
//dom_loaded-------------------------------------------------------------------------------------------
$(function(){
    var m_id = get_url_parm()
    if(m_id==1){
        // $('.game_lib_detail h1').html($(".lib_nav a").eq(2).html())
        // $(".lib_nav a").eq(2).addClass("current")
        get_curr_class(2)
    }
    else if(m_id==3){
        // $('.game_lib_detail h1').html($(".lib_nav a").eq(0).html())
        // $(".lib_nav a").eq(0).addClass("current")
        get_curr_class(0)
    }
    else if(m_id==4){
        // $('.game_lib_detail h1').html($(".lib_nav a").eq(1).html())
        // $(".lib_nav a").eq(1).addClass("current")
        get_curr_class(1)
    }
    else if(m_id==5){
        // $('.game_lib_detail h1').html($(".lib_nav a").eq(3).html())
        // $(".lib_nav a").eq(3).addClass("current")
        get_curr_class(3)
    }

    get_data()

    global_setting()

    get_curr_arming()

    get_arming_list(m_id)
});
//-------------------------------------
function get_curr_class(a_index){
    for(var i = 0; i < 4; i++){
        if( i == a_index ) {
            $('.game_lib_detail h1').html($(".lib_nav a").eq(i).html())
            $(".lib_nav a").eq(i).addClass("current")
        }
        else {
            $(".lib_nav a").eq(i).removeClass("current")
        }
    }    
}
//------------------------------------
function get_curr_arming(){
    $(".lib_nav a").eq(0).click(function(event) { 
        // $(this).addClass("current")
        // $('.game_lib_detail h1').html($(this).html())
        get_curr_class(0)
        get_arming_list(3)
        event.preventDefault()
    })

    $(".lib_nav a").eq(1).click(function(event) {
        get_curr_class(1)
        get_arming_list(4)
        event.preventDefault()
    })

    $(".lib_nav a").eq(2).click(function(event) {
        get_curr_class(2)
        get_arming_list(1)
        event.preventDefault()
    })

    $(".lib_nav a").eq(3).click(function(event) {
        get_curr_class(3)
        get_arming_list(5)
        event.preventDefault()
    })
}
//--------------------------------------
function get_arming_list(metierid){
    $.get(remote_server_url_list.get_armint_list + '?mid=' + metierid, function(html){
        $(".lib_text").html(html)
    }, "html")
}
//------------------------------------
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
    get_cross_domain_data(remote_server_url_list.game_lib_nav, 'run_game_lib_nav', null, function(data){
        $.each(data, function(index, value) {
            //title
            $('#game_lib_nav ul').append('<li><a class="title" href="#">'
                + value.title
                + '</a><div class="lib_nav_content"></div><div class="arrow"></div></li>'
                )
            //list
            $.each(value.list, function(index1, value1) {
                $('.lib_nav_content:eq(' + index +')').append('<a href="'
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
    var id = location.search.substring(1)
    if(id) {
        return id
    }
    else{
        return 1
    }
}