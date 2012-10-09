var db_activate_sms = require('../../db/activate_sms') 

exports.action = function(req, res) {
    var mobile_partten = /^(1(([35][0-9])|(47)|[8][01236789]))\d{8}$/
    if (!mobile_partten.test(req.body.mobile_number)) {
        res.send(null)
        return
    }

    

    db_activate_sms.check_send_sms(req.body.mobile_number, function(err, num) {
        if(num < 25) {
            send_sms()
        } else {
            res.send({ ok : 0, info : '今天发送的验证码已达上限'})
        }
    })

    function send_sms() {
        validate_code = Math.ceil(Math.random()*(999999-100000)+100000)
        var doc = {
            mobile_number : req.body.mobile_number,
            validate_code : validate_code,
            send_time     : new Date(),
            used          : false
        }
        db_activate_sms.insert(doc, function(err, result) {
            var msg = '《诺亚传说-时间版》小调查赢激活码活动的验证码为：'+ result[0].validate_code +'，请在页面上输入本验证码，有效时间为10分钟，请尽快验证。'

            // send
            var sp = req.app.sms_sp
            if (!sp) {
                console.error('no sms sp')
                res.send(null)
                return
            }

            ms.sms.send(sp, result[0].mobile_number, msg, function(err,send_result){
                if (err) {
                    console.error(err)
                    res.send(null)
                    return
                }

                res.send({ ok : 1 })
            })
        })
    }    
}