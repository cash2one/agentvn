//-获取列表------------------------------------------------------------------------------------------
var user = ""

function formattime(time) {
    var new_time = new Date()
    new_time.setTime(time)
    return new_time.getFullYear() + '-' + (new_time.getMonth() + 1) + "-" + new_time.getDate()
}

function list_action() {
    $(".del").click(function() {
        if(!user) {
            return;
        }
        if(confirm("确定要删除吗？确定后将删除【这个问卷】的题目和所有答案！")) {
            var parent = $(this).parent()
            $.post("/nycs/questionnaire/question_del",{id : parent.attr("sid") , user: user}, function(data) {
                if(1 == data.type) {
                    alert("删除成功")
                    $(this).css("background", "#000000")
                    parent.html(formattime(data.date) + '被' +  user + '删除')
                } else {
                    alert("删除失败")
                }
            },"json")
        }
    })

    $(".edit").click(function() {
        if(!user) {
            return;
        }
        window.open("/nycs/questionnaire/questionedit.html?id=" + $(this).parent().attr("sid"))
    })

    $(".view").click(function() {
        if(!user) {
            return;
        }
        window.open("/nycs/questionnaire/questionview.html?id=" + $(this).parent().attr("sid"))
    })

    $(".out").click(function() {
        if(!user) {
            return;
        }
        var that = $(this)
        $.get("/nycs/questionnaire/answer_out?id=" + $(this).parent().attr("sid"), function(data) {
            if(data.type == 0) {
                that.html("下载").attr({"href" : "/_att/nycs/questionnaire/" + data.url + ".xls" , "target" : "_blank"}).unbind("click")
            }else {
                alert("导出报表失败！")
            }             
        }, "json")
    })
}

function getlist(page) {
    $.get("/nycs/questionnaire/question_list?p=" + page + "&r=" + Math.random(), function(data) {
        if(data.type == 0) {
            $("#list").html("没有数据")
            return
        }
        var count = Math.ceil(data.data.count/20)
        var json  = data.data.json
        var len   = json.length        
        var html = '<table border="0">'
        var head = '<tr><th>序号</th><th>标题</th><th>状态</th><th>题数</th><th>答案数</th><th>开始时间</th><th>结束时间</th><th>添加人</th><th>添加时间</th><th width="200">操作</th>'
        html += '<thead>' + head +'</thead>'
        html += '<tfoot>' + head +'</tfoot>'
        html += '<tbody>'
        for(var i = 0 ; i < len ; i ++) {
            var config = json[i].config
            var stat  = "正常"
            if(json[i].stat == -1) {
                stat = '<span>未发布</span>'
            }
            if(json[i].stat == -2) {
                stat = '被删除'
            }
            html += '<tr><td>#' + (i + 1) +'</td><td class="title"><a href="http://party.syyx.com/nycs/questionnaire/examination.html?id=' + json[i].addtime +'" target="_blank">' + json[i].name + '</a></td><td>' + stat + '</td><td>' + json[i].question + '</td><td>' + json[i].answers + '</td><td>' + config.starttime + '</td><td>' + config.endtime + '</td><td>' + json[i].adduser + '</td><td>' + formattime(json[i].addtime) + '</td>'
            if(json[i].deltime == 0) {
                html += '<td sid="' + json[i]._id + '"><a class="edit" href="javascript:undefined">编辑</a><a class="del" href="javascript:undefined">删除</a><a class="view" href="javascript:undefined">预览</a><a class="out" href="javascript:undefined">报表</a></td></tr>'
            } else {
                html += '<td>' +  formattime(json[i].deltime) + '被' +  json[i].deluser + '删除</td></tr>'
            }
        }
        html += '</tbody></table>'
        $("#list").html(html)
        list_action()

        $("tbody tr").mouseover(function() {
            $(this).addClass("hover")
        })
        $("tbody tr").mouseout(function() {
            $(this).removeClass("hover")
        })
        $(".all").html(count)

        var option  = ""
        for(var j=1; j <= count ; j++){
            option  += '<option value="' + j + '">' + j + '</option>'
        }
        $(".check_page").html(option)
        setTimeout(function() {$(".check_page").val(page)}, 10)
        $(".check_page option").click(function() {
            if($(this).index() + 1 == page) {
                return
            }
            getlist($(this).index() + 1)
        })
        $(".all_page").html(count)
        $(".all_data").html(data.data.count)
    }, "json")
}
getlist(1)

//-提交------------------------------------------------------------------------------------------------------------------
!function(){
    get_page_size = {
        page_height : function() {
            if($.browser.msie && $.browser.version < 7) {
                var b = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
                var c = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight)
                if(b < c) {
                    return $(window).height()
                } else {
                    return b
                }
            } else {
                return $(document).height()
            }
        },

        page_width : function() {
            if($.browser.msie) {
                var b = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth)
                var c = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth)
                if(b < c) {
                    return $(window).width()
                } else {
                    return b
                }

            }else {
                return $(document).width()
            }
        },
        scrolltop     : function() {
                return $("html").scrollTop() || $("body").scrollTop()
        },

        client_height : function() {
            return window.innerHeight || document.documentElement.clientHeight
        }
    }
    $("#add").click(function() {
        $("#puple_bg").css({
            "display" : "block",
            "width" : get_page_size.page_width() ,
            "height" : get_page_size.page_height()
        })
        $("#add_new").css({
            "display" : "block",
            "top"     : get_page_size.scrolltop() + get_page_size.client_height()/2 - 228
        })
    })

    function close(){
        $("#puple_bg").css({
            "display" : "none",
            "width" : "",
            "height" : ""
        })
        $("#add_new").css({
            "display" : "none",
            "top"     : ""
        })
    }

    $("#close").click(close)

    $(window).resize(function() {
        if($("#puple_bg").css("display") !== "block") {
            return
        }
        $("#puple_bg").css({
            "width" : "100%" ,
            "height" : "100%"
        })
        setTimeout(function() {
            $("#puple_bg").css({
                "width" : get_page_size.page_width(),
                "height" : get_page_size.page_height()
            })
        }, 1)
    })
    function timeset() {
        var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        var year = new Date().getFullYear()
        $("#start_y").add("#end_y").html('<option value="' + year + '">' + year + '</option><option value="' + (year + 1) + '">' + (year + 1) + '</option>')
        function getday(value, obj) {
            if($("#" + obj + "_y").val() % 4 ==0) {
                days[1] = 29
            } else {
                days[1] = 28
            }
            day_len = days[value - 1]
            var html = ""     
            for(var i = 1; i <= day_len; i++) {
                html += '<option value="' + i +'">' + i + '</option>'
            }
            $("#" + obj + "_d").html(html)
        }

        $("#start_m").change(function() { 
            //alert(123)
            getday($(this).val(), "start")
        })
        $("#end_m").change(function() {
            getday($(this).val(), "end")
        })


    }

    timeset()
    //提交
    $("#sub").click(function() {
        if(!user) {
            return;
        }
        var post = {}
        post.name        = $("#title").val()
        post.award       = $("#banner").val()
        post.award       = post.award.substring(0, 7) != "http://" ? "http://" + post.award : post.award
        post.welcome     = $("#welcome").val()
        post.thanks      = $("#thanks").val()        
        post.login       = $("#login_yes").attr("checked") ? true : false
        post.iplimit     = $("#ip_yes").attr("checked") ? true : false
        post.interval    = $("#interval").val()
        post.starttime   = $("#start_y").val() + "-" + $("#start_m").val() + "-" + $("#start_d").val()
        post.endtime     = $("#end_y").val() + "-" + $("#end_m").val() + "-" + $("#end_d").val()
        post.adduser     = user

        if(post.title == "" || post.banner == "" || post.welcome == "" || post.thanks == "") {
            alert("输入内容不完整，请填写完整！")
            return
        }
        if(!$("#end_d").val() || !$("#start_d").val()) {
            alert("开始时间或结束时间不完整")
            return
        }
        if(!/\d{1,3}/.test(post.interval)){
            alert("时间间隔为1-3个数字")
            return
        }
        if(post.starttime > post.endtime) {
            alert("时间设置不正确，没法穿越。")
            return
        }

        if(post.name.length > 20 ) {
            alert("标题太长了")
            return
        }
        if(post.welcome.length > 100 ) {
            alert("欢迎词太长了")
            return
        }
        if(post.thanks.length > 100 ) {
            alert("感谢词太长了")
            return
        }

        $.post("/nycs/questionnaire/add_question", post , function(data) {
            if(data.type == 0) {
                alert("添加成功，请在列表中选择添加的问卷进行编辑")
                document.location.reload()
            } else {
                alert("添加失败，未知错误")
            }
        }, "json")
        //初始化
        $("#add_new input").val("")
        $("#add_new textarea").val("")
    })

}()


$.post("/login/check",function(data) {
    if(data.ok == 0) {
        document.location = "/login.html"
    } else {
        user = data.account
    }
},"json")