//download--------------------------------------------------------------------------------------
//-----------------
//dom_loaded-------------------------------------------------------------------------------------------
$(function () {
    global_setting()
    get_data()
    show_client_version_example()
    get_news_activity()
    show_173download_box()
})
//---------------------------------------------------------------------------------
function get_cross_domain_data(remote_url,cb,params) {
    $.ajax({
        data     : params,
        dataType : 'jsonp',
        url      : remote_url,
        success  : function(data){
            if($.isEmptyObject(data)){
                return
            }

            cb(data)
        }
    })
}
//------------------------------------------------------------------------------------------------
function get_data() {
    get_cross_domain_data(remote_server_url_list.get_download_client, function(data){
        $('.full_client .version div:eq(0)').html('大小：' + data.ClientSize)
        $('.full_client .version div:eq(1)').html('更新时间：' + data.UpDataTime.split(' ')[0].toString())
        $('.full_client .version div:eq(2)').html('客户端版本：' + data.Version)
        $('.full_client .version div:eq(3)').html('MD5验证码：' + data.MD5)
        $('.full_client .download_btn a.official').attr('href', data.DownLaodLink)
    },{
        id : 1
    })

    get_cross_domain_data(remote_server_url_list.get_download_client, function(data){
        // data.IsLock = false
        if(data.IsLock) {
            $('.download_btn a.official').addClass('only')
            $('.download_btn a.xunlei').hide()
        }
        else {
           $('.download_btn a.xunlei').attr('href', data.DownLaodLink) 
        }
        $('.download_btn').show()
    },{
        id : 3
    })

    get_cross_domain_data(remote_server_url_list.get_download_client, function(data){
        $('.tiny_download .version div:eq(0)').html('大小：' + data.ClientSize)
        $('.tiny_download .version div:eq(1)').html('更新时间：' + data.UpDataTime.split(' ')[0].toString())
        $('.tiny_download .version div:eq(2)').html('客户端版本：' + data.Version)
        $('.tiny_download .version div:eq(3)').html('MD5验证码：' + data.MD5)
        $('.tiny_download_btn a.official').attr('href', data.DownLaodLink)
        $('.tiny_download .version a:eq(1)').attr('href', data.ToolLink)
    },{
        id : 2
    })

    get_cross_domain_data(remote_server_url_list.get_3rd_download_list, function(data){

        render_3rd_download_list(data)

        function render_3rd_download_list(data) {
            $.each(data, function(index, value){
                //$('.download_173 .list .clear').before('<a href="' + value.Url + '">' + value.Title + '</a>')
                $('.download_173_box .download_173_list').append('<a target="_blank" href="' + value.Url + '">' + value.Title + '</a>')
            })
        }

    })

    get_cross_domain_data(remote_server_url_list.get_patch_info_list, function(data){

        render_patch_info_list(data)

        function render_patch_info_list(data) {
            $.each(data, function(index, value){
                $('.patch_list table').append( '<tr><td class="time">'
                    + value.UpdataTime.split(' ')[0].toString() 
                    +'</td><td class="file_name"><a href="'
                    + value.DownLoadLink
                    + '">'
                    + value.title 
                    + '</a></td><td class="file_size">'
                    + value.FileSize 
                    + '</td><td class="file_des">'
                    + value.Directions 
                    + '</td><td class="update_des"><a href="'
                    + value.InfoLinkUrl 
                    + '">点击查看</a></td></tr>')
            })

            $('.patch_list table tr:even').addClass('odd')
        }
    })

    get_cross_domain_data(remote_server_url_list.get_download_tools, function(data){

        render_download_tools(data)

        function render_download_tools(data) {
            $.each(data, function(index, value){
                $('.tool ul').append('<li><a href="'
                    + value.Url
                    + '">'
                    + '<img src="'
                    + value.LogPic
                    + '"></a><span>'
                    + value.Description
                    + '</span></li>')
            })
        }
    })
}

function show_client_version_example() {
    $('.patch .des a').hover(function() {
        $('.check_version').show()
    },
    function() {
        $('.check_version').hide()
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

function show_173download_box(){
    var $download_box = $('.tiny_download .download_173_box')
    $('.tiny_download .tiny_download_173_btn').click(function(){
        $download_box.show()
    })
    $('.tiny_download .download_173_box .close_btn').click(function(){
        $download_box.hide()
    })
}

function global_setting() {
    //去掉链接虚线
    $("a").attr("hideFocus", "true");
}