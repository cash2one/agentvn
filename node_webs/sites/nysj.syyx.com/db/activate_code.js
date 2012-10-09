var db                      = require('./config').db
var time                    = require('../helper/time')
var activate_code           = db.collection('activate_code')
var activate_code_setting   = db.collection('activate_code_setting')


exports.record = function(mobile_number, user_activate_code, q1, q2, get_code_time) {
    activate_code.insert({
        mobile_number : mobile_number,
        code          : user_activate_code,
        question1     : q1,
        question2     : q2,
        get_time      : get_code_time,
        created_time  : new Date()
    })
}

exports.qualification = function(num, cb) {
    activate_code.find({
        mobile_number : num,
        created_time  : { $lt : time.tomorrow_midnight(new Date()), $gt : time.today_midnight(new Date())}
    }).toArray(function(err, result) {
        if (result.length > 0) {
            if (result[0].code !== null) {
                cb(err, true, result[0].code)
            } else {
                cb(err, true, null)
            }

            return
        }

        cb(err, false, null)
    })
}

exports.check_max_count = function (mobile_num, q1, q2, cb) {
    var perhour     = 1000*60*60
    var perminute   = 1000*60
    var past_hour   = new Date( new Date().getTime() - perhour)
    var past_minute = new Date( new Date().getTime() - perminute)
    activate_code.count({ 
        created_time  : { $gt : past_hour },
        code          : { $nin : [null] }
        },function(err, sended_num) {
        if (err) {
            console.log(err)
            cb(err, false)
            return
        }
        activate_code.count({
            created_time  : { $gt : past_minute },
            code          : { $nin : [null] }
        }, function(err, one_minute_sended) {
            if (err) {
                console.log(err)
                cb(err, false)
                return
            }
            get_max_count(mobile_num, sended_num, one_minute_sended, q1, q2, cb)     
        })
    })
}

exports.mark_code_used = function(code, account, cb) {
    activate_code.update({ code : code }, {$set : { sended_time : new Date(), account : account }}, cb)
}

function get_max_count(mobile_num, num, one_minute_sended, q1, q2, cb) {
    activate_code_setting.find().toArray(function(err, result) {
        if (!result) {
            cb(err, true)
            exports.record(mobile_num, null, q1, q2, null)
            return
        }

        if (!result[0].perhour_max_count) {
            cb(err, true)
            exports.record(mobile_num, null, q1, q2, null)
            return
        }

        if (!result[0].perminute_max_count) {
            cb(err, true)
            exports.record(mobile_num, null, q1, q2, null)
            return
        }

        if (num < result[0].perhour_max_count && one_minute_sended < result[0].perminute_max_count) {
            cb(err, false)
            return
        } else {
            cb(err, true)
            exports.record(mobile_num, null, q1, q2, null)
        }
    })
}