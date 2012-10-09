function run_tab() {

    $("#tab .news").mouseover(function() {
        $(this).addClass("check_0")
        $("#content_box .content").eq(0).fadeIn()
        $("#tab .update").removeClass("check_1")
        $("#content_box .content").eq(1).css("display", "none")
    })

    $("#tab .update").mouseover(function() {
        $(this).addClass("check_1")
        $("#content_box .content").eq(1).fadeIn()
        $("#tab .news").removeClass("check_0")
        $("#content_box .content").eq(0).css("display", "none")
    })

    if($("#imgs img").length) {
        $("#imgs img").eq(0).css("display", "inline")
        var cur = 0
        for(var i=0; i<3; i++ ) {
            $("#bat a").eq(i).click(function(a) {
                return function() {                    
                    $(this).addClass("check")
                    $("#bat a").eq(cur).removeClass("check")
                    $("#imgs a").eq(a).stop().fadeIn()
                    $("#imgs a").eq(cur).css("display", "none")
                    cur = a
                }

            }(i))
        }
    }
}

$(function(){
    $.ajax({
        cache    : false,
        url      : '/publish_category_find_by_name',
        data     : { name : '客户端更新'},
        success  : function(data){
            if (data==null){
                return
            }

            $.each(data, function(index, value) {
                if (index == 6) {
                    $('#edit').html(value.summary)
                    return
                }

                if (index == 7 ) {
                    $('#imgs').append('<a style="display:inline" target="_blank" href="'
                        + value.link
                        + '"><img src="'
                        + value.thumb_url
                        + '"></a>')
                    return
                }

                if ( index == 8 || index== 9 ) {
                    $('#imgs').append('<a target="_blank" href="'
                        + value.link
                        + '"><img src="'
                        + value.thumb_url
                        + '"></a>')
                    return
                }

                $('#list').append('<li><a target="_blank" href="'
                    + value.link
                    + '">'
                    + value.title
                    + '</a><span>'
                    +  value.created_time.substring(5)
                    + '</span></li>')
            })

            run_tab()
        }
    })
})