//dom_loaded-------------------------------------------------------------------------------------------
$(function(){
    global_setting()

    switch_grade()

    open_reg()

    get_data()
    set_flash(flash_data)
    open_download_dialog()
     document.title ='新手指南-《诺亚传说》官方网站'
});
//---------------------------------------------------------------------------------------
function global_setting() {
    //去掉链接虚线
    $("a").attr("hideFocus", "true");
}

//--------------------------------------- config_flash_data ----------------------------------
var flash_data = {
    yineng : {
        div_id : "yineng_video",
        url    : "http://v.nycs.syyx.com/nycs/swf/yi_5_8.swf",
        width  : 238,
        height : 140
    },
    jianwu : {
        div_id : "jianwu_video",
        url    : "http://v.nycs.syyx.com/nycs/swf/jian_5_8.swf",
        width  : 238,
        height : 140
    },
    qiangxie : {
        div_id : "qiangxie_video",
        url    : "http://v.nycs.syyx.com/nycs/swf/qiang_5_8.swf",
        width  : 238,
        height : 140
    },
    gedou : {
        div_id : 'gedou_video',
        url    : 'http://v.nycs.syyx.com/nycs/swf/ge_5_8.swf',
        width  : 238,
        height : 140
    },
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
    },
    banner:    {
        div_id : 'flash_banner',
        url    : 'http://v.nycs.syyx.com/nycs/swf/index_flash_top_big20120606.swf',
        width  : 689,
        height : 455
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

function get_data() {
    get_cross_domain_data(remote_server_url_list.get_download_client, function(data){
        $('.full_client').attr('href', data.DownLaodLink)
    },{
        id : 1
    })

    get_cross_domain_data(remote_server_url_list.get_download_client, function(data){
        $('.mini_client').attr('href', data.DownLaodLink)
    },{
        id : 2
    })
}
function switch_grade() {
    $('#expand_1').live('click', function(event){
        $('.grade_1').show()
        $('.grade_2').hide()
        $('.grade_3').hide()
        $('#expand_2').remove().insertAfter('.grade_3').css('display','block')
        $('#expand_3').remove().insertAfter('#expand_2').css('display','block')
        $(this).hide()
        event.preventDefault()
    })

    $('#expand_2').live('click', function(event){
        $('.grade_1').hide()
        $('.grade_2').show()
        $('.grade_3').hide()
        $('#expand_1').remove().insertBefore('.grade_2').css('display','block')
        $('#expand_3').remove().insertAfter('#expand_2').css('display','block')
        $(this).hide()
        event.preventDefault()
    })

    $('#expand_3').live('click', function(event){
        $('.grade_1').hide()
        $('.grade_2').hide()
        $('.grade_3').show()
        $('#expand_1').remove().insertBefore('.grade_3').css('display','block')
        $('#expand_2').remove().insertAfter('#expand_1').css('display','block')
        $(this).hide()
        event.preventDefault()
    })
}

function open_reg() {
    $('.ready .reg,.upgrade .reg').click(function(event){
        var offset = $(this).offset()
        $('#float_reg_btn').hide()
        $('#float_reg_panel').css({
            position : 'absolute',
            left     : offset.left + 200,
            top      : offset.top - 70
        }).show()
        event.preventDefault()
    })

    $('#float_reg_panel .close a').click(function(event){
        $('#float_reg_btn').show()
        if(window.XMLHttpRequest) {
            $('#float_reg_panel').css({
                position : 'fixed',
                left     : 'auto',
                right    : 10,
                top      : 200
            }).hide()
        }
        else{
            $('#float_reg_panel').css({
                position : 'absolute',
                left     : 'auto',
                right    : 10,
                top      : 200
            }).hide()
        }
        event.preventDefault()
    })
}

function open_download_dialog() {
    $('.ready .download,.upgrade .download').click(function(event){
        var offset = $(this).offset()
        $('.download_dialog').css({
            left    :  offset.left + 200,
            top     :  offset.top - 70
        }).show()
        event.preventDefault()  
    })

    $('.download_dialog .close').click(function(event){
        $('.download_dialog').hide()
        event.preventDefault()
    })
}

function get_cross_domain_data(remote_url,cb,params) {
    $.ajax({
        data     : params,
        dataType : 'jsonp',
        url      : remote_url,
        success  : function(data){
            if($.isEmptyObject(data)){
                return
            }

            cb(data)
        }
    })
}