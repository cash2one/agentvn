//dom_loaded-------------------------------------------------------------------------------------------
$(function(){
    //get_data
    get_data()
    //setting
    global_setting()
    //set_flash
    //set_flash(flash_data)

    upload_artical()

    get_vote()

    set_vote()

    document.title = '玩家中心-《诺亚传说》官方网站'

});
//---------------------------------------------------------------------------------
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

function get_artical(remote_url, params, cb) {
    $.ajax({
        dataType : 'jsonp',
        data     : params,
        url      : remote_url,
        success  : function(data){
            if($.isEmptyObject(data)){
                return
            }

            cb(data)
        }
    })
}
//------------------------------------------------------------------------------------------
function get_data() {
    //推荐服务器
    get_cross_domain_data(remote_server_url_list.recommend_server,'run_recommend_server',function(data){
        $.each(data, function(index, value){
            $('#recommended_server .list').append('<span>' + value + '</span>' )
        })

        set_recommended_server()
    })

    //名人堂
    get_artical(remote_server_url_list.user_center_data, { classid : 1, pagesize : 7}, function(data) {
        $.each(data.articlelist, function(index, value) {
            if( index == 0 ) {
                $('#interview a.interview_img,#interview a.view_all_top_artical').attr('href', value.Url)
                $('#interview a.interview_img img').attr('src', value.PicPath)
                $('#interview a.title').html(value.Title)
                $('#interview a.title').attr('href', value.Url)
                $('#interview a.top_artical').html(value.Content)
                $('#interview a.top_artical').attr('href', value.Url)
            } else {
                $('#interview ul.interview_list').append('<li><a target="_blank" href="'
                    + value.Url
                    + '">【专访】'
                    + value.Title
                    + '</a></li>')
            }
        })
    })

    //军团战记
    get_artical(remote_server_url_list.user_center_data, { classid : 4, pagesize : 3}, function(data) {
        $.each(data.articlelist, function(index, value) {
                $('#war_record').append('<div class="record_info"><a class="record_img" target="_blank" href="'
                    + value.Url
                    + '"><img src="'
                    + value.PicPath
                    + '"></a><div class="record_artical"><h3><a href="'
                    + value.Url
                    + '" target="_blank">'
                    + value.Title
                    + '</a></h3><p><a href="'
                    + value.Url
                    + '" target="_blank">'
                    + value.Content
                    + '</a></p></div></div>')
        })
    })

    //玩家风采
    get_artical(remote_server_url_list.user_center_data, { classid : 5, pagesize : 6}, function(data) {
        $.each(data.articlelist, function(index, value) {
            $('#user_interview .user_pics').append('<a target="_blank" href="'
                + value.Url
                + '"><img src="'
                + value.PicPath
                + '"><div class="text_bg"></div><div class="text">'
                + value.Title
                +'</div></a>')
        })

        $('#user_interview .user_pics a').each(function(index, value) {
            switch(index) {
                case 1 :
                    $(this).addClass('second')
                    break
                case 2 :
                    $(this).addClass('third')
                    break
                case 3 :
                    $(this).addClass('fouth')
                    break
                case 4 :
                    $(this).addClass('five')
                    break
                case 5 :
                    $(this).addClass('six')
                    break
            }
        })
    })

    //心情攻略
    get_artical(remote_server_url_list.user_center_data2, null, function(data) {
        $.each(data.articlelist, function(index, value) {
                if(index < 2) {
                    $('#emotion_artical .user_pics a:eq(' + index +')').attr('href',value.Url)
                    $('#emotion_artical .user_pics a:eq(' + index +') img').attr('src',value.PicPath)
                    $('#emotion_artical .user_pics a:eq(' + index +') .text').html(value.Title)
                }
                else {
                    $('#emotion_artical ul.user_article').append('<li><a target="_blank" href="'
                    + value.Url
                    + '">【'
                    + checktype(value.ClassID)
                    + '】'
                    + value.Title
                    + '</a><span>'
                    + value.AddTime.split('&nbsp;')[0].substring(5)
                    + '</span></li>')
                }
        })

        function checktype(classid) {
            var result = '攻略'
            if( classid == 2) {
                result = '心情'
            }

            return result
        }
    })
}
//---------------------------------------------------------------------------------------
function global_setting() {
    //去掉链接虚线
    $("a").attr("hideFocus", "true");
}

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
//-----------------------------------------------------------------------------------------------

//--------------------------------------- config_flash_data ----------------------------------
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
//---------------------------------------------------------------------------------------
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
//-----------------------------------------------------------------------------------------------------------------------

function upload_artical() {
    $("a.join_btn").click(function() {
        $.ajax({
            dataType : 'jsonp',
            url      : remote_server_url_list.check_login,
            success  : function(data){
                    if(data=='1') {
                        $("#div_dialog").html("<iframe scrolling=\"no\" height=\"370\" width=\"595\" id=\"externalIframe\" frameborder=\"no\" border=\"0\" src=\"http://nycs.syyx.com/UserCenter/Submit.aspx\"/>");
                        $("#div_dialog").dialog({
                            dialogClass: 'dialog_upload',
                            width: 610,
                            height: 450,
                            modal: true,
                            close: function() { location.href = location.href}
                        })
                    }
                    else{
                        $("#div_dialog").html("<iframe scrolling=\"no\" height=\"205\" width=\"400\" id=\"externalIframe\" frameborder=\"no\" border=\"0\" src=\"http://nycs.syyx.com/login_new.aspx\"/>");
                        $("#div_dialog").dialog({
                            dialogClass: 'dialog_login',
                            width: 525,
                            height: 325,
                            modal: true,
                            close: function() { location.href = location.href}
                        })
                    }
                }
        })
        return false;
    });
}

var vote_loading = false

function get_vote() {
    vote_loading = true
    $.ajax({
        dataType : 'jsonp',
        url      : remote_server_url_list.get_user_vote,
        success  : function(data){
            if($.isEmptyObject(data)){
                $('#emotion span').html('0%')
                vote_loading = false   
                return
            }

            var total = 0

            $.each(data[0], function(index, value) {
                if(value) {
                    total += parseInt(value)
                }  
            })
            if( total > 0 ) {
                var result1 = 0
                var result2 = 0
                var result3 = 0
                if(data[0].vote1) {
                    result1 = parseInt(data[0].vote1) / total
                }
                if(data[0].vote2) {
                    result2 = parseInt(data[0].vote2) / total
                }
                if(data[0].vote3) {
                    result3 = parseInt(data[0].vote3) / total
                }
                var max_height = 60
                $('#emotion div:eq(0)').height(result1*max_height)
                $('#emotion div:eq(1)').height(result2*max_height)
                $('#emotion div:eq(2)').height(result3*max_height)

                $('#emotion span:eq(0)').html(parseInt(result1*100) + '%')
                $('#emotion span:eq(1)').html(parseInt(result2*100) + '%')
                $('#emotion span:eq(2)').html(parseInt(result3*100) + '%')
            } else {
                $('#emotion span').html('0%')
            }
            vote_loading = false     
        }
    })
}

function set_vote() {
    $('#emotion a').click(function(event){
        event.preventDefault()
        if(vote_loading) {
            return
        }

        $.ajax({
            dataType : 'jsonp',
            data     : { vote : $(this).attr('href')},
            url      : remote_server_url_list.set_user_vote,
            success  : function(data){
                if($.isEmptyObject(data)){
                    return
                }
                if(data.resault !== 0) {
                    alert('投票成功')
                    get_vote()
                } else {
                    alert('每天只能投票一次')
                }
            }
        })  
    })
}