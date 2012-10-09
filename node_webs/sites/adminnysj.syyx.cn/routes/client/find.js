var db_clients     = require('../../db/clients')
var check_login    = require('../login/check')

exports.action = function (req, res) {
    check_login.after_login_do(req, res, function(req, res) {
        do_after_login(req, res)
    })
}

var do_after_login = function (req, res) {
    //find_client by id
    if (req.body.client_id) {
        db_clients.find_client_by_id(req.body.client_id, function(err, result) {
            res.send(result)
        })

        return
    }

    db_clients.find_all(function(err, result) {
        if (err) {
            res.send({ ok : 0})
            return
        }

        res.send(result)
    })  
}