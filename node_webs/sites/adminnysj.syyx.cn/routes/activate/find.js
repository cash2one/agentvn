var activate_code_setting    = require('../../db/activate')
var check_login              = require('../login/check')
var time                     = require('../../helper/time')
var fs                       = require('fs')

exports.action = function (req, res) {
    check_login.after_login_do(req, res, function(req, res) {
        do_after_login(req, res)
    })
}

var do_after_login = function (req, res) {
    var target_data = new Date(new Date().getTime() - req.body.page*1000*60*60*24)
    var today_midnight = time.today_midnight(target_data)
    var next_day       = time.tomorrow_midnight(target_data)
    activate_code_setting.find_detail_by_data(today_midnight, next_day, function(err, result) {
        if (err) {
            res.send({ ok : 0})
            return
        }    
        
        var temp_time = time.convert_target_key(result,['created_time'],'yyyymmdd')
        res.send(time.convert_target_key(result,['get_time','sended_time'],'yyyymmddhhmmss'))
    })  
}


exports.export_file = function(req, res) {
    check_login.after_login_do(req, res, function(req, res) {
        send_code_detail_file(req, res)
    })
}

function send_code_detail_file(req, res) {
    var target_data         = new Date(new Date().getTime() - req.body.data_distance*1000*60*60*24)
    var current_day         = time.today_midnight(target_data)
    var next_day            = time.tomorrow_midnight(target_data)

    activate_code_setting.find_detail_by_data(current_day, next_day, function(err, result) {
        if (err) {
            res.send({ ok : 0})
            return
        } 
        if (!result) {
            res.send({ ok : 0})
            return
        }
        var csv_name            = time.convert_target_key(result,['created_time'],'yyyymmdd')[0].created_time.replace(/\//g,'-')
        var csv_data            = time.convert_target_key(result,['get_time','sended_time'],'yyyymmddhhmmss')
        var csv_string          = ''
        csv_data.forEach(function(item, index, array) {
            csv_string = convert_to_blank(item.code) + ',' + item.mobile_number + ',' + item.question1 +',' + item.question2 +',' + convert_to_blank(item.get_time) +',' + convert_to_blank(item.sended_time) + ',' + convert_to_blank(item.account) + ',' + '\n' + csv_string
        })

        var random_file_name    = Date.now() + Math.floor(Math.random()*100) + '.csv'

        fs.open(random_file_name,'w',function(err) {
            if (err) {
                console.log(err)
                res.send({ ok : 0})
                return
            }

            
            fs.writeFile(random_file_name, csv_string, function(err) {
                if (err) {
                    console.log(err)
                    res.send({ ok : 0})
                    return
                }

                res.download(random_file_name, csv_name + '.csv', function(err) {
                    fs.unlink(random_file_name)
                })
            })
        })

    }) 
}

function convert_to_blank(data) {
    if (data == undefined) {
        return 'blank'
    } else {
        return data
    }
}
