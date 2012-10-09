var controller = {}
//---------------定义编辑器---------------------------------------------------------------------------
var editor
//------------------------定义翻页------todo---------------------------------------------------------
var per_page_limit  = 20
var article_page    = {
    all       : 1,
    unpublish : 1
}
//dom_loaded-------------------------------------------------------------------------------------------
$(function(){
    //载入编辑器
    editor = load_editor()

    add_article_category()
    select_article_list()
    bind_event(my_bind)
    controller.page_turn()

})
//-----------------------------------------------------------------------------------------------------
//添加文章类别-添加完成后页面需刷新取得最新数据(todo:可改为不刷新页面)-------------------------------------------------------------------------------------
function add_article_category() {
    var $form_dialog = $('#sidebar .setting .add_article_category')
    var $target_form = $('#add_article_category_form')
    var $progress    = $form_dialog.find('.loading')
    var $result      = $form_dialog.find('.show_result')
    var $name_field  = $form_dialog.find('.article_category_content input')

    $('#sidebar .setting button.set').click(function() {
        $form_dialog.fadeIn()
    })

    $('#sidebar .setting .add_article_category footer button.grey').click(function(event) {
        event.preventDefault()
        $form_dialog.fadeOut()
    })

    $('#sidebar .setting .add_article_category footer input.blue').click(function(event) {
        var form_validity = document.getElementById('add_article_category_form').checkValidity()
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
                $result.show().delay('1000').fadeOut(function(){
                        $name_field.val('')
                        $form_dialog.fadeOut(function(){
                            location.href = location.href
                        })
                })
            }
        })
        event.preventDefault()
    })
}

//step1 选择新闻类别
function select_article_list() {
    var $meun_list              = $('#article_list_action .article_filter ul')
    var $showmenu_btn           = $('#article_list_action .filter_btn')
    var $article_category_meun  = $('#article_item_form ul.category_data_list')
    $.ajax({
        url     : '/article_category/find',
        success : function(data) {
            if( data.ok == 0 ) {
                return
            }


            $.each(data, function(index, value) {
                var article_category_templete = '<li><button data-id="' + value._id + '">'+ value.name + '</button></li>'
                // add defaule page by category
                article_page[value._id] = 1
                $meun_list.append(article_category_templete)
                $article_category_meun.append(article_category_templete)
            })

            var $category_button = $('#article_list_action .filter_menu button')

            $category_button.click(function() {
                get_article_list_by_category($(this).data('id'))
                $meun_list.fadeOut()
            })

            var $change_category_list_btn = $article_category_meun.find('button')
            $change_category_list_btn.click(function(event) {
                $change_category_list_btn.removeClass('selected')
                $(this).addClass('selected')
                $('#article_item_form input[name="category_id"]').val($(this).data('id'))
                $('#article_item_form a.category').html($(this).html())
                toggle_article_category_list()
                event.preventDefault()
                
            })

            //step2 获取已发布的全部文章
            get_article_list_by_category('all')
        }
    })

}
//获取该类别下的文章
function get_article_list_by_category(category_id) {
    var $select_btn = $('#article_list_action a.filter_btn')
    var $meun_btn   = $('#article_list_action .filter_menu button')
    $.ajax({
        url       : '/articles_by_category/' + category_id,
        data      : { page : parseInt(article_page[category_id],10) },
        success   : function(data) {
            if (data == null) {
                return
            }
            if (data.ok == 0 || data.total == 0) {
                alert('获取数据出错，请重试')
                return
            }

            var $target = $('#article_list_action .filter_menu button[data-id="'+ category_id +'"]')
            $select_btn.html($target.html())

            $meun_btn.removeClass('selected')
            $target.addClass('selected')
            $('.page_turn_btn_gruop').show()
            $('.page_turn_info .total').html(data.total)
            var current_begin_num = (article_page[category_id]-1)*per_page_limit + 1
            var current_end_num   = current_begin_num + data.list.length - 1
            $('.page_turn_info .current').html(current_begin_num + '-' + current_end_num)
            render_article_list(data.list)
        }
    })
}
//---controller--------------------------
controller.page_turn = function () {
    $('.page_turn_btn_gruop button.next').click(function(event) {
        var category_id     = get_current_category_id()
        console.log(get_current_category_id())
        var total           = parseInt($('.page_turn_info .total').html())
        var curent_last_num = parseInt($('.page_turn_info .current').html().split('-')[1])
        if (curent_last_num < total) {
            article_page[category_id] = parseInt(article_page[category_id],10) + 1
            get_article_list_by_category(category_id)

        } else {
            alert('已是最后一页')
        }
    })

    $('.page_turn_btn_gruop button.prev').click(function(event) {
        var category_id = get_current_category_id()
        var total           = parseInt($('.page_turn_info .total').html())
        var curent_first_num = parseInt($('.page_turn_info .current').html().split('-')[0])
        if (curent_first_num > per_page_limit) {
             article_page[category_id] = parseInt(article_page[category_id],10) - 1
             get_article_list_by_category(category_id)
        } else {
            alert('已是第一页')
        }
    })    
}

//-------------------------------------------------------------------------------------------------------------

//-工具函数-----------------------------------------------------------------------------------------------------
//显示操作面板
function show_or_hide_panel(show) {
    var $save_article_item_panel = $('#save_article_item_panel')
    var $panel_detail            = $('#detail_overlay')

    if (show) {
        $save_article_item_panel.show()
        $panel_detail.animate({
            left : 0
        })
    } else {
        $('#article_list .item_wrapper li').removeClass('editing') 
        $panel_detail.animate({
            left : -394
        },function() {
            $save_article_item_panel.hide()
        })
    }

}

//填充发布列表------------------------------------------
function render_article_list(data) {
    var $article_wrapper    = $('#article_list .item_wrapper')

    $article_wrapper.empty()

    $.each(data, function(index, value) {
        $article_wrapper.append(article_templete(value, 'http://nysj.syyx.com/news_content.html?'))
    })

    edit_item()

    function article_templete(value, article_url) {
        return '<li data-id="'
            + value._id
            + '"><a class="item_title" data-display_time="'
            + value.display_time
            + '" name="'
            + value.category_id
            + '" href="'
            + article_url + value._id
            + '">'
            + value.title
            + '</a><span class="date">'
            + value.display_time
            + '</span></li>'
    }
}
//----------改变操作面板上列表表单的数据相关------------------------------------
function toggle_article_category_list() {
    $('#article_item_form ul.category_data_list').slideToggle()
    $('#article_item_form a.category').toggleClass('open')
}
function get_current_category_id() {
    return $('#article_list_action .filter_menu button.selected').data('id')
}
function empty_article_option() {
    var $form = $('#article_item_form')
    $form.find('input[name="category_id"]').val('')
    $form.find('input[name="article_id"]').val('')
    $form.find('a.title').html('')
    $form.find('a.title').attr('href', '#')
    $form.find('input[name="display_time"]').val('')
    $form.find('ul.category_data_list button').removeClass('selected')
}
function fill_category_item_form(value) {
    var $form = $('#article_item_form')
    $form.find('input[name="category_id"]').val(value.category_id)
    $form.find('input[name="article_id"]').val(value.id)
    $form.find('input[name="display_time"]').val(webkit_handler(value.display_time))
    $form.find('a.title').html(value.title)
    $form.find('a.title').attr('href', value.link)
    $form.find('ul.category_data_list button').each(function() {
        if ($(this).data('id') == value.category_id) {
            $form.find('a.category').html($(this).html())
            $(this).addClass('selected')
        }
    })

    function webkit_handler(date) {
        if ($.browser.webkit) {
            return date.replace(/\//g,'-')
        } else {
            return date
        }
    }
}
//--------------------------编辑列表条目-------------------------------
function edit_item() {
    var $item         = $('#article_list .item_wrapper .item_title')
    
    $item.click(function(event) {
        var item = {
            id              :  $(this).parent().data('id'),
            title           :  $(this).html(),
            link            :  $(this).attr('href'),
            category_id     :  $(this).attr('name'),
            display_time    :  $(this).data('display_time')
        }
        $('#article_list .item_wrapper li').removeClass('editing') 
        $(this).parent().addClass('editing')
        empty_article_option()
        fill_category_item_form(item)
        show_or_hide_panel(true)
        event.preventDefault()
    })

}
//---------------------bind_event-------------------------------
function bind_event(bind_events) {
    for(var key in bind_events) {
        bind_events[key]()
    }
}
//-------------事件列表------------------------------------------
var my_bind = {
    //添加修改文章
    add_acticle   : function() {
        var $edit_article = $('#edit_article')       

        $('#save_article_item_button').click(function(event) {
            $('#edit_article header').html('添加文章').data('category_id','unpublish')
            $('#save_article_item_panel input[name="article_id"]').val('')
            $('#edit_article_form input[name="title"]').val('')
            editor.html('')
            $edit_article.fadeIn()
            event.preventDefault()
        })

        $edit_article.find('footer button.grey').click(function(event) {
            $edit_article.fadeOut()
        })

        $edit_article.find('footer input.blue').click(function(event) {
            var form_validity = document.getElementById('edit_article_form').checkValidity()
            if (!form_validity) {
                return
            }

            var $form_dialog = $('#edit_article')
            var $target_form = $('#edit_article_form')
            var $progress    = $form_dialog.find('.loading')
            var $result      = $form_dialog.find('.show_result')
            var $name_field  = $form_dialog.find('#edit_article_form input')

            editor.sync()

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
                            $form_dialog.fadeOut()
                        })
                    })
                    get_article_list_by_category($('#edit_article header').data('category_id'))
                }
            })
            event.preventDefault()
        })

    },
    //选择文章类别
    show_select_category : function() {
        var $meun_list       = $('#article_list_action .article_filter ul')
        var $showmenu_btn    = $('#article_list_action .filter_btn')

        $showmenu_btn.click(function(event) {
            $meun_list.fadeIn()
            event.preventDefault()
        })
    },
    //选择文章类别
    change_article_category :   function() {
        $('#article_item_form a.category').click(function(event) {
            toggle_article_category_list()
            event.preventDefault()
        })
    },
    //修改文章选项
    save_article_option : function() {
        var $save_btn     = $('#save_article_item_panel .panel_action input.save')
        var $target_form  = $('#article_item_form')
        var $progress     = $('#save_article_item_panel .panel_action .progress')

        $save_btn.click(function(event) {
            var form_validity = document.getElementById('article_item_form').checkValidity()
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
                    })

                    get_article_list_by_category($('#article_item_form input[name="category_id"]').val())
                }
            })

            event.preventDefault()
        })
    },
    //获取文章内容
    edit_article : function() {
        $('#article_item_form a.edit_article').click(function(event) {
            var article_id = $('#save_article_item_panel input[name="article_id"]').val()
            var category_id = $('#save_article_item_panel input[name="category_id"]').val()

            $('#edit_article header').html('编辑文章').data('category_id', category_id)
            $('#edit_article').fadeIn()
            $('#edit_article_form input[name="article_id"]').val(article_id)

            $.ajax({
                url         :  '/article/' + article_id,
                success     : function(data) {
                    $('#edit_article_form input[name="title"]').val(data.title)
                    editor.html(data.text)
                }
            })
            event.preventDefault()
        })
    },
    //关闭panel
    close_panel :  function() {
        $('.panel_action_bottom .close_panel').click(function(event) {
            show_or_hide_panel(false)
            event.preventDefault()
        })
    },
    //删除列表条目
    trash_article  :   function() {
        $('.panel_action_bottom .trash_item').click(function(event) {
            var article_id      = $('#article_item_form input[name="article_id"]').val()
            var category_id     = $('#article_item_form input[name="category_id"]').val()
            event.preventDefault()
            if (article_id) {
                var sure =  confirm('确认删除？')
                if (!sure) {
                    return
                } 
                $.ajax({
                    type    : 'delete',
                    url     : $(this).attr('href') + article_id,
                    success : function(data) {
                        if (data.ok == 1) {
                            alert('删除成功')
                            get_article_list_by_category(category_id)
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
    },
    //搜索新闻
    search_article :  function() {
        $('#search_article_input').keypress(function(event) {
            if (event.which == 13) {
                var form_validity = document.getElementById('search_article_form').checkValidity()
                if (!form_validity) {
                    event.preventDefault()
                    return
                }
                var category_id    = $('#article_list_action .filter_menu button.selected').data('id')
                var article_title  = $(this).val()
                var $target_form    = $('#search_article_form')
                $.ajax({
                    url     :  $target_form.attr('action'),
                    data    :  $target_form.serialize(),
                    success :  function(data) {
                        if (data.length < 1) {
                            alert('没有结果')
                            $('#search_article_input').focus()
                            return
                        } else {
                            $('.page_turn_btn_gruop').hide()
                            render_article_list(data)
                        } 
                    }                 
                })

                event.preventDefault()
            }
        })
    }
}
//载入富文本编辑器
function load_editor() {
    var editor = KindEditor.create('#article_text', {
        cssPath    : 'http://s.syyx.com.cn/plugins/kindeditor/plugins/code/prettify.css',
        uploadJson : '/kind_editor_upload_img',
        items      : ['source', 'justifyleft', 'justifycenter', 'justifyright', 'fontsize', 'forecolor', 'bold', 'underline', 'image', 'link', 'unlink']
    })

    $('#edit_article').hide()
    $('#edit_article').css('visibility','visible')
   return editor
}