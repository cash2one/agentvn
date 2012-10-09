//------------------------------------------------
$(function() {
    get_mobild_code()
    submit_activate_form()
    copy_code()
    submit_activate_account_form()
    open_reg()
    global_setting()
    auto_fill_code_and_account()
})

function get_mobild_code() {
    $('.mobile input').val('')
    $('.mobile_code  input').val('')
    $('.mobile_code  .send_tip').html('')
    $('#get_code_step_1 .answer input').attr('checked', false)

    bind_send()

    function bind_send() {
        $('#get_mobile_code').on('click', function(event) {
            send_mobile_num()
            event.preventDefault()
        })
    }
    
    function send_mobile_num() {
        var mobile_num = $('.mobile input').val()
        var mobile_partten = /^(1(([35][0-9])|(47)|[8][01236789]))\d{8}$/
        if (mobile_partten.test(mobile_num)) {
            $.ajax({
                type        : 'post',
                beforeSend  : function(xhr) {
                    $('.mobile_code .send_tip').html('请稍候...')
                    $('#get_mobile_code').unbind()
                },
                url         : '/get_mobile_code',
                data        : { mobile_number : mobile_num },
                success     : function(data) {
                    if(data.ok == 1) {
                        $('.mobile_code .send_tip').html('验证码已发送')
                    } else {
                        $('.mobile_code .send_tip').html(data.info)
                    }
                    bind_send()
                }
            })
        } else {
            alert('手机号码不正确')
            $('.mobile input').val('')
        }
    }
}

function submit_activate_form() {
    $('.submit_step1 a').click(function(event) {
        event.preventDefault()
        var mobile_partten = /^(1(([35][0-9])|(47)|[8][01236789]))\d{8}$/
        var params = $('#get_code_step_1 form').serializeArray()
        if (params[0].name !== 'q1') {
            alert('请选择第一题答案')
            return
        }

        if (params[1].name !== 'q2') {
            alert('请选择第二题答案')
            return
        }

        if (params[2].value == '' || !mobile_partten.test(params[2].value)) {
            alert('请填入正确的手机号码')
            return
        }

        if (params[3].value == '' || params[3].value.length !== 6) {
            alert('请填入正确的短信验证码')
        }

        $.ajax({
            type        : 'post',
            url         : '/get_activate_code',
            data        :  $('#get_code_step_1 form').serialize(),
            beforeSend  : function(xhr) {
                $('.submit_step1 span').html('提交中...')
            },
            success     : function(data) {
                if (data == null) {
                    $('.submit_step1 span').html('提交数据不正确')
                    return
                }

                if (data.ok == 0) {
                    $('.submit_step1 span').html(data.info)
                    return
                }

                $('#get_code_step_1').hide()

                if (data.ok == 4) {
                    $('#get_code_result_1').show()
                    return
                }

                if (data.ok == 1) {
                    $('#get_code_result_2').show()
                    return
                }

                if (data.ok == 2) {
                    $('#get_code_result_3 span').html(data.info)
                    $('#get_code_result_3').show()
                    return
                }

                $('.submit_step1 span').html('请稍候再试')
                $('#get_code_step_1').show()
            }
        })
        
    })
}

function copy_code() {
    $('#get_code_result_3 a').click(function(event) {
        var copyText = $('#get_code_result_3 span').html()
        if ($.browser.msie) { 
            window.clipboardData.setData("Text", copyText)
            alert("复制成功")
        } else { 
            alert("不支持此浏览器,请手动复制")
        }
        event.preventDefault()
    })
}

function submit_activate_account_form() {
    $('#activate_failure_btn').click(function(event) {
        $('#activate_result_2').hide()
        $('#activate_form').show()
        event.preventDefault()
    })
    $('#activate_form input').val('')
    $('.activate_form_submit_btn a').click(function(event) {
        event.preventDefault()
        var params          = $('#activate_form form').serializeArray()
        var account_partten = /^[A-Za-z0-9_]{6,16}$/
        if (params[0].value == '') {
            alert('请填入激活码')
            return
        }

        if (params[1].value == '') {
            alert('请填入游戏帐号')
            return
        }

        if (!account_partten.test(params[1].value)) {
            alert('游戏账号不正确')
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
                    $('.activate_form_submit_btn span').html('')
                    return
                }

                if (data.ok == 2) {
                    $('#activate_result_2 p').html(data.info)
                    $('#activate_result_2').show()
                    $('.activate_form_submit_btn span').html('')
                    return
                }

                $('.activate_form_submit_btn span').html('请稍候再试')
                $('#activate_form').show()
            }
        })
        
    })
}

function open_reg() {
    $('.reg_tip a').click(function(event){
        $('#float_reg_btn').hide()
        $('#float_reg_panel').show()
        event.preventDefault()
    })
}

//---------------------------------------------------------------------------------------
function global_setting() {
    //去掉链接虚线
    $("a").attr("hideFocus", "true");
}

function auto_fill_code_and_account() {
    var code = get_query_value('active')
    var user = get_query_value('user')
   
    if (code) {
        $('#activate_form input[name="code"]').val(code)
    }

    if (user) {
        $('#activate_form input[name="account"]').val(user)
    }
}

function get_query_value(query_key) {
    var query_str = location.search.substring(1)

    if (query_str == '' || query_str == undefined) {
        return
    }

    var key_value_group = query_str.split('&')

    for(var i = 0 ; i < key_value_group.length; i++) {
        var key   = key_value_group[i].split('=')[0]
        var value = key_value_group[i].split('=')[1]
        if (key == query_key) {
            return value
        }
    }
}