//-----------------
//-------dom_loaded----------------------------------------------------------------------------
$(function() {
    //获取新闻列表
    get_news_by_class()
    
    //切换新闻列表
    switch_news_class()

    //获取活动中心数据
    get_news_activity()
})

function get_url_page(){
    var npage
    if(location.search) {
        npage = location.search.substring(1)
    }
    else{
        npage = 1
    }
    return npage
}

function get_news_by_class() {

    var classid = location.hash
    if(classid) {
        $('.border a').each(function(){
            if($(this).attr('href') == classid) {
                $(this).addClass('selected')
            }
        })
        classid = location.hash.substring(1)
        get_all_news(classid, get_url_page())
    }
    else {
        $('.border a:eq(0)').addClass('selected')
        get_all_news(0,get_url_page())
    }
}

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

function get_all_news(class_id, page_num) {

    var news_list_dom =  $('ul.news_list')

    $.ajax({
        data     : {
            classid : class_id,
            page    : page_num,
            pagesize: 20
        },
        dataType : 'jsonp',
        url      : remote_server_url_list.get_usercenter_list,
        success  : function(data){
            if($.isEmptyObject(data)){
                location.href = 'http://nycs.syyx.com/' 
                return
            }

            render_news_list(data)
        }
    })

    function render_news_list(news) {

        position_page_btn(page_num, news.all_page, class_id)

        news_list_dom.html('')
        $.each(news.articlelist, function(index, value) {
            if (index % 5 == 0 && index !== 0) {
                news_list_dom.append('<li class="gap"></li>')
            }
            news_list_dom.append('<li><span>' + value.AddTime.split('&nbsp;')[0].toString() + '</span><a target="_blank" href=http://nycs.syyx.com/usercenter/article_list.html?1#' + value.ClassID + '>[' + value.ClassName + ']&nbsp;</a><a target="_blank" href="' + value.Url + '">' + value.Title + '</a></li>')
        })
    }      
}

function switch_news_class() {
    $('.border a').click(function(event){
        var class_id = $(this).attr('href').substring(1)
        get_all_news(class_id, 1)
        location.hash = class_id
        $(this).addClass('selected').siblings().removeClass('selected')
        event.preventDefault()
    })
}

function set_page_roll(page_total) {
    if(page_total == 1) {
        $('.paging').hide()
        return
    }
    else {
        $('.paging').show()
    }
}

function position_page_btn(current_page_num,total_page_num,current_class){
    $('#dispaly_page_num').html('')
    $('#dispaly_page_num').append('<a href="?1#'+current_class+'">首页</a>&nbsp;<<&nbsp;&nbsp;')
    if(current_page_num==1){
        $('#dispaly_page_num').append('<a href="?1#'+current_class+'">上一页</a>')
    }
    else{
        $('#dispaly_page_num').append('<a href="?'+(current_page_num-1)+'#'+current_class+'">上一页</a>')
    }

    if(total_page_num <= 5){
        for(var i = 1; i <= total_page_num; i++){
            if( i == current_page_num ) {
                render_page(i,true)
            }
            else {
                render_page(i)
            }
        }    
    }
    else{
        if(current_page_num<=5) {
                for(var ii = 1; ii <= 5; ii++){
                if( ii == current_page_num ) {
                    render_page(ii,true)
                }
                else {
                    render_page(ii)
                }
            }   
        }
        else{
            for(var j = current_page_num-2; j <= (parseInt(current_page_num)+2); j++) {
                if( j == current_page_num){
                    render_page(j,true)
                    continue
                }
                if(j <= (total_page_num)) {
                    render_page(j)
                    continue
                }
            }
        }
    }

    if(current_page_num == total_page_num){
        $('#dispaly_page_num').append('<a href="?'+total_page_num+'#'+current_class+'">下一页</a>')
    }
    else{
        $('#dispaly_page_num').append('<a href="?'+(parseInt(current_page_num)+1)+'#'+current_class+'">下一页</a>')
    }

    set_page_display(total_page_num)
    set_page_roll(total_page_num)

    function set_page_display(page_total){
        var display_num = parseInt($('#dispaly_page_num a.current').html())
    }

    function render_page(current,is_current){
        var is_current = is_current || false
        var current    = current || null
        if(is_current){
            $('#dispaly_page_num').append('<a href="?' + current + '#'+current_class+'" class="current">' + current + '</a>')
            return
        }
        $('#dispaly_page_num').append('<a href="?' + current + '#'+current_class+'">' + current + '</a>')
    }

    $('#dispaly_page_num').append('&nbsp;>>&nbsp;&nbsp;<a href="?' + total_page_num + '#'+current_class+'">末页</a>')
    var s_select = '<select id=gotopage>'
    for(var iii = 1; iii <= total_page_num; iii++){
           if(iii==current_page_num){
                s_select += '<option value='+iii+' selected>'+iii+'</option>'
            }
            else{
                 s_select += '<option value='+iii+'>'+iii+'</option>'
            }
     }  
     s_select +=  '</select>'
    $('#dispaly_page_num').append('&nbsp;&nbsp;转到:'+s_select+' 页')

    $('#gotopage').on('change', function(event){
        var c_page = $(this).val()
        location.href='?'+c_page+'#'+current_class
    })
}

function get_news_activity() {
    $.ajax({
        dataType : 'jsonp',
        jsonpCallback : 'run_news_activity',
        url      : remote_server_url_list.news_activity,
        success  : function(data){
            if($.isEmptyObject(data)){
                return
            }

            $.each(data, function(index, value){
                $('.promotions').append('<a target="_blank" href="'
                    + value.link
                    + '"><img src="'
                    + value.src 
                    + '"></a>')
            })
        }
    })
}