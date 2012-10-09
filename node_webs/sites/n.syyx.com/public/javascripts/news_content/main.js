//-----------------news_content-------------------------------------------
$(function () {
    get_news_info()
    
    vote()
    get_related_news()
    get_news_activity()
    get_news_related_img()
})

function get_news_info() {
    $.ajax({
        data     : {
            id : get_news_id()
        },
        dataType : 'jsonp',
        url      : remote_server_url_list.get_news_info,
        success  : function(data){
            if($.isEmptyObject(data)){
                location.href = 'http://nycs.syyx.com/' 
                return
            }
            $('h1').html(data.Title)
            document.title = data.Title + '-《诺亚传说》官方网站'
            $('.news_detail .time').html(data.AddTime.split(' ')[0])
            $('.news_text').html(data.Content)
            get_vote()
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
    var n_pram_id = parseInt(location.search.substring(1))
    if(n_pram_id > 2600){
        //对加密的新闻ID进行解密，得到实际新闻ID
        var n_news_id = (parseInt(n_pram_id)-61618)/8
        if(n_news_id < 0)
            return 0
        if(!isInt(n_news_id))
            return 0
        return n_news_id.toString().substring(0, n_news_id.toString().length-2)
    }
    else{
        return location.search.substring(1)
    }
}
//--------------------------get_related_news-------------------------------------------
function get_related_news() {
    $.ajax({
        data     : {
            id   : get_news_id()
        },
        dataType : 'jsonp',
        url      : remote_server_url_list.get_related_news,
        success  : function(data){
            if($.isEmptyObject(data)){
                return
            }

            render_related_news(data)
        }
    })
}

function render_related_news(data) {
    $.each(data, function(index,value){
        var time = value.AddTime.split('&nbsp;')[0].substring(5)
        //对新闻ID进行加密计算，隐藏实际ID
        var n_id_r = parseInt(value.ID+'05') * 8 + 61618
        if (value.Url) {
            $('.related_news ul').append('<li><a target="_blank" href="' +  value.Url + '">' + value.Title + '</a><span>' + time + '</span></li>')
        }
        else {
            //$('.related_news ul').append('<li><a target="_blank" href="' + remote_server_url_list.news_content + '?' + value.ID + '">' + value.Title + '</a><span>' + time + '</span></li>')
            $('.related_news ul').append('<li><a target="_blank" href="' + remote_server_url_list.news_content + '?' + n_id_r + '">' + value.Title + '</a><span>' + time + '</span></li>')
        }
        
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
// var related_news_img = 'http://s1.syyx.com/nycs/images/index/index_bg.jpg'
function get_news_related_img() {
    $.ajax({
        dataType : 'jsonp',
        jsonpCallback : 'run_related_news',
        url      : remote_server_url_list.news_related_img,
        success  : function(data){
            if($.isEmptyObject(data)){
                return
            }
            $('.related_news img').attr('src',data.src)
            $('.related_news a:first').attr('href',data.link)
        }
    })
}
//判断参数是否是整数
function isInt(str) {
    var floatVal = parseFloat(str)
    , intVal = parseInt(str * 1, 10)
    if(!isNaN(intVal) && (floatVal == intVal)) {
        return true
    } else {
        return false
    }
 }