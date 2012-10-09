var db_articles = require('../../db/articles')
var check_login = require('../login/check')
var time        = require('../../helper/time')

exports.action = function (req, res) {
    check_login.after_login_do(req, res, function(req, res) {
        do_after_login(req, res)
    })
}

var do_after_login = function (req, res) {
    //更新文章属性
    if (req.body.article_id && req.body.category_id) {
        var id           = req.body.article_id
        var display_time = req.body.display_time
        var doc        = {
            category_id     : req.body.category_id,
            display_time    : time.convert_client_time_string(display_time)
        } 
        db_articles.update_by_id(id, doc, function(err, result) {
            if (err) {
                res.send({ ok : 0 })
                return
            }

            res.send({ ok : 1 })
        }) //更新文章内容
    } else if (req.body.article_id) {
        var id         = req.body.article_id
        var doc        = {
            title : req.body.title,
            text  : req.body.text
        }

        db_articles.update_by_id(id, doc, function(err, result) {
            if (err) {
                res.send({ ok : 0 })
                return
            }

            res.send({ ok : 1 })
        })
    } else { //新增
        db_articles.insert({
            title           : req.body.title,
            text            : req.body.text,
            category_id     : 'unpublish',
            created_time    : new Date(),
            display_time    : new Date()
        }, 
        function(err, result) {
            if (err) {
                res.send({ ok : 0 })
                return
            }

            res.send({ ok : 1 })
        }) 
    }
}