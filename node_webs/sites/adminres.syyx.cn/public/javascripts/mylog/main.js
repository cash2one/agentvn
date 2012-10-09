function can(a) {
    
    if (confirm("你确定要取消定时上传替换吗？")) {
        var parent = a.parent() 
        $.post("/upload", {
            active  : parent.find("i").html()
        }, function(data) {
            alert(data) 
            if (data == "取消成功") {
                parent.parent().find("td").eq(4).html("被取消")
                parent.parent().find("td").eq(4).addClass("er")
            } else {
                alert(data)
            }
        }, "html")
    } else {
        return
    }

}
// function re(a){
// 	if(confirm("你确定要恢复备份吗？")){
// 		var grandpa = a.parent().parent()
// 		src1=grandpa.find("img").eq(1).attr("src")
// 		if(/\/files\/backup/.test(src1)){		
// 			var src0=grandpa.find("img").eq(0).attr("src").replace("http://","")
// 			$.post("/rebackup",{file:src0,refile:src1},function(data){
// 				alert(data)
// 				if(data == "恢复成功"){
// 					src0=grandpa.find("img").eq(0)
// 					grandpa.hide("fast")
// 				}else if(data == "登录超时。请重新登录！"){
// 					document.location = "/login";
// 				}else{
// 					return
// 				}
// 			},"html")
// 		}else{
// 			alert("备份图片无效！")
// 		}
// 	}else{
// 		return
// 	}
// }
function all(a) {
    $("table").eq(0).removeClass("show_time") 
    $(".cate a").removeClass("check") 
    a.addClass("check")
}

function show_time(a) {
    $("table").eq(0).addClass("show_time") 
    $(".cate a").removeClass("check") 
    a.addClass("check")
}

$.get("/mylog_ajax" + document.location.search, function(a) {
    if (a.name == "") {
        alert("登录超时")
    }else if(a.con == "没有权限查看"){
        alert(a.con)
    }else {
        $("#name").html(a.name) 
        $("#con").html(a.con)
        if(a.del) {
            $(".cate").append("<span id='op'>" + a.del + "</span>")
        }
    }
}, "json")

function del() {
    var date = $("#date").val()    
    if(/^\d+$/.test(date) && date != 0){
        if (confirm("你确定要删除" + date + "天以前所有日志吗？")) {
            $.get("/del_upload_log?time=" + date , function(){
                document.location.reload()
            }, "html")
        }else {
            return
        }
    }else{
        alert("请输入大于零的整数！")
    }   
}