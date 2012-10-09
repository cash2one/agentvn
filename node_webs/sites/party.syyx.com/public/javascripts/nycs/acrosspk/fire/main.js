var enter
var war
var enter_data = false
var war_data   = false
var check      = 0
function date2html(date) {
    var len  = date.length
    if (len > 6) {
        len = 6
    }
    var html = ""
    for(var i = 0 ; i < len ; i++) {
        var arr_date = date[i].AddDate.split("-")
        html += "<a>" + arr_date[0] + "年" + arr_date[1] + "月</a>"
    }
    $("#time_box").html(html)
    dateevent()
}

function html2date(date) {
    var arr_date = date.split("年")
    return arr_date[0] + "-" + arr_date[1].replace("月", "")
}

function date2serch(date) {
    var arr_date = date.split("-")
    return "?startdate=" + date + "-1&enddate=" + arr_date[0] + "-" + (arr_date[1] - 0 + 1) + "-1"
}

//-日期--------------------------------------------------------
function dateevent() {
    $("#view_time span").eq(0).unbind("click")
    $("#view_time span").eq(0).click(function() {
        if($("#time_box").html() == "") {
            return
        }
        $("#time_box").fadeIn("fast", function() {
            $(document).one("click", function(event) {
                event.stopPropagation();
                $("#time_box").fadeOut("fast")
            })
        })
        var len = $("#time_box a").length
        for(var i = 0 ; i < len ; i++) {
            $("#time_box a").eq(i).click(function() {
                if($("#view_time span").eq(0).html() == $(this).html()){
                    return
                }
                $("#view_time span").eq(0).html($(this).html())
                $("#time_box").fadeOut("fast")
                show_enter(html2date($(this).html()))
                show_war(html2date($(this).html()))
            })
        }
    })
}

function cycle(date_enter, date_war) {
    var first_enter = (date_enter == "") ? "" : date_enter[0].AddDate
    var first_war   = (date_war == "") ? "" :date_war[0].AddDate
    tab_event()
    if(first_enter > first_war || first_war == "") {
        $("#tab_charts span").eq(1).addClass("check_1")        
        $(".tbl_2").fadeIn("fast")
        $(".tbl_1").css("display", "none")
        date2html(enter)
        show_war(first_enter)
        show_enter(first_enter)
        check = 1
    } else if(first_enter <= first_war || first_enter == ""){
        $("#tab_charts span").eq(0).addClass("check_0")
        $(".tbl_2").css("display", "none")
        $(".tbl_1").fadeIn("fast")
        date2html(war)
        show_war(first_war)
        show_enter(first_war)
        check = 0
    }
}

function show_enter(date) {    
    var arr_date = date.split("-")
    $("#view_time span").eq(0).html(arr_date[0] + "年" + arr_date[1] + "月")
    $(".g_title").html("")
    $(".g_name").html("")
    $(".vs_title").html("")
    $(".vs_name").html("")
    $.get("/nycs/acrosspk/firelist" + date2serch(date), function(data) {        
        if(data != "") {
            enter_data = true
            if(check == 1){
                $(".tbl_3").css("display", "none")
                $(".tbl_2").fadeIn("fast")
            }
        } else {
            enter_data = false
            return
        }
        var len = data.length
        $("#enter").html("")
        for(var i = 0 ; i < len ; i ++) {
            var group = data[i].TableNo
            if(group == 15) {             
                $("#pk" + data[i].PKRound + " .g_" + (group * 2 - 1) + " .vs_title").html(data[i].LeftName.replace(/undefined|null/, ""))
                $("#pk" + data[i].PKRound + " .g_" + (group * 2 - 1) + " .vs_name").html(data[i].LeftServerName.replace(/undefined|null/, ""))
                $("#pk" + data[i].PKRound + " .g_" + (group * 2) + " .vs_title").html(data[i].RightName.replace(/undefined|null/, ""))
                $("#pk" + data[i].PKRound + " .g_" + (group * 2) + " .vs_name").html(data[i].RightServerName.replace(/undefined|null/, ""))
            } else {
                $("#pk" + data[i].PKRound + " .g_" + (group * 2 - 1) + " .g_title").html(data[i].LeftName.replace(/undefined|null/, ""))
                $("#pk" + data[i].PKRound + " .g_" + (group * 2 - 1) + " .g_name").html(data[i].LeftServerName.replace(/undefined|null/, ""))
                $("#pk" + data[i].PKRound + " .g_" + (group * 2) + " .g_title").html(data[i].RightName.replace(/undefined|null/, ""))
                $("#pk" + data[i].PKRound + " .g_" + (group * 2) + " .g_name").html(data[i].RightServerName.replace(/undefined|null/, ""))
            }
        }
    }, "json")
}

function show_war(date) {
    var arr_date = date.split("-")
    $("#view_time span").eq(0).html(arr_date[0] + "年" + arr_date[1] + "月")
    $("#war").html("")
    $.get("/nycs/acrosspk/fireranklist" + date2serch(date), function(data) {
        if(data != "") {
            war_data = true
            if(check == 0){
                $(".tbl_3").css("display", "none")
                $(".tbl_1").fadeIn("fast")
            }
        } else {
            war_data = false
            return
        }
        var len   = data.length
        var group = ["", "69级组", "79级组", "89级组", "99级组"]
        var html  = ""
        for(var i = 0 ; i < len ; i ++) {
            html += "<tr><td>" + group[data[i].PKRound] +"</td><td><div class='gold'>" + data[i].FirstGroupName.replace(/undefined|null/, "") +"</div></td><td>" + data[i].ServerName.replace(/undefined|null/, "") +"</td><td>" +  data[i].UserName.replace(/undefined|null/, "") +"</td></tr>"
        }
        $("#war").html(html)
    }, "json")
}

function tab_event() {
    $("#tab_charts span").eq(0).click(function() {
        check = 0
        $("#tab_charts span").eq(1).removeClass("check_1")
        $(this).addClass("check_0")
        $(".tbl_2").css("display", "none")
        $(".tbl_3").css("display", "none")
        if(war_data == true){
            $(".tbl_1").fadeIn("fast")
        } else {
            $(".tbl_3").fadeIn("fast")
        }
        date2html(war)
    })
    $("#tab_charts span").eq(1).click(function() {
        check = 1
        $("#tab_charts span").eq(0).removeClass("check_0")
        $(this).addClass("check_1")
        $(".tbl_1").css("display", "none")
        $(".tbl_3").css("display", "none")
        if(enter_data == true){
            $(".tbl_2").fadeIn("fast")
        } else {
            $(".tbl_3").fadeIn("fast")
        }   
        date2html(enter)
    })
}

!function () {
    $("#tab_match a").eq(0).mouseover(function() {
         $("#tab_match a").eq(0).addClass("tab_0")
         $("#tab_match a").eq(1).removeClass()
    })
    $("#tab_match a").eq(0).mouseout(function() {
         $("#tab_match a").eq(1).addClass("tab_1")
         $("#tab_match a").eq(0).removeClass()
    })

//-获取日期列表-------------------------------------------------
    $.get("/nycs/acrosspk/firecycle", function (date_enter) {
        $.get("/nycs/acrosspk/firerankcycle", function(date_war) {
            if(date_enter == "" && date_war == "") {
                $(".tbl_3").fadeIn("fast")
                $("#view_time span").eq(0).html("暂无数据")
                return
            }
            enter = date_enter
            war   = date_war
            cycle(date_enter, date_war)
        }, "json")
    }, "json")

    $("a").attr("hidefocus", "true")
}()