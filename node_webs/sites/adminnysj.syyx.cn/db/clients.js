var db      = require('./config').db
var clients = db.collection('clients')

exports.insert =  function (docs, cb) {
    clients.insert(docs, {}, cb)
}

exports.update_by_id = function(_id, doc, cb) {
    clients.updateById(_id, { $set : doc }, cb)
}

exports.find_all = function(cb) {
    clients.find().toArray(cb)
}

exports.remove_by_id = function(_id, cb) {
    clients.removeById(_id, {}, cb)
}