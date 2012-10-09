//-----------------
//-------dom_loaded----------------------------------------------------------------------------
$(function() {
    var npage
    if(location.search) {
        npage = location.search.substring(1)
    }
    else{
        npage =1
    }
    
    //获取图片列表
    get_all_news(npage)

    //获取活动中心数据
    get_news_activity()

    upload_img_click()
})

function get_all_news(page_num) {

    var news_list_dom =  $('ul.pic_list')

    $.ajax({
        data     : {
            page    : page_num
        },
        dataType : 'jsonp',
        url      : remote_server_url_list.get_user_pic_list,
        success  : function(data){
            if($.isEmptyObject(data)){
                //location.href = 'http://nycs.syyx.com/' 
                return
            }

            render_news_list(data)
        }
    })

    function render_news_list(news) {
        position_page_btn(page_num,news.all_page)

        news_list_dom.html('')
        $.each(news.newslist, function(index,value){
            news_list_dom.append('<li><a rev="'
                + value.Title
                + '" href="' 
                + value.BigPic
                + '"><img src="' 
                + value.SmallPic
                + '"></a><span>'
                + value.Title
                + '</span></li>')
        })

        $('.pic_list a').lightBox()
    }     
}

function set_page_roll(page_total) {
    if(page_total == 1) {
        $('.paging').hide()
        return
    }
    

    // $('.paging a').on('click', function(event){
    //     event.preventDefault()
    //     var current_news_class_id = $('.border a.selected').attr('href').substring(1)
    //     var current_page_num      = parseInt($('.paging a.current').html())
    //     var target_page           = $(this).html()

    //     get_all_news(parseInt(target_page))
    //     position_page_btn(parseInt(target_page),page_total)   
    // })
}

function position_page_btn(current_page_num,total_page_num){
    $('#dispaly_page_num').html('')
    $('#dispaly_page_num').append('<a href="?1">首页</a>&nbsp;<<&nbsp;&nbsp;')
    if(current_page_num==1){
        $('#dispaly_page_num').append('<a href="?1">上一页</a>')
    }
    else{
        $('#dispaly_page_num').append('<a href="?'+(current_page_num-1)+'">上一页</a>')
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
        if(current_page_num == total_page_num){
            $('#dispaly_page_num').append('<a href="?'+total_page_num+'">下一页</a>')
        }
        else{
            $('#dispaly_page_num').append('<a href="?'+(parseInt(current_page_num)+1)+'">下一页</a>')
        }
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
            $('#dispaly_page_num').append('<a href="?' + current + '" class="current">' + current + '</a>')
            return
        }
        $('#dispaly_page_num').append('<a href="?' + current + '">' + current + '</a>')
    }

    $('#dispaly_page_num').append('&nbsp;>>&nbsp;&nbsp;<a href="?' + total_page_num + '">末页</a>')
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
        location.href='?'+c_page
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

function upload_img_click(){
 $("#a_upload").click(function() {
    $.ajax({
        dataType : 'jsonp',
        url             : 'http://nycs.syyx.com/Ajax/Users/checkLogin.aspx',
        success  : function(data){
                if(data=='1') {
                    $("#div_dialog").html("<iframe scrolling=\"no\" height=\"325\" width=\"650\" id=\"externalIframe\" frameborder=\"no\" border=\"0\" src=\"http://nycs.syyx.com/PicCenter/UpLaodUserPic.aspx\"/>");
                    $("#div_dialog").dialog({
                        dialogClass: 'dialog_upload',
                        width: 731,
                        height: 420,
                        modal: true,
                        close: function() { location.href = location.href}
                    })
                }
                else{
                    $("#div_dialog").html("<iframe scrolling=\"no\" height=\"205\" width=\"400\" id=\"externalIframe\" frameborder=\"no\" border=\"0\" src=\"http://nycs.syyx.com/login.aspx\"/>");
                    $("#div_dialog").dialog({
                        dialogClass: 'dialog_login',
                        width: 525,
                        height: 325,
                        modal: true,
                        close: function() { location.href = location.href}
                    })
                }
            }
        })
        return false;
    });
}
