var db_publish_items = require('../../db/publish_items')
var check_login      = require('../login/check')

exports.action = function (req, res) {
    check_login.after_login_do(req, res, function(req, res) {
        do_after_login(req, res)
    })
}

var do_after_login = function (req, res) {
    if (!req.body.item_id) {
        res.send({ ok : 0 })
        return
    }

    db_publish_items.remove_by_id(req.body.item_id, function(err, result) {
        if (err) {
            res.send({ ok : 0 })
            return
        }
        res.send({ ok : 1 })
    })
}