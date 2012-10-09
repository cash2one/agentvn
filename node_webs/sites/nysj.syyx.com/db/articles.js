var db                  = require('./config').db
var articles            = db.collection('articles')
var article_category    = db.collection('article_categories')
//----------------------------------------------------------------
exports.insert =  function (docs, cb) {
    articles.insert(docs, {}, cb)
}

exports.find_article_by_id =  function (id, cb) {
    articles.findById(id, cb)
}

exports.list_articles = function(limit_num, skip_num, cb) {
    articles.find().limit(limit_num).skip(skip_num).toArray(cb)
}

exports.update_by_id =  function (_id, doc, cb) {
    articles.updateById(_id, { $set : doc }, cb)
}

exports.find_articles_by_category = function(category_id, skip_num, cb) {
    if (category_id == 'all') {
        articles.find({category_id : {$nin : ['unpublish']}}).limit(100).skip(skip_num).sort({created_time : -1}).toArray(cb)

        return
    }

    articles.find({category_id : category_id}).limit(100).skip(skip_num).sort({created_time : -1}).toArray(cb)

}

exports.serach_article = function(title, cb) {
    articles.find({title : new RegExp(title, 'i')}).sort({created_time : -1}).toArray(cb)
}

exports.remove_by_id = function(_id, cb) {
    articles.removeById(_id, {}, cb)
}

exports.find_by_category_page = function(category_id,page_num, cb) { 
    var limit_num = 20
    var skip_num  = (page_num - 1) * limit_num 
    exports.find_by_category(category_id,skip_num,limit_num,cb)
}

exports.find_by_category = function(category_id, skip_num, limit_num, cb) {
    var category_name_map = {}
    article_category.find().toArray(function(err, result) {
        if (err) {
            console.log(err)
            cb(err)
            return
        }

        result.forEach(function(item, index, array) {
            category_name_map[item._id] = item.name
        })
        if (category_id == 'all') {
            articles.find({category_id : {$nin : ['unpublish']}}).limit(limit_num).skip(skip_num).sort({created_time : -1}).toArray(function(err, result) {
                add_category_name(err, result, cb)
            })
        } else {
            articles.find({category_id : category_id}).limit(limit_num).skip(skip_num).sort({created_time : -1}).toArray(function(err, result) {
                add_category_name(err, result, cb)
            })
        }
    })

    function add_category_name(err, result, cb) {
        if (err) {
            console.log(err)
            cb(err)
            return
        }
        var result_include_name = result.map(function(item, index, array) {
            item.category_name = category_name_map[item.category_id]
            return item
        })
        cb(err, result_include_name)
    }
}

exports.total_count = function (category_id,cb){
    if (category_id == 'all') {
        articles.count({category_id : {$nin : ['unpublish']}}, function(err ,num){
            cb(num)
        })

        return
    }
    articles.count({category_id : category_id}, function(err, num) {
        cb(num)
    })
}

exports.find_related_articles_by_id = function(newsid, cb) {
    articles.findById(newsid, function(err,result){
        if (err) {
            console.log(err)
            cb(err)
            return
        }

        if (result == null){
            cb('null')
            return
        }

        if (result.category_id == 'unpublish') {
            articles.find({category_id : {$nin : ['unpublish']}}).limit(6).sort({created_time : -1}).toArray(cb)
            return
        }

        articles.find({category_id : result.category_id, _id : {$nin : [result._id]}}).limit(6).sort({created_time : -1}).toArray(cb)
    })
}