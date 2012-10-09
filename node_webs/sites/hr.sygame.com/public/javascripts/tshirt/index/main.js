function close() {
    $("#puple_bg").css("display", "none")
    $("#puple").fadeOut("fast")
} 

function puple() {
    var len = $("#list img").length
    for(var i = 0 ; i < len ; i ++) {
        $("#list img").eq(i).click(function() {
            var index  = Number($(this).attr("id").substring(1))
            var top    = $("html").scrollTop() || $("body").scrollTop()
            var window_height = window.innerHeight || document.documentElement.clientHeight

            $("#puple").removeAttr("style")
            $("#puple").html('<div id="img_box"><div id="title"></div><div class="img"><img src="/images/tshirt/l' + index + '.jpg"></div><div id="close" title="关闭"></div></div>')
            $("#puple_bg").css("display", "block")
            $("#puple").css("top", top + window_height/2 - 175 + "px")
            $("#puple").fadeIn("fast")
            $("#title").html($("#list h2").eq(index - 1).html().substring(3))
            $("#puple img").eq(0).load(function() {
                var height = this.offsetHeight + 40
                var opaction = {
                    "width"         : this.offsetWidth ,
                    "height"        : height,
                    "margin-left"   : -(this.offsetWidth/2 + 20),
                    "top"           : top - height/2 + window_height/2
                }
                $("#puple").animate(opaction, function () {
                    $("#close").click(close)
                    $("#img_box").animate({"opacity" : 1}, "fast")
                })
            })
        })

        $("#list a").eq(i).click(function(index) {
            return function () {
                var current = $("#list img").eq(index).attr("id").substring(1)
                if(confirm("您确定给 No:" + current + "——\"" +  $("#list h2").eq(index).html().replace("名称：", "") + "\" 投一票吗？")){
                    var self = $(this)
                    $.get("/tshirt/vote?id=" + current, function(data) {
                        switch(data.type) {
                            case 2:
                                alert("您最多只有三次投票机会哦！")
                                break;
                            case 1:
                                alert("您不能对同一作品投两次票")
                                break;
                            case 0:
                                alert("感谢您投票成功！")
                                self.addClass("disable")
                                $("#list a").eq(index).unbind("click")
                                break;
                            default:
                                alert("投票失败，未知错误。")
                                break;
                        }
                    },"json")
                }
            }
        }(i))
        $("#list .disable").unbind("click")
    }   
}

// 以上为弹窗


$.get("/tshirt/candidates", function(data) {
    if(data.type != 0) {
        alert("数据错误")
    } else {
        var code = data.shirts
        var len  = code.length
        var html = ""
        for(var i = 0 ; i < len ; i++) {
            var stat = ""
            if(data.vote && (data.vote.data[0] == code[i].id || data.vote.data[1] == code[i].id || data.vote.data[2] == code[i].id)) {
                stat = "class='disable'"
            }

            html += "<li><h4>No:" + code[i].id + "</h4><img src='/images/tshirt/t" + code[i].id + ".jpg' id='t" + code[i].id + "' width='280' height='230' title='查看详细信息'/>"
            html += "<div><h2>名称：" + code[i].name + "</h2><span>设计：" + code[i].designer + "</span></div><a href='javascript:undefined' " + stat + "></a></li>"
        }
        $("#list").html(html)
        puple()
    }
}, "json")