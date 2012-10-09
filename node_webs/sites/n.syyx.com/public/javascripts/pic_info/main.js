//------------------------video_info----------------------------------------
//-----------------
var flash_data = {
    nav   : {
        div_id : 'flash_nav',
        url    : '/flash/indexFlash_top_20120525.swf' + '?' + Math.floor(Math.random()*10000),
        width  : 664,
        height : 62
    }
}

var loading = false
//dom_loaded
$(function(){
    //--------------------------------------------------------------
    set_flash(flash_data)

    get_data()

    switch_pic_type()

    global_setting()

    upload_img_click()

})
//---------------------------------------------------------------------------------------
function global_setting() {
    //去掉链接虚线
    $("a").attr("hideFocus", "true");
}
//-------------------------------------------------------

function get_data () {
    //取得列表
    get_cross_domain_data(get_pic_id_and_class().pic_class, { id : get_pic_id_and_class().id }, function(data) {

        fill_pic_list(data)

        highlight_img()

        bind_page_roll_btn()

        bind_change_hover_img()
        
    })
}

function switch_pic_type() {
    $('#switch').attr('class','')
    if( location.search.substring(1) == 'wallpaper_info' ) {
        $('#switch').addClass('wallpaper')
        $('#link').hide()
        $('#view').hide()
        $('#allsize').show()
    } else {
        $('#switch').addClass('screen')
        $('#link').show()
    }
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
function get_cross_domain_data(remote_url, parms, cb) {
    loading = true

    $.ajax({
        dataType : 'jsonp',
        data     : parms,
        url      : remote_url,
        success  : function(data){
            loading = false
            if($.isEmptyObject(data)){
                return
            }

            cb(data)
        }
    })
}

//-----------------实用工具函数--------------------------------------------------------------------
//取得pic的类别和id
function get_pic_id_and_class() {
    //default value
    var param = { 
        pic_class : remote_server_url_list.screen_info,
        id        : null
    }
    //get_class
    if ( location.search ) {
        param.pic_class = remote_server_url_list[location.search.substring(1)]
    }
    //get_id
    if ( location.hash ) {
        param.id = location.hash.substring(1)
    }

    return param
}
//高亮选中图片
function highlight_img() {
    if ( !get_pic_id_and_class().id ) {
        $('#list a:first').addClass('current')
        add_some_info($('#list a:first'))
    }
    else {
        $('#list a').each(function(index, value){
            if ( $(this).attr('rel') == get_pic_id_and_class().id ) {            
                $(this).addClass('current')
                add_some_info($(this))
                return
            }
        })
    } 
}
//翻页
function bind_page_roll_btn() {

    $('#prev').on('click', function(event) {
        event.preventDefault()

        if ( parseInt($('#prev').attr('href')) < 1 ) {
            alert('已经是第一页了')
        } else {
            if(!loading) {
                get_cross_domain_data(get_pic_id_and_class().pic_class, { page : $('#prev').attr('href') }, function(data) {
                    fill_pic_list(data)
                }) 
            }
        }
    })

    $('#next').on('click', function(event) {
        event.preventDefault()

        if( parseInt($('#control').attr('name')) < parseInt($('#next').attr('href')) ) {
            alert('已经是最后一页了')
        } else {
            if(!loading) {
                get_cross_domain_data(get_pic_id_and_class().pic_class, { page : $('#next').attr('href') } , function(data) {
                    fill_pic_list(data)
                })  
            }
        }
    })
}
//填充图片列表
function fill_pic_list(data) {
    $('#list').empty()
    $.each(data.piclist, function (key, value) {
        $('#list').append('<a rel="'
            + value.id 
            +'" title="' 
            + value.Title 
            + '" href="'
            + value.BigPic
            + '"><img src="'
            + value.SmallPic
            + '"></a>'
            )
    })
    $('#prev').attr('href', data.page - 1)
    $('#next').attr('href', data.page + 1)
    $('#control').attr('name', data.allpage)

    $('#list a').click(function(event) {
        event.preventDefault()
        $(this).siblings().removeClass('current')
        $(this).addClass('current')
        add_some_info($(this))
    })
}
//添加图片到显示区域
function add_some_info( target_link ) {
    $('#show_img img').attr('src', target_link.attr('href'))
    $('#title').html( target_link.attr('title') )
    $('#view').attr('href', target_link.attr('href'))

    $('#prev_img').attr('href', target_link.prev().attr('href'))
    $('#next_img').attr('href', target_link.next().attr('href'))
    $('#prev_img').attr('title', target_link.prev().attr('title'))
    $('#next_img').attr('title', target_link.next().attr('title'))
    $('#prev_img').attr('rel', target_link.prev().attr('rel'))
    $('#next_img').attr('rel', target_link.next().attr('rel'))

    location.hash = target_link.attr('rel')

    get_all_size()

}
//添加图片上面悬浮的上一张和下一张按钮
function bind_change_hover_img() {
    $('#prev_img').on('click', function(event) {
        event.preventDefault()
        

        if( $('#list a.current').index() == 0 ) {
            if ( parseInt($('#prev').attr('href')) < 1 ) {
                alert('已经是第一张了')
            } else {
                if(!loading) {
                    get_cross_domain_data(get_pic_id_and_class().pic_class, { page : $('#prev').attr('href') }, function(data) {
                        fill_pic_list(data)
                        $(this).attr('href',data.piclist[3].BigPic)
                        $(this).attr('title',data.piclist[3].Title)
                        $(this).attr('rel',data.piclist[3].id)
                        rebind_btn_prev_next_img($(this))
                    }) 
                }
            }
        } else {
            rebind_btn_prev_next_img($(this))
        }
        
    })

    $('#next_img').on('click', function(event) {
        event.preventDefault()

        if( $('#list a.current').index() == 3 ) {
            if( parseInt($('#control').attr('name')) < parseInt($('#next').attr('href')) ) {
                alert('已经是最后一张了')
            } else {
                if(!loading) {
                    get_cross_domain_data(get_pic_id_and_class().pic_class, { page : $('#next').attr('href') } , function(data) {
                        fill_pic_list(data)
                        $(this).attr('href',data.piclist[0].BigPic)
                        $(this).attr('title',data.piclist[0].Title)
                        $(this).attr('rel',data.piclist[0].id)
                        rebind_btn_prev_next_img($(this))
                    })  
                }
            }
        } else {
            rebind_btn_prev_next_img($(this))
        }
        
    })

    function rebind_btn_prev_next_img(self) {

        $('#show_img img').attr('src', self.attr('href'))
        $('#title').html( self.attr('title') )
        $('#view').attr('href', self.attr('href'))

        location.hash = self.attr('rel')

        get_all_size()

        $('#list a').removeClass('current')

        $('#list a').each(function(){
            if($(this).attr('rel') == location.hash.substring(1)) {
                $(this).addClass('current')
                $('#prev_img').attr('href', $(this).prev().attr('href'))
                $('#next_img').attr('href', $(this).next().attr('href'))
                $('#prev_img').attr('title', $(this).prev().attr('title'))
                $('#next_img').attr('title', $(this).next().attr('title'))
                $('#prev_img').attr('rel', $(this).prev().attr('rel'))
                $('#next_img').attr('rel', $(this).next().attr('rel'))
            }
        })
    }
}

//上传截图
function upload_img_click(){
 $("#link a.open").click(function(event) {
    $.ajax({
        dataType : 'jsonp',
        url      : remote_server_url_list.check_login,
        success  : function(data){
                if(data=='1') {
                    $("#div_dialog").html("<iframe scrolling=\"no\" height=\"325\" width=\"650\" id=\"externalIframe\" frameborder=\"no\" border=\"0\" src=\"http://nycs.syyx.com/PicCenter/UpLaodGamePic.aspx\"/>");
                    $("#div_dialog").dialog({
                        dialogClass: 'dialog_upload',
                        width: 731,
                        height: 420,
                        modal: true,
                        close: function() { location.href = location.href}
                    })
                }
                else{
                    $("#div_dialog").html("<iframe scrolling=\"no\" height=\"205\" width=\"400\" id=\"externalIframe\" frameborder=\"no\" border=\"0\" src=\"http://nycs.syyx.com/login.aspx\"/>");
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
        event.preventDefault()
    });
}

function get_all_size() {
    if( location.search.substring(1) !== 'wallpaper_info') {
        return
    }

    $('#allsize').html('<span>图片下载：</span>')
    $.ajax({
        dataType : 'jsonp',
        data     : { id : location.hash.substring(1) },
        url      : remote_server_url_list.wallpaper_size,
        success  : function(data){
            if($.isEmptyObject(data)){
                return
            }

            $.each(data, function(index, value){
                $('#allsize').append('<a href="'
                    + value.SmallPic
                    + '" target="_blank">'
                    + value.Title
                    + '</a>')
            })
        }
    })
}