var db       = require('./config').db
var items    = db.collection('publish_items')

//---------------------------------------------------------------------------
exports.insert =  function (docs, cb) {
    items.insert(docs, {}, cb)
}

exports.find = function(filter, skip_num, cb) {
    items.find(filter).limit(50).skip(skip_num).sort({ created_time : -1 }).toArray(cb)
}

exports.update_by_id =  function (_id, doc, cb) {
    items.updateById(_id, {$set : doc }, cb)
}

exports.remove_by_id =  function (_id, cb) {
    items.removeById(_id, {}, cb)
}