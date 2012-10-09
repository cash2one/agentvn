//dom_loaded-------------------------------------------------------------------------------------------
$(function(){
    //get_data
    get_data()
    //setting
    global_setting()
    //set_tabs
    set_tabs()
    //set_flash
    set_flash(flash_data)

});
//---------------------------------------------------------------------------------
function get_cross_domain_data(remote_url,jsonp_callback,cb) {
    $.ajax({
        dataType : 'jsonp',
        jsonpCallback : jsonp_callback,
        url      : remote_url,
        success  : function(data){
            if($.isEmptyObject(data)){
                return
            }

            cb(data)
        }
    })
}
//------------------------------------------------------------------------------------------
function get_data() {
    //推荐服务器
    get_cross_domain_data(remote_server_url_list.recommend_server,'run_recommend_server',function(data){
        $.each(data, function(index, value){
            $('#recommended_server .list').append('<span>' + value + '</span>' )
        })

        set_recommended_server()
    })
    //头条新闻
    get_cross_domain_data(remote_server_url_list.index_top_news,'run_top_news',function(data){
        $('#top_news h1 a').html(data.top_news.content).attr('href',data.top_news.link)

        $.each(data.sub_heading, function(index, value){
            $('#top_news').append('<span><a target="_blank" href="' + value.link + '">' + value.content + '</a></span>')            
        })
    })
    //幻灯片新闻
    get_cross_domain_data(remote_server_url_list.index_slider_news,'run_slider_news',function(data){
        $('#tabs_picture_news div a').each(function(index, value){
            $(this).attr('href',data[index].img_link).find('img').attr('src',data[index].img_src)
        })

        //幻灯片tabs
        $('#tabs_picture_news').tabs({ event: "mouseover" })
        $('#tabs_picture_news').tabs('rotate', 4000, true)
    })

    //首页新闻列表
    get_cross_domain_data(remote_server_url_list.index_news_list_1,'run_news_list_1',function(data){
        $.each(data, function(key, news_value){
            $.each(news_value, function(index, value){
                $('#news_all ul').append('<li><a target="_blank" href="'
                    + value.url +'">' + value.content + '</a><span>' + value.time +'</span>')
            })
        })

        get_cross_domain_data(remote_server_url_list.index_news_list_2,'run_news_list_2',function(data){
            $.each(data, function(key, news_value){
                $.each(news_value, function(index, value){
                    $('#news_notice ul').append('<li><a target="_blank" href="'
                        + value.url +'">' + value.content + '</a><span>' + value.time +'</span>')
                })
            })

            get_cross_domain_data(remote_server_url_list.index_news_list_3,'run_news_list_3',function(data){
                $.each(data, function(key, news_value){
                    $.each(news_value, function(index, value){
                        $('#news_news ul').append('<li><a target="_blank" href="'
                            + value.url +'">' + value.content + '</a><span>' + value.time +'</span>')
                    })
                })
                get_cross_domain_data(remote_server_url_list.index_news_list_4,'run_news_list_4',function(data){
                    $.each(data, function(key, news_value){
                        $.each(news_value, function(index, value){
                            $('#news_promotion ul').append('<li><a target="_blank" href="'
                                + value.url +'">' + value.content + '</a><span>' + value.time +'</span>')
                        })
                    })
                    //首页新闻列表
                    $('#news_category').tabs({ event: "mouseover" }).show()
                    $('.news_category_selector a').click(function(event){
                        var class_id = $(this).attr('name')
                        window.open(remote_server_url_list.news_list + class_id)
                        event.preventDefault()
                    })
                })

            })
        })
    })
    
    //首页通栏广告
    get_cross_domain_data(remote_server_url_list.index_images_ad,'run_images_ad',function(data){
        $.each(data, function(index, value){
            $('#images_ad').append('<a target="_blank" href="' + value.link +'"><img src="' + value.img_src + '"></a>' )
        })
    })

    //首页游戏资料
    get_cross_domain_data(remote_server_url_list.index_game_lib_summary,'run_game_lib_summary',function(data){
        $.each(data, function(index, value){
            $('#game_lib .lib_class .item:eq(' + index + ') .name').html(value.name)
            $('#game_lib .lib_class .item:eq(' + index + ') .content').html(lib_links(value.content))
        })

        function lib_links(link_group) {
            var result = ''
            $.each(link_group, function(index, value){
                result += '<a target="_blank" href="' + value.link+ '">' + value.text + '</a>'
            })

            return result
        }
    })

    //首页游戏特色
    get_cross_domain_data(remote_server_url_list.index_game_feature, 'run_game_feature', function(data){
        $.each(data, function(index, value){
            $('#game_features div img:eq(' + index + ')').attr('src', value)    
        })

        $('#game_features').tabs({ event: "mouseover" })
    })

    //首页玩家中心
    get_cross_domain_data(remote_server_url_list.index_user_center, 'run_user_center', function(data){
        $.each(data.user_pics, function(index, value){
            var current_pic = $('#user_center .user_pics a:eq('+index+')')
            current_pic.attr('href',value.link).find('img').attr('src',value.src)
            current_pic.find('.text').html(value.name)
        })

        $.each(data.user_article, function(index, value){
            $('#user_center .user_article').append('<li><a target="_blank" href="' + value.link + '">' + value.text + '</a><span>' + value.time + '</span></li>')
        })
    })

    //首页游戏图片
    get_cross_domain_data(remote_server_url_list.index_game_pic, 'run_game_pic', function(data){
        $.each(data, function(index1, value1){
            $.each(value1, function(index, value){
                $('#'+ index1).append('<a target="_blank" class="item" href="' + value.link + '"><img src=' + value.src +'><span>' + value.name + '</span></a>')
            })
        })

        $('#screenshot').tabs({ event: "mouseover" })
        $('#screenshot ul li a').click(function(event){
            window.open($(this).attr('name'))
            event.preventDefault()
        })
    })

    //首页游戏视频
    get_cross_domain_data(remote_server_url_list.index_game_video, 'run_game_video', function(data){
        $.each(data, function(index,value){
            $('#game_video .video_container:eq(' + index + ') a').attr('href',value.link)
            $('#game_video img:eq(' + index + ')').attr('src',value.src)
            $('#game_video h3:eq(' + index + ') a').attr('href',value.link)
            $('#game_video h3:eq(' + index + ') a').html(value.title)
            $('#game_video .video_intro:eq(' + index + ')').html(value.des)
        })
    })

    //媒体外链
    get_cross_domain_data(remote_server_url_list.index_iframe_link, 'run_iframe_link', function(data){
        $.each(data, function(index,value){
            $('#media ul').append('<li><a href="#media' + index + '">' + value.name +'</a></li>')
            $('#media').append('<div id="media' + index +'"><iframe src="' + value.link + '" scrolling="no" width="359" height="223" border="0" frameborder="no" /></div>')
        })

        $('#media').tabs({ event: "mouseover" })
    })

    //媒体外链旁图片
    get_cross_domain_data(remote_server_url_list.index_media_img, 'run_media_img', function(data){
        $.each(data, function(index,value){
            $('#fixed_img').append('<a target="_blank" href="'
                + value.link
                + '"><img src="'
                + value.src
                + '"></a>')
        })

        set_recommended_media()
    })

    //友情链接
    get_cross_domain_data(remote_server_url_list.index_link, 'run_link', function(data){
        $.each(data, function(index,value){
            $('#link .content').append('<a target="_blank" href="'
                + value.link
                + '">'
                + value.name
                + '</a>')
        })
    })
}
//---------------------------------------------------------------------------------------
function global_setting() {
    //去掉链接虚线
    $("a").attr("hideFocus", "true");
}
//-------------------------------------------
function set_tabs(){
    //职业介绍
    $('#tabs_role').tabs({ event: "mouseover" })
}
//scroll recommend --------------------------------------------------------------------------------------------------
function set_recommended_server(){
    var server_container = $('#recommended_server')
    var server_group     = $('#recommended_server span')
    var inline_count     = 2
    var server_count     = server_group.length
    var visible_height   = server_container.height()
    var server_width     = server_group.width()
    var scoll_timeout    = 5000
    var speed            = 1000

    init_position()

    server_container.show()

    if(server_count <= inline_count){
        return
    }

    setInterval(function(){
        move()
    },scoll_timeout)

    function init_position(){
        
        server_group.each(function(){
            var server_index = $(this).index()
            $(this).css({
                left : (server_index % inline_count * server_width) + 'px',
                top  : (Math.floor(server_index/inline_count) * visible_height) + 'px'
            })
        })
    }

    function move(){
        server_group.each(function(){
            $(this).animate({
                top : '-=' + visible_height
            },speed,function(){
                if($(this).position().top == -visible_height){
                    $(this).css('top', ((Math.ceil(server_count/inline_count)-1)*visible_height) +'px')
                }
            })
        })
    }
}
//-----------------------------------------------------------------------------------------------
function set_recommended_media(){
    var media_container  = $('#fixed_img')
    var media_group      = $('#fixed_img a')
    var media_count      = media_group.length
    var visible_height   = media_container.height()
    var scoll_timeout    = 5000
    var speed            = 1000

    init_position()

    media_container.show()

    if(media_count <= 2){
        return
    }

    setInterval(function(){
        move()
    },scoll_timeout)

    function init_position(){
        
        media_group.each(function(){
            var media_index = $(this).index()
            $(this).css({
                top  : (media_index * 112) + 'px'
            })
        })
    }

    function move(){
        media_group.each(function(){
            $(this).animate({
                top : '-=' + 112
            },speed,function(){
                if($(this).position().top == -112){
                    $(this).css('top', (media_count-1)*112 +'px')
                }
            })
        })
    }
}
//--------------------------------------- config_flash_data ----------------------------------
var flash_data = {
    yineng : {
        div_id : "yineng_video",
        url    : "http://v.nycs.syyx.com/nycs/swf/yi_5_8.swf",
        width  : 238,
        height : 140
    },
    jianwu : {
        div_id : "jianwu_video",
        url    : "http://v.nycs.syyx.com/nycs/swf/jian_5_8.swf",
        width  : 238,
        height : 140
    },
    qiangxie : {
        div_id : "qiangxie_video",
        url    : "http://v.nycs.syyx.com/nycs/swf/qiang_5_8.swf",
        width  : 238,
        height : 140
    },
    gedou : {
        div_id : 'gedou_video',
        url    : 'http://v.nycs.syyx.com/nycs/swf/ge_5_8.swf',
        width  : 238,
        height : 140
    },
    nav   : {
        div_id : 'flash_nav',
        url    : '/flash/indexFlash_top_20120525.swf',
        width  : 664,
        height : 62
    },
    fn_group : {
        div_id : 'flash_fn_group',
        url    : '/flash/indexFlash_button_20120525.swf',
        width  : 615,
        height : 172
    }
}
//---------------------------------------------------------------------------------------
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
//-----------------------------------------------------------------------------------------------------------------------
//data-format--------------------------------------------------------
//var data_recommend_server = ['华北网通-迷雾湿地','华南电信-太阳城','诺亚传说-xxx服务器','诺亚传说--好的呀']

// var data_top_news         = {
//     top_news    : {
//         content : '头条新闻',
//         link    : 'http://www.163.com'
//     },
//     sub_heading : [
//         {
//             content : '附表第二条',
//             link    : 'http://www.qq.com'
//         },
//         {
//             content : '附表第三条',
//             link    : 'http://www.sohu.com'
//         }
//     ]
// }

// var data_slider_news      = [
//     {
//         img_src   : 'http://s.syyx.com/events/index35/img/index35-2012/s1.jpg',
//         img_link  : 'http://s.syyx.com/events/index35/img/index35-2012/s1.jpg'
//     },
//     {
//         img_src   : 'http://s.syyx.com/events/index35/img/index35-2012/s2.jpg',
//         img_link  : 'http://s.syyx.com/events/index35/img/index35-2012/s2.jpg'
//     },
//     {
//         img_src   : 'http://s.syyx.com/events/index35/img/index35-2012/s3.jpg',
//         img_link  : 'http://s.syyx.com/events/index35/img/index35-2012/s3.jpg'
//     },
//     {
//         img_src   : 'http://s.syyx.com/events/index35/img/index35-2012/s4.jpg',
//         img_link  : 'http://s.syyx.com/events/index35/img/index35-2012/s4.jpg'
//     }
// ] 

// var data_news_list = {
//     news_all : [
//         {
//             content : '支持诺亚支持诺亚支持诺亚支持诺亚支持诺亚',
//             id      : '787',
//             time    : '07-02'
//         },
//         {
//             content : '支持诺亚支持诺亚支持诺亚支持诺亚支持诺亚',
//             id      : '787',
//             time    : '08-02'
//         }
//     ],
//     news_notice  : [
//         {
//             content : '支持诺亚支持诺亚支持诺亚支持诺亚支持诺亚',
//             id      : '787',
//             time    : '05-02'
//         },
//         {
//             content : '支持诺亚支持诺亚支持诺亚支持诺亚支持诺亚',
//             id      : '787',
//             time    : '12-06'
//         }
//     ],
//     news_news : [
//         {
//             content : '支持诺亚支持诺亚支持诺亚支持诺亚支持诺亚',
//             id      : '787',
//             time    : '02-02'
//         },
//         {
//             content : '支持诺亚支持诺亚支持诺亚支持诺亚支持诺亚',
//             id      : '787',
//             time    : '11-05'
//         }
//     ],
//     news_promotion : [
//         {
//             content : '支持诺亚支持诺亚支持诺亚支持诺亚支持诺亚',
//             id      : '787',
//             time    : '09-03'
//         },
//         {
//             content : '支持诺亚支持诺亚支持诺亚支持诺亚支持诺亚',
//             id      : '787',
//             time    : '10-04'
//         }
//     ]
// }

// var data_images_ad = [
//     {
//         img_src : 'http://s.syyx.com/events/index35/img/index35-2012/s1.jpg',
//         link    : 'http://s.syyx.com/events/index35/img/index35-2012/s1.jpg'
//     },
//     {
//         img_src : 'http://s.syyx.com/events/index35/img/index35-2012/s1.jpg',
//         link    : 'http://s.syyx.com/events/index35/img/index35-2012/s1.jpg'
//     },
//     {
//         img_src : 'http://s.syyx.com/events/index35/img/index35-2012/s1.jpg',
//         link    : 'http://s.syyx.com/events/index35/img/index35-2012/s1.jpg'
//     },
//     {
//         img_src : 'http://s.syyx.com/events/index35/img/index35-2012/s1.jpg',
//         link    : 'http://s.syyx.com/events/index35/img/index35-2012/s1.jpg'
//     },
//     {
//         img_src : 'http://s.syyx.com/events/index35/img/index35-2012/s4.jpg',
//         link    : 'http://s.syyx.com/events/index35/img/index35-2012/s4.jpg'
//     }
// ]

// var data_game_lib_summary  = [
//     {
//         name    : '入门资料',
//         content : [
//             {
//                 link : '8787',
//                 text : '组队升级'   
//             },
//             {
//                 link : '8787',
//                 text : '组队升级'   
//             },
//             {
//                 link : '8787',
//                 text : '组队升级'   
//             },
//             {
//                 link : '8787',
//                 text : '组队升级'   
//             },
//             {
//                 link : '8787',
//                 text : '组队升级'   
//             },
//             {
//                 link : '8787',
//                 text : '组队升级'   
//             }
//         ]
//     },
//     {
//         name    : '入门资料',
//         content : [
//             {
//                 link : '8787',
//                 text : '组队升级'   
//             },
//             {
//                 link : '8787',
//                 text : '组队升级'   
//             },
//             {
//                 link : '8787',
//                 text : '组队升级'   
//             },
//             {
//                 link : '8787',
//                 text : '组队升级'   
//             },
//             {
//                 link : '8787',
//                 text : '组队升级'   
//             },
//             {
//                 link : '8787',
//                 text : '组队升级'   
//             }
//         ]
//     },
//     {
//         name    : '入门资料',
//         content : [
//             {
//                 link : '8787',
//                 text : '组队升级'   
//             },
//             {
//                 link : '8787',
//                 text : '组队升级'   
//             },
//             {
//                 link : '8787',
//                 text : '组队升级'   
//             },
//             {
//                 link : '8787',
//                 text : '组队升级'   
//             },
//             {
//                 link : '8787',
//                 text : '组队升级'   
//             },
//             {
//                 link : '8787',
//                 text : '组队升级'   
//             }
//         ]
//     },
//     {
//         name    : '入门资料',
//         content : [
//             {
//                 link : '8787',
//                 text : '组队升级'   
//             },
//             {
//                 link : '8787',
//                 text : '组队升级'   
//             },
//             {
//                 link : '8787',
//                 text : '组队升级'   
//             },
//             {
//                 link : '8787',
//                 text : '组队升级'   
//             },
//             {
//                 link : '8787',
//                 text : '组队升级'   
//             },
//             {
//                 link : '8787',
//                 text : '组队升级'   
//             }
//         ]
//     }
// ]

// var data_game_feature = [
//     'http://s.syyx.com/events/index35/img/index35-2012/s1.jpg',
//     'http://s.syyx.com/events/index35/img/index35-2012/s2.jpg',
//     'http://s.syyx.com/events/index35/img/index35-2012/s3.jpg',
//     'http://s.syyx.com/events/index35/img/index35-2012/s4.jpg'
// ]

// var data_user_center = {
//     user_pics : [
//         {
//             src  : 'http://s.syyx.com/events/index35/img/index35-2012/s3.jpg',
//             link : '79797',
//             name : '图片标题1'
//         },
//         {
//             src  : 'http://s.syyx.com/events/index35/img/index35-2012/s4.jpg',
//             link : '854545454',
//             name : '图片标题1'
//         }
//     ],
//     user_article : [
//         {
//             link : '3343',
//             text : '攻略',
//             time : '12-12'
//         },
//         {
//             link : '3343',
//             text : '攻略',
//             time : '12-12'
//         },
//         {
//             link : '3343',
//             text : '攻略',
//             time : '12-12'
//         }
//     ]
// }

// var data_game_pic  = {
//     game_screenshot : [
//         {
//             name : '游戏截图',
//             link : '979879797',
//             src  : 'http://s.syyx.com/events/index35/img/index35-2012/s4.jpg' 
//         },
//         {
//             name : '游戏截图',
//             link : '979879797',
//             src  : 'http://s.syyx.com/events/index35/img/index35-2012/s4.jpg' 
//         },
//         {
//             name : '游戏截图',
//             link : '979879797',
//             src  : 'http://s.syyx.com/events/index35/img/index35-2012/s4.jpg' 
//         },
//         {
//             name : '游戏截图',
//             link : '979879797',
//             src  : 'http://s.syyx.com/events/index35/img/index35-2012/s4.jpg' 
//         }
//     ],
//     wallpaper : [
//         {
//             name : '壁纸原画',
//             link : '979879797',
//             src  : 'http://s.syyx.com/events/index35/img/index35-2012/s4.jpg' 
//         },
//         {
//             name : '壁纸原画',
//             link : '979879797',
//             src  : 'http://s.syyx.com/events/index35/img/index35-2012/s4.jpg' 
//         },
//         {
//             name : '壁纸原画',
//             link : '979879797',
//             src  : 'http://s.syyx.com/events/index35/img/index35-2012/s4.jpg' 
//         },
//         {
//             name : '壁纸原画',
//             link : '979879797',
//             src  : 'http://s.syyx.com/events/index35/img/index35-2012/s4.jpg' 
//         }
//     ],
//     user_photo : [
//         {
//             name : '玩家照片',
//             link : '979879797',
//             src  : 'http://s.syyx.com/events/index35/img/index35-2012/s4.jpg' 
//         },
//         {
//             name : '玩家照片',
//             link : '979879797',
//             src  : 'http://s.syyx.com/events/index35/img/index35-2012/s4.jpg' 
//         },
//         {
//             name : '玩家照片',
//             link : '979879797',
//             src  : 'http://s.syyx.com/events/index35/img/index35-2012/s4.jpg' 
//         },
//         {
//             name : '玩家照片',
//             link : '979879797',
//             src  : 'http://s.syyx.com/events/index35/img/index35-2012/s4.jpg' 
//         }
//     ]
// }

// var data_game_video = [
//     {
//         title : '在路上',
//         src   : 'http://s.syyx.com/events/index35/img/index35-2012/s4.jpg',
//         link  : 'http://s.syyx.com/events/index35/img/index35-2012/s4.jpg',
//         des   : '在路上在路上在路上在路上在路上在路上在路上在路上在路上在路上在路上在路上'
//     },
//     {
//         title : '在路上',
//         src   : 'http://s.syyx.com/events/index35/img/index35-2012/s4.jpg',
//         link  : 'http://s.syyx.com/events/index35/img/index35-2012/s4.jpg',
//         des   : '在路上在路上在路上在路上在路上在路上在路上在路上在路上在路上在路上在路上'
//     }
// ]

// var data_iframe_link = [
//     {
//         name : '多玩',
//         link : 'http://us.syyx.com/'
//     },
//     {
//         name : '网易',
//         link : 'http://events.syyx.com/nycs/index.html'
//     },
//     {
//         name : 'nuoya',
//         link : 'http://www.syyx.com/'
//     }
// ]