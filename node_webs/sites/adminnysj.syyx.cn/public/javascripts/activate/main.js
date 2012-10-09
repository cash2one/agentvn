var page_by_date = 0
//dom_loaded-------------------------------------------------------------------------------------------
$(function(){
    get_detail()
    activate_setting()
    switch_section()
})
//-----------------------------------------------------------------------------------------------------
function get_detail() {
    $('#get_more_detail').click(function(event) {
        get_code_detail()
        event.preventDefault()
    })

    get_code_detail()
}
function activate_setting() {
    $.ajax({
        url         : 'activate_setting',
        success     : function(data) {
            if (data) {
                $('#activate_setting_form input[type="hidden"]').val(data._id)
                $('#activate_setting_form input[type="number"]:eq(0)').val(data.perhour_max_count)
                $('#activate_setting_form input[type="number"]:eq(1)').val(data.perminute_max_count)
            }
        }
    })
    $('#activate_setting_form input[type="submit"]').click(function(event) {
        var form_validity = document.getElementById('activate_setting_form').checkValidity()
        if (!form_validity) {
            return
        }
        $.ajax({
            type        : 'post',
            data        : $('#activate_setting_form').serialize(),
            url         : $('#activate_setting_form').attr('action'),
            success     : function(data) {
                alert('设置成功')
            }
        })
        event.preventDefault()
    })
}

function get_code_detail() {
    $.ajax({
        type        : 'get',
        url         : '/activate_detail',
        data        : { page : page_by_date},
        success     : function(data) {
            
            if (data.length < 1) {
                page_by_date++
                alert("没有数据")
                return
            }

            
            $('#client_list').append('<div class="section_bar"><button class="switch_section_btn"></button><span class="section_name">'
                + data[0].created_time
                + '</span><a href="'
                + '/exports_code_detail?data_distance='
                + page_by_date 
                + '">导出</a></div>')

            $('#client_list').append('<table><tr><th>激活码<span>('
                + count_key_num(data, 'code')
                + ')</span></th><th>参与手机<span>('
                + count_key_num(data, 'mobile_number')
                + ')</span></th><th>问题一</th><th>问题二</th><th>中奖时间</th><th>激活<span>('
                + count_key_num(data, 'sended_time')
                + ')</span></th><th>账号</th></tr></table>')

            $.each(data, function(index ,value) {
                $('#client_list table:last').append('<tr><td>'
                    + convert_to_blank(value.code)
                    + '</td><td>'
                    + value.mobile_number
                    + '</td><td>'
                    + value.question1
                    + '</td><td>'
                    + value.question2
                    + '</td><td>'
                    + convert_to_blank(value.get_time)
                    + '</td><td>'
                    + convert_to_blank(value.sended_time)
                    + '</td><td>'
                    + convert_to_blank(value.account)
                    + '</td></tr>')
            })

            page_by_date++
        }
    })
}

function convert_to_blank(data) {
    if (data == undefined) {
        return ''
    } else {
        return data
    }
}

function count_key_num(data, key) {
    var total = 0
    data.forEach(function(item, index, array) {
        if (item[key]) {
            total++
        }
    })

    return total
}

function switch_section() {
    $('#client_list').delegate('.switch_section_btn','click', function(event) {
        var $target   = $(this).parent().next()
        var is_closed = $(this).hasClass('closed')
        
        if (is_closed) {
            $target.show()
            $(this).removeClass('closed')
        } else {
            $target.hide()
            $(this).addClass('closed')
        }
    })
}