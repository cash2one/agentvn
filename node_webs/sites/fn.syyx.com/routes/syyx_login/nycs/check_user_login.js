exports.action = function(req,res){
    check_user_login(req, function(login, user_account, user_id) {
        if (!login) {
            res.send({login : false})
            return
        }
        res.send({login : true, UserAccount : user_account, UserID : user_id})
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