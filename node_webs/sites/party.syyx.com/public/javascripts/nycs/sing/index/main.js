$(function(){
    $("#map1").addClass("map1hover")
    // $("#map2").hover(function(){
    //     $("#map1").removeClass("map1hover")
    // })
    // $("#map2").mouseout(function(){
    //     $("#map1").addClass("map1hover")
    // })
    // $("#map3").hover(function(){
    //     $("#map1").removeClass("map1hover")
    // })
    // $("#map3").mouseout(function(){
    //     $("#map1").addClass("map1hover")
    // })
    get_toplist()
    get_newlist({ page : 1 })

    default_set()
})

function set_roll_page(current, total, remote_url) {
    //页数为1，不显示翻页控件
    if(total == 1 || total == 0) {
        $('#dispaly_page_num').hide()
        return
    }
    $('#dispaly_page_num').show()
    $('#dispaly_page_num span').empty()

    $('#dispaly_page_num span').append('<a name="1" href="javascript:undefined">首页</a>&nbsp;')
    if(current==1){
        $('#dispaly_page_num span').append('<a href="javascript:undefined" class="noclick">上一页</a>')
    }
    else{
        $('#dispaly_page_num span').append('<a class="prev" href="javascript:undefined">上一页</a>')
    }

    
    //要显示的page_num存在一个数组中，存哪些页面，用一个算法来算(可改进)
    var display_page = []

    var range = 3

    // while(range > 0) {
    //     if( current - range > 0 ) {
    //         display_page.push(current - range)
    //     }

    //     if( current + range <= total ) {
    //         display_page.push(current + range)
    //     }

    //     range -- 
    // }

    if(current > range + 1){
        for(var i = current - range;i < current - range + range * 2 +1;i++){
             display_page.push(i)
             if (i >= total) {
                break
             }
        }
    }
    else{
        for(var i = 1;i <= range * 2 +1;i++){
             display_page.push(i)
             if (i >= total) {
                break
             }
        }
    }

    display_page.sort(compare)

    //把显示的page_num显示到页面上-----------------
    $.each(display_page, function(key, value) {
        if( value == current) {
            $('#dispaly_page_num span').append('<a name="'
                + value
                + '" class="current" href="javascript:undefined">'
                + value 
                + '</a>')
            return
        }
        $('#dispaly_page_num span').append('<a href="javascript:undefined" name="'
            + value
            + '">'
            + value 
            + '</a>')
    })

    if(current == total){
        $('#dispaly_page_num span').append('<a href="javascript:undefined" class="noclick">下一页</a>')
    }
    else{
        $('#dispaly_page_num span').append('<a href="javascript:undefined" class="next">下一页</a>')
    }

    $('#dispaly_page_num span').append('&nbsp;<a href="javascript:undefined" class="last">末页</a>')

    //加上首页尾页上一页下一页和转到select-----------------------------

    //尾页
    $('#dispaly_page_num a.last').attr('name',total)
    //上一页
    if (current - 1 > 0) {
        $('#dispaly_page_num a.prev').attr('name',current - 1)
    }
    //下一页
    if (current + 1 <= total) {
        $('#dispaly_page_num a.next').attr('name',current + 1)
    }
    //select
    $('#dispaly_page_num select').empty()
    for(var i = 1; i <= total; i++ ) {
        if (i == current ) {
            $('#dispaly_page_num select').append('<option value="' + i + '" selected>' + i + '</option>')
            continue
        }

        $('#dispaly_page_num select').append('<option value="' + i + '">' + i + '</option>')
    }

    $('#dispaly_page_num a').click(function(event){
        event.preventDefault()
        var target_page = $(this).attr('name')
        if(target_page){
            get_newlist({ page : parseInt(target_page) })
        }
    })

    $('#dispaly_page_num select').change(function(event){
        event.preventDefault()
        var target_page = this.options[this.selectedIndex].value
        if(target_page){
            get_newlist({ page : parseInt(target_page) })
        }
    })
}

//数组排序函数
function compare( value1, value2) {
    if (value1 < value2 ) {
        return -1
    } else if ( value1 > value2 ) {
        return 1
    } else {
        return 0
    }
}

function get_toplist(){
    var _pagesize = 8
    var arg = {
        r : Math.random()
    }

    $.ajax({
        url     :   "/nycs/sing/get_toplist",
        data    :   arg,
        dataType:   "json",
        type    :   "GET",
        success: function(data) {
            if(data.length > 0){
                toplist(data)
            }
        }
    })
}

function get_newlist(position){
    var _pagesize = 5
    var arg = {
        Page     : position.page,
        PageSize : _pagesize,
        r : Math.random()
    }

    $.ajax({
        url     :   "/nycs/sing/get_newlist",
        data    :   arg,
        dataType:   "json",
        type    :   "GET",
        success: function(data) {

            if(data.count != 0 && data.rows.length > 0){
                newlist(data.rows)
            }

            var totalpages = 0
            if (data.count % _pagesize == 0)
            {
                totalpages = parseInt(data.count / _pagesize);
            }
            else
            {
                totalpages = parseInt(data.count / _pagesize) + 1;
            }
            set_roll_page(position.page, totalpages, "")
        }
        
    })
}

function toplist(rows){
    var str = ""
    var from = ""
    for(var r in rows){
        str += '<div class="slist"><span class="nickname">'
        str += rows[r].NickName
        str += '</span><span class="votecount">'+ rows[r].votecount + '票'
        str +='</span><span class="listlink"><a href="javascript:vote('+ rows[r].ID +')" class="a1"></a>'
        str +='<a href="/nycs/sing/singshow.html?id='+ rows[r].ID +'#tp" class="a2"></a></span>'
        str += '<div class="scontent">'+ rows[r].content +'</div>'
        str +='</div>'
    }

    $(".toplist").html(str)
}

function newlist( rows){
    var str = ""
    var from = ""
    for(var r in rows){
        str += '<div class="slist"><span class="nickname">'
        str += rows[r].NickName
        str += '</span><span class="votecount2">'+ rows[r].votecount + '票'
        str +='</span><span class="listlink"><a href="javascript:vote('+ rows[r].ID +')" class="a1"></a>'
        str +='<a href="/nycs/sing/singshow.html?id='+ rows[r].ID +'#tp" class="a2"></a></span>'
        str += '<div class="scontent">'+ rows[r].content +'</div>'
        str +='</div>'
    }

    $(".newlist").html(str)
}
