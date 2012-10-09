//--------------------------------------------------------------------------------------------------------
// input_check.js
//--------------------------------------------------------------------------------------------------------
_G_all_input_checks = {
    //判断是否为空
    empty : function(value, check_info) {
        if (value == "") {
            return check_info.err_info
        }
    },

    //判断控件值字符长度是否在指定范围内
    length : function(value, check_info) {
        //判断是否在指定长度数组中_G_all_input_checks
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

    //正则判断
    regex : function(value, check_info) {
        if (!check_info.value.test(value)) {
            return check_info.err_info
        }
    },

    //判断两个值是否相等，side为server时为服务器判断
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
    },

    notequal:function(value, check_info) {
        //判断是否在指定长度数组中_G_all_input_checks   
        if (check_info.options) {
            for (var i in check_info.options) {
                if (value == check_info.options[i]) {
                    return check_info.err_info
                }
            }

            return
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
    {   name          : "account_name",  //名称
        input_id      : "txtUserAccount", //控件ID
        info_div_id   : "txtUserAccount", //错误提示ID
        status_div_id : "txtUserAccountTip", //错误提示状态图标ID
        clearvalue    : true, //获取焦点时是否清空
        //控件验证
        local_check   : [
            { type : 'empty', err_info : "请输入账号" },  //是否为空
            { type : 'length', min : 6, max : 16, err_info : "账号长度必须6-16位" , options :[20,12]},  //长度验证,options为长度数组,指定此值后min和max参数无效
            { type : 'regex', value : /^[A-Za-z0-9_]{6,16}$/, err_info : "只能为字母,数字,下划线" }  //正则表达式验证
        ],
        //服务器端验证,服务器返回{type:1}来判断,若返回{type:0} 为验证通过
        remote_check  : {
            url      : '/account_check',
            1        : '该账号已经存在'
        }
    },
    {   name             : "password",
        input_id         : "txtPasswords",
        info_div_id      : "txtPasswordsVal",
        status_div_id    : "txtPasswordsTip",
        info_cover_input : true,  //控件为密码且错误提示也显示在控件上时设置此值,此时需要在附近创建ID为info_div_id的文本框控件,如：<input id="txtpwdVal" type="text" style="display: none;" />
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
            { type : 'equal', value : "txtPasswords", err_info : "两次输入的密码不一致" } //指定side判断类型,server:value指定的提交参数(req)判断,session:与value指定的session值判断,空:与页面中value指定的控件判断
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
            { type : 'length', min : 4, max : 4, err_info : false, len : 4 }
        ],
        remote_check  : {
            url : "",
            1   : ""
        }
    },
    {   name          : "checkboxsel",
        input_id      : "txtCheckbox",
        info_div_id   : "txtCheckboxVal",
        status_div_id : "txtCheckboxVal",
        input_type    : "checkbox",  //设置控件类型,除了文本框,需要设置此值
        local_check   : [
            { type : 'length', min : 1, max : 3, err_info : "请选择" }
        ]
    },
    {   name          : "radiosel",
        input_id      : "txtradio",
        info_div_id   : "radioselVal",
        status_div_id : "radioselVal",
        input_type    : "radio",  //设置控件类型
        local_check   : [
            { type : 'length', min : 1,  err_info : "请选择" }
        ]
    },
    {   name          : "selectname",
        input_id      : "txtselect",
        info_div_id   : "selectVal",
        status_div_id : "selectVal",
        input_type    : "select",  //设置控件类型
        local_check   : [
            { type : 'notequal',  err_info : "请选择", options:["",0] }   //设置不能等于某些值
        ]
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
//设置控件焦点样式
function input_highlight_background(input) {
    input.addClass(input_config.background_highlight_class)
}

//取消控件焦点样式
function input_recover_background(input) {
    input.removeClass(input_config.background_highlight_class)
}
//--------------------------------------------------------------------------------------------------------
//移除控件错误样式
function input_recover(input, input_data) {
    var input_err = input.hasClass(input_config.error_tag_class)
    var input_clearvalue = true

    if(input_data.clearvalue != undefined){
        input_clearvalue = input_data.clearvalue
    }
    
    //如果控件验证错误
    if (input_err) {
        //移除错误样式
        input.removeClass(input_config.error_tag_class)
        if(input_clearvalue){
            input.val("")
        }
        //删除错误提示
        //$('#'+input_data.info_div_id).html("")
        var status_div_id = input_data.status_div_id
        //取消错误图标样式
        if (status_div_id) {
            status_div_id = '#' + status_div_id
            $(status_div_id).attr('class', '')
        }
    }
}
//--------------------------------------------------------------------------------------------------------
//显示验证成功样式
function input_check_ok(input, input_data) {
    var status_div_id = input_data.status_div_id
    if (status_div_id) {
        status_div_id = '#' + status_div_id
        $(status_div_id).attr("class", input_config.status_class.ok)
    }
}

//显示错误信息及样式
function input_check_error(input, input_data, err_info) {

    //控件添加错误样式
    input.addClass(input_config.error_tag_class)

    //显示错误图标样式
    var status_div_id = input_data.status_div_id
    if (status_div_id) {
        status_div_id = '#' + status_div_id
        $(status_div_id).attr("class", input_config.status_class.error)
    }

    var info_div_id = input_data.info_div_id
    if (info_div_id) {
        info_div_id = '#' + info_div_id

        //如果错误提示控件是文本框且隐藏状态，则隐藏原控件(仅用于密码),显示错误提示控件
        if ($(info_div_id).is(":hidden") && input_data.info_cover_input) {
            input.hide()
            $(info_div_id).show()
            $(info_div_id).addClass(input_config.error_tag_class)
        }

        //设置错误提示文字
        if (err_info) {
            if(!$(info_div_id).is("input")){
                $(info_div_id).html(err_info)
            }
            else{
                $(info_div_id).val(err_info)
            }
        }
    }

}
//--------------------------------------------------------------------------------------------------------
//取值
function input_local_getvalue(input, input_data){
    var value = []
    var ti = 0
    switch(input_data.input_type){
        case "checkbox":
        case "radio":
            $("input[name=" + input_data.name +"]:checked").each(function(){
                value[ti]=$(this).val()
                ti++
            })
            break
        case "select":
            $('#' + input_data.input_id + " option:selected").each(function(){
                value[ti]=$(this).val()
                ti++
            })
            break
        default:
            value = input.val()
    }

    return value
}
//--------------------------------------------------------------------------------------------------------
//客户端验证控件值
function input_local_check(input, input_data) {
    var value = input_local_getvalue(input, input_data)

    //循环验证控件值
    for (var i in input_data.local_check) {
        var check_info = input_data.local_check[i]
        var key = check_info.type
        var check_func = input_local_check_func[key]

        //调用验证方法
        var err_info = check_func(value, check_info)
        if (err_info !== undefined) {
            input_check_error(input, input_data, err_info)
            return false
        }
    }

    input_check_ok(input, input_data)

    return true
}

//服务器端验证
function input_remote_check(input, input_data) {
    //不用服务器端验证
    if (!input_data.remote_check) {
        return true
    }

    var value = input_local_getvalue(input, input_data)
    var check_url = input_data.remote_check.url

    //设置验证加载样式
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
            //获取错误文字
            var err_info = input_data.remote_check[data.type + '']
            input_check_error(input, input_data, err_info)
        }
        
    });
}
//--------------------------------------------------------------------------------------------------------
//显示验证码
function input_show_pic(input, input_data) {
    get_captcha(captcha_dom)

    $('#' + input_data.pic_img.id).show()
}

//检测验证码
function input_pic_setting(input, input_data) {
    var input_id = '#' + input_data.input_id
    var img_id = '#' + input_data.pic_img.id
    var img_len = input_data.pic_img.len || 4
    //$(img_id).attr("src", input_data.pic_img.src + "?r=" + Math.random())

    $(input_id).keyup(function() {
        //超过验证码位数时检测
        if($(input_id).val().length >= img_len){
            //客户端验证码检测
            var ret = input_local_check(input, input_data)
            if (!ret) {
                return
            }
            //

            //服务器端验证码检测
            input_remote_check(input, input_data)
        }
        
    })
    
    //点击刷新验证码    
    $(img_id).click(function() {
        var status_div_id = '#' + input_data.status_div_id
        $(img_id).attr("src", input_data.pic_img.src + "?r=" + Math.random())
        //$(status_div_id).attr("class", input_config.status_class.error)
        $(status_div_id).removeClass(input_config.status_class.error)
        $(input_id).val("")
    })
}
//--------------------------------------------------------------------------------------------------------
//设置错误提示控件焦点事件
function input_info_cover_input_setting(input, input_data) {
    var info_div_id = input_data.info_div_id
    if (info_div_id) {
        info_div_id = '#' + info_div_id
        //当获得焦点时，隐藏错误提示控件，显示原输入框控件
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
//焦点事件
function input_focus(input,input_data){
    //获取验证码
    get_captcha(captcha_dom)

    //是否有验证码
    if (input_data.pic_img) {
        input_show_pic(input, input_data)
    }

    //设置控件焦点样式
    input_highlight_background(input)
    //移除控件错误样式
    input_recover(input, input_data)
}
//--------------------------------------------------------------------------------------------------------
//离开焦点事件
function input_blur(input,input_data){
    //取消控件焦点样式
    input_recover_background(input)

    //是否是验证码
    if (input_data.pic_img) {
        return
    }

    $('#'+input_data.info_div_id).html("")

    //客户端验证控件值
    var ret = input_local_check(input, input_data)
    if (!ret) {
        return
    }

    //服务器端验证
    input_remote_check(input, input_data)
}
//--------------------------------------------------------------------------------------------------------
//设置初始加载验证
function input_setting(input_data) {
    var input_id = '#' + input_data.input_id
    var input = $(input_id)

    input.val("")

    //焦点事件
    switch(input_data.input_type){
        case "checkbox":
        case "radio":
            $("input[name=" + input_data.name +"]").each(function(){
                $(this).click(function() {
                    input_focus(input,input_data)
                })
                $(this).click(function() {
                    input_blur(input,input_data)
                })
            })
            
            break
        default:
            input.focus(function() {
                input_focus(input,input_data)
            })
            input.blur(function() {
                input_blur(input,input_data)
            })
    }

    

    //若有验证码则需要检测
    if (input_data.pic_img) {
        input_pic_setting(input, input_data)
    }

    //若错误提示是文本框且是密码,则在错误提示控件中加入焦点事件,info_cover_input=true
    if (input_data.info_cover_input) {
        input_info_cover_input_setting(input, input_data)
    }
}
//--------------------------------------------------------------------------------------------------------
//前端验证初始化
function input_setting_inputs(inputs_data) {
    //for(var j in inputs_data) {
    //    if(inputs_data[j].pic_img){
    //       captcha_dom = inputs_data[j]
    //    }
    //}

    //循环读取控件
    for (var i in inputs_data) {
        //如果有验证码,附值给一个变量
    	if(inputs_data[i].pic_img){
           captcha_dom = inputs_data[i]
        }

        var input_data = inputs_data[i]
        input_setting(input_data)
    }

}
//--------------------------------------------------------------------------------------------------------
//组装需要提交的参数
function input_get_inputs_value(inputs_data) {
    var ret = false

    for (var i in inputs_data) {
        var input_data = inputs_data[i]
        var input_id = '#' + input_data.input_id
        var key = input_data.name
        var value = input_local_getvalue($(input_id), input_data)

        ret = ret || {}
        ret[key] = value
    }

    return ret
}
//--------------------------------------------------------------------------------------------------------
//验证所有客户端,在提交时触发
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
//检查所有控件状态
function input_status_check(inputs_data) {
    var ret = true

    for (var i in inputs_data) {
        var input_data = inputs_data[i]
        //检查控件状态
        var status     = check_unit_status(input_data)
        
        if(status == false) {
            ret = false
            break
        }  
    }

    return ret
}
//--------------------------------------------------------------------------------------------------------
//获取验证码
function get_captcha(input_data) {
    if(input_data){
        var img_id = '#' + input_data.pic_img.id
        if (!$(img_id).attr("src")) {
            $(img_id).attr("src", input_data.pic_img.src + "?r=" + Math.random())
        }
    }
}
//------------------------------------------------------------------------------------------------
//检查控件状态
function check_unit_status(input_data) {            //  add by jiangxi
    var status_div_id = '#' + input_data.status_div_id
    var ok_status     =  $(status_div_id).hasClass(input_config.status_class.ok)
    
    if(ok_status) {
        return true
    } 

    //以下代码只用于在提交时验证是否是验证码控件
    if(!input_data.pic_img) {
        return false
    }

    var input_id     = '#' + input_data.input_id
    var char_num     = $(input_id).val().length

    if(char_num != 4) {
        //return false 
    }
    
    var err_status   = $(status_div_id).hasClass(input_config.status_class.error)
    var check_status = $(status_div_id).hasClass(input_config.status_class.checking)
    
    if(err_status || check_status) {
        return false
    }

    return true
    
}
//------------------------------------------------------------------------------------------------
function default_set(){
    var jiathis_config={
        data_track_clickback:true,
        siteNum:15,
        sm:"qzone,tsina,tqq,renren,kaixin001,tieba,douban,tsohu,t163,feixin,xiaoyou,msn,tianya,mop",
        summary:"",
        boldNum:6,
        ralateuid:{
            "tsina":"nuoyachuanshuo"
        },
        showClose:true,
        hideMore:false
    }
    
    $("#login_out").click(function(){
        $.get("/login_out?r=" + Math.random(), function(data) {
            document.location.reload() 
        })
    })
    
    $("#map2").click(function(){
        $.get("/check_user_login?r=" + Math.random(), function(data) {
            if(!data.login){
                login()
                return
            }
            document.location="http://party.syyx.com/nycs/sing/uploadsing.html#tp"
        })
    })

    $("#topcy").click(function(){
        $.get("/check_user_login?r=" + Math.random(), function(data) {
            if(!data.login){
                login()
                return
            }
            document.location="http://party.syyx.com/nycs/sing/uploadsing.html#tp"
        })
    })
    

    $(".div_close").click(login_close)

    //判断登录
    $.get("/check_user_login?r=" + Math.random(), function(data) {
        if(!data.login){
            //login()
        }
        else{
            $("#login_a").show()
            $("#user_name").html(data.UserAccount)
        }
    })
}

function vote(id){
    var tops = document.documentElement.scrollTop || document.body.scrollTop;
    $("#iframe").attr("src","/nycs/sing/vote.html?id=" + id)
    //document.domain = "syyx.com";
    //document.getElementById("iframe").contentWindow.document.location.reload()
    $("#popup_bg").css("display", "block")
    $("#div_login").css("top", tops + 80)
    $("#div_login").css("display", "block")
    //$("#div_login").fadeIn("fast")
    $("html").scrollTop( $("html").scrollTop() + 1)
    $("body").scrollTop( $("body").scrollTop() + 1)
}

function login_close() {
    $("#div_login").css("display", "none")
    //$("#div_login").fadeOut("fast");
    $("#popup_bg").css("display", "none")
}

function login(){
    var tops = document.documentElement.scrollTop || document.body.scrollTop;
    $("#iframe").attr("src","/nycs/sing/login.html?type=up")
    //document.domain = "syyx.com";
    //document.getElementById("iframe").contentWindow.document.location.reload()
    $("#popup_bg").css("display", "block")
    $("#div_login").css("top", tops + 80)
    $("#div_login").css("display", "block")
    //$("#div_login").fadeIn("fast")
    $("html").scrollTop( $("html").scrollTop() + 1)
    $("body").scrollTop( $("body").scrollTop() + 1)
}