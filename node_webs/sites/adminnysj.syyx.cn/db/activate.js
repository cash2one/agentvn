var db                      = require('./config').db
var activate_code           = db.collection('activate_code')
var activate_code_setting   = db.collection('activate_code_setting')

exports.insert_setting =  function (num, cb) {
    activate_code_setting.insert({ perhour_max_count : num }, cb)
}

exports.update_setting =  function (id, num, num2, cb) {
    activate_code_setting.updateById(id, {$set : {perhour_max_count : num , perminute_max_count : num2} }, cb)
}

exports.find_setting   =  function(cb) {
    activate_code_setting.findOne(cb)
}

exports.find_detail_by_data = function(date, next_day, cb) {
    activate_code.find({
        created_time : { $gt  : date, $lt : next_day }
    }).toArray(function(err, result) {
        cb(err, result)
    })
}