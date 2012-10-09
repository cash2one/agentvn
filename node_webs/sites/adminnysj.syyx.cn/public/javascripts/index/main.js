//dom_loaded-------------------------------------------------------------------------------------------
$(function(){
    select_publish_list()
    
    add_publish_category()

    bind_event()

})
//-----------------------------------------------------------------------------------------------------

//step1 选择新闻类别
function select_publish_list() {
    var $meun_list       = $('#publish_list_action .publish_filter ul')
    var $showmenu_btn    = $('#publish_list_action .filter_btn')
    
    $.ajax({
        url     : '/publish_category/find',
        success : function(data) {
            if( data.ok == 0 ) {
                return
            }

            $.each(data, function(index, value) {
                $meun_list.append('<li><button name="'
                    + convert_to_blank(value.child_item)
                    + '" data-id="'
                    + value._id
                    + '">'
                    + value.name
                    + '</button></li>'
                )                
            })

            var $category_button = $('#publish_list_action .filter_menu button')
            var $first_category  = $category_button.first()

            $first_category.addClass('selected')
            $showmenu_btn.html($first_category.html())

            $category_button.click(function() {
                $category_button.removeClass('selected')
                $(this).addClass('selected')
                $showmenu_btn.html($(this).html())
                $meun_list.fadeOut()
                find_publish_category_child($(this).data('id'))
            })

            $showmenu_btn.click(function(event) {
                $meun_list.fadeIn()
                event.preventDefault()
            })
            //step2 获取该条目下的数据
            get_item_list_by_category($first_category.data('id'))
        }
    })

}
//获取该新闻类别下的条目
function get_item_list_by_category(category_id) {
    $.ajax({
        url       : '/publish_item/find',
        data      : { category_id : category_id },
        success   : function(data) {
            if(data.ok == 0) {
                alert('获取数据出错，请重试')
                return
            }

            render_publish_list(data)
        }
    })
}

function find_publish_category_child(category_id) {
    var $meun_list       = $('#publish_list_action .publish_filter ul')
    $.ajax({
        url     :  '/publish_category/find',
        data    :  { category_id : category_id },
        success :  function(data) {
            if (data.ok == 0) {
                alert('获取数据出错')
            } else {
               $meun_list.find('button.selected').attr('name', convert_to_blank(data.child_item))
            }
            get_item_list_by_category($meun_list.find('button.selected').data('id'))
        }

    })
}
//添加发布列表-添加完成后页面需刷新取得最新数据(todo:可改为不刷新页面)-------------------------------------------------------------------------------------
function add_publish_category() {
    var $form_dialog = $('#sidebar .setting .add_publish_category')
    var $target_form = $('#add_publish_category_form')
    var $progress    = $form_dialog.find('.loading')
    var $result      = $form_dialog.find('.show_result')
    var $name_field  = $form_dialog.find('.publish_category_content input')

    $('#sidebar .setting button.set').click(function() {
        $form_dialog.fadeIn()
    })

    $('#sidebar .setting .add_publish_category footer button.grey').click(function(event) {
        event.preventDefault()
        $form_dialog.fadeOut()
    })

    $('#sidebar .setting .add_publish_category footer input.blue').click(function(event) {
        var form_validity = document.getElementById('add_publish_category_form').checkValidity()
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

//-工具函数-----------------------------------------------------------------------------------------------------
//本地图片url
function createObjectURL(blob) {
    if (window.URL) {
        return window.URL.createObjectURL(blob)
    } else if (window.webkitURL) {
        return window.webkitURL.createObjectURL(blob)
    } else {
        return null
    }
}
//显示操作面板
function show_or_hide_panel(show) {
    var $save_publish_item_panel = $('#save_publish_item_panel')
    var $panel_detail            = $('#detail_overlay')

    if (show) {
        $save_publish_item_panel.show()
        $panel_detail.animate({
            left : 0
        })
    } else {
        $('#item_list .item_wrapper li,#published_item_list .item_wrapper li').removeClass('editing') 
        $panel_detail.animate({
            left : -394
        },function() {
            $save_publish_item_panel.hide()
        })
    }

}

//填充发布列表------------------------------------------
function render_publish_list(data) {
    var child_item            = $('#publish_list_action .publish_filter ul button.selected').attr('name')
    if (child_item == undefined) {
        return
    }
    var published_list_array  = child_item.split(',')
    var $published_wrapper    = $('#published_item_list .item_wrapper')
    var $unpublished_wrapper  = $('#item_list .item_wrapper')

    $published_wrapper.empty()
    $unpublished_wrapper.empty()

    var sort_published_item = []

    $.each(data, function(index, value) {
        if (published_list_array.indexOf(value._id) > -1) {
            sort_published_item[published_list_array.indexOf(value._id)] = value
        } else {
            $unpublished_wrapper.append(img_item(value))
        }
    })

    $.each(sort_published_item, function(index, value) {
        if (value) {
            $published_wrapper.append(img_item(value))
        }
    })

    dragg_item()

    edit_item()

    function img_item(value) {
        if (value.thumb_url) {
            return '<li draggable="true" data-id="'
                + value._id
                + '"><span class="drag_handle"></span><a class="list_thumb_preview" href="'
                + value.thumb_url 
                + '" target="_blank"><img src="'
                + value.thumb_url
                + '"/></a><a class="item_title" data-color="'
                + value.color
                + '" href="'
                + value.link
                + '">' 
                + value.title
                + '</a><div class="disnone">'
                + convert_to_blank(value.summary)
                + '</div></li>'
        } else {
            return '<li draggable="true" data-id="'
                + value._id
                + '"><span class="drag_handle"></span><a class="item_title" data-color="'
                + convert_to_blank(value.color)
                + '" href="'
                + value.link
                + '">' 
                + value.title
                 + '</a><div class="disnone">'
                + convert_to_blank(value.summary)
                + '</div></li>'
        }
    }
}
//----可以拖放列表条目-----------------------------------------------------
function dragg_item() {
    $('#item_list .item_wrapper li,#published_item_list .item_wrapper li').on({
        dragstart   : function(event) {
            event = event.originalEvent
            event.dataTransfer.setData('item', $(this).data('id'))
        },
        drop        : function(event) {
            event.stopPropagation()
            event.preventDefault()
            event = event.originalEvent
            var dragg_item_id = event.dataTransfer.getData('item')
            var dragg_item    = $('.item_wrapper li[data-id="' + dragg_item_id +'"]')
            if ($(this).data('id') == dragg_item_id) {
                return
            }

            $(this).before(dragg_item)
        },
        dragenter   : function(event) {
            event.stopPropagation()
            event.preventDefault()
        },
        dragover    : function(event) {
            event.stopPropagation()
            event.preventDefault()
        }
    })

    $('.section_bar').bind({
        drop        : function(event) {
            event.stopPropagation()
            event.preventDefault()
            event = event.originalEvent
            var dragg_item_id = event.dataTransfer.getData('item')
            var dragg_item    = $('.item_wrapper li[data-id="' + dragg_item_id +'"]')
            var $target_ul    = $(this).next().find('ul')
            if( $target_ul.find('li').length < 1 ) {
                $target_ul.append(dragg_item)
            }
        },
        dragenter   : function(event) {
            event.stopPropagation()
            event.preventDefault()
        },
        dragover    : function(event) {
            event.stopPropagation()
            event.preventDefault()
        }
    })
}
//----------改变操作面板上列表表单的数据相关------------------------------------
function change_category_item_form_id(category_id) {
    empty_category_item_form()
    $('#category_item_form input[name="category_id"]').val(category_id)
}

function get_current_category_id() {
    return $('#publish_list_action .publish_filter ul button.selected').data('id')
}

function fill_category_item_form(value) {
    var $form = $('#category_item_form')
    $form.find('input[name="item_id"]').val(value.id)
    $form.find('input[name="title"]').val(value.title)
    $form.find('input[name="color"]').val(value.color)
    $form.find('input[name="link"]').val(value.link)
    $form.find('textarea[name="summary"]').val(value.summary)
    $form.find('input[name="thumb_url"]').val(value.thumb_url)
    $('.thumb_preview img').attr('src', value.thumb_url)
}

function convert_to_blank(data) {
    if( data == undefined || data == null || data == '') {
        return ''
    } else {
        return data
    }
}
//清空操作面板
function empty_category_item_form() {
    var $form = $('#category_item_form')
    $form.find('input[name="item_id"]').val('')
    $form.find('input[name="title"]').val('')
    $form.find('input[name="color"]').val('')
    $form.find('input[name="link"]').val('')
    $form.find('textarea[name="summary"]').val('')
    $form.find('input[name="thumb_url"]').val('')
    $('.thumb_preview img').attr('src', '')
    $('#category_item_form input[name="category_id"]').val('')
}
//--------------------------编辑列表条目-------------------------------
function edit_item() {
    var $item         = $('#item_list .item_wrapper .item_title, #published_item_list .item_wrapper .item_title')
    
    $item.click(function(event) {
        var item = {
            id          :  $(this).parent().data('id'),
            title       :  $(this).html(),
            color       :  $(this).data('color'),
            link        :  $(this).attr('href'),
            summary     :  $(this).next().html(),
            thumb_url   :  $(this).prev().attr('href')
        }
        $('#item_list .item_wrapper li, #published_item_list .item_wrapper li').removeClass('editing') 
        $(this).parent().addClass('editing')
        change_category_item_form_id(get_current_category_id())
        fill_category_item_form(item)
        show_or_hide_panel(true)
        event.preventDefault()
    })

}
//---------------------bind_event-------------------------------
function bind_event() {
    my_bind.switch_section()
    my_bind.save_item_list()
    my_bind.insert_publish_item()
    my_bind.save_publish_item()
    my_bind.trash_item()
    my_bind.img_load()
}

var my_bind = {
    //开启收回section
    switch_section : function () {
        $('.section_bar .switch_section_btn').on('click', function(event) {
            var $target = $(this).parent().next()
            var is_closed = $(this).hasClass('closed')
            if (is_closed) {
                $target.show()
                $(this).removeClass('closed')
            } else {
                $target.hide()
                $(this).addClass('closed')
            }
        })
    },
    //保存发布列表
    save_item_list : function() {
        $('#save_publish_item_button').click(function(event) {
            var $list        = $('#published_item_list ul li')
            if ($list.length < 1) {
                var sure = confirm('发布列表无数据,确认发布？')
                if (!sure) {
                    return    
                }
            }

            var category      = {
                category_id     : get_current_category_id(),
                item_id_array   : []
            }
            $list.each(function() {
                var item_id    = $(this).data('id')
                category.item_id_array.push(item_id)
            })

            $.ajax({
                type     : 'post',
                url      : '/publish_category/upsert',
                data     : category,
                success  : function(data) {
                    if(data.ok == 1) {
                        alert('发布成功')
                        find_publish_category_child(category.category_id)
                    } else {
                        alert('发布失败')
                    }
                }
            })  
        })
    },
    // 新加新闻条目面板
    insert_publish_item  :  function() {
        var $add_button              = $('#insert_publish_itme_button')
        var $close_panel_btn         = $('.panel_action_bottom .close_panel')

        $add_button.click(function(event) {
            change_category_item_form_id(get_current_category_id())
            show_or_hide_panel(true)
        })

        $close_panel_btn.click(function(event) {
            show_or_hide_panel(false)
            event.preventDefault()
        })
    },
    //添加或者修改新闻条目
    save_publish_item : function() {
        var $save_btn     = $('#save_publish_item_panel .panel_action input.save')
        var $target_form  = $('#category_item_form')
        var $progress     = $('#save_publish_item_panel .panel_action .progress')

        $save_btn.click(function(event) {
            var form_validity = document.getElementById('category_item_form').checkValidity()
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
                    $progress.html('保存完成').fadeOut(1000, function() {
                        show_or_hide_panel(false)
                        $target_form.find('input').val('')
                        $target_form.find('textarea').html('')
                    })
                    get_item_list_by_category($('#publish_list_action .publish_filter ul button.selected').data('id'))
                }
            })

            event.preventDefault()
        })
    },
    //删除列表条目
    trash_item  :   function() {
        $('.panel_action_bottom .trash_item').click(function(event) {
            var item_id      = $('#category_item_form input[name="item_id"]').val()
            var category_id  = $('#category_item_form input[name="category_id"]').val()
            event.preventDefault()
            if (item_id) {
                if ($('#published_item_list li[data-id="' + item_id + '"]').length > 0 ) {
                    alert('不能直接删除已发布的内容')
                }  else {
                    var sure =  confirm('确认删除？')
                    if (!sure) {
                        return
                    } 
                    $.ajax({
                        type    : 'post',
                        url     : $(this).attr('href'),
                        data    : { item_id : item_id },
                        success : function(data) {
                            if (data.ok == 1) {
                                alert('删除成功')
                                get_item_list_by_category(category_id)
                                show_or_hide_panel(false)
                                empty_category_item_form()
                            } else {
                                alert('删除失败')
                            }
                        }  
                    })
                }
            } else {
                alert('没有内容可删除')
            }
        })
    },
    //上传图片
    img_load : function() {
        var $img_url_input    = $('#category_item_form input[name="thumb_url"]')
        var $upload_img       = $('.upload_img_input')
        var $thumb_upload_btn = $('.thumb button')
        var $loading          = $('.thumb .loading')
        var $result           = $('.thumb .result')
        var target_file

        $upload_img.change(function(event) {
            target_file = event.currentTarget.files[0]
            if (/image/.test(target_file.type)) {
                var url         = createObjectURL(target_file)
                $('.thumb_preview img').attr('src', url)
                $('.thumb_preview .size').html(target_file.name + ' / ' + target_file.size/1000 + 'kb')
            } else {
                alert('请选取本地图片')
                event.preventDefault()
            }
            
        })

        $thumb_upload_btn.click(function(event) {
            var file_form = new FormData()
            if(target_file) {
                file_form.append($upload_img.attr('name'), target_file)
                $loading.show()
                $.ajax({
                    type        : 'post',
                    url         : '/upload_file',
                    processData : false,
                    contentType : false,
                    data        : file_form,
                    success     : function(data) {
                        $loading.hide()
                        if (data.ok == 0) {
                            alert('上传失败')
                            return
                        }
                        
                        $result.show()
                        $result.fadeOut(2000)
                        $img_url_input.val(data.url)
                    } 
                })

            } else {
                alert('没有图片')
            }
        })
    }
}