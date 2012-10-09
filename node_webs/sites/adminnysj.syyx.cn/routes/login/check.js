function check(cookie, cb) {

    if (!cookie.admin1) {
        cb(false)
        return
    }

    var ws           = ms.ws['admin']
    var login_cookie = cookie.admin1
    var args         = {}


    login_cookie.split('&').forEach(function(item, index, array) {
        args[item.substring(0,item.indexOf('='))] = item.substring(item.indexOf('=')+1)
    })

    for (var key in args) {
        if (key == 'Val5' || key == 'Val6' || key == 'Val7' || key == 'Val8') {
            continue
        } else {
            args[key] = args[key].replace(/\s/g,'+')
        }
    }

    ws.CheckAdminUserLogin(args, function(err, result) {
        if (err) {
            console.log(err)
            cb(false)
            return
        }

        if (!result.CheckAdminUserLoginResult[0]) {
            cb(false)
            return
        }

        var check_result = JSON.parse(result.CheckAdminUserLoginResult[0])

        if (check_result.retcode !== '0') {
            cb(false)
            return
        }
        cb(true, check_result.UserAccount)
    })
}

exports.action = function(req, res) {
    check(req.cookies, function(is_login, account) {
        if (is_login) {
            res.send({ok : 1})
        } else {
            res.send({ok : 0})
        }
    })
}

exports.after_login_render = function(req, res, cb) {
    check(req.cookies, function(is_login, account) {

        if (!is_login) {
            res.redirect('/login#' + req.url)
            return
        }
        
        cb()
    })
}

exports.after_login_do = function(req, res, cb) {
    check(req.cookies, function(is_login, account) {
        if (!is_login) {
            res.send({
                ok  : 0,
                msg : '没有登录'
            })
            return
        }
        cb(req, res)
    })
}

exports.check = check