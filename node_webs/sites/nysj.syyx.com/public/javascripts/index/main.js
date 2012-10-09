//dom_loaded-------------------------------------------------------------------------------------------
var remote_url = {
    publish_category_by_name : '/publish_category_find_by_name',
    clients_by_name          : '/clients_find_by_name'
}
//dom_loaded-------------------------------------------------------------------------------------------
$(function(){
    global_setting()
    run_tabs_picture_news()
    run_game_hot()
    run_tab_role()
    run_screenshot()
    open_dialog_download()
    open_dialog_activate()
    set_top_flash()
    submit_activate_account_form()
})
//---------------------------------------------------------------------------------
function run_tabs_picture_news() {
    $.ajax({
        cache    : false,
        url      : remote_url.publish_category_by_name,
        data     : { name : '首页新闻幻灯片'},
        success  : function(data){
            if (data==null){
                return
            }

            $.each(data, function(index, value) {
                $('#tabs_picture_news ul').append('<li><a href="#tabs_picture_news'
                    + index
                    + '"></a></li>')
                $('#tabs_picture_news ul').after('<div id="tabs_picture_news'
                    + index
                    + '"><a target="_blank" href="'
                    + value.link
                    + '"><img src="'
                    + value.thumb_url
                    + '"></a></div>')
            })

            $('#tabs_picture_news').tabs({ event: "mouseover" })
            $('#tabs_picture_news').tabs('rotate', 4000, true)
        }
    })
}

function run_game_hot() {
    $.ajax({
        cache    : false,
        url      : remote_url.publish_category_by_name,
        data     : {name : '首页游戏热点'},
        success  : function(data){
            if (data==null){
                return
            }

            $.each(data, function(index, value) {
                if (index == 0) {
                    $('#game_hot .top_news .thumb,#game_hot .top_news h1 a,#game_hot .top_news a.view_all').attr('href',value.link)
                    $('#game_hot .top_news h1 a').html(value.title)
                    $('#game_hot .top_news h1 span').html('发布时间：' + value.created_time.substring(5))
                    $('#game_hot .top_news .thumb img').attr('src',value.thumb_url)
                    $('#game_hot .top_news .summary').html(value.summary)
                    return
                }

                if (index == 6 || index == 7) {
                    $('#game_hot ul.img_list').append('<a target="_blank" href="'
                        + value.link
                        + '"><img src="'
                        + value.thumb_url
                        + '"></a>')
                    return
                }

                $('#game_hot ul.text_list').append('<li><a href="'
                    + value.link
                    + '">'
                    + value.title
                    +'</a><span>'
                    + value.created_time.substring(5)
                    + '</span></li>')
            })
        }
    })
}

function run_tab_role() {
    $.ajax({
        cache    : false,
        url      : remote_url.publish_category_by_name,
        data     : {name : '首页四大职业'},
        success  : function(data){
            if (data==null){
                return
            }

            $.each(data, function(index, value) {
                switch(index) {
                    case 0 :
                        $('#yineng a.more').attr('href', value.link)
                        flash_data.yineng.url = value.thumb_url
                        break
                    case 1 :
                        $('#qiangxie a.more').attr('href', value.link)
                        flash_data.qiangxie.url = value.thumb_url
                        break
                    case 2 :
                        $('#jianwu a.more').attr('href', value.link)
                        flash_data.jianwu.url = value.thumb_url
                        break
                    case 3 :
                        $('#gedou a.more').attr('href', value.link)
                        flash_data.gedou.url = value.thumb_url
                        break
                    default :
                        break
                }
            })

            $('#tabs_role').tabs({ event : 'mouseover'})
            set_flash(flash_data)
        }
    })
}

function run_screenshot() {
    var $screenshot_list = $('#screenshot .screenshot_list')
    var move_step        = 252
    $.ajax({
        cache    : false,
        url      : remote_url.publish_category_by_name,
        data     : {name : '首页游戏截图'},
        success  : function(data){
            if (data==null){
                return
            }

            $.each(data, function(index, value) {
               $screenshot_list.append('<a href="'
                    + value.link
                    + '"><img src="'
                    + value.thumb_url
                    + '"></a>')
            })

            var total_width = ($screenshot_list.find('a').length) * move_step
            $screenshot_list.width(total_width)

            $('#screenshot .pre').click(function(event) {
                var gamepic_pos = $screenshot_list.position();
                if (gamepic_pos.left !== 0) {
                    $("#screenshot .screenshot_list:not(:animated)").animate({
                        "left": "+=" + move_step
                        }, "slow");
                }
                event.preventDefault()
            })

            $('#screenshot .next').click(function(event) {
                var gamepic_pos = $screenshot_list.position()
                if (gamepic_pos.left !== -(total_width-move_step)) {
                    $("#screenshot .screenshot_list:not(:animated)").animate({
                        "left": "-=" + move_step
                        }, "slow");
                }
                event.preventDefault()
            })

            $("#screenshot .screenshot_list a").lightBox()
        }
    })
}
function open_dialog_download() {
    $.ajax({
        url     : remote_url.clients_by_name,
        data    : { name : '完整客户端'},
        cache   : false,
        success : function(data) {
            if (data == null) {
                return
            }

            $('#download_panel .full .size').html('大小：'
                + data.size)
            $('#download_panel .full .version').html('客户端版本：'
                + data.version)
            $('#download_panel .full .md5').html('MD5：'
                + data.md5)
        }
    })
    $.ajax({
        url     : remote_url.clients_by_name,
        data    : { name : '微型客户端'},
        cache   : false,
        success : function(data) {
            if (data == null) {
                return
            }

            $('#download_panel .mini .size').html('大小：'
                + data.size)
            $('#download_panel .mini .version').html('客户端版本：'
                + data.version)
            $('#download_panel .mini .md5').html('MD5：'
                + data.md5)
        }
    })
    $('a.fn_download_btn').click(function(event) {
        close_all()
        var target_date = new Date(2012, 08, 06)
        if (target_date - new Date() < 0) {
            $('#download_panel').slideDown()
        } else {
            $('#download_panel_not_open').slideDown()
        }
        event.preventDefault()
    })

    $('a.close').click(function(event) {
        $(this).parent().slideUp()
        event.preventDefault()
    })
}
function set_top_flash() {
    set_flash(flash_data2)
    $('.top_video a.open_top_dialog').click(function(event) {
        getjwplayer('http://v.nycs.syyx.com/nysj/flv/nysj_flv_201208.flv', 640, 355, "#top_video_detail_container");
        $("#top_video_detail").dialog({
            width       : 656,
            height      : 390,
            modal       : true,
            resizable   : false,
            dialogClass : "pop_video_detail",
            close       : function() {
                $("#top_video_detail_container").html("")         
            }
        })
        event.preventDefault()
    })
    
}
function open_dialog_activate() {
    $('.fn_active_btn').click(function(event) {
        $('#activate_form input').val('')
        $('.activate_form_submit_btn span').html('')
        close_all()
        $('#activate_form').slideDown()
        event.preventDefault()
    })
}

function close_all() {
    $('#download_panel, #download_panel_not_open, #activate_form, #activate_result_1, #activate_result_2').hide()
}

function submit_activate_account_form() {
    $('#activate_failure_btn').click(function(event) {
        $('.activate_form_submit_btn span').html('')
        $('#activate_form').show()
        $('#activate_result_2').hide()
        event.preventDefault()
    })
    $('#activate_form input').val('')
    $('.activate_form_submit_btn span').html('')
    $('.activate_form_submit_btn a').click(function(event) {
        event.preventDefault()
        var params = $('#activate_form form').serializeArray()
        if (params[0].value == '') {
            alert('请填入激活码')
            return
        }

        if (params[1].value == '') {
            alert('请填入游戏帐号')
            return
        }

        $.ajax({
            type        : 'post',
            url         : '/activate_account',
            data        :  $('#activate_form form').serialize(),
            beforeSend  : function(xhr) {
                $('.activate_form_submit_btn span').html('提交中...')
            },
            success     : function(data) {
                if (data == null) {
                    $('.activate_form_submit_btn span').html('提交数据不正确')
                    return
                }

                if (data.ok == 0) {
                    $('.activate_form_submit_btn span').html(data.info)
                    return
                }

                $('#activate_form').hide()

                if (data.ok == 1) {
                    $('#activate_result_1 span').html(data.info)
                    $('#activate_result_1').show()
                    return
                }

                if (data.ok == 2) {
                    $('#activate_result_2 p').html(data.info)
                    $('#activate_result_2').show()
                    return
                }

                $('.activate_form_submit_btn span').html('请稍候再试')
                $('#activate_form').show()
            }
        })
        
    })
}
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
    }
}
var flash_data2 = {
    top_flash : {
        div_id    : 'top_video_container',
        url       : 'http://v.nycs.syyx.com/nysj/swf/nysj_swf_201208.swf',
        width     : 175,
        height    : 98
    },
    top_flash2 : {
        div_id    : 'flash_banner',
        url       : 'http://v.nycs.syyx.com/nysj/swf/nysj_FlashTop201208.swf',
        width     : 996,
        height    : 494
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

function getjwplayer(swf,w,h,id,position){
    if(!position){
        position="over"
    }
    var object = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" hidefocus="true" id="mediaplayer" width="' + w + '" height="' + h + '" bgcolor="#000000" name="mediaplayer" tabindex="0"><param name="movie" value="http://v.nycs.syyx.com/jwplayer/player.swf"><!--[if !IE]>--><object type="application/x-shockwave-flash" hidefocus="true" data="http://v.nycs.syyx.com/jwplayer/player.swf" width="' + w + '" height="' + h + '"><!--<![endif]--><param name="allowfullscreen" value="true"><param name="seamlesstabbing" value="true"><param name="wmode" value="transparent" /><param name="flashvars" value="id=mediaplayer&file='+swf+'&controlbar.position='+position+'&volume=41&autostart=true&repeat=SINGLE"><!--[if !IE]>--></object><!--<![endif]--></object>'
    $(id).html(object)
}

//---------------reg------------------------
//----------------------------------------------------
var page_name = 'nysj'
//---------------------------------------------------------------------------------------------------------
var account_register_input_data = [
    {   name          : "account_name",
        input_id      : "txtUserAccount",
        info_div_id   : "txtUserAccount",
        status_div_id : "txtUserAccountTip",
        local_check   : [
            { type : 'empty', err_info : "请输入账号" },
            { type : 'length', min : 6, max : 16, err_info : "账号长度必须6-16位" },
            { type : 'regex', value : /^[A-Za-z0-9_]{6,16}$/, err_info : "只能为字母,数字,下划线" }
        ],
        remote_check  : {
            url      : '/reg/account_check',
            1        : '该账号已经存在',
            2        : '系统错误'
        }
    },
    {   name             : "password",
        input_id         : "txtPasswords",
        info_div_id      : "txtPasswordsVal",
        status_div_id    : "txtPasswordsTip",
        info_cover_input : true,
        local_check      : [
            { type : 'empty', err_info : "请输入密码" },
            { type : 'length', min : 6, max : 16, err_info : "密码的长度为6-16个字符" } ,
            { type : 'regex', value : /^[^\s]{6,16}$/, err_info : "输入的密码不能包含空格" }
        ]
    },
    {   name             : "confirm_password",
        input_id         : "txtConfirm",
        info_div_id      : "txtConfirmVal",
        status_div_id    : "txtConfirmTip",
        info_cover_input : true,
        local_check      : [
            { type : 'empty', err_info : "请再输入一遍密码" },
            { type : 'equal', value : "txtPasswords", err_info : "两次输入的密码不一致" }
        ]
    },
    {
        name          : "id_card",
        input_id      : "txtCardID",
        info_div_id   : "txtCardID",
        status_div_id : "txtCardIDTip",
        local_check   : [
            { type : 'empty', err_info : "请输入您的身份证信息" },
            { type : 'length', options : [ 15, 18 ], err_info : "身份证应为15位或18位" }
        ],
        remote_check  : {
            url : '/reg/check_idcard',
            1   : "无效的身份证号码"
        }
    },
    {   name          : "true_name",
        input_id      : "txtTrueName",
        info_div_id   : "txtTrueName",
        status_div_id : "txtTrueNameTip",
        local_check   : [
            { type : 'empty', err_info : "请输入您的姓名" },
            { type : 'length', min : 2, max : 10, err_info : "姓名必须2-10个汉字" } ,
            { type : 'regex', value : /^[\u4e00-\u9fa5]{2,6}$/, err_info : "姓名必须是汉字" }
        ]
    },
    {   name          : "validate_pic",
        input_id      : "txtValidate",
        status_div_id : "txtValidateVal",
        pic_img       : { id : "validateimg", src : '/reg/get_captcha' },
        local_check   : [
            { type : 'length', min : 4, max : 4, err_info : false }
        ],
        remote_check  : {
            url : 'reg/check_captcha',
            1   : ""
        }
    }
]
//dom_loaded------------------------------------------------------------------------------
$(function(){
    //设定注册功能
    account_register_setting()
})

//---------------------------------------------------------------------------------------------------------
function account_register_setting() {
    input_setting_inputs(account_register_input_data)

    $("#reg_button").click(function(event) {
        account_register_request()
        event.preventDefault()
    })
            
    $("table.reg_form").keypress(function(event) {
        if (event.which == 13) { // 回车
            account_register_request()
        }
    })
}

//---------------------------------------------------------------------------------------------------------
function account_register_request() {
    var ret = input_status_check(account_register_input_data)
    if(!ret) {
        return
    }

    // var ret = input_local_check_inputs(account_register_input_data)
    // if (!ret) {
    //     return
    // }
    
    if (!check_license_agreement()) {
        return
    }

    var ret = input_get_inputs_value(account_register_input_data)
    if (!ret) {
        return
    }

    set_reg_progress()
    
    ret.page_name = page_name
    ret.r = Math.random()
    
    $.post('/reg/register_account', ret, function(data) {
        clear_reg_progress()

        var func = reg_result_func[data.type] || reg_result_func.default_
        func(data.info)
    },'json')
}

//---------------------------------------------------------------------------------------------------------
function check_license_agreement() {
    if (!$("#chk_XieYi").attr("checked")) {
        alert("请阅读并同意注册协议！"); 
        return false
    }

    return true
}
//---------------------------------------------------------------------------------------------------------
function set_reg_progress() {
    $("#regProcessTip").attr("class", "check_result_loading")
}
//---------------------------------------------------------------------------------------------------------
function clear_reg_progress() {
    $("#regProcessTip").attr("class", "")
}
//---------------------------------------------------------------------------------------------------------
var reg_result_func = {
    ok       : function(info) {
        $("#reg_account1").html(info)
        $("#reg_step1").hide()
        $("#reg_step2").show()
    },

    failed   : function(info) {
        alert(info)
    },

    default_ : function(info) {
        $("#txtPasswords").val("")
        $("#txtConfirm").val("")
        $("#txtValidate").val("")
        $("#regProcessTip").attr("class", "")
        alert(info)
    }
}