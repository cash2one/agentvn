!function() {
    var search = document.location.search
    if(!search || !/&/.test(search)) {
        alert("非法访问！")
    }
    search = search.substring(1).split("&")
    var user = /user=/.test(search[0]) ? search[0].substring(5) : search[1].substring(5)
    var active = /active=/.test(search[0]) ? search[0].substring(7) : search[1].substring(7)
    document.getElementById("user").innerHTML = user
    document.getElementById("active").innerHTML = active
    document.getElementById("to_active").setAttribute("href", "http://nysj.syyx.com/activate.html?user=" + user + "&active=" + active)
    //var 

}()

