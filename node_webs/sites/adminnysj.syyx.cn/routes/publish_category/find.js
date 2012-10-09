var db_publish_categories = require('../../db/publish_categories')
var check_login           = require('../login/check')

exports.action = function (req, res) {
    check_login.after_login_do(req, res, function(req, res) {
        do_after_login(req, res)
    })
}

var do_after_login = function (req, res) {
    if (req.body.category_id) {
        db_publish_categories.find_by_id(req.body.category_id, function(err, result) {
            if (err) {
                res.send({ ok : 0})
            } else {
               res.send(result) 
            }
        })

        return
    }
    
    db_publish_categories.find_all(function(err, result) {
        if (err) {
            res.send({ ok : 0 })
            return
        }
        
        res.send(result)
    })
}