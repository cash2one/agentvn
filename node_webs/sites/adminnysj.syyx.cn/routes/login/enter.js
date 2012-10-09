exports.action = function (req, res) {
    var cookie_value_array = []

    ms.ws['admin'].AdminUserLogin(req.body, function(err, result) {
        if (err) {
            console.log(err)
            res.send({ok : 0, msg : err.toString() })
            return
        }
        var login_result = JSON.parse(result.AdminUserLoginResult[0])
        if (login_result.retcode == '0') {
            for (var key in login_result) {
                if (key == 'retcode') {
                    continue
                } else {
                    cookie_value_array.push(key + '=' + login_result[key])
                }
            }
            var cookie_value = cookie_value_array.join('&')
            ms.u2.set_cookies(res, 'admin1', cookie_value, { domain : '.syyx.cn', path : '/'})
            res.send({ok : 1})
            return 
        } else {
            res.send({ok : 0})
        } 
    })
}
