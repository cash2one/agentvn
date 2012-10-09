var db_activate_code = require('../../db/activate_code')
var db_activate_sms  = require('../../db/activate_sms') 

exports.action = function(req, res) {
    if (!req.body.q1) {
        res.send({ ok : 0, info : '问题一没有回答'})
        return
    }

    if (!req.body.q2) {
        res.send({ ok : 0, info : '问题二没有回答'})
        return
    }
    var mobile_partten = /^(1(([35][0-9])|(47)|[8][01236789]))\d{8}$/
    if (!req.body.mobile_number || !mobile_partten.test(req.body.mobile_number)) {
        res.send({ ok : 0, info : '手机号码格式不正确'})
        return
    }

    if (!req.body.mobile_code || req.body.mobile_code.length !== 6) {
        res.send({ ok : 0, info : '短信验证码格式不正确'})
        return
    }

    check_correct_mobile_code(req, res, function(req, res) {
        check_qualification(req, res, function(req, res) {
            check_max_code_count(req, res, function(req, res) {
                record_sended_code(req, res)
            })
        })
    })
       
}

function check_correct_mobile_code(req, res, cb) {
    db_activate_sms.check_correct_mobile_code(req.body.mobile_number, req.body.mobile_code, function(err, is_correct) {
        if (err) {
            console.log(err)
            res.send(null)
            return
        }

        if (!is_correct) {
            res.send({ ok : 0, info : '短信验证码不正确'})
            return
        }

        //get_activate_code
        cb(req, res, cb)
    }) 
}

function check_qualification(req, res, cb) {
    db_activate_code.qualification(req.body.mobile_number, function(err, joined, code) {
        if (err) {
            console.log(err)
            res.send(null)
            return
        }

        if (joined) {
            if (code) {
                res.send({ ok : 2, info : code })
            } else {
                res.send({ ok : 1, info : '已参加未中奖'})
            }
            
            return
        }

        cb(req, res, cb)
    })
}

function check_max_code_count(req, res, cb) {
    db_activate_code.check_max_count(req.body.mobile_number, req.body.q1, req.body.q2, function(err, over_max) {
        if (err) {
            console.log(err)
            res.send(null)
            return
        }

        if (over_max) {
            res.send({ ok : 4, info : '未中奖'})
            return
        }

        cb(req, res, cb)
    })
}

function record_sended_code(req, res) {
    var db                    = ms.db.mssql['NYCSTime_Web']    
    var sp_name               = 'cp_ActivateCode_GetRecordInfo'
    var args                  = {}
    args['@ActivateCode']     = 'blank'

    db.exec_sp(sp_name, args, function(err, rows, output, ret) {
        if (err) {
            console.log(err)   
            res.send(null)         
            return
        }

        if (ret == 0) {
            res.send({ ok : 0, info : '服务器忙，稍后再试'})
            return
        }

        if (ret == 1) {
            db_activate_code.record(req.body.mobile_number, output['@ActivateCode'], req.body.q1, req.body.q2, new Date())
            res.send({ ok : 2, info : output['@ActivateCode']})
            return
        }

        res.send({ ok : 0, info : '服务器忙，稍后再试'})
    })
}