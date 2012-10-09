var db_activate_code = require('../../db/activate_code')

exports.action = function(req, res) {
    if (!req.body.code) {
        res.send({ ok : 0, info : '没有输入激活码'})
        return
    }

    if (!req.body.account) {
        res.send({ ok : 0, info : '没有输入帐号'})
        return
    }

    check_user(req, res, function(is_exists, user_id) {
        if(!is_exists) {
            res.send({ok : 0, info : '账号不存在'})
            return
        } else {
            activate_accoount(req, res, user_id)
        }

    })
}

function check_user(req, res, cb) {

    var db      = ms.db.mssql['ShangYoo_User']
    var sp_name = 'cp_Users_IsExists'

    if (!db) {
        console.log('ShangYoo_User not connected')
        cb(false)
        return
    }

    var args = [ req.body.account ]
    db.exec_sp(sp_name, args, function(err, rows, output_params, ret_value) {
        if (err) {
            console.error(err)
            cb(false)
            return
        }

        if (ret_value == 0) {
            cb(false)
        }
        else {
            cb(true, ret_value)
        }
    })
}

function activate_accoount(req, res, user_id) {
    var db                    = ms.db.mssql['ShangYoo_GS']
    var sp_name               = 'cp_GSActiveUsers_UseActiveCard'
    var args                  = [user_id, req.body.account, 11, req.body.code, 'ActiveUserAccountCard']

    db.exec_sp(sp_name, args, function(err, rows, output, ret) {

        if (err) {
            console.log(err)   
            res.send({ ok : 0 ,info : '服务器忙，稍后再试'})         
            return
        }

        if (ret == -1) {
            res.send({ ok : 2, info : '您的账号已获得测试资格，无需再次激活！'})
            return
        }

        if (ret == -2) {
            res.send({ ok : 2, info : '您输入的激活码有误，不能激活《诺亚传说·时间版》首次删档封测资格！'})
            return
        }

        if (ret == -3) {
            res.send({ ok : 2, info : '您输入的激活码有误，不能激活《诺亚传说·时间版》首次删档封测资格！'})
            return
        }

        if (ret == -4) {
            res.send({ ok : 2, info : '您的激活码已被使用，不能再次激活，请重新获取激活码！'})
            return
        }

        if (ret == -5) {
            res.send({ ok : 0, info : '发生意外错误'})
            return
        }

        res.send({ ok : 1, info : req.body.account})
        mark_code_used(req.body.code, req.body.account)
    })
}

function mark_code_used(code, account) {
    db_activate_code.mark_code_used(code, account, function(err, result) {
        if (err) {
            console.log(err)
        }
    })
}