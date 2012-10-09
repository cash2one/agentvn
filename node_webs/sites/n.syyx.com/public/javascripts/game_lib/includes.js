//--------------------------------------------------------------------------------------------------------
// input_check.js
//--------------------------------------------------------------------------------------------------------
_G_all_input_checks = {
    empty : function(value, check_info) {
        if (value == "") {
            return check_info.err_info
        }
    },

    length : function(value, check_info) {
        if (check_info.options) {
            for (var i in check_info.options) {
                if (value.length == check_info.options[i]) {
                    return
                }
            }

            return check_info.err_info
        }

        check_info.min = check_info.min || 0
        check_info.max = check_info.max || Math.pow(2, 32)

        if (value.length < check_info.min || value.length > check_info.max) {
            return check_info.err_info
        }
    },

    regex : function(value, check_info) {
        if (!check_info.value.test(value)) {
            return check_info.err_info
        }
    },

    equal : function(value, check_info) {
        if (check_info.side == 'server') {
            var compare_value = check_info.req.body[check_info.value]
            if (compare_value != value) {
                return check_info.err_info
            }
        }
        else if (check_info.side == 'session') {
            var compare_value = check_info.req.session[check_info.value]
            if (compare_value != value) {
                return check_info.err_info
            }
        }
        else {
            var input_id = '#' + check_info.value
            if ($(input_id).val() != value) {
                return check_info.err_info
            }
        }
    }
}
//--------------------------------------------------------------------------------------------------------
_G_check_request_data = function(req, input_checks) {
    for (var key in req.body) {
        if (!input_checks[key]) {
            continue
        }
        
        var value = req.body[key]

        var checks = input_checks[key].checks
        for (var i in checks) {
            var type = checks[i].type
            var check_info = checks[i]

            check_info.req = req

            var check_func = _G_all_input_checks[type]
            if (!check_func) {
                var ret = {}
                ret[key] = type

                return ret
            }

            var ret = check_func(value, check_info)
            if (ret != undefined) {
                var ret = {}
                ret[key] = type

                return ret
            }
        }
    }
}
//--------------------------------------------------------------------------------------------------------//--------------------------------------------------------------------------------------------------------
// input.js 一个通用的input控件处理模块
//--------------------------------------------------------------------------------------------------------
/*
var example_input_data = [
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
            url      : '/account_check',
            1        : '该账号已经存在'
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
            { type : 'length', options : [ 15, 18 ], err_info : "身份证应为15位或18位" },
        ],
        remote_check  : {
            url : "",
            1   : ""
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
        pic_img       : { id : "validateimg", src : "" },
        local_check   : [
            { type : 'length', min : 4, max : 4, err_info : false }
        ],
        remote_check  : {
            url : "",
            1   : ""
        }
    }
]
*/
//--------------------------------------------------------------------------------------------------------
var input_config = {
    background_highlight_class : "focus_in_inut",
    error_tag_class            : "input_wrong",
    status_class               : {
        ok       : "check_result_right",
        error    : "check_result_wrong",
        checking : "check_result_loading"
    }
}

var captcha_dom
//--------------------------------------------------------------------------------------------------------
var input_local_check_func = _G_all_input_checks
//--------------------------------------------------------------------------------------------------------
function input_highlight_background(input) {
    input.addClass(input_config.background_highlight_class)
}

function input_recover_background(input) {
    input.removeClass(input_config.background_highlight_class)
}
//--------------------------------------------------------------------------------------------------------
function input_recover(input, input_data) {
    var input_err = input.hasClass(input_config.error_tag_class)
    if (input_err) {
        input.removeClass(input_config.error_tag_class)
        input.val("")
        
        var status_div_id = input_data.status_div_id
        if (status_div_id) {
            status_div_id = '#' + status_div_id
            $(status_div_id).attr('class', '')
        }
    }
}
//--------------------------------------------------------------------------------------------------------
function input_check_ok(input, input_data) {
    var status_div_id = input_data.status_div_id
    if (status_div_id) {
        status_div_id = '#' + status_div_id
        $(status_div_id).attr("class", input_config.status_class.ok)
    }
}

function input_check_error(input, input_data, err_info) {
    input.addClass(input_config.error_tag_class)

    var status_div_id = input_data.status_div_id
    if (status_div_id) {
        status_div_id = '#' + status_div_id
        $(status_div_id).attr("class", input_config.status_class.error)
    }

    var info_div_id = input_data.info_div_id
    if (info_div_id) {
        info_div_id = '#' + info_div_id

        if ($(info_div_id).is(":hidden")) {
            input.hide()
            $(info_div_id).show()
        }

        if (err_info) {
            $(info_div_id).val(err_info)
        }
    }
}
//--------------------------------------------------------------------------------------------------------
function input_local_check(input, input_data) {
    var value = input.val()

    for (var i in input_data.local_check) {
        var check_info = input_data.local_check[i]
        var key = check_info.type
        var check_func = input_local_check_func[key]

        var err_info = check_func(value, check_info)
        if (err_info !== undefined) {
            input_check_error(input, input_data, err_info)
            return false
        }
    }

    input_check_ok(input, input_data)

    return true
}

function input_remote_check(input, input_data) {
    if (!input_data.remote_check) {
        return true
    }

    var value = input.val()
    var check_url = input_data.remote_check.url

    var status_div_id = '#' + input_data.status_div_id
    $(status_div_id).attr("class", input_config.status_class.checking)


    $.ajax({
        type     : 'GET',
        cache    : false,
        url      : check_url,
        data     : { v : value },
        dataType : 'json',
        success  : function(data){
            if (data.type == 0) {
                input_check_ok(input, input_data)
                return
            }

            var err_info = input_data.remote_check[data.type + '']
            input_check_error(input, input_data, err_info)
        }
        
    });
}
//--------------------------------------------------------------------------------------------------------
function input_show_pic(input, input_data) {
    get_captcha(captcha_dom)

    $('#' + input_data.pic_img.id).show()
}

function input_pic_setting(input, input_data) {
    var input_id = '#' + input_data.input_id
    var img_id = '#' + input_data.pic_img.id

    //$(img_id).attr("src", input_data.pic_img.src + "?r=" + Math.random())

    $(input_id).keyup(function() {
        if($(input_id).val().length >= 4){
            var ret = input_local_check(input, input_data)
            if (!ret) {
                return
            }
            
            input_remote_check(input, input_data)
        }
        
    })
            
    $(img_id).click(function() {
        var status_div_id = '#' + input_data.status_div_id
        $(img_id).attr("src", input_data.pic_img.src + "?r=" + Math.random())
        $(status_div_id).attr("class", input_config.status_class.error)
    })
}
//--------------------------------------------------------------------------------------------------------
function input_info_cover_input_setting(input, input_data) {
    var info_div_id = input_data.info_div_id
    if (info_div_id) {
        info_div_id = '#' + info_div_id

        $(info_div_id).focus(function() {
            if (input.is(':hidden')) {
                $(this).hide()
                input.show()
                input.focus()
            }
        })
    }
}
//--------------------------------------------------------------------------------------------------------
function input_setting(input_data) {
    var input_id = '#' + input_data.input_id
    var input = $(input_id)

    input.val("")
 
    input.focus(function() {
        get_captcha(captcha_dom)

        if (input_data.pic_img) {
            input_show_pic(input, input_data)
        }

        input_highlight_background(input)
        input_recover(input, input_data)
    })

    input.blur(function() {
        input_recover_background(input)

        if (input_data.pic_img) {
            return
        }

        var ret = input_local_check(input, input_data)
        if (!ret) {
            return
        }

        input_remote_check(input, input_data)
    })

    if (input_data.pic_img) {
        input_pic_setting(input, input_data)
    }

    if (input_data.info_cover_input) {
        input_info_cover_input_setting(input, input_data)
    }
}
//--------------------------------------------------------------------------------------------------------
function input_setting_inputs(inputs_data) {
    for(var j in inputs_data) {
        if(inputs_data[j].pic_img){
           captcha_dom = inputs_data[j]
        }
    }
    for (var i in inputs_data) {
        var input_data = inputs_data[i]
        input_setting(input_data)
    }

}
//--------------------------------------------------------------------------------------------------------
function input_get_inputs_value(inputs_data) {
    var ret = false

    for (var i in inputs_data) {
        var input_data = inputs_data[i]
        var input_id = '#' + input_data.input_id
        var key = input_data.name
        var value = $(input_id).val()

        ret = ret || {}
        ret[key] = value
    }

    return ret
}
//--------------------------------------------------------------------------------------------------------
function input_local_check_inputs(inputs_data) {
    var ret = true

    for (var i in inputs_data) {
        var input_data = inputs_data[i]
        var input_id = '#' + input_data.input_id
        if (!input_local_check($(input_id), input_data)) {
            ret = false
        }
    }

    return ret
}
//--------------------------------------------------------------------------------------------------------
function input_status_check(inputs_data) {
    var ret = true

    for (var i in inputs_data) {
        var input_data = inputs_data[i]
        var status     = check_unit_status(input_data)
        
        if(status == false) {
            ret = false
            break
        }  
    }

    return ret
}
//--------------------------------------------------------------------------------------------------------
function get_captcha(input_data) {
    var img_id = '#' + input_data.pic_img.id
    if (!$(img_id).attr("src")) {
        $(img_id).attr("src", input_data.pic_img.src + "?r=" + Math.random())
    }
}
//------------------------------------------------------------------------------------------------
function check_unit_status(input_data) {            //  add by jiangxi
    var status_div_id = '#' + input_data.status_div_id
    var ok_status     =  $(status_div_id).hasClass(input_config.status_class.ok)
    
    if(ok_status) {
        return true
    } 

    if(!input_data.pic_img) {
        return false
    }

    var input_id     = '#' + input_data.input_id
    var char_num     = $(input_id).val().length

    if(char_num != 4) {
        return false
    }
    
    var err_status   = $(status_div_id).hasClass(input_config.status_class.error)
    var check_status = $(status_div_id).hasClass(input_config.status_class.checking)
    
    if(err_status || check_status) {
        return false
    }

    return true
    
}
//------------------------------------------------------------------------------------------------
//config_remote_server_url------------------------------------------
var remote_server_url_list = {
    check_account         : '/Ajax/Reg/account_check.aspx',
    check_idcard          : '/Ajax/Reg/check_idcard.aspx',
    check_captcha         : '/Ajax/Reg/check_captcha.aspx',
    register_account      : '/Ajax/Reg/register_account.aspx',
    get_captcha           : '/Ajax/Reg/captcha.aspx',
    active_gift           : 'http://activity.syyx.com/nycs_activate/activate_giftbag.shtml',

    get_news_info         : 'http://nycs.syyx.com/ajax/news/getnewsinfo.aspx',
    get_vote_info         : 'http://nycs.syyx.com/ajax/news/GetNewsVote.aspx',
    vote                  : 'http://nycs.syyx.com/ajax/news/vote.aspx',
    get_related_news      : 'http://nycs.syyx.com/ajax/news/GetRelatedNews.aspx',
    get_3rd_download_list : 'http://nycs.syyx.com/ajax/download/get17173.aspx',
    get_patch_info_list   : 'http://nycs.syyx.com/ajax/download/GetPatchInfoList.aspx',
    get_download_tools    : 'http://nycs.syyx.com/ajax/download/GetToolsDownload.aspx',
    get_news_list         : 'http://nycs.syyx.com/ajax/news/getnewslist.aspx',
    get_download_client   : 'http://nycs.syyx.com/ajax/download/getclientinfo.aspx',
    get_goods_list        : 'http://nycs.syyx.com/ajax/gameinfo/getgoodslist.aspx',
    get_data_class        : 'http://nycs.syyx.com/ajax/gameinfo/getdataclass.aspx',
    get_task_class        : 'http://nycs.syyx.com/ajax/gameinfo/gettaskclass.aspx',
    get_task_list         : 'http://nycs.syyx.com/ajax/gameinfo/gettasklist.aspx',
    get_task_info         : 'http://nycs.syyx.com/ajax/gameinfo/gettaskinfo.aspx',
    get_armint_list       : 'http://nycs.syyx.com/ajax/Metier/MetierArming.aspx',
    get_map_monster       : 'http://nycs.syyx.com/ajax/gameinfo/getmonster.aspx',
    get_map_task          : 'http://nycs.syyx.com/ajax/gameinfo/getmaptask.aspx',
    get_map_npc           : 'http://nycs.syyx.com/ajax/gameinfo/getmapnpc.aspx',
    get_serach_game_lib   : 'http://nycs.syyx.com/ajax/gameinfo/getsearch.aspx',
    get_user_pic_list     : 'http://nycs.syyx.com/Ajax/Pic/GetUserPicList.aspx',
    get_game_pic_list     : 'http://nycs.syyx.com/Ajax/Pic/GetGamePicList.aspx',

    game_lib_goods        : '/game_lib_content.html',
    game_lib_info         : '/game_lib_content_1.html',
    game_lib_task         : '/game_lib_content_2.html',
    game_lib_map_monster  : '/game_lib_content_3.html',
    game_lib_map_npc      : '/game_lib_content_4.html',
    game_lib_map_task     : '/game_lib_content_5.html',
    serach_game_lib       : '/game_lib_search.html',

    news_content          : '/news_content.html',
    news_list             : '/news_list.html',

    recommend_server        : 'http://att.syyx.com/XGame/StaticHtml/2.htm',
    index_top_news          : 'http://att.syyx.com/XGame/StaticHtml/20.htm',
    index_slider_news       : 'http://att.syyx.com/xgame/PicLink/piclink1.htm',
    index_news_list         : 'http://att.syyx.com/XGame/StaticHtml/27.htm',
    index_images_ad         : 'http://att.syyx.com/xgame/PicLink/piclink2.htm',
    index_game_lib_summary  : 'http://att.syyx.com/XGame/StaticHtml/18.htm',
    index_game_feature      : 'http://att.syyx.com/XGame/StaticHtml/19.htm',
    index_user_center       : 'http://att.syyx.com/XGame/StaticHtml/17.htm',
    index_game_pic          : 'http://att.syyx.com/XGame/StaticHtml/16.htm',
    index_game_video        : 'http://att.syyx.com/XGame/StaticHtml/15.htm',
    index_iframe_link       : 'http://att.syyx.com/XGame/StaticHtml/14.htm',
    index_media_img         : 'http://att.syyx.com/XGame/StaticHtml/13.htm',
    index_link              : 'http://att.syyx.com/XGame/StaticHtml/21.htm',
    news_activity           : 'http://att.syyx.com/XGame/StaticHtml/4.htm',
    news_related_img        : 'http://att.syyx.com/XGame/StaticHtml/3.htm',
    index_news_list_1       : 'http://att.syyx.com/news/js/topnews/0/1.htm',
    index_news_list_2       : 'http://att.syyx.com/news/js/topnews/0/34.htm',
    index_news_list_3       : 'http://att.syyx.com/news/js/topnews/0/33.htm',
    index_news_list_4       : 'http://att.syyx.com/news/js/topnews/0/35.htm',

    screenshot        : 'http://att.syyx.com/XGame/StaticHtml/12.htm',
    wallpaper         : 'http://att.syyx.com/XGame/StaticHtml/11.htm',
    cartoon           : 'http://att.syyx.com/XGame/StaticHtml/10.htm',
    video             : 'http://att.syyx.com/XGame/StaticHtml/9.htm',

    game_lib_nav      : 'http://att.syyx.com/XGame/StaticHtml/8.htm',
    game_lib_gameplay : 'http://att.syyx.com/XGame/StaticHtml/7.htm',

    get_hot_video     : 'http://nycs.syyx.com/Ajax/Video/GetHotVideo.aspx',
    get_user_video    : 'http://nycs.syyx.com/Ajax/Video/GetUserVideo.aspx',
    get_new_video     : 'http://nycs.syyx.com/Ajax/Video/GetNewVideo.aspx',
    get_video_info    : 'http://nycs.syyx.com/Ajax/Video/GetVideoInfo.aspx',

    screen_info    : 'http://nycs.syyx.com/Ajax/Pic/GetGamePic.aspx',
    wallpaper_info : 'http://nycs.syyx.com/Ajax/Pic/GetWallpaper.aspx',
    wallpaper_size : 'http://nycs.syyx.com/Ajax/Pic/GetOtherSize.aspx',

    check_login  : 'http://nycs.syyx.com/Ajax/Users/checkLogin.aspx',
    get_usercenter_list  : 'http://nycs.syyx.com/UserCenter/GetListByID.aspx',

    user_center_data  : 'http://nycs.syyx.com/UserCenter/GetListByID.aspx',
    user_center_data2 : 'http://nycs.syyx.com/UserCenter/GetList23.aspx',
    get_user_vote     : 'http://nycs.syyx.com/UserCenter/GetVoteData.aspx',
    set_user_vote     : 'http://nycs.syyx.com/UserCenter/SetVote.aspx'
}//----------------------------------------------------
var page_name = 'nycs_gameFeature'
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
            url      : remote_server_url_list.check_account,
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
            url : remote_server_url_list.check_idcard,
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
        pic_img       : { id : "validateimg", src : remote_server_url_list.get_captcha },
        local_check   : [
            { type : 'length', min : 4, max : 4, err_info : false }
        ],
        remote_check  : {
            url : remote_server_url_list.check_captcha,
            1   : ""
        }
    }
]
//dom_loaded------------------------------------------------------------------------------
$(function(){
    //bind_open_reg_panel
    if ($.cookie('first_get') != null){ 
        $("#float_reg_panel").hide() 
        $('#float_reg_btn').show()
    }
    else {
        $("#float_reg_panel").show()
        $.cookie('first_get','no_first')
    }
    
    $('#float_reg_btn').click(function(event){
        $(this).hide()
        $('#float_reg_panel').show()
        event.preventDefault()
    })

    $('#float_reg_panel .close a').click(function(event){
        $('#float_reg_panel').hide()
        $('#float_reg_btn').show()
        event.preventDefault()
    })

    support_ie6_position_fixed([$('#float_reg_btn'),$('#float_reg_panel')])
    //设定注册功能
    account_register_setting()


})
//----------------------------------------------------------
function support_ie6_position_fixed(fix_elements){
    if(window.XMLHttpRequest) {
        return
    }

    //init
    var css_top = 200

    $(window).scroll(function(){
        var scrolled_top = $(window).scrollTop()
        $(fix_elements).each(function(){
            this.css('top',(scrolled_top + css_top) + 'px')
        })
    })
}

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

    $('#reg_step3 a').click(function(event){
        location.href = location.href
        event.preventDefault()
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
    
    $.post(remote_server_url_list.register_account, ret, function(data) {
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
        $("#reg_account1").html(info[0])
        $('#active_code').html(info[1])
        $("#reg_step1").hide()
        $("#reg_step2").show()

        $("#active_link").click(function(event) {
            //var basic_active_url = remote_server_url_list.active_gift
            //var whole_url_to_active = basic_active_url + "?" + info[0] + "&" + info[1]
            $.get('http://nycs.syyx.com/ajax/register/activate.aspx?ac='+ info[0] + '&cn=' + info[1], function(data){
                if(data.isok=='yes'){
                    $("#reg_step2").hide()
                    $("#reg_step4").show()
                }else{
                    $("#gittip").html(data.content)
                    $("#gittip").attr("style", "color:red")
                    return
                }
            },'json')
            //window.open(whole_url_to_active)
            event.preventDefault()
        })
    },

    no_card  : function(info) {
        $("#reg_step1").hide()
        $("#reg_step3").show()
        $('#reg_account2').html(info[0])
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