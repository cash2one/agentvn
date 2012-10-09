var db_clients      = require('../../db/clients')
var check_login     = require('../login/check')

exports.action = function (req, res) {
    check_login.after_login_do(req, res, function(req, res) {
        do_after_login(req, res)
    })
}

var do_after_login = function (req, res) {
    if (!req.body.client_id) {
        res.send({ ok : 0 })
        return
    }

    db_clients.remove_by_id(req.body.client_id, function(err, result) {
        if (err) {
            res.send({ ok : 0 })
            return
        }
        res.send({ ok : 1 })
    })
}