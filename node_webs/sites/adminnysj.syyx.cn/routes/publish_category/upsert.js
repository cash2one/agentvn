var db_publish_categories = require('../../db/publish_categories')
var check_login           = require('../login/check')

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
            child_item : req.body.item_id_array
        } 
        db_publish_categories.update_by_id(id, doc, function(err, result) {
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
        db_publish_categories.insert(doc, function(err, result) {
            if (err) {
                res.send({ ok : 0 })
                return
            }

            res.send({ ok : 1 })
        }) 
    } 
}