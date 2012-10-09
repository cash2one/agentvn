$.post("/login/check",function(data) {
    if(data.ok == 0) {
        document.location = "/login.html"
    }
},"json")