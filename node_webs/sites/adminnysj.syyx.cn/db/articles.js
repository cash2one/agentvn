var db       = require('./config').db
var articles = db.collection('articles')
var article_category    = db.collection('article_categories')
//----------------------------------------------------------------
exports.insert =  function (docs, cb) {
    articles.insert(docs, {}, cb)
}

exports.find_article_by_id =  function (id, cb) {
    ensure_index()
    articles.findById(id, cb)
}

exports.list_articles = function(limit_num, skip_num, cb) {
    articles.find().limit(limit_num).skip(skip_num).toArray(cb)
}

exports.update_by_id =  function (_id, doc, cb) {
    articles.updateById(_id, { $set : doc }, cb)
}

exports.find_articles_by_category = function(category_id, skip_num, limit_num, cb) {
    if (category_id == 'all') {

        articles.find({category_id : {$nin : ['unpublish']}}).limit(limit_num).skip(skip_num).sort({created_time : -1}).toArray(cb)

        return
    }

    articles.find({category_id : category_id}).limit(limit_num).skip(skip_num).sort({created_time : -1}).toArray(cb)

}

exports.count_by_category = function (category_id, cb) {
    if (category_id == 'all') {
        articles.count( { category_id : { $nin : ['unpublish'] } }, cb)
        return
    }

    articles.count( { category_id : category_id }, cb)
}

exports.find_by_title = function(title, cb) {
    articles.find({title : new RegExp(title, 'i')}).sort({created_time : -1}).toArray(cb)
}

exports.remove_by_id = function(_id, cb) {
    articles.removeById(_id, {}, cb)
}

//---------------articles_index---------------------------
function ensure_index () {
    articles.ensureIndex('_id')
    articles.ensureIndex('category_id')
}
