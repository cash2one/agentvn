$.get("/gitlog_ajax", function(a) {
    if (a.name == "") {
        alert("登录超时")
    } else {
        $("#name").html(a.name) 
        $("#gitlog").html(a.con)
    }
}, "json")

function clean(){
    $.get("/gitlog_ajax?a=rm", function(a) {
        if (a.name == "") {
            alert("登录超时")
        } else {
            alert(a.con)
            document.location.reload()
        }
    }, "json")
}