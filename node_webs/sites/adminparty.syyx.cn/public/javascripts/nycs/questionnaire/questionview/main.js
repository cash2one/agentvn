var abcd = ["A、", "B、", "C、", "D、", "E、", "F、", "G、","H、", "I、", "J、", "K、", "L、", "M、", "N、","O、", "P、", "Q、", "R、", "S、", "T、", "U、","V、", "W、", "X、", "Y、", "Z、"]
var num = 0
var questions = []

var qustion_out = {
    //单选
    radio   : function (question) {
        var options     = question.options
        var other       = question.other
        var len         = options.length
        var html = '<div class="title">' + num + "、" + question.type + '：' + question.title + '<span onclick="check(' + (num - 1) + ')">验证此题</span></div>'
        html    += '<div id="q' + (num - 1) + '">'
        if(question.config.random) {
            options = random_orde(options)
        }
        for(var i = 0 ; i < len ; i ++ ) {
            var mark = (options[i].mark !== undefined) ? (options[i].mark + 1) : (i + 1)
            html+= '<p><label><input class="radio" type="radio" name="r' + question.id + '" mark="' + mark + '" next="' + (options[i].next || 0) + '" />' + abcd[i] + options[i].item + '</label></p>'
        }
        if(other) {
            if(other.limit[1] <= 20) {
                var input = '<label><input class="in_text" maxlength="' + other.limit[1] + '" type="text" id="other' + (num - 1) + '" name="r' + question.id + '" next="' + (other.next || 0) + '" /></label> <span class="other_12">最多'+ other.limit[1] +'字，输入了<strong id="other_size' + (num - 1) + '">0</strong>个字</span>'
            } else {
                var input = '<span class="other_12">(不超过'+ other.limit[1] +'字，输入了<strong id="other_size' + (num - 1) + '">0</strong>个字)</span><br /><textarea class="in_area" id="other' + (num - 1) + '" name="r' + question.id + '" next="' + (other.next || 0) + '"></textarea>'
            }
            
            html+= '<p>' + other.item + '：' + input + '</p>'
            //html+= '<p><label>' + other.item + '：<input class="in_text" type="text" id="author' + (num - 1) + '" name="r' + question.id + '" next="' + (other.next || 0) + '" /></label></p>'
        }
        html    += '</div>'
        $("#question").append(html)
        if(other) {
            var a = num - 1
            $("#other" + a).click(function() {                 
                $("#other_size" + a).html($(this).val().length)                    
            })
            $("#other" + a).focus(function() {
                $("#q" + a + " .radio").attr("checked", false)
                $(this).css("color", "").attr("dis", "false")
            })

            $("#q" + a + " .radio").click(function() {
                $("#other" + a).css("color", "#ccc").attr("dis", "true")
            })
        }
    },
    //多选
    choose  : function (question) {
        var options     = question.options
        var len         = options.length
        var config      = question.config
        var max         = (config.max > len || config.max==-1 || !config.max) ? len : config.max
        var min         = (!config.min) ? 1 : config.min

        var check_num   = "（最少选" + min +"项，最多选" + max + "项）" 
        var html = '<div class="title">' + num + "、" + question.type + '：' + question.title + check_num + '<span onclick="check(' + (num - 1) + ')">验证此题</span></div>'
        html    += '<div id="q' + (num - 1) + '">'
        if(question.config.random) {
            options = random_orde(options)
        }
        for(var i = 0 ; i < len ; i ++ ) {
            var mark = (options[i].mark !== undefined) ? (options[i].mark + 1) : (i + 1)
            html+= '<p><label><input type="checkbox" name="c' + question.id + '" mark="' + mark + '" />' + abcd[i] + options[i].item + '</label></p>'
        }
        html    += '</div>'
        $("#question").append(html)
    },
    //填空
    blanks  : function (question) {
        var options     = question.options
        var len         = options.length
        var html = '<div class="title">' + num + "、" + question.type + '：' + question.title + '<span onclick="check(' + (num - 1) + ')">验证此题</span></div>'
        html    += '<table border="0" id="q' + (num - 1) + '">'
        for(var i = 0 ; i < len ; i ++ ) {
            html+= '<tr><td class="td_right">' + options[i].item + '：</td>'
            html+= '<td><input class="in_text" type="text" id="b' + i + '" maxlength="' + options[i].limit[1] + '" minlenth="' + options[i].limit[0] + '" st_type = "' + options[i].type + '" /></td></tr>'
        }
        html    += '</table>'
        $("#question").append(html)
     },
    //打分
    scoring : function (question) {
        var options     = question.options
        var len         = options.length
        var config      = question.config
        var range       = config.range
        var len2        = range.length
        var html = '<div class="title">' + num + "、" + question.type + '：' + question.title + '<span onclick="check(' + (num - 1) + ')">验证此题</span></div>'
        html    += '<table border="0" id="q' + (num - 1) + '">'
        html    += '<tr><td></td><td><div class="score_left">' + range.left + '</div><div class="score_center">' + range.mid + '</div><div class="score_right">' + range.right + '</div></td><td></td></tr>'
        if(question.config.random) {
            options = random_orde(options)
        }
        for(var i = 0 ; i < len ; i ++ ) {
            var mark = (options[i].mark !== undefined) ? options[i].mark : i
            html+= '<tr><td class="td_right">' +  options[i].item + '</td>'
            html+= '<td><div class="score_box"><div class="score_bg"></div><div class="score_bar"><span>' + config.score[0] + '</span><span>' + config.score[1] + '</span><span>' + config.score[2] + '</span><span>' + config.score[3] + '</span><span>' + config.score[4] + '</span></div></td>'
            html+= '<td>得分：<span class="score_num" mark="' + mark + '">0</span> 分</td></tr>'
        }
        html    += '</table>'
        $("#question").append(html)
        $(".score_bar span").mouseover(function() {
            $(this).parent().prev().css("width", ($(this).index() + 1 ) * 50)            
        })
        $(".score_bar").mouseout(function(event) {
            var width = $(this).prev().data("width") || 0 
            $(this).prev().css("width", width)
            event.stopPropagation(); 
        })
        $(".score_bar span").click(function() {
            $(this).parents("td").next().find(".score_num").html($(this).html())
            $(this).parents(".score_bar").attr("title", "重新打分")
            var score_bg = $(this).parent().prev()
            score_bg.data("width", score_bg.css("width"))
        })
    },
    //矩阵单选
    matrix_radio : function (question) {
        var row         = question.rows
        var col         = question.columns
        var len_col = col.length
        var len_row = row.length

        if(question.config.random) {
            col = random_orde(col)
        }
        var html = '<div class="title">' + num + "、" + question.type + '：' + question.title + '<span onclick="check(' + (num - 1) + ')">验证此题</span></div>'
        html += '<table border="0" id="q' + (num - 1) + '">'

        for(var i = -1 ; i < len_col ; i++) {
            html += '<tr>'
            for(var j = -1 ; j < len_row ; j++) {
                if(i === -1) {
                    if(j === -1) {
                        html += '<td>&nbsp;</td>'
                    } else {
                        html += '<th>' + row[j].item + '</th>'
                    }
                } else {
                    if(j === -1) {
                        html += '<td class="td_right">' + col[i].item + '</td>'
                    } else {
                        var mark = (col[i].mark !== undefined) ? (col[i].mark + 1) : (i + 1)
                        html += '<td><input type="radio" name="r' + mark + '" r="' + mark + '" c="' + (j + 1) + '" /></td>'
                    }
                }
            }
            html += '</tr>'
        }
        $("#question").append(html)
    },
    //矩阵多选
    matrix_choose : function (question) {
        var row         = question.rows
        var col         = question.columns
        var len_col     = col.length
        var len_row     = row.length

        if(question.config.random) {
            col = random_orde(col)
        }

        var config      = question.config
        var max         = (config.max > len_col || config.max==-1 || !config.max) ? len_col : config.max
        var min         = (!config.min) ? 1 : config.min

        var check_num   = "（每一行都需最少选" + min +"项，最多选" + max + "项）" 
        var html = '<div class="title">' + num + "、" + question.type + '：' + question.title + check_num + '<span onclick="check(' + (num - 1) + ')">验证此题</span></div>'
        html += '<table border="0" id="q' + (num - 1) + '">'
        for(var i = -1 ; i < len_col ; i++) {
            html += '<tr>'
            for(var j = -1 ; j < len_row ; j++) {
                if(i === -1) {
                    if(j === -1) {
                        html += '<td>&nbsp;</td>'
                    } else {
                        html += '<th>' + row[j].item + '</th>'
                    }
                } else {
                    if(j === -1) {
                        html += '<td class="td_right">' + col[i].item + '</td>'
                    } else {
                        var mark = (col[i].mark !== undefined) ? (col[i].mark + 1) : (i + 1)
                        html += '<td><input type="checkbox" name="r' + mark + '" r="' + mark + '" c="' + (j + 1) + '" /></td>'
                    }
                }
            }
            html += '</tr>'
        }
        $("#question").append(html)
    },
    //问答
    QandA : function (question) {
        var config      = question.config
        var check_num   = "（最少" + config.min +"字，最多" + config.max + "字）" 
        var html = '<div class="title">' + num + "、" + question.type + '：' + question.title + check_num + '<span onclick="check(' + (num - 1) + ')">验证此题</span></div>'
        html += '<div class="font_len">您输入了：<span id="size' + (num - 1) + '">0</span>个字</div>'
        html += '<textarea id="q' + (num - 1) + '"></textarea>'
        $("#question").append(html)
        $('#q' + (num - 1)).keyup(function() {
            $("#size" + (num - 1)).html($(this).val().length)
        })
    },
    //信息提示
    info : function (question) {
        var html = '<div class="title">' + num + "、" + question.type + '：' + question.title + '<span onclick="check(' + (num - 1) + ')">验证此题</span></div>'
        html += '<p id="q' + (num - 1) + '">' + question.text + '</p>'
        $("#question").append(html)      
    }
}

function random_orde(arr) {
    var random_obj  = {}
    var random_arr  = []
    var new_arr     = []
    var len         = arr.length
    for(var i = 0 ;i < len; i++) {
        var random = Math.random()
        random_arr.push(random)
        random_obj[random] = arr[i]
        random_obj[random].mark = i
    }
    random_arr.sort()
    for(var j = 0 ; j< len ; j++) {
        new_arr.push(random_obj[random_arr[j]])
    }
    return new_arr
}

var qustion_verify ={
    radio : function(question, a) {
        var len   = question.options.length
        var other = question.other
        var value = ""
        var cur   = num
        if($("#other" + a).length && $("#other" + a).val() !== "" && $("#other" + a).attr("dis") !== "true") {
            var val = $("#other" + a).val()            
            if(blanks_verify[other.type](val, other.item, other.limit) == false) {
                return false
            }
            value = "input：" + val
            var next = $("#other" + a).attr("next")
            if(next!=="0") {
                num += next - 1
            }
        } else {
            for(var i = 0; i < len ; i++) {
                var input  = $("#q" + a + " input").eq(i)
                if(input.attr("checked") == "checked") {
                    value = input.attr("mark")
                    var next = input.attr("next")
                    if(next!=="0") {
                        num += next - 2
                    }
                }
            }
        }
        if(value == "" || value == "input:") {
            alert("请选择您的答案")
            return false
        } else {
            if(/input：/.test(value)){
                alert("答案是：" + value)
                return
            }
            alert("答案是：" + question.options[value - 1].item)
        }
    },
    choose : function(question, a) {
        var options= question.options
        var len    = options.length
        var config = question.config
        var max    = (config.max > len || config.max==-1 || !config.max) ? len : config.max
        var min    = (!config.min) ? 1 : config.min
        var value  = []
        for(var i = 0; i < len ; i++) {
            var input  = $("#q" + a + " input").eq(i)
            if(input.attr("checked") == "checked") {
                value.push(options[input.attr("mark") - 1].item)
            }
        }
        if( max < value.length  || min > value.length) {
            alert("请按照要求选择您的答案！")
            return false
        } else {
            alert("答案是：" + value)
        }
    },
    blanks : function(question, a) {
        var options= question.options
        var len    = options.length
        var value  = []
        for(var i = 0; i < len ; i++) {
            var val = $("#q" + a + " input").eq(i).val()
            if(blanks_verify[options[i].type](val, options[i].item, options[i].limit) == false) {
                return false
            }
            value.push("\n" + options[i].item + "：" + val)
        }
        alert("答案是：" + value)
    },
    scoring : function (question, a) {
        var value  = []
        var options= question.options
        var len    = options.length
        for(var i = 0 ; i < len; i++) {
            var score_num = $("#q" + a + " .score_num").eq(i)
            var val = score_num.html()
            var order = Number(score_num.attr("mark"))
            if(val == "0") {
                alert("请为" + options[order].item + "打分，不能打0分！")
                return false
            }
            value[order] = "\n" + options[order].item + "：" + val
        }
        alert("答案是：" + value)
    },
    matrix_radio : function(question, a) {
        var value = []
        var len_r = question.columns.length
        var len_c = question.rows.length
        var len   = len_c * len_r
        for(var i = 0 ; i < len ; i ++) {
            var input = $("#q" + a + " input").eq(i)
            if(input.attr("checked") == "checked") {
                value[input.attr("r") - 1] = "\n" + question.columns[input.attr("r") - 1].item + "：" + question.rows[input.attr("c") - 1].item
            }
        }
        for(var j = 0; j < len_r ; j++) {
            if(!value[j]) {
                alert("请为" + question.columns[j].item + "选择一个答案！")
                return false
            }
        }
        alert("答案是：" + value)
    },
    matrix_choose : function(question, a) {
        var value = []
        var n     = []
        var len_r = question.columns.length
        var len_c = question.rows.length
        var len   = len_c * len_r

        for(var i = 0 ; i < len ; i ++) {
            var input = $("#q" + a + " input").eq(i)
            if(input.attr("checked") == "checked") {
                var r  = input.attr("r")
                if(value[r - 1]) {
                    value[r - 1] += ("，" + question.rows[input.attr("c") - 1].item)
                    n[r - 1].push(1)
                } else {
                    value[r - 1] = "\n" + question.columns[r - 1].item + "：" + question.rows[input.attr("c") - 1].item//question.columns[r - 1].item + "：" + 
                    n[r - 1] = [1]
                }                
            }
        }
        var config      = question.config
        var max         = (config.max > len_r || config.max==-1 || !config.max) ? len_r : config.max
        var min         = (!config.min) ? 1 : config.min

        for(var j = 0; j < len_r ; j++) {
            if(!n[j] || n[j].length > max || n[j].length < min) {
                alert("请为" + question.columns[j].item + "选择" + min + "-" + max + "个答案！")
                return false
            }
        }
        alert("答案是：" + value)
    },
    QandA : function (question, a) {
        var config  = question.config
        var val     =$("#q" + a).val()
        if(val.length > config.max || val.length < config.min ) {
            alert("您只能输入" + config.min + "-" + config.max + "个字")
            return false
        }
        alert("答案是：" + val)
    },
    info : function (question, a) {
        alert("此题没有答案")
    }
}

var blanks_verify = {
    zh : function (value, name, limit) {
        var reg  = new RegExp("^[\u4E00-\u9FA5]{" + limit[0] + "," + limit[1] + "}$", "g")
        if(!reg.test(value)) {
            alert(name + "须" + limit[0] + "-" + limit[1] + "个汉字")
            return false
        }
    },
    word : function(value, name, limit) {
        var reg  = new RegExp("^[a-zA-Z_0-9]{" + limit[0] + "," + limit[1] + "}$", "g")
        if(!reg.test(value)) {
            alert(name + "须" + limit[0] + "-" + limit[1] + "个数字、字母或者下划线")
            return false
        }
    },
    number : function(value, name, limit) {
        var reg  = new RegExp("^\\d{" + limit[0] + "," + limit[1] + "}$", "g")
        if(!reg.test(value)) {
            alert(name + "须" + limit[0] + "-" + limit[1] + "个数字")
            return false
        }
    },
    email : function(value) {
        if(!/^[a-zA-Z0-9_+.-]+\@(([a-zA-Z0-9-]+\.)+)?([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,4}$/.test(value)) {
            alert("请输入正确的邮箱地址！")
            return false
        }
    },
    text : function(value, name, limit) {
        if(/^\s+$/g.test(value)) {
            alert("请不要全部输入空格")
            return false
        }
        if(value.length < limit[0] || value.length > limit[1]) {
            alert(name + "只能填写" + limit[0] + "-" + limit[1] + "个字符")
            return false
        }
    }
}


function check(i) {
    var question = questions[i]
    switch(question.type){
        case "单选":
            qustion_verify.radio(question, i)            
            break;
        case "多选":
            qustion_verify.choose(question, i)
            break;
        case "填空":
            qustion_verify.blanks(question, i)
            break;
        case "打分":
            qustion_verify.scoring(question, i)
            break;
        case "矩阵单选":
            qustion_verify.matrix_radio(question, i)
            break
        case "矩阵多选":
            qustion_verify.matrix_choose(question, i)
            break
        case "问答":
            qustion_verify.QandA(question, i)
            break
        case "说明":
            qustion_verify.info(question, i)
            break
        default:
            alert("系统错误")
            break;
    }
}

function outtype() {
    num++    
    var question = questions[num - 1]
    switch(question.type){
        case "单选":
            qustion_out.radio(question)            
            break;
        case "多选":
            qustion_out.choose(question)
            break;
        case "填空":
            qustion_out.blanks(question)
            break;
        case "打分":
            qustion_out.scoring(question)
            break;
        case "矩阵单选":
            qustion_out.matrix_radio(question)
            break
        case "矩阵多选":
            qustion_out.matrix_choose(question)
            break
        case "问答":
            qustion_out.QandA(question)
            break
        case "说明":
            qustion_out.info(question)
            break
        default:
            alert("系统错误")
            break;
    }
    
    var len = questions.length
    if(num == len) {
        return
    }
    outtype()
}

var id = document.location.search
$.get("/nycs/questionnaire/get_question" + id + "&json=1&r=" + Math.random(), function(data) {
    var json = data.data
    $("h1").html(json.name)
    $("#start").html(json.config.starttime)
    $("#end").html(json.config.endtime)
    $("#login").html(json.config.login == true ? "是" : "否")
    $("#award").attr("src", json.award)
    $("#welcome").html(json.welcome.replace(/\{|｛/g, "<span>").replace(/\}|｝/g, "</span>"))
    $("#thanks").html(json.thanks.replace(/\{|｛/g, "<span>").replace(/\}|｝/g, "</span>"))
    questions = json.question
    outtype() 
})

$.post("/login/check",function(data) {
    if(data.ok == 0) {
        document.location = "/login.html"
    }
},"json")