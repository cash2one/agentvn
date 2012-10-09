var db       = require('./config').db
var stat     = db.collection('stat')

exports.is_exist = function(id, cb) {
    stat.findById(id, cb)
}

exports.create = function(cb) {
    stat.insert({ created_time : new Date()}, {}, cb)
}