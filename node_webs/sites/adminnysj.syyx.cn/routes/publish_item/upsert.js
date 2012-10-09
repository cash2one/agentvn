var db_publish_items = require('../../db/publish_items')
var check_login      = require('../login/check')

exports.action = function (req, res) {
    check_login.after_login_do(req, res, function(req, res) {
        do_after_login(req, res)
    })
}

var do_after_login = function (req, res) {
    var doc = {
        title        : req.body.title,
        link         : req.body.link,
        color        : req.body.color,
        summary      : req.body.summary,
        thumb_url    : req.body.thumb_url,
        category_id  : req.body.category_id,
    }

    //更新
    if (req.body.item_id) {
        var id         = req.body.item_id
        db_publish_items.update_by_id(id, doc, function(err, result) {
            if (err) {
                res.send({ ok : 0 })
                return
            }

            res.send({ ok : 1 })
        }) 
    } else { //新增
        doc.created_time = new Date()
        db_publish_items.insert(doc, function(err, result) {
            if (err) {
                res.send({ ok : 0 })
                return
            }

            res.send({ ok : 1 })
        }) 
    }   
}