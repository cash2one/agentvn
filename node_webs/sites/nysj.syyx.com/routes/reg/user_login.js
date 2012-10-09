//-------------------------------------------------------------------------------------------------
// user_login.js
//-------------------------------------------------------------------------------------------------
exports.action = function(req, res) {
    check_user_login(req, function(login, user_account, user_id) {
        if (login) {
            res.send({type : 1, account : user_account})
            return
        }

        var account = req.body.account
        var password = req.body.password
        
        ms.account_mgr.user_login(account, password, function(e, r) {
            if (e) {
                console.error(e)
                res.send({ type : 1 })
                return
            }

            var cookie = ms.u2.set_cookies(res, 'shangyoo2', r, { maxAge : 60 * 60, domain : 'syyx.com' })
            console.log(cookie)

            res.send({ type : 0 })
        })
    })
}
//-------------------------------------------------------------------------------------------------
function check_user_login(req, cb) {
    var user_info = ms.account_mgr.user_info(req.cookies)
    if (!user_info) {
        cb(false); return
    }

    ms.account_mgr.check_user_login(user_info, function(e, r) {
        if (e) {
            cb(false); return
        }

        cb(true, r.UserAccount, r.UserID)
    })
}
//-------------------------------------------------------------------------------------------------