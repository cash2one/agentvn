function addone() {
    $("tbody").append("<tr><td><input type='text' /></td><td><input type='text' /></td><td><input type='text' /></td><td><input type='text' /></td><td><input type='password' /></td><td><em onclick='del($(this))'>删除</em></td></tr>")
}
function subftp() {
    var tr  = $("tbody tr") 
    var l   = tr.size() 
    var con = ""
    for (var i = 0; i < l; i++) {
        var input = tr.eq(i).find("input") 
        if (input.eq(0) !== '' && input.eq(1) !== '') {
            con += input.eq(0).val() + "," + input.eq(1).val() + "," + input.eq(2).val() + "," + input.eq(3).val() + "," + input.eq(4).val() + "\n"
        }
    }
    $.post("/setftp", {con: con}, function(a) {
        alert(a)
    }, "html")
}
function del(a) {
    if (confirm("你确定要删除吗？提交后将删除！")) {
        var tr = a.parent().parent() 
        tr.hide("fast") 
        tr.remove()
    } else {
        return
    }
}
$.get("/adminftp_ajax", function(a) {
    if (a.name == "") {
        alert("登录超时")
    } else {
        $("#name").html(a.name) 
        $("#con").html(a.con)
    }
}, "json")