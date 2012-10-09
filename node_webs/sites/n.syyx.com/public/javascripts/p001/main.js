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
        var input_data    = inputs_data[i]
        var status_div_id = '#' + input_data.status_div_id
        var ok_status = $(status_div_id).hasClass(input_config.status_class.ok)
        if(!ok_status) {
            ret = false
        }
    }
    return ret
}

function get_captcha(input_data) {
    var img_id = '#' + input_data.pic_img.id
    if (!$(img_id).attr("src")) {
        $(img_id).attr("src", input_data.pic_img.src + "?r=" + Math.random())
    }
}

//--------------------------------------------------------------------------------------------------------------------------------


//以下正正原来有的---------------------------------------------------------------------------------------------
var platform = 'iis'
var url_account_check    = "http://nycs.syyx.com/ajax/reg/account_check.aspx"
var url_check_idcard     = "http://nycs.syyx.com/ajax/reg/check_idcard.aspx"
var url_captcha          = "http://nycs.syyx.com/ajax/reg/captcha.aspx"
var url_check_captcha    = "http://nycs.syyx.com/ajax/reg/check_captcha.aspx"
var url_register_account = "http://nycs.syyx.com/ajax/reg/register_account.aspx"
var url_get_card         = "http://nycs.syyx.com/ajax/reg/get_card.aspx"

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
            url      : url_account_check,
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
            url : url_check_idcard,
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
        pic_img       : { id : "validateimg", src : url_captcha },
        local_check   : [
            { type : 'length', min : 4, max : 4, err_info : false }
        ],
        remote_check  : {
            url : url_check_captcha,
            1   : ""
        }
    }
]

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
    
    ret.page_name = 'index_nycs'
    ret.r = Math.random()
    
    if (platform == 'iis') {
        $.post(url_register_account, ret, function(data) {
            clear_reg_progress()

            var func = reg_result_func[data.type] || reg_result_func.default_
            func(data.info)
        }, "json")
    }
    else {
        $.post(url_register_account, ret, function(data) {
            clear_reg_progress()

            var func = reg_result_func[data.type] || reg_result_func.default_
            func(data.info)
        })
    }
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
    ok: function(info) {
        $("#reg_account").val(info[0])
        $('#active_code').val(info[1])
        $(".reg_account").html(info[0])
        $(".reg").hide()
        $("#reg_step2").show()
        
        $("#active_link").click(function(event) {
            var reg_account = $("#reg_account").val()
            var active_code = $("#active_code").val()            
            if(reg_account == "" || active_code == "" ){
                alert('请输入帐号或者激活码')
            }else {                
                $.get(url_account_check + "?v=" + reg_account , function (data) {
                    if(data.type == 1){
                        $.get("/ajax/reg/CheckNewCard.aspx?cn=" + active_code, function (data) {
                            if(data == "0") {
                                $.get("/ajax/register/activate.aspx?ac=" + reg_account + "&cn=" + active_code, function(data) {
                                    $("#reg_step2").hide()
                                    if(data.isok == "yes"){
                                        $(".active_account").html($("#reg_account").val())
                                        $("#reg_step4").show()
                                    } else {                        
                                        $("#active_tip").html("很抱歉，激活失败！")
                                        $("#reg_step5").show()
                                    }
                                }, 'json')
                            } else if(data == "-3"){
                                $("#reg_step2").hide()                               
                                $("#reg_step5").show()
                                $("#active_tip").html("很抱歉，激活卡已被使用！")
                            } else {
                                $("#reg_step2").hide()
                                $("#reg_step5").show()
                                $("#active_tip").html("很抱歉，激活卡无效！")
                            }
                        }, "html")
                    } else {
                        $("#reg_step2").hide()
                        $("#reg_step5").show()
                        $("#active_tip").html("很抱歉，帐号无效！")
                    }
                }, 'json')
                $("#back").click(function() {
                    $("#reg_step2").show()
                    $("#reg_step5").hide()
                })
            }
            return false
        })
    },

    no_card: function(info) {
        $(".reg").hide()
        $("#reg_step3").show()
        $('.reg_account').html(info[0])
    },

    failed: function(info) {
        alert(info)
    },

    default_: function(info) {
        $("#txtPasswords").val("")
        $("#txtConfirm").val("")
        $("#txtValidate").val("")
        $("#regProcessTip").attr("class", "")
        alert(info)
    }
}

account_register_setting()



$(".reg input").focus(function() {
    $("#validateimg").css("display","inline")
})


function getflash(swf, w, h, id) {
    var object = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + w + '"' + 
        ' height="' + h + '" >' + 
        ' <param name="movie" value="' + swf + '" />' + 
        ' <!--[if !IE]>-->' + 
        ' <object type="application/x-shockwave-flash" data="' + swf + '"' + 
        ' width="' + w + '" height="' + h + '">' + 
        ' <!--<![endif]-->' + 
        ' <param name="wmode" value="transparent" />' + 
        ' <!--[if !IE]>-->' + 
        ' </object>' + 
        ' <!--<![endif]-->' + 
        ' </object>'

    $(id).html(object)
};

function getjwplayer(swf, w, h, id, position){
    if(!position){
        position = "over"
    }

    var object = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + 
        ' hidefocus="true" id="mediaplayer" width="' + w + '"' + 
        ' height="' + h + '"' + 
        ' bgcolor="#000000" name="mediaplayer" tabindex="0">' + 
        ' <param name="movie" value="http://v.nycs.syyx.com/jwplayer/player.swf">' + 
        ' <!--[if !IE]>-->' + 
        ' <object type="application/x-shockwave-flash" hidefocus="true"' + 
        ' data="http://v.nycs.syyx.com/jwplayer/player.swf" width="' + w + '"' + 
        ' height="' + h + '">' + 
        ' <!--<![endif]-->' + 
        ' <param name="allowfullscreen" value="true">' + 
        ' <param name="seamlesstabbing" value="true">' + 
        ' <param name="wmode" value="transparent" />' + 
        ' <param name="flashvars" value="netstreambasepath=' + document.location.href +
        '&id=mediaplayer&file=' + swf + 
        '&controlbar.position=' + position + 
        '&volume=41&autostart=true&repeat=SINGLE">' + 
        ' <!--[if !IE]>-->' + 
        ' </object>' + 
        ' <!--<![endif]-->' + 
        ' </object>'

    $(id).html(object)
};

function pepair_bigger_video(video_url, w, h) {
    $("#bigger_video").click(function(event) {
        $(document.body).append('<div id="pop_flash_dialog"><div id="pop_flash"></div></div>')
        getjwplayer(video_url, w, h, "#pop_flash") 
        $("#pop_flash_dialog").dialog({
            width       : w + 16,
            height      : h + 50,
            modal       : true,
            resizable   : false,
            dialogClass : "pop_video_detail",
            close       : function() {
                $("#pop_flash_dialog").remove();
            }
        });
        event.preventDefault()
    })
}

pepair_bigger_video('http://v.nycs.syyx.com/nycs/flv/bigvideo_642x342_20120530.flv', 640, 355)

getjwplayer('http://v.nycs.syyx.com/nycs/flv/tibuflash_186x106_20120530.flv', 186, 105, "#flash_video", "none");
getflash('http://s.syyx.com/events/201206/flash_but.swf', 186, 105, "#flash_cover")

function img_focus() {
    var imgfocus = 0
    for (var i = 4; i--;) {
        $("#game_intro_bar a").eq(i).mouseover(function(a) {
            return function() {
                $("#game_intro_bar a").eq(imgfocus).removeClass("check_" + imgfocus)
                $(this).addClass("check_" + a)
                $("#game_intro_pic img").eq(imgfocus).fadeOut("fast")
                var focus = $("#game_intro_pic img").eq(a)
                focus.fadeIn("fast")
                if(focus.attr("delay")){
                    $("#game_intro_pic").css("display","none")
                    focus.attr("src",focus.attr("delay"))
                    focus.removeAttr('delay')
                    focus.on('load',function(){
                        $("#game_intro_pic").css("display","block")
                        $(this).unbind('load')
                    })
                }
                imgfocus = a;
            }
        }(i))
    }
}
img_focus()

function img_scroll() {
    var scr = $(".snapshot_imgs") 
    $("#snapshot_left").click(function() {
        var po = scr.css("marginLeft")
        if (po == "-920px") {
            scr.animate({
                marginLeft: "0px"
            })
        }
    }) 
    $("#snapshot_right").click(function() {
        var po = scr.css("marginLeft")
        if (po == "0px" || po == "0") {
            scr.animate({
                marginLeft: "-920px"
            })
        }
    })
    $(".snapshot_frame a").lightBox();
}

img_scroll()