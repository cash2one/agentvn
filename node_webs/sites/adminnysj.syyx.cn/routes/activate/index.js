var check_login = require('../login/check')

exports.action = function(req, res) {
    check_login.after_login_render(req, res, function() {
        res.render('activate/main.jade')
    })
}