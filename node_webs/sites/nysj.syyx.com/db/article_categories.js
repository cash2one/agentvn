var db                  = require('./config').db
var article_category    = db.collection('article_categories')

exports.insert =  function (docs, cb) {
    article_category.insert(docs, {}, cb)
}

exports.find_all = function(cb) {
    article_category.find().toArray(cb)
}

exports.find = function(filter, skip_num, cb) {
    article_category.find(filter).limit(50).skip(skip_num).sort({ created_time : -1 }).toArray(cb)
}

exports.find_by_id = function(_id, cb) {
    article_category.findById(_id, cb)
}

exports.update_by_id =  function (_id, doc, cb) {
    article_category.updateById(_id, { $set : doc }, cb)
}