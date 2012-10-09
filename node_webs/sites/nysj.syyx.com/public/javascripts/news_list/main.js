//----------------------------------------------------------------------
var remote_url = {
    publish_category_by_name : '/publish_category_find_by_name',
    get_news_list: '/get_news_list_by_classid',
    get_newsclass: '/get_newsclass'
}

//-----------------
var flash_data = {
    nav   : {
        div_id : 'flash_nav',
        url    : '/flash/indexFlash_top_20120525.swf',
        width  : 664,
        height : 62
    }
}
//-------dom_loaded----------------------------------------------------------------------------
$(function() {
    global_setting()
    //获取新闻类别
    get_newsclass()

    //获取活动中心数据
    get_news_activity()

    //set_flash(flash_data)
    //document.title = '新闻中心-《诺亚传说》官方网站-全新2012题材人气巨作，终极内测，震撼来袭！';
})

function get_newsclass(){
    $.ajax({
        cache    : false,
        url      : remote_url.get_newsclass,
        success  : function(data){
            if (data==null){
                return
            }

            $('.border').append('<a hideFocus="true" href="?all">综合</a>')

            $.each(data, function(index, value){
                $('.border').append('<a hideFocus="true"  href="?'
                    + value._id
                    + '">'
                    + value.name
                    +'</a>')
            })

            //获取新闻列表
            get_news_by_class()

            //切换新闻列表
            //switch_news_class()
        }
    })
}

function get_url_page(){
    var npage
    if(location.search) {
        npage = location.search.substring(1).split('&')[1]
        if(!npage){
            npage =1
        }
    }
    else{
        npage =1
    }
    return npage
}

function get_news_by_class() {

    var classid = location.search.substring(1).split('&')[0]

    if(classid) {
        $('.border a').each(function(){
            if ($(this).attr('href') == '?' + classid || $(this).attr('href') == location.href.split('&')[0]) {
                $(this).addClass('selected')
            }
        })
        get_all_news(classid,get_url_page())
    }
    else {
        $('.border a:eq(0)').addClass('selected')
        get_all_news('all',get_url_page())
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

function get_all_news(class_id,page_num) {

    var news_list_dom =  $('ul.news_list')

    $.ajax({
        cache    : false,
        data     : {
            classid : class_id,
            page    : page_num
        },
        url      : remote_url.get_news_list,
        success  : function(data){
            if(data==null){
                //location.href = 'http://nycs.syyx.com/' 
                return
            }

            render_news_list(data)
        }
    })

    function render_news_list(news) {
        var one_page_num = 20
        var total_page   = 1
        if(parseInt(news.total_page)>one_page_num)
            total_page = Math.ceil(parseInt(news.total_page)/one_page_num)

        position_page_btn(page_num,total_page,class_id)

        news_list_dom.html('')
        $.each(news.newslist, function(index, value) {
            if (index % 5 == 0 && index !== 0) {
                news_list_dom.append('<li class="gap"></li>')
            }
            
            news_list_dom.append('<li><span>' + value.display_time + '</span><a hideFocus="true"  href=http://nysj.syyx.com/news_list.html?' + value.category_id + '&1>[' + value.category_name + ']&nbsp;</a><a hideFocus="true" target="_blank" href="http://nysj.syyx.com/news_content.html?' + value._id + '">' + value.title + '</a></li>')
        })
        //news_list_dom.append('<li class="gap"></li>')
    }      
}

function switch_news_class() {
    $('.border a').click(function(event){
        var class_id = $(this).attr('href').substring(1)
        //-get_all_news(class_id,1)
        //-location.hash = class_id
        //-$(this).addClass('selected').siblings().removeClass('selected')
        //-event.preventDefault()
        alert($(this).attr('href'))
        location.href=location.pathname+'?'+class_id
    })
}

function set_page_roll(page_total) {
    if(page_total == 1) {
        $('.paging').hide()
        return
    }
    $('.paging').show()
}

function position_page_btn(current_page_num,total_page_num,current_class){
    $('#dispaly_page_num').html('')
    $('#dispaly_page_num').append('<a href="?'+current_class+'&1">首页</a>&nbsp;<<&nbsp;&nbsp;')
    if(current_page_num==1){
        $('#dispaly_page_num').append('<a href="?'+current_class+'&1">上一页</a>')
    }
    else{
        $('#dispaly_page_num').append('<a href="?'+current_class+'&'+(current_page_num-1)+'">上一页</a>')
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
        $('#dispaly_page_num').append('<a href="?'+current_class+'&'+total_page_num+'">下一页</a>')
    }
    else{
        $('#dispaly_page_num').append('<a href="?'+current_class+'&'+(parseInt(current_page_num)+1)+'">下一页</a>')
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
            $('#dispaly_page_num').append('<a href="?'+current_class+'&' + current + '" class="current">' + current + '</a>')
            return
        }
        $('#dispaly_page_num').append('<a href="?'+current_class+'&' + current + '">' + current + '</a>')
    }

    $('#dispaly_page_num').append('&nbsp;>>&nbsp;&nbsp;<a href="?'+current_class+'&' + total_page_num + '">末页</a>')
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
        location.href='?'+current_class+'&'+c_page
    })
}

function get_news_activity() {
    $.ajax({
        cache    : false,
        url      : remote_url.publish_category_by_name,
        data     : { name : '新闻左侧活动中心'},
        success  : function(data){
            if (data==null){
                return
            }

            $.each(data, function(index, value){
                if (index > 1) {
                    return
                }
                
                $('.promotions').append('<a target="_blank" href="'
                    + value.link
                    + '"><img src="'
                    + value.thumb_url 
                    + '"></a>')
            })
        }
    })
}

//---------------------------------------------------------------------------------------
function global_setting() {
    //去掉链接虚线
    $("a").attr("hideFocus", "true");
}