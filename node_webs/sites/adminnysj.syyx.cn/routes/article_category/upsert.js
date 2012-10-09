var db_article_category = require('../../db/article_categories')
var check_login         = require('../login/check')

exports.action = function (req, res) {
    check_login.after_login_do(req, res, function(req, res) {
        do_after_login(req, res)
    })
}

var do_after_login = function (req, res) {
    //更新
    if (req.body.category_id) {
        var id         = req.body.category_id
        var doc        = {
            name : req.body.name
        } 
        db_article_category.update_by_id(id, doc, function(err, result) {
            if (err) {
                res.send({ ok : 0 })
                return
            }

            res.send({ ok : 1 })
        }) 
    } else { //新增
        var doc = {
            name         : req.body.name
        }
        doc.created_time = new Date()
        db_article_category.insert(doc, function(err, result) {
            if (err) {
                res.send({ ok : 0 })
                return
            }

            res.send({ ok : 1 })
        }) 
    } 
}