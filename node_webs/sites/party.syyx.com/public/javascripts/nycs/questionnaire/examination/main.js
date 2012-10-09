var search = document.location.search
if(!search){
    alert("非法访问！")
}
id = search.substring(4)
var abcd = ["A、", "B、", "C、", "D、", "E、", "F、", "G、","H、", "I、", "J、", "K、", "L、", "M、", "N、","O、", "P、", "Q、", "R、", "S、", "T、", "U、","V、", "W、", "X、", "Y、", "Z、"]
var num         = 0;
var question    = ""
var curr_q_type = ""
var answer      = {}
var info        = {}

//下一题动作--------------------------------------------------------------------------------------
function ex_next(s) {
    if(s > 0) {
        $("#ex_next").html(s)
        $("#ex_next").addClass("wait")
        setTimeout(function() {ex_next(s - 1)}, 1000)
    }else {
        $("#ex_next").html("下一题")
        if(num == info.q_len + 1) {
            $("#ex_next").html("完成提交")
        }
        $("#ex_next").removeClass("wait")
    }
}

function next_action() {    
    if(curr_q_type !== ""){
        if(qustion_verify[curr_q_type](question) == false) {
            return
        }
    }
    ex_next(info.interval)
    //答题进度
    num++
    var proportion = (num - 1) / info.q_len
    $("#percentage").html( Math.round(proportion * 100) + "%")
    $("#ex_cur").html(num - 1)
    $("#speed_bar").css("width", proportion * 100 + "%")
    if(num > info.q_len) {
        $("#ex_content").css("display", "none")
        $("#thanks").fadeIn("fast")
        $("#ex_next").css("display", "none")
        submit_answer()
        return
    }
    //获得下一题
    $.get("/nycs/questionnaire/get_q_info" + search + "&q=" + num, function(data) {
        question = data.question
        switch(question.type){
            case "单选":
                qustion_out.radio(question)
                curr_q_type = "radio"
                break;
            case "多选":
                qustion_out.choose(question)
                curr_q_type = "choose"
                break;
            case "填空":
                qustion_out.blanks(question)
                curr_q_type = "blanks"
                break;
            case "打分":
                qustion_out.scoring(question)
                curr_q_type = "scoring"
                break;
            case "矩阵单选":
                qustion_out.matrix_radio(question)
                curr_q_type = "matrix_radio"
                break
            case "矩阵多选":
                qustion_out.matrix_choose(question)
                curr_q_type = "matrix_choose"
                break
            case "问答":
                qustion_out.QandA(question)
                curr_q_type = "QandA"
                break
            case "说明":
                qustion_out.info(question)
                curr_q_type = "info"
                break
            default:
                alert("系统错误")
                break;
        }
        question_layout()
    }, "json")

}

//输出题------------------------------------------------------------------------------------
var qustion_out = {
    //单选
    radio   : function (question) {
        var options     = question.options
        var other       = question.other
        var len         = options.length
        var html = '<div class="title">' + num + "、" + question.type + '：' + question.title + '</div>'
        html    += '<div>'
        if(question.config.random) {
            options = random_orde(options)
        }
        for(var i = 0 ; i < len ; i ++ ) {
            var mark = (options[i].mark !== undefined) ? (options[i].mark + 1) : (i + 1)
            html+= '<p><label><input class="radio" type="radio" name="r' + question.id + '" mark="' + mark + '" next="' + (options[i].next || 0) + '" />' + abcd[i] + options[i].item + '</label></p>'
        }
        if(other) {
            if(other.limit[1] <= 20) {
                var input = '<label><input class="in_text" maxlength="' + other.limit[1] + '" type="text" id="other" name="r' + question.id + '" next="' + (other.next || 0) + '" /></label> <span class="other_12">最多'+ other.limit[1] +'字，输入了<strong id="other_size">0</strong>个字</span>'
            } else {
                var input = '<span class="other_12">(不超过'+ other.limit[1] +'字，输入了<strong id="other_size">0</strong>个字)</span><br /><textarea class="in_area" id="other" name="r' + question.id + '" next="' + (other.next || 0) + '"></textarea>'
            }
            
            html+= '<p>' + other.item + '：' + input + '</p>'
        }
        html    += '</div>'
        $("#ex_content").html(html)
        if(other) {
            $("#other").keyup(function() {
                $("#other_size").html($(this).val().length)
            })

            $("#other").focus(function() {
                $("#ex_content .radio").attr("checked", false)
                $(this).css("color", "").attr("dis", "false")
            })

            $("#ex_content .radio").click(function() {
                $("#other").css("color", "#ccc").attr("dis", "true")
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
        var html = '<div class="title">' + num + "、" + question.type + '：' + question.title + check_num + '</div>'
        html    += '<div>'
        if(question.config.random) {
            options = random_orde(options)
        }
        for(var i = 0 ; i < len ; i ++ ) {
            var mark = (options[i].mark !== undefined) ? (options[i].mark + 1) : (i + 1)
            html+= '<p><label><input type="checkbox" name="c' + question.id + '" mark="' + mark + '" />' + abcd[i] + options[i].item + '</label></p>'
        }
        html    += '</div>'
        $("#ex_content").html(html)
    },
    //填空
    blanks  : function (question) {
        var options     = question.options
        var len         = options.length
        var html = '<div class="title">' + num + "、" + question.type + '：' + question.title + '</div>'
        html    += '<table border="0">'
        for(var i = 0 ; i < len ; i ++ ) {
            html+= '<tr><td class="td_right">' + options[i].item + '：</td>'
            html+= '<td><input class="in_text" type="text" id="b' + i + '" maxlength="' + options[i].limit[1] + '" minlenth="' + options[i].limit[0] + '" st_type = "' + options[i].type + '" /></td></tr>'
        }
        html    += '</table>'
        $("#ex_content").html(html)
     },
    //打分
    scoring : function (question) {
        var options     = question.options
        var len         = options.length
        var config      = question.config
        var range       = config.range
        var len2        = range.length
        var html = '<div class="title">' + num + "、" + question.type + '：' + question.title + '</div>'
        html    += '<table border="0">'
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
        $("#ex_content").html(html)
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
        var html = '<div class="title">' + num + "、" + question.type + '：' + question.title + '</div>'
        html += '<table border="0">'

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
        $("#ex_content").html(html)
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
        var html = '<div class="title">' + num + "、" + question.type + '：' + question.title + check_num + '</div>'
        html += '<table border="0">'
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
        $("#ex_content").html(html)
    },
    //问答
    QandA : function (question) {
        var config      = question.config
        var check_num   = "（最少" + config.min +"字，最多" + config.max + "字）" 
        var html = '<div class="title">' + num + "、" + question.type + '：' + question.title + check_num + '</div>'
        html += '<div class="font_len">您输入了：<span id="size">0</span>个字</div>'
        html += '<textarea id="textarea"></textarea>'
        $("#ex_content").html(html)
        $("#textarea").keyup(function() {
            $("#size").html($(this).val().length)
        })        
    },
    //信息提示
    info : function (question) {
        var html = '<div class="title">' + num + "、" + question.type + '：' + question.title + '</div>'
        html += '<p>' + question.text + '</p>'
        $("#ex_content").html(html)      
    }
}

//验证题----------------------------------------------------------------------------------------

var qustion_verify ={
    radio : function(question) {
        var len   = question.options.length
        var other = question.other
        var value = ""
        var cur   = num
        if($("#other").length && $("#other").val() !== "" && $("#other").attr("dis") !== "true") {
            var val = $("#other").val()
            if(blanks_verify[other.type](val, other.item, other.limit) == false) {
                return false
            }
            value = "input:" + val
            var next = $("#other").attr("next")
            num = next - 1
        } else {
            for(var i = 0; i < len ; i++) {
                var input  = $("#ex_content input").eq(i)
                if(input.attr("checked") == "checked") {
                    value = input.attr("mark")
                    var next = input.attr("next")
                    if(next!=="0") {
                        num = next - 1
                    }
                }
            }
        }
        if(value == "" || value == "input:") {
            alert("请选择您的答案")
            return false
        } else {
            answer["q" + cur] = value
        }
    },
    choose : function(question) {
        var options= question.options
        var len    = options.length
        var config = question.config
        var max    = (config.max > len || config.max==-1 || !config.max) ? len : config.max
        var min    = (!config.min) ? 1 : config.min
        var value  = []
        for(var i = 0; i < len ; i++) {
            var input  = $("#ex_content input").eq(i)
            if(input.attr("checked") == "checked") {
                value.push(input.attr("mark"))
            }
        }
        if( max < value.length  || min > value.length) {
            alert("请按照要求选择您的答案！")
            return false
        } else {
            answer["q" + num] = value
        }
    },
    blanks : function(question) {
        var options= question.options
        var len    = options.length
        var value  = []
        for(var i = 0; i < len ; i++) {
            var val = $("#ex_content input").eq(i).val()
            if(blanks_verify[options[i].type](val, options[i].item, options[i].limit) == false) {
                return false
            }
            value.push(val)
        }
        answer["q" + num] = value
    },
    scoring : function (question) {
        var value  = []
        var options= question.options
        var len    = options.length
        for(var i = 0 ; i < len; i++) {
            var score_num = $("#ex_content .score_num").eq(i)
            var val = score_num.html()
            var order = Number(score_num.attr("mark"))
            if(val == "0") {
                alert("请为" + options[order].item + "打分，不能打0分！")
                return false
            }
            value[order] = val
        }
        answer["q" + num] = value
    },
    matrix_radio : function(question) {
        var value = []
        var len_r = question.columns.length
        var len_c = question.rows.length
        var len   = len_c * len_r
        for(var i = 0 ; i < len ; i ++) {
            var input = $("#ex_content input").eq(i)
            if(input.attr("checked") == "checked") {
                value[input.attr("r") - 1] = input.attr("c")
            }
        }
        for(var j = 0; j < len_r ; j++) {
            if(!value[j]) {
                alert("请为" + question.columns[j].item + "选择一个答案！")
                return false
            }
        }
        answer["q" + num] = value
    },
    matrix_choose : function(question) {
        var value = []
        var len_r = question.columns.length
        var len_c = question.rows.length
        var len   = len_c * len_r

        for(var i = 0 ; i < len ; i ++) {
            var input = $("#ex_content input").eq(i)
            if(input.attr("checked") == "checked") {
                var r  = input.attr("r")
                if(value[r - 1]) {
                    value[r - 1].push(input.attr("c"))
                } else {
                    value[r - 1] = [input.attr("c")]
                }                
            }
        }

        var config      = question.config
        var max         = (config.max > len_r || config.max==-1 || !config.max) ? len_r : config.max
        var min         = (!config.min) ? 1 : config.min

        for(var j = 0; j < len_r ; j++) {
            if(!value[j] || value[j].length > max || value[j].length < min) {
                alert("请为" + question.columns[j].item + "选择" + min + "-" + max + "个答案！")
                return false
            }
        }
        answer["q" + (num)] = value
    },
    QandA : function (question) {
        var config  = question.config
        var val     =$("#textarea").val()
        if(val.length > config.max || val.length < config.min ) {
            alert("您只能输入" + config.min + "-" + config.max + "个字")
            return false
        }
        answer["q" + num] = val
    },
    info : function (question) {
        answer["q" + num] = ""
        return true
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
//根据题目宽度 确定布局-------------------------------------------------------------------------
function question_layout() {
    $("#ex_content").css("padding-left", "")
    var width = $("#ex_content")[0].offsetWidth
    $("#ex_content").css("padding-left", (900 - width)/2 )
}

//随机输出选项-------------------------------------------------------------------------------------
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

//提交答案---------------------------------------------------------------------------------------------

function submit_answer() {
    if(info.login) {
        if(!SyyxLogin.user) {
            SyyxLogin.dialog()
            return
        }
    }
    answer.user = SyyxLogin.user
    if(!info.login) {
        answer.user = "未登录"
    }
    answer.id   = id
    $.post("/nycs/questionnaire/submit_answer", answer , function(data) {
        if(data.type == 1) {
            alert("提交成功，感谢您的参与！")
            return true
        } else if(data.type == -1) {
            alert("对不起，您已经答过本问卷了，不能重复答题")
        } else {
            alert("提交失败，未知错误！")
            return false
        }
    },"json")
}


//初始化问卷-----------------------------------------------------------------------------------

!function() {
    var loading     = false
    var repeat      = 0
    function ex_start() {
        if(info.login) {
            if(!SyyxLogin.user) {
                SyyxLogin.dialog()
                return
            }
        }

        if(repeat == 1) {
            alert("用户名" + SyyxLogin.user + "已经答过本问卷了，请勿重复！")
            return
        }
        if(repeat == 2) {
            alert("您的当前使用的电脑已经答过本问卷了，请勿重复！")
            return
        }
        next_action()
        $("#welcome").css("display", "none")
        $(".ex_check").fadeIn()
        $(".speed_main").fadeIn()
    }

    function init() {
        if(info == "") {
            return
        }
        var name = info.name
        $("#banner").html('<img src="' + info.award + '" width="980" />')
        $("#welcome p").html(info.welcome.replace(/\{|｛/g, "<span>").replace(/\}|｝/g, "</span>"))
        $("#ex_num").html(info.q_len)
        $("#thanks p").html(info.thanks.replace(/\{|｛/g, "<span>").replace(/\}|｝/g, "</span>"))
        $("#loading").css("display", "none")
        $("#welcome").fadeIn()
        if(info.type == 1) {
            $("#ex_start").addClass("dis").click(function() {
                alert("问卷尚未开始，请继续关注！")
            })
            return
        }
        if(info.type == 2) {
            $("#ex_start").addClass("dis").click(function() {
                alert("很抱歉，问卷已经结束！")
            })
            return
        }

        if(info.login) {
            $(".login").css("display", "block")
        } else {
            $.get("/nycs/questionnaire/check_user?id=" + id, function(data) {
                repeat = data.type
            })
        }
        $("#ex_start").click(function() {
            ex_start()
        })
    }

    $("#ex_next").click(function() {
        if($("#ex_next").html() !== "下一题") {
            return
        }
        if(info.login) {
            if(!SyyxLogin.user) {
                SyyxLogin.dialog()
                return
            }
        }
        next_action()
    })

    $.get("/nycs/questionnaire/get_q_info" + search + "&info=1", function(data) {
        if(data.type == -1) {
            alert("非法访问！")
            return
        }
        info = data
        if(loading) {
            init()
        }
        loading = true
    }, "json")


    //登录相关

    $("#login").click(function(event) {
        event.preventDefault()
        SyyxLogin.dialog()
    })
    $("#logout").click(function(event) {
        event.preventDefault()
        SyyxLogin.logout()
    })

    function login_action(user) {
        $.get("/nycs/questionnaire/check_user?id=" + id + "&user=" + user, function(data) {
            if(data.type > 0) {
                repeat = data.type

            } else if(data.type < 0) {
                alert("未知错误！")
                return
            } else {
                repeat = 0
            }
        }, "json")
        $("#user").html(user)
        $("#login").html("安全退出")
        $("#login").css("display" , "none")
        $("#logout").css("display" , "inline")
    }
   

    SyyxLogin.onload = function(user) {
        if(user) {
            login_action(user)
        }
        if(loading) {
            init()
        }
        loading = true
    }

    SyyxLogin.onlogout = function() {
        $("#user").html("游客")
        $("#login").html("登录")
        $("#logout").css("display" , "none")
        $("#login").css("display" , "inline")
    }

    SyyxLogin.onlogin = function(user) {
        document.location.reload()
    }

    $("a").attr("hidefocus", "true")
    $("input").attr("hidefocus", "true")
}()
