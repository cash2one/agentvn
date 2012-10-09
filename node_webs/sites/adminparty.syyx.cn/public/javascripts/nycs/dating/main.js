//-----------------------------------------------------------------------------------------------
var user
var images
//-----------------------------------------------------------------------------------------------
$(function() {
    get_image_list()
    add_image_listener()
    add_select_listener()
})
//-----------------------------------------------------------------------------------------------
var check_login = function() {
    $.post("/login/check",function(data) {
        if(data.ok == 0) {
            document.location = "/login.html#nycs/dating.html"
        } else {
            user = data.account
            $("body").show()
        }
    },"json")    
}
//-----------------------------------------------------------------------------------------------
// check_login()
//-----------------------------------------------------------------------------------------------
var get_image_list = function(filter) {
    $.get("/nycs/dating/get_image_list?r=" + Math.random(), { type : filter }, function(data) {
        images = data

        if(data.length == 0) {
            $("#list tbody").html("没有数据")
            return
        }
        
        show_select()
        show_images(0)
    },"json")    
}
//-----------------------------------------------------------------------------------------------
var show_select = function() {
    var image_count = images.length
    var page_count  = Math.ceil(image_count/8)

    $("#all_page").html(page_count)
    $("#all_data").html(image_count)

    var cur_page = $("select.page").val()

    var html_code  = ""
   
    for(var i=0; i < page_count ; i++){
        html_code  += '<option value="' + i + '">' + (i+1) + '</option>'
    }
        
    $("select.page").html(html_code)

    if(cur_page) {
        $("select.page").val(cur_page)
    }
}
//-----------------------------------------------------------------------------------------------
var show_images = function(page) {
    var start = page*8
    var end   = start + 8 > images.length ? images.length : start + 8

    var content = "<tr index = '{0}'><td><a href='{1}' target='_blank'><img src='{2}'></a></td><td>{3}</td><td>{4}</td><td>{5}</td><td>{6}</td><td>{7}</td><td><a href='javascript:undefined' class='pass'>通过</a><a href='javascript:undefined' class='reject'>不通过</a><a href='javascript:undefined' class='delete'>删除</a></td></tr>"

    $("#list tbody").html("")

    for(var i = start; i < end; i++) {

            var src   = images[i].src
            var id    = images[i]._id
            var date  = images[i].date
            var tel   = images[i].tel
            var name  = images[i].nickname
            var state = images[i].checked == "checked" ? "已审核" : "未审核"
            
            if(images[i].checked == "checked") {
                state += images[i].passed == "pass" ? ",通过" : ",不通过"
            }

            var html_code = format_string(content, i, src, src, id, name, tel, date, state)
            $("#list tbody").append(html_code)
    }
}
//-----------------------------------------------------------------------------------------------
var add_image_listener = function() {
    $("#list").delegate("a.pass, a.reject, a.delete", "click", function() {    
        var tr    =  $(this).parent().parent()
        var index =  tr.attr("index")
        var id    =  images[index]._id
        var action = $(this).attr("class")

        if(action == "delete") {
            if( !confirm("确认删除?") ) {
                return
            }
        }

        $.get("/nycs/dating/action?r=" + Math.random(), { action : action, id : id}, function(data) {
            if(data != "0") {
                alert("操作失败")
                return
            }    
                
            if(action == "delete") {
                images.splice(index,1)
                tr.remove()
                show_images($("select.page").val())
                show_select()   
            }
            else {
                state = action == "pass" ? ",通过" : ",不通过"
                tr.find("td").eq(5).html("已审核" + state)
            }

            alert("操作成功")
        })        
    })
}
//-----------------------------------------------------------------------------------------------
var add_select_listener = function() {
    $("select.page").change(function() {
        var page   = $(this).val()
        
        show_images(page)
    })

    $("select.filter").change(function() {
        var filter = $(this).val()
        
        get_image_list(filter)
    })
}
//-----------------------------------------------------------------------------------------------
var format_time = function(time) {
    var new_time = new Date()
    new_time.setTime(time)
    return new_time.getFullYear() + '-' + (new_time.getMonth() + 1) + "-" + new_time.getDate()
}
//-----------------------------------------------------------------------------------------------
var format_string = function(src){
    if (arguments.length == 0) return null;
    var args = Array.prototype.slice.call(arguments, 1)
    return src.replace(/\{(\d+)\}/g, function(m, i){
        return args[i]
    })
}
//-----------------------------------------------------------------------------------------------
