//dom_loaded-------------------------------------------------------------------------------------------
$(function(){

    add_client_category()
    get_client_list()
    bind_event(my_bind)

})
//-----------------------------------------------------------------------------------------------------
//添加客户端下载类别---添加完成后页面需刷新取得最新数据(todo:可改为不刷新页面)-------------------------------------------------------------------------------------
function add_client_category() {
    var $form_dialog = $('#sidebar .setting .add_client_category')
    var $target_form = $('#add_client_category_form')
    var $progress    = $form_dialog.find('.loading')
    var $result      = $form_dialog.find('.show_result')
    var $name_field  = $form_dialog.find('.article_client_content input')

    $('#sidebar .setting button.set').click(function() {
        $form_dialog.fadeIn()
    })

    $('#sidebar .setting .add_client_category footer button.grey').click(function(event) {
        event.preventDefault()
        $form_dialog.fadeOut()
    })

    $('#sidebar .setting .add_client_category footer input.blue').click(function(event) {
        var form_validity = document.getElementById('add_client_category_form').checkValidity()
        if (!form_validity) {
            return
        }

        $.ajax({
            type        : 'post',
            data        : $target_form.serialize(),
            url         : $target_form.attr('action'),
            beforeSend  : function(xhr) {
                $progress.show()
            },
            success     : function(data) {
                $progress.hide()
                $result.show(function(){
                    $result.fadeOut(1000, function() {
                        $name_field.val('')
                        $form_dialog.fadeOut(function(){
                            location.href = location.href
                        })
                    })
                })
            }
        })
        event.preventDefault()
    })
}
//获取全部客户端类型
function get_client_list() {
    $.ajax({
        url       : '/client/find',
        success   : function(data) {
            if (data == null) {
                return
            }
            if (data.ok == 0) {
                alert('获取数据出错，请重试')
                return
            }
            render_client_list(data)
        }
    })
}
//-------------------------------------------------------------------------------------------------------------

//-工具函数-----------------------------------------------------------------------------------------------------
//显示操作面板
function show_or_hide_panel(show) {
    var $save_client_option_panel = $('#save_client_option_panel')
    var $panel_detail            = $('#detail_overlay')

    if (show) {
        $save_client_option_panel.show()
        $panel_detail.animate({
            left : 0
        })
    } else {
        $('#client_list .item_wrapper .item_title').removeClass('editing') 
        $panel_detail.animate({
            left : -394
        },function() {
            $save_client_option_panel.hide()
        })
    }

}

//填充客户端列表------------------------------------------
function render_client_list(data) {
    var $client_wrapper    = $('#client_list .item_wrapper')

    $client_wrapper.empty()

    $.each(data, function(index, value) {
        $client_wrapper.append(client_templete(value))
    })

    edit_item()

    function client_templete(value) {
        return '<li><a class="item_title" name="'
            + value.link
            + '" href="'
            + value._id
            + '"><h3 name="'
            + value.md5
            + '">'
            + value.name
            + '</h3><span class="downloads">下载：'
            + value.downloads
            + '</span><span class="install">安装：'
            + value.install
            + '</span><span class="client_size">'
            + value.size
            + '</span><span class="client_version">'
            + value.version
            + '</span></a></li>'
    }
}
//--------------------------编辑列表条目-------------------------------
function edit_item() {
    var $item         = $('#client_list .item_wrapper .item_title')
    
    $item.click(function(event) {
        var item = {
            id          :  $(this).attr('href'),
            link        :  $(this).attr('name'),
            name        :  $(this).find('h3').html(),
            size        :  $(this).find('.client_size').html(),
            version     :  $(this).find('.client_version').html(),
            md5         :  $(this).find('h3').attr('name')
        }
        $('#client_list .item_wrapper .item_title').removeClass('editing') 
        $(this).addClass('editing')
        empty_client_option_form()
        fill_client_option_form(item)
        show_or_hide_panel(true)
        event.preventDefault()
    })
}
function empty_client_option_form() {
    var $form = $('#client_option_form')
    $form.find('input[name="client_id"]').val('')
    $form.find('input[name="name"]').val('')
    $form.find('input[name="size"]').val('')
    $form.find('input[name="version"]').val('')
    $form.find('input[name="md5"]').val('')
    $('#client_link_group').empty()

}
function fill_client_option_form(value) {
    var $form = $('#client_option_form')
    $form.find('input[name="client_id"]').val(value.id)
    $form.find('input[name="name"]').val(value.name)
    $form.find('input[name="size"]').val(value.size)
    $form.find('input[name="version"]').val(value.version)
    $form.find('input[name="md5"]').val(value.md5)
    var link_array = value.link.split(',')
    var downloads_textarea = ''
    $.each(link_array, function(index, value) {
        if (index == link_array.length - 1) {
            downloads_textarea = value + downloads_textarea 
        } else {
            downloads_textarea = '\r\n' + value + downloads_textarea
        }
    })
    $('#client_link_group').val(downloads_textarea)
}
//---------------------bind_event-------------------------------
function bind_event(bind_events) {
    for(var key in bind_events) {
        bind_events[key]()
    }
}
//-------------事件列表------------------------------------------
var my_bind = {
    //修改客户端选项
    save_client_option : function() {
        var $save_btn     = $('#save_client_option_panel .panel_action input.save')
        var $target_form  = $('#client_option_form')
        var $progress     = $('#save_client_option_panel .panel_action .progress')

        $save_btn.click(function(event) {
            var form_validity = document.getElementById('client_option_form').checkValidity()
            if (!form_validity) {
                return
            }
            $.ajax({
                type        : 'post',
                data        : $target_form.serialize(),
                url         : $target_form.attr('action'),
                beforeSend  : function(xhr) {
                    $progress.show()
                },
                success     : function(data) {
                    if (data.ok !== 1) {
                        alert('保存失败')
                        return
                    }

                    $progress.html('保存完成').delay(1000).fadeOut(function() {
                        show_or_hide_panel(false)
                    })

                    get_client_list()
                }
            })

            event.preventDefault()
        })
    },
    //关闭panel
    close_panel :  function() {
        $('.panel_action_bottom .close_panel').click(function(event) {
            empty_client_option_form()
            show_or_hide_panel(false)
            event.preventDefault()
        })
    },
    //删除列表条目
    trash_client  :   function() {
        $('.panel_action_bottom .trash_item').click(function(event) {
            var client_id      = $('#client_option_form input[name="client_id"]').val()
            event.preventDefault()
            if (client_id) {
                var sure =  confirm('确认删除？')
                if (!sure) {
                    return
                } 
                $.ajax({
                    type    : 'post',
                    url     : $(this).attr('href'),
                    data    : { client_id : client_id },
                    success : function(data) {
                        if (data.ok == 1) {
                            alert('删除成功')
                            get_client_list()
                            show_or_hide_panel(false)
                        } else {
                            alert('删除失败')
                        }
                    }  
                })
            } else {
                alert('没有内容可删除')
            }
        })
    }
}