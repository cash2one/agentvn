var db           = require('./config').db
var activate_sms = db.collection('activate_sms')

exports.check_send_sms = function (mobile_num, cb) {
    var current_time = new Date()
    var limit_time   = 1000*60*60*24
    var deadline_time = new Date(current_time.getTime() - limit_time)

    activate_sms.count({ 
        mobile_number : mobile_num, 
        send_time : { $gt : deadline_time} 
    }, function(err,num) {
        cb(err, num)
    })
}

exports.insert = function (doc, cb) {
    activate_sms.insert(doc, cb)
}

exports.check_correct_mobile_code = function(num, code, cb) {
    var current_time    = new Date()
    var expire_time     = 1000*60*10
    var validated_time_zone =  new Date(current_time.getTime() - expire_time)
    activate_sms.find({
        mobile_number : num, 
        send_time     : { $gt : validated_time_zone }
    }).sort({ send_time : -1}).toArray(function(err, result) {
        if (result == null || result.length < 1) {
            cb(err, false)
            return
        }

        if (result[0].validate_code == code && result[0].used == false) {
            exports.mark_used(result[0]._id)
            cb(err, true)
            return
        }

        cb(err, false)
    })
}

exports.mark_used = function(id) {
    activate_sms.updateById(id, {$set : { used : true }})
}