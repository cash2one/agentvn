var db      = require('./config').db
var clients = db.collection('clients')

exports.find_client = function(title, cb) {
    clients.findAndModify({ name : new RegExp(title, 'i')}, {}, {$inc : { downloads : 1}}, {}, cb)
}

exports.intall_client_stat = function(title, cb) {
    clients.update({ name : new RegExp(title, 'i')}, {$inc : { install : 1}}, cb)
}

exports.show = function(id,cb) {
    clients.findById(id, cb)
}
exports.find_by_name = function(name, cb) {
    clients.findOne({name : name}, cb)
}