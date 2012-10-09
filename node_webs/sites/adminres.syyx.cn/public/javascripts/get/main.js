var preview = window.frames[0].document
var j_pre   = $(preview) 
preview.write("<html></html>"); //初始化预览
var csscode = ""
var wait    = ""
var img_dom
var nn      = 0;
var active  = true
var date    = new Date
var open    = date.getTime() 
var settime
var cancel
var operands= ""
preview.close();

//Cookie类------------------------------------------------------------------------------------------------------------
function setCookie(c_name, value, expires) {
    var exdate = new Date() 
    exdate.setDate(exdate.getSeconds() + expires) 
    document.cookie = c_name + "=" + escape(value)
}

//格式化url------------------------------------------------------------------------------------------------------------
var formatURL = function() {
    var url     = $("#url").val().replace("http://", "");
    var index   = url.indexOf("/") 
    var host    = url;
    var dir     = url + "/";
    var path    = "/"
    if (index > 0) {
        host    = url.substring(0, index) 
        dir     = url.substring(0, url.lastIndexOf("/")) + "/"
        path    = url.substring(index)
    }
    return {
        host : host,
        path : path,
        dir  : dir,
        url  : url
    }
}

//渲染效果图------------------------------------------------------------------------------------------------------------
var render = function(a, b, c) {
    if(!img_dom) {
        return
    }
    if (b !== "") {
        if (c > -1) {
            img_dom.eq(c).attr("src", a)
        } else {
            var previewDom  = document.getElementById("preview").contentDocument
            var expurl      = new RegExp(b, "g") 
            var css         = csscode.replace(expurl, a) 
            previewDom.getElementsByTagName("style")[0].innerHTML = css
        }
    }
}

//图片修改框操作------------------------------------------------------------------------------------------------------------
var get_img_info = function(src, file) {
    function callbk(a, b) {
        var name    = (file) ? file.split(".") : src.substring(src.lastIndexOf("/") + 1).split(".")        
        if(operands == "Flash"){
            if(/http/.test(src)) {
                $(".show_img").html('<embed width="550" height="490" name="plugin" id="b_img" src="' + src + '" type="application/x-shockwave-flash">') 
            } else {
                $(".show_img").html('<img width="200" height="200" src="/images/flash.jpg" />')
            }
                       
        }else{
            $("#b_img").eq(0).attr("src", src)            
        }
        var span    = $("#img_info span") 
        var em      = $("#img_info em") 
        var is      = $("#img_info i") 
        em.html("") 
        is.removeClass("ok") 
        is.removeClass("no") 
        if (file) {
            em.eq(0).html("本地文件") 
            em.eq(1).html(name[0]) 
            em.eq(2).html(name[1]) 
            em.eq(3).html(a) 
            em.eq(4).html(b) 
            for (var i = 1; i < 5; i++) {
                if (em.eq(i).html() !== span.eq(i).html()) {
                    is.eq(i - 1).addClass("no")
                } else {
                    is.eq(i - 1).addClass("ok")
                }
            }
        } else {
            span.eq(0).html(src) 
            span.eq(1).html(name[0]) 
            span.eq(2).html(name[1]) 
            span.eq(3).html(a) 
            span.eq(4).html(b)
        }
    }
    if(operands == "Flash") {
        callbk("未知", "未知")
    }else{
        var img = new Image();
        img.src = src;
        if (img.complete) {
            callbk(img.width, img.height);
        } else {
            img.onload = function() {
                callbk(img.width, img.height);
                img.onload = null;
            };
        };
        delete img;
    }

}

var close = function() {
    $("#mange").hide('fast') 
    $("#upload_l").html("") 
    $("#newsee").unbind("click") 
    $("#newurl").unbind("click") 
    $("#oldurl").unbind("click")
}

var manage = function() {    
    $("#img_list span").click(function() {
        var that    = $(this)
        var iid = that.attr("iid") || -1;
        if(iid == "-2"){
            operands = "Flash"
        } else {
            operands = ""
        }
        var parent = $(this).parent() 
        var newsrc = parent.find(".new").attr("src") 
        var oldsrc = parent.find(".old").attr("src") 
        var action = 0 //0没有动作 1为上传
        get_img_info(oldsrc)
        if (newsrc) {
            var current = "new"
            $("#upload_l").append(parent.children("input")) 
            $("#newurl").addClass("check") 
            get_img_info(newsrc, $(this).data("new_name"))
        } else {
            var current = "old"
            $("#newurl").css("display", "none") 
            $("#oldurl").css("display", "none") 
            var src     = parent.find(".old").src 
            $("#upload_l").html("<input type='file' size='45'>")
        }
        $("#mange").show('fast') 
        var new_name
        var new_src
        var that_p  = that.parent() 
        var input   = document.getElementById("img_info").getElementsByTagName("input")[0] 
        input.onchange = function() {
            var file = this.files[0]
            try {
                new_src     = window.URL.createObjectURL(file)
                new_name    = file.name
            } catch(e) {
                new_src     = file.getAsDataURL()
                new_name    = file.fileName
            }
            $("#newurl").css("display", "inline") 
            $("#oldurl").css("display", "inline") 
            $("#newurl").addClass("check") 
            $("#oldurl").removeClass("check") 
            newsrc  = new_src;
            action  = 1
            current = "new"
            get_img_info(new_src, new_name) 
        }

        $("#newsee").click(function() {            
            if (current == "old") {
                that_p.attr("class", "") 
                that.removeData("new_name") 
                that_p.children("input").remove() 
                that.html("修改" + operands)
                that_p.find(".new").attr("src", "")
                render(oldsrc, newsrc, iid)
            } else {
                that.data("new_name", new_name) 
                that.html("重改" + operands)
                if(operands == "Flash"){
                    that_p.find(".new").attr("src", "/images/flash.jpg")
                } else{
                    that_p.find(".new").attr("src", new_src)
                }                
                that_p.append(input) 
                if ($("#img_info .no").length) {
                    that_p.attr("class", "s1")
                } else {
                    if (action == 1) {
                        that_p.attr("class", "s2") 
                        that_p.find("button").css("margin-top", (parent.find(".new")[0].offsetHeight) / 2 - 17 + "px")
                    }
                }
                render(new_src, oldsrc, iid)
            }

            $("#ok_num").css("display", "inline")
            $("#see_num").css("display", "inline") 
            var all     = $("#img_list span").length
            var s1      = $("#img_list .s1").length
            var s2      = $("#img_list .s2").length
            var s34     = $("#img_list .s4").length + $("#img_list .s3").length 
            $("#all_num").html(all - s34) 
            $("#see_num").html(s34 + s2 + s1) 
            $("#ok_num").html(s34 + s2) 
            close()
        })

        $("#newurl").click(function() {
            if(operands == "Flash"){
                $(".show_img").html('<img width="200" height="200" src="/images/flash.jpg" />')
            }else{
                $("#b_img").attr("src", newsrc)
            }
            $(this).addClass("check") 
            $("#oldurl").removeClass("check") 
            current = "new"
        }) 
        $("#oldurl").click(function() {
            if(operands == "Flash"){
                $(".show_img").html('<embed width="550" height="400" name="plugin" id="b_img" src="' + oldsrc + '" type="application/x-shockwave-flash">')
            }else{
                $("#b_img").attr("src", oldsrc)
            }
            $(this).addClass("check") 
            $("#newurl").removeClass("check") 
            current = "old"
        })
    })
}

//生成完毕调用

var get_success = function() {
    $("#get").html("再次分析")
    var reload = function() {
        setCookie("url", $("#url").val()) 
        window.location = "/get"
    }
    $("#get").click(reload)
    $("#url").keydown(function(event) {    
        if(event.keyCode == 13){
            reload();
        }
    })
    $("#tab span").addClass("live") 
    for (var i = 4; i--;) { //选项卡切换
        $("#tab span").eq(i).click(function(a) {
            return function() {
                $("#main .box").removeClass("check") 
                $("#tab span").removeClass("check") 
                if (nn == 0) {
                    $("#tab em").css("display", "inline") 
                    $("#all_num").html($("#img_list span").length) 
                    nn = 1
                }
                if (a == 3) {
                    $("#tab span").eq(3).addClass("check") 
                    $("#main .box").eq(2).addClass("check") 
                    $("#img_list").attr("id", "rank_list")
                } else {
                    $("#tab span").eq(a).addClass("check") 
                    $("#main .box").eq(a).addClass("check") 
                    if ($("#rank_list").length) {
                        $("#rank_list").attr("id", "img_list")
                    }

                }
            }
        } (i))
    }
    manage();
} 


//生成图片表，预览图------------------------------------------------------------------------------------------------------------

var sulist = function(a) {
    var j_pre       = $(window.frames[0].document)
    var append      = '';
    var html_img    = img_dom = j_pre.find("img")
    var l           = html_img.length
    
    info("-获取IMG图片<br />") 
    var host = "http://" + formatURL().host + "/"
    for (var i = 0; i < l; i++) {
        var src = html_img.eq(i).attr("src");
        if (src !== host) {
            append += '<div><img onerror="$(this).parent().remove();" class="old" src="' + src + '" /><img class="new" src="" /><button onclick="return upload($(this))">上传替换</button><i onclick="return opentime($(this))">定时</i><span iid=' + i + '>修改</span><em></em></div>'
        }
    }

    info("-获取所有背景图片<br />") 
    if (csscode !== host) {
        var css_img = csscode.match(/http.+?\)/g) 
        var as      = [];
        var bs      = [];
        for (var prop in css_img) {
            var d = css_img[prop];
            if (d === as[prop]) {
                continue;
            }
            if (bs[d] != 1) {
                as.push(d);
                bs[d] = 1;
            }
        }
        css_img     = as
        var n       = css_img.length;
        for (var k = 0; k < n; k++) {
            append += '<div><img onerror="$(this).parent().remove();" class="old" src="' + css_img[k].replace(/\)/g, "") + '" /><img class="new" src="" /><button onclick="return upload($(this))">上传替换</button><i onclick="return opentime($(this))">定时</i><span>修改</span><em></em></div>'
        }
    }

    var html_flash  = j_pre.find("object")
    info("-获取页面Flash<br />")
    for(var j = 0; j < html_flash.length; j++) {
        var flash_url = html_flash.eq(j).attr("data")
        if(flash_url) {
            if(!/http\:\/\//.test(flash_url)){
                flash_url = "http://" + formatURL().host + flash_url
            }        
            append += '<div><embed width="250" height="200" class="old" name="plugin" src="' + flash_url + '" type="application/x-shockwave-flash"><img src="" class="new"/><button onclick="return upload($(this))">上传替换</button><i onclick="return opentime($(this))">定时</i><span iid="-2">修改Flash</span><em></em></div>'
        }
    }

    $("#img_list").prepend(append) 
    info("<em>√资源管理列表生成完毕</em><br /><br /><em>全部处理完毕！</em>您可以点击 <span>资源管理</span> 进行图片替换，在 <span>修改预览</span> 中预览修改效果") 
    get_success()
}

//分析日志调用------------------------------------------------------------------------------------------------------------

var info = function(info) {
    $("#ajax_info").append(info)
}

//获得html------------------------------------------------------------------------------------------------------------

var htmled = function() { //iframe onload完毕后触发
    $("#wait").html("") 
    clearInterval(wait) 
    info("<em>√预览图载入完毕</em><br />-开始分析CSS外部文件<br />") 
    $(".preview>.res_info").css("display", "none") 
    var previewDom  = document.getElementById("preview").contentDocument
    var css         = previewDom.styleSheets
    var l           = css.length
    var arr_css     = []
    for (var i = 0; i < l; i++) {
        if (css[i].href) {
            arr_css.push(css[i].href)
        }
    }    
    css             = jQuery.unique(arr_css) 
    var m           = arr_css.length;
    var i           = 0

    info("-检测到CSS外部文件" + m + "个<br />")

    var call_css = function(a) {
        i++
        csscode += a;
        if (i < m) {
            info("<em>√解析成功。</em><br />-正在解析第" + (i - 0 + 1) + "个CSS文件：" + arr_css[i] + "<br />") 
            $.post("/get_css", {url: arr_css[i].replace("http://", "")}, call_css, "html")
        } else {
            info("<em>√解析成功。</em><br />-正在查找内嵌样式<br />") 
            var css_inner = $(previewDom).find("style").html()
            if (css_inner) {
                var dir     = formatURL().dir
                var rehttp  = new RegExp(dir + "http://", "g") 
                var slash   = new RegExp(dir, "g") 
                css_inner   = css_inner.replace(/\n+|\r+/g, "")
                                        .replace(/^\s+\(\s+$/g, "")
                                        .replace(/\'/g, '"')
                                        .replace(/\(\"/g, '(')
                                        .replace(/\"\)/g, ')')
                                        .replace(/\/\*.*?\*\//g, "")
                                        .replace(/url\(/g, "url(" + dir)
                                        .replace(rehttp, "http://")
                                        .replace(slash, formatURL().host + "/")
                                        .split("}") 
                var imgss   = ""
                var n       = css_inner.length;
                for (var j = 0; j < n; j++) {
                    if (/url\(/.test(css_inner[j])) {
                        imgss += (css_inner[j] + "}")
                    }
                }
                css_inner   =  imgss;
                csscode     += css_inner

            }
            info("-在预览图中写入需要控制的样式<br />")
            var head    = previewDom.getElementsByTagName("head")[0]
            var style   = previewDom.getElementsByTagName("style")[0]
            if (!style) {
                var newstyle    = document.createElement("style") 
                newstyle.tyle   = "text/css";
                head.appendChild(newstyle)
            }
            previewDom.getElementsByTagName("style")[0].innerHTML = csscode 
            info("<em>√写入样式成功。</em><br />-开始生成资源管理列表<br />") 
            $("#img_list .res_info").css("display", "none") 
            sulist(previewDom)
        }
    }
    if (m > 0) {
        info("-开始解析第" + 1 + "个CSS文件：" + arr_css[0] + "<br />") 
        $.post("/get_css", {url: arr_css[0].replace("http://", "")}, call_css, "html")
    } else {
        call_css();
    }
}


//开始分析-------------------------------------------------------------------------------------------------------------
function start() {
    if ($("#url").val() !== "输入页面地址或单图片、Flash地址，再点击右边的按钮。" && $("#url").val() !== "") {
        var format  = $("#url").val().substr(-3)
        if(format == "jpg" || format == "png" || format == "gif" ) {            
            $("#img_list").html('<div><img onerror="$(this).parent().remove();" class="old" src="' + $("#url").val() + '" /><img class="new" src="" /><button onclick="return upload($(this))">上传替换</button><i onclick="return opentime($(this))">定时</i><span>修改</span><em></em></div>')
            get_success()
            $("#get").addClass("ed") 
            info("<em>√单图片分析成功</em>")
            return
        }
        if(format == "swf") {
            operands = "Flash"
            $("#img_list").html('<div><embed width="250" height="200" class="old" name="plugin" src="' + $("#url").val() + '" type="application/x-shockwave-flash"><img src="" class="new"/><button onclick="return upload($(this))">上传替换</button><i onclick="return opentime($(this))">定时</i><span iid="-2">修改Flash</span><em></em></div>')
            get_success()            
            $("#get").addClass("ed") 
            info("<em>√Flash分析成功</em>")           
            return
        }
        var url = formatURL().host + "&path=" + formatURL().path + "&dir=" + formatURL().dir 
        $("#preview").attr("src", "/get_html?host=" + url) 
        $("#get").html("分析中…") 
        $("#get").addClass("ed") 
        $("#ajax_info").html("-开始解析：" + formatURL().host + formatURL().path + "<br />-正在载入预览图<br />") 
        wait = setInterval(function() {
            $("#wait").append(".")
        }, 300) 
        $("#get").unbind("click")
        $("#url").unbind("keydown")
    } else {
        info("<span>请输入需要解析的页面地址!</span>")
    }
}

$("#get").click(start)

$("#url").keydown(function(event) {    
    if(event.keyCode == 13){
        start();
    }
})


//再次分析cookies设置--------------------------------------------------------------------------------------------------
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=") 
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1 
            c_end   = document.cookie.indexOf(";", c_start) 
            if (c_end == -1) {
                c_end = document.cookie.length
            }
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}


if (getCookie("url")) {
    $("#url").val(getCookie("url")) 
    start();
}
setCookie("url", "", -1)


//输入url控制----------------------------------------------------------------------------------------------------------------
$("#url").focus(function() {
    if ($("#url").val() == "输入页面地址或单图片、Flash地址，再点击右边的按钮。") {
        $("#url").val("")
    }
}) 
$("#url").blur(function() {
    if ($("#url").val() == "") {
        $("#url").val("输入页面地址或单图片、Flash地址，再点击右边的按钮。")
    }
})


//设置定时------------------------------------------------------------------------------------------------------------
var closetime = function() {
    $("#time").hide("fast") 
    $("#info").html("")
}

var opentime = function(a) {
    if (a.parent().attr("class") !== "s3") {
        $("#time").show("fast") 
        var retime 
        settime = function() {
            retime = testtime() 
            if (retime == false) {
                return
            } else {
                $("#time").hide("fast") 
                a.data("retime", retime[0]) 
                a.html(retime[1][0] + "年" + retime[1][1] + "月" + retime[1][2] + "日" + retime[1][3] + "点" + retime[1][4] + "分") 
                $("#info").html("") 
                a.addClass("set") 
                alert("定时设置成功，请点【上传替换】") 
                settime = null
            }
        }
        cancel = function() {
            $("#time").hide("fast") 
            a.removeData("retime") 
            a.html("定时") 
            $("#info").html("") 
            a.removeClass("set") 
            cancel = null
        }
    } else {
        return
    }
}

//定时校验------------------------------------------------------------------------------------------------------------
var testtime = function() {
    var input = $("#settime input") 
    var time = []
    for (var i = 0; i < 5; i++) {
        time[i] = input.eq(i).val().replace(/\D/g, "") 
        time[i] = Number(time[i])
    }
    if (time[1] > 12 || time[2] > 31 || time[3] > 23 || time[4] > 60 || !time[0] || !time[1] || !time[2]) {
        $("#info").html("月、日、时或者分钟的格式不对") 
        return false
    }
    if (time[1] == 2) {
        if (time[2] > 29 || (time[0] % 4 !== 0 && time[2] == 29)) {
            $("#info").html(time[0] + "年2月有" + time[2] + "天吗？") 
            return false
        }
    }
    var retime = (new Date(time[0], time[1] - 1, time[2], time[3], time[4], 0)).getTime() 
    if (retime < open) {
        $("#info").html("时间设置到了过去吧？") 
        return false
    }
    $("#info").html("") 
    return [retime, time]
}


//上传操作-----------------------------------------------------------------------------------------
function upload(a) {
    if (active = true) {
        var parent  = a.parent() 
        var st      = parent.find("i").html() 
        if (confirm("确定已经备份原图了吗？\n替换以后将找不到原图了。")) {
            if (confirm("确定（" + ((st == "定时") ? "立即": st) + "）上传替换吗？")) {
                var img     = parent.find("img").eq(0).attr("src")
                if(parent.find("span").attr("iid") == "-2") {
                    img = parent.find("embed").attr("src")
                }
                img = img.replace("http://", "")       
                var time    = parent.find("i").data("retime") 
                var retime  = "&retime=";
                if (time) {
                    retime += time;
                }
                a.html("上传中..") 
                $.ajaxFileUpload({
                    url: '/upload?file=' + img + "&active=set&host=" + formatURL().url + retime,
                    secureuri: false,
                    file: parent.find("input").eq(0),
                    dataType: 'json',
                    success: function(data) {
                        active = false 
                        $("#all_num").html($("#all_num").html() - 1) 
                        if (data == "替换成功" || data == "定时成功") {
                            a.html(data) 
                            parent.attr("class", "s3") 
                            a.attr("onclick", "")
                        } else if (data == "登录超时。请重新登录！") {
                            alert(data) 
                            document.location = "/login";
                        } else if (data == "没有权限") {
                            alert("这个文件没有权限修改。") 
                            a.html(data) 
                            a.attr("onclick", "") 
                            parent.attr("class", "s4")
                        } else {
                            a.html("再试一次") 
                            parent.attr("class", "s4")
                        }
                    }
                })
            } else {
                return;
            }
        } else {
            return
        }
    } else {
        alert("有一个文件正在上传，请耐心等待")
    }

}

//AJAX给页面传参----------------------------------------------------------------------------------------------------
$.get("/get_ajax", function(a) {
    if (a.name == "") {
        alert("登录超时")
    } else {
        $("#name").html(a.name) 
        $("#record").html(a.record) 
        $("#setftp").html(a.ftp) 
        if (Math.abs(open - a.time) > 600000) {
            $("#info").html("您电脑的系统时间不准确，将影响定时替换！")
        }
        input = $("#settime input") 
        input.eq(0).val(date.getFullYear()) 
        input.eq(1).val(date.getMonth() + 1) 
        input.eq(2).val(date.getDate()) 
        input.eq(3).val(date.getHours() + 1)
    }
}, "json")

//页面关闭确认-----------------------------------------------------------------------------------------------------
window.onbeforeunload = function() {
    return " "
}

//git ajax---------------------------------------------------------------------------------------------------------
var git_run = function() {
    $("#git").addClass("disable")
    $("#git").unbind("click")
    $("#git").html("...")
    $.get("/git", function(info){
        if(info == "登录超时"){
            alert("登录超时")
            window.location = "/login"
        }else if(info == "ok"){
            $("#git").removeClass("disable")
            $("#git").click(git_run)
            $("#git").html("Git")
        }else if(info == "err"){
            $("#git").html("错误")
        }
    })
}

$("#git").click(git_run)