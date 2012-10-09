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

    }   
}

// 以上为弹窗

$.get("/tshirt/vote_result", function(data) {
    if(data.type == 1) {
        alert("数据错误")
    } else if(data.type == 2) {
        alert("抱歉，您无权查看。")
    } else {
        var result = data.result;
        $.get("/tshirt/candidates", function(data) {
            var code = data.shirts
            var len  = code.length
            var html = ""
            for(var i = 0 ; i < len ; i++) {
                var num_vot = 0
                if(result[code[i].id]) {
                    num_vot = result[code[i].id]
                }
                html += "<li><h4>No:" + code[i].id + "</h4><img src='/images/tshirt/t" + code[i].id + ".jpg' id='t" + code[i].id + "' width='280' height='230' title='查看详细信息'/>"
                html += "<div><h2>名称：" + code[i].name + "</h2><span>设计：" + code[i].designer + "</span></div><div>票数：<em>" + num_vot + "</em></div></li>"
            }
            $("#list").html(html)
            puple()            
        }, "json")
    }
}, "json")
