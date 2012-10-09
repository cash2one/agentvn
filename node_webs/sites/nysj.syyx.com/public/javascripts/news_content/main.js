//-------------------------
var remote_url = {
    publish_category_by_name : '/publish_category_find_by_name',
    get_news_content         : '/get_news_content_by_newsid',
    get_related_news         : '/get_related_news_by_newsid'
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
//-----------------news_content-------------------------------------------
$(function () {
    global_setting()
    get_news_info()
    //get_vote()
    //vote()
    get_related_news()
    get_news_activity()
    // get_news_related_img()
    //set_flash(flash_data)
})

function set_flash(flash_data) {
    var params = { wmode : "transparent" }

    for (var key in flash_data) {
        var div_id = flash_data[key].div_id
        var url    = flash_data[key].url
        var width  = flash_data[key].width
        var height = flash_data[key].height

        swfobject.embedSWF(url, div_id, width, height, "9", null, null, params)
    }
}

function get_news_info() {
    $.ajax({
        cache    : false,
        data     : {
            id : get_news_id()
        },
        url      : remote_url.get_news_content,
        success  : function(data){
            if(data==null){
                location.href = 'http://nysj.syyx.com/' 
                return
            }
            $('h1').html(data.title)
            document.title = data.title + '-《诺亚传说•时间版》官方网站-重塑经典，再战未来！'
            $('.news_detail .time').html(data.display_time)
            $('.news_text').html(data.text)
            $('.news_text img').each(function(){
                $(this).load(function(){
                    if($(this).width() > 620){
                        $(this).width(620)
                    }
                })
            })
        }
    })
}
//---------------vote-------------------------------
var current_vote_status = {}
function get_vote() {
    $.ajax({
        data     : {
            id : get_news_id()
        },
        dataType : 'jsonp',
        url      : remote_server_url_list.get_vote_info,
        success  : function(data){
            if($.isEmptyObject(data)){
                set_vote_zero()
                return
            }

            display_vote(data) 
        }
    })
}

function vote() {
    $('.vote_btn a').click(function(event){
        var emotion_type = $(this).attr('href').substring(1)
        $.ajax({
            data     : {
                nid   : get_news_id(),
                vtype : emotion_type
            },
            dataType : 'jsonp',
            url      : remote_server_url_list.vote,
            success  : function(data){
                if(data != '1'){
                    alert('您已经投过票了')
                    return
                }
                client_change_vote_data(emotion_type)
                display_vote(current_vote_status) 
            }
        })

        event.preventDefault()
    })
    
}
function display_vote(data){
    current_vote_status = data
    var max_value = 0
    $.each(data, function(key,value){
        var index = key.toLocaleLowerCase()
        if(index == 'totals') {
            $('#feedback_stat').html(value)
            return 'non-false'
        }

        if($('#' + index).length < 1) {
            return 'non-false'
        }

        $('#' + index + ' .text').html(value)
        if(parseInt(value) > max_value) {
            max_value = value
        }
    })

    $.each(data,function(key,value){
        var index = key.toLocaleLowerCase()
        if($('#' + index).length < 1) {
            return 'non-false'
        }
        var height_img = value/max_value*80
        $('#' + index).height(height_img)
    })
}

function set_vote_zero() {
    $('.vote_result span').height(0)
    $('.vote_result span .text').html('0')
    $('#feedback_stat').html('0')
}

function client_change_vote_data(emotion_type) {
    if($.isEmptyObject(current_vote_status)) {
        current_vote_status.Totals =  1
        current_vote_status[emotion_type] = 1 
        return
    }
    $.each(current_vote_status, function(index, value){
        if(index == 'Totals') {
            current_vote_status[index] = parseInt(value) + 1
            return 'non-false'
        }
        if(index.toLocaleLowerCase() !== emotion_type){
            return 'non-false'
        }
        
        current_vote_status[index] = parseInt(value) + 1
    })
}
//--------------------------get_news_id----------------------------------
function get_news_id() {
    //兼容旧地址
    if( location.pathname.indexOf('.shtml') > -1 ) {
        return location.pathname.split('/')[5].split('.')[0]
    }  
    return location.search.substring(1)
}
//--------------------------get_related_news-------------------------------------------
function get_related_news() {
    $.ajax({
        cache    : false,
        data     : {
            id   : get_news_id()
        },
        url      : remote_url.get_related_news,
        success  : function(data){
            if(data==null){
                return
            }

            render_related_news(data)
        }
    })
}

function render_related_news(data) {
    $.each(data, function(index,value){
        var time = value.display_time.substring(5)
        $('.related_news ul').append('<li><a target="_blank" href="http://nysj.syyx.com/news_content.html?' + value._id + '">' + value.title + '</a><span>' + time + '</span></li>')
    })
}

//----------------------------------------
// var data_activity = [
//     {
//         link : '#',
//         src  : 'http://s1.syyx.com/nycs/images/index/index_bg.jpg'
//     },
//     {
//         link : '#',
//         src  : 'http://s1.syyx.com/nycs/images/index/index_bg.jpg'
//     }
// ]
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
                if (index == 2) {
                    $('.related_news img').attr('src',value.thumb_url)
                    $('.related_news a:first').attr('href',value.link)
                    return
                }
                if (index > 2) {
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

// var related_news_img = 'http://s1.syyx.com/nycs/images/index/index_bg.jpg'
// function get_news_related_img() {
//     $.ajax({
//         cache    : false,
//         url      : remote_url.publish_category_by_name,
//         data     : { name : '新闻底部宣传图'},
//         success  : function(data){
//             if (data==null){
//                 return
//             }
//             $('.related_news img').attr('src',data[0].thumb_url)
//             $('.related_news a:first').attr('href',data[0].link)
//         }
//     })
// }
//---------------------------------------------------------------------------------------
function global_setting() {
    //去掉链接虚线
    $("a").attr("hideFocus", "true");
}