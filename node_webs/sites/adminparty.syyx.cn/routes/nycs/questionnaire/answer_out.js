var abcd = ["", "A", "B", "C", "D", "E", "F", "G","H", "I", "J", "K", "L", "M", "N","O", "P", "Q", "R", "S", "T", "U","V", "W", "X", "Y", "Z"]

var qustion_out = {
    //单选
    radio   : function (question) {
        var options     = question.options
        var length      = options.length
        var ret         = ""
        for(var i = 0 ; i < length ; i ++) {
            ret += "<br />(" + (i + 1) + ")" + options[i].item
        }
        return ret
    },
    //多选
    choose  : function (question) {
        var options     = question.options
        var length      = options.length
        var ret         = ""
        for(var i = 0 ; i < length ; i ++) {
            ret += "<br />(" + (i + 1) + ")" + options[i].item
        }
        return ret
    },
    //填空
    blanks  : function (question) {
        var options     = question.options
        var length      = options.length
        var ret         = ""
        for(var i = 0 ; i < length ; i ++) {
            ret += "<br />(" + (i + 1) + ")" + options[i].item
        }
        return ret
     },
    //打分
    scoring : function (question) {
        var options     = question.options
        var score       = question.config.score.join("、")
        var length      = options.length
        var ret         = ""
        for(var i = 0 ; i < length ; i ++) {
            ret += "<br />(" + (i + 1) + ")" + options[i].item
        }
        return "<br />分值：" + score + ret
    },
    //矩阵单选
    matrix_radio : function (question) {
        var col         = question.columns
        var len_col     = col.length
        var row         = question.rows
        var len_row     = row.length
        var ret         = ""
        for(var j = 0 ; j < len_row ; j ++) {
            ret += abcd[j + 1] + ":" + row[j].item + "; "
        }

        for(var i = 0 ; i < len_col ; i++) {
            ret += "<br />(" + (i + 1) + ")" + col[i].item
        }
        return "<br />选项：" + ret
    },
    //矩阵多选
    matrix_choose : function (question) {
        var col         = question.columns
        var len_col     = col.length
        var row         = question.rows
        var len_row     = row.length
        var ret         = ""

        for(var j = 0 ; j < len_row ; j ++) {
            ret += abcd[j + 1] + ":" + row[j].item + "; "
        }

        for(var i = 0 ; i < len_col ; i++) {
            ret += "<br />(" + (i + 1) + ")" + col[i].item
        }
        return "<br />选项：" + ret
    },
    //问答
    QandA : function (question) {
        return ""     
    },
    //信息提示
    info : function (question) {
        return "<br />" + question.text
    }
}

function questiontype(question) {
    switch(question.type){
        case "单选":
            return qustion_out.radio(question)            
            break;
        case "多选":
            return qustion_out.choose(question)
            break;
        case "填空":
            return qustion_out.blanks(question)
            break;
        case "打分":
            return qustion_out.scoring(question)
            break;
        case "矩阵单选":
            return qustion_out.matrix_radio(question)
            break;
        case "矩阵多选":
            return qustion_out.matrix_choose(question)
            break;
        case "问答":
            return qustion_out.QandA(question)
            break;
        case "说明":
            return qustion_out.info(question)
            break;
        default:
            break;
    }
}


var answer_out = {
    radio : function(answer) {
        try{
            return answer.replace(/</g, "&lt;").replace(/>/g, "&gt;").toString()
        } catch(e) {
            return ""
        }
        
    },
    choose : function(answer) {
        try{
            return answer.join(",")
        } catch(e) {
            return ""
        }
        
    },
    blanks : function(answer) {
        try{
            return answer.join(";")
        } catch(e) {
            return ""
        }
        
    },
    scoring : function(answer) {
        try{
            return answer.join(";")
        } catch(e) {
            return ""
        }
        
    },
    matrix_radio : function(answer) {
        try{
            var len = answer.length
            var ret = ""        
            for(var i = 0 ; i < len ; i++) {
                ret += i + 1 + "：" + abcd[answer[i]] + ";"
            }
            return ret
        } catch(e) {
            return ""
        }
        
    },
    matrix_choose : function(answer) {
        try{
            var len = answer.length
            var ret = ""
            for(var i = 0 ; i < len ; i++) {
                ret += i + 1 + "："
                for (var j = 0 ; j < answer[i].length ; j++) {
                    ret += abcd[answer[i][j]] + "、"
                }
            }
            return ret
        } catch(e) {
            return ""
        }
        
    },
    QandA : function(answer) {
        try{
            return answer.replace(/</g, "&lt;").replace(/>/g, "&gt;").toString()
        } catch(e) {
            return ""
        }
        
    },
    info : function(answer) {
        return ""
    }
}

function answertype(answer, i, question) {
    switch(question[i].type){
        case "单选":
            return answer_out.radio(answer)            
            break;
        case "多选":
            return answer_out.choose(answer)
            break;
        case "填空":
            return answer_out.blanks(answer)
            break;
        case "打分":
            return answer_out.scoring(answer)
            break;
        case "矩阵单选":
            return answer_out.matrix_radio(answer)
            break;
        case "矩阵多选":
            return answer_out.matrix_choose(answer)
            break;
        case "问答":
            return answer_out.QandA(answer)
            break;
        case "说明":
            return answer_out.info(answer)
            break;
        default:
            break;
    }
}

var check_login = require('../../login/check')

exports.action = function(req, res) {

    // check_login.after_login_render(req, res, function() {
    //     res.redirect('/index.html')
    //     return
    // })

    var id      = req.body.id
    if(!id) {
        res.send({type : -2 })
        return
    }
    var db      = ms.db.mongo['party']
    var cl      = db.collection('question_list')
    var cl2     = db.collection('question_answer')
    var len     = 0

    var table   = '<meta http-equiv=Content-Type content=text/html;charset=utf-8><table border="1"><tr><td>用户名</td>' 
    cl.findById(id, function(err, data) {

        len    = data.question.length

        for(var i = 0 ; i < len ; i ++) {
            var q = data.question[i]
            table += '<td>' + (i + 1) + '、' + q.type + '：' + q.title
            table += questiontype(q)
            table += '</td>'
        }
        table += '<td>答题时间</td><td>IP地址</td></tr>'

        cl2.find({id : data.addtime}).toArray(function(err, arr) {
            var a_len = arr.length
            for(var j = 0 ; j < a_len ; j ++) {
                table += '<tr><td>' + arr[j].user + '</td>'
                for(var k = 0 ; k < len ; k++) {
                    if(arr[j].answer["q" + (k + 1)]) {
                        table += '<td>' + answertype(arr[j].answer["q" + (k + 1)], k, data.question) + '</td>'
                    }else {
                        table += '<td></td>'
                    }
                }
                var time = new Date(arr[j].addtime)
                var format_time = time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate() + " " + time.getHours() + ":" + time.getMinutes()
                table += '<td>' + format_time + '</td><td>' + arr[j].ip + '</td></tr>'
            }
            table += '</table>'
            var fd = __dirname + "/../../../public/_att/nycs/questionnaire/" + data.addtime + ".xls"
            ms.fs.unlink(fd, function() {
                ms.fs.writeFile(fd,table, function(){
                    res.send({type : 0 , url : data.addtime})
                })
            })
        })

    })
}