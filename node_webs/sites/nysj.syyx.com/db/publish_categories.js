var db                 = require('./config').db
var publish_categories = db.collection('publish_categories')
//---------------------------------------------------------------------------
exports.insert =  function (docs, cb) {
    publish_categories.insert(docs, {}, cb)
}

exports.find_all = function(cb) {
    publish_categories.find().toArray(cb)
}

exports.find = function(filter, skip_num, cb) {
    publish_categories.find(filter).limit(50).skip(skip_num).sort({ created_time : -1 }).toArray(cb)
}

exports.find_by_id = function(_id, cb) {
    publish_categories.findById(_id, cb)
}

exports.update_by_id =  function (_id, doc, cb) {
    publish_categories.updateById(_id, { $set : doc }, cb)
}

exports.find_by_name = function(name, cb) {
    publish_categories.findOne({name : name},cb)
}

//---------------------------------------------------------------------------



