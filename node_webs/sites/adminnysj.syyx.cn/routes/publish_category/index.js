var db_publish_categories = require('../../db/publish_categories')
var check_login           = require('../login/check')

exports.remove_by_id = function (req, res) {
    check_login.after_login_do(req, res, function(req, res) {
        if (!req.params.id) {
            res.send(null)
            return
        }

        db_publish_categories.remove_by_id(req.params.id, function(err, result) {
            if (err) {
                console.log(err)
                res.send(null)
                return
            }

            res.send({ok : 1})
        })
    })
}