//every controller should has method include list show update and remove 
var check_login = require('../login/check')
var db_articles = require('../../db/articles')
var time        = require('time')

exports.action = function(req, res) {
    check_login.after_login_render(req, res, function() {
        res.render('article/main.jade')
    })
}

exports.show = function (req, res) {
    if (!req.params.id) {
        res.send(null)
        return
    }

    check_login.after_login_do(req, res, function(req, res) {
        db_articles.find_article_by_id(req.params.id, function(err, result) {
            res.send(time.format_specify_field(result, { 'display_time' : 'date' }))
        })
    })
}

exports.by_category = function (req, res) {
    if (!req.params.category_id) {
        res.send({ ok : 0 })
        return
    }

    check_login.after_login_do(req, res, function(req, res) {
        var limit_num = 20 //per_page_display_amount
        var page      = 1 //default_page

        if (req.body.page) {
            page = parseInt(req.body.page, 10)
        }

        //todo: skip has some performance issue, to find method to replace it 
        var skip_num = (page-1)*limit_num

        db_articles.find_articles_by_category(req.params.category_id, skip_num, limit_num, function(err, result) {
            //step1 : get_list
            var final_result = { list : time.format_specify_field(result, { 'display_time' : 'date' }) }
            //step2 : get_total_count for page_turn
            db_articles.count_by_category(req.params.category_id, function(err, num) {
                final_result.total = num
                res.send(final_result)
            })
        })
    })
}

exports.by_title = function (req, res) {
    if (!req.body.title) {
        res.send({ ok : 0 })
        return
    }

    check_login.after_login_do(req, res, function(req, res) {
        db_articles.find_by_title(req.body.title, function(err, result) {
            res.send(time.format_specify_field(result, { 'display_time' : 'date' }))
        })
    })
}

exports.remove = function (req, res) {
    if (!req.params.id) {
        res.send({ ok : 0 })
        return
    }

    check_login.after_login_do(req, res, function(req, res) {
        db_articles.remove_by_id(req.params.id, function(err, result) {
            if (err) {
                res.send({ ok : 0 })
                return
            }
            res.send({ ok : 1 })
        })
    })
}