
var editor = ace.edit("editor");
editor.setTheme("ace/theme/twilight")
var js_mode = require("ace/mode/javascript").Mode
editor.getSession().setMode(new js_mode())
//以上为编辑器 初始设置

var loaded = false
var id = document.location.search
!function () {
    $.get("/nycs/questionnaire/get_question" + id + "&r=" + Math.random(), function(data) {
        eval("var json = " + data)
        if(json.type == 1) {
            editor.insert(json.data)
        } else {
            delete json.data._id
            delete json.data.question_cache
            var code = jsontostr(json.data)
            var len = code.length
            if(data[len - 1] == ",") {
                data = code.substring(0, len -1 )        
            } else if(code[len - 2] == ",") {
                code = code.substring(0, len -2 )
            }
            editor.insert(code)
        }
        loaded = true
    },"html")
}()

var tostr = {
    tab : "",
    arr : function(arr) {
        if(arr == "") {
            return "[]"
        }
        var len = arr.length
        tostr.tab += "    "
        var str = "["
        for (var i = 0 ; i < len ; i++) {
            if(!arr[len -1]) {
                break
            }
            str += tostr[type(arr[i])](arr[i], i) + ((type(arr[i]) == "obj") ? "" :  ", ")
        }
        str = str.substring(0, str.length - 2) + "\n"
        var length = str.length
        tostr.tab = tostr.tab.substring(4)
        if(length < 50) {
            str += "]"
            str = str.replace(/\n+/g, "")
        } else {
            str += tostr.tab + "]"
        }
        
        return str
    },
    obj : function(obj, arr) {
        var str = "{\n"        
        if(arr == 0) {
            str = "\n" + tostr.tab + "{\n"
        } else if(arr > 0){
            str = tostr.tab + "{\n"
        }
        tostr.tab += "    "
        for (var v in obj) {
            str += (tostr.tab + v)
            str += " : "
            str += tostr[type(obj[v])](obj[v]) + (type(obj[v]) == "obj" ? "" : ",\n")
        }
        str = str.substring(0, str.length - 2) + "\n"
        tostr.tab = tostr.tab.substring(4)
        if(str.replace(/\s/g, "").length < 50) {
            str += "},\n"
            str = str.replace(/\{\n\s*?\b/g, "{ ").replace(/\n}/g, " }").replace(/,\n\s*?\b/g, ", ")
        } else {
            str += tostr.tab + "},\n"
        }
        return str
    },
    fun : function(fun) {
        var str = fun.toString() 
        return str
    },
    str : function(str) {
        var str = str.replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/\s/g,"\\s")
        var str = "\"" + str + "\""
        return str
    },
    ide : function(ide) {
        return ide
    }
}



function type(data) {
    if(typeof data == "string") {
        return "str"
    } else if(typeof data == "number" ) {
        return "ide"
    } else if(typeof data == "undefined") {
        return "ide"
    } else if(typeof data == "boolean"){
        return "ide"
    } else if(typeof data == "function"){
        return "fun"
    } else if(typeof data == "object") {
        if(data instanceof Array) {
            return "arr"
        } else if(!data){
            return "ide"
        } else {
            return "obj"
        }
    }
}
//$(".show").html([1,"2",3,4].toString())
function jsontostr(json) {
    if(json instanceof Array) {
        return tostr.arr(json)
    } else if(json instanceof Object) {
        return tostr.obj(json)
    }
}

$("#save").click(function() {
    if(loaded) {
        $.post("/nycs/questionnaire/save_question", {id : id.substring(4) ,data : editor.getValue()}, function(data) {
            if(data.type == 1 ) {
                alert("保存成功")
            }else {
                alert("未知错误，保存失败。")
            }
        }, "json")
    } else {
        alert("数据没有加载完毕，请稍候！")
    }

})

$("#sub").click(function() {    
    var data = editor.getValue()
    data = data.replace(/\/\/[^'"]*?\n/g,"\n").replace(/\/\*[^'"]*?\*\//g, "")
    eval("var json=" + editor.getValue())

    var errs = []
    _G_dsl_survey.check(json, errs)
    if("" == errs) {
        $.post("/nycs/questionnaire/save_question", {id : id.substring(4) ,data : data, stat : 0}, function(data) {
            if(data.type == 1 ) {
                alert("发布成功")
            }else {
                alert("未知错误，发布失败。")
            }
        }, "json")
    } else {
        alert(errs)
    }
})

var hide = false

$("#hidden_comment").click(function() {
    if(hide) {
        $(".comment").css("display", "inline")
        hide = false
    } else {
        $(".comment").css("display", "none")
        hide = true
    }
})


$.post("/login/check",function(data) {
    if(data.ok == 0) {
        document.location = "/login.html"
    }
},"json")