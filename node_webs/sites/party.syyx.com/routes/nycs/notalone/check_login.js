exports.action = function(req, res) {

    var value = req.body.validate_pic.toLocaleLowerCase()

    if (value !== req.session.captcha) {
        req.session = null
        res.send({  type : 1, info : '验证码错误' })
        return
    } else {
        req.session = null
    }
    
    var ret = _G_check_request_data(req, input_checks)
    if (ret) {
        res.send({ type : 1, info : '用户名或密码错误' })
        return
    }

    check_user_login(req, function(login, user_account, user_id) {
        if (login) {
            res.send({type : 0, account : user_account})
            return
        }

        var account = req.body.account_name
        var password = req.body.password

        ms.account_mgr.user_login(account, password, function(e, r) {
            if (e) {
                console.log(e)
                res.send({ type : 1, info : '用户名或密码错误' })
                return
            }
            res.header('P3P', 'CP="CAO PSA OUR"')
            var coo = ms.u2.set_cookies(res, "shangyoo2",r, { domain:".syyx.com", path: '/' })
            res.cookie._expires =  new Date((new Date()).getTime() + 1000*60*60*50)
            res.send({ type : 0 })
        })
    })
}

//--------------------------------------------------------------------------------------------------------
var input_checks = { 
    account_name     : {
        checks : [
            { type : 'empty', err_info : false },
            { type : 'length', min : 6, max : 16, err_info : false },
            { type : 'regex', value : /^[A-Za-z0-9_]{6,16}$/, err_info : false }
        ],
    },

    password         : {
        checks : [
            { type : 'empty', err_info : false },
            { type : 'length', min : 6, max : 16, err_info : false } ,
            { type : 'regex', value : /^[^\s]{6,16}$/, err_info : false }
        ]
    }
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