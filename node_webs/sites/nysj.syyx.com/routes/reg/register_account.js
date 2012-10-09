//--------------------------------------------------------------------------------------------------------
// register_account.js
//--------------------------------------------------------------------------------------------------------
exports.action = function(req, res) {
    var account   = req.body.account_name
    var page_name = req.body.page_name
    var client_ip = ms.u2.get_req_ip(req)

    if(req.body.validate_pic){
        req.body.validate_pic = req.body.validate_pic.toLocaleLowerCase() 
    }

    var ret = _G_check_request_data(req, input_checks)
    if (ret) {
        for (var k in ret) {
            ms.u.log(ms.u.format('[%s] [%s] [%s] register check failed: (%s, %s)', account, client_ip, page_name, k, ret[k]))
            if(k == 'validate_pic') {
                res.send({ type : 'failed', info : '验证码错误' })
                return 
            }
        }
        
        res.send({ type : 'failed', info : '填写内容验证失败' })
        return
    }

    var ret = request_reg(req, function(err, result) {
        if (!result) {
            res.send({ type : 'failed', info : '注册失败' })
            ms.u.log(ms.u.format('[%s] [%s] [%s] register failed: %s', account, client_ip, page_name, err))
            return
        }


        if (result.RegUser_ErrorCodeResult != 'Success') {
            res.send({ type : 'failed', info : '注册失败' })
            ms.u.log(ms.u.format('[%s] [%s] [%s] register failed: %s, idcard: %s, reason: %s', 
                                 account, client_ip, page_name, result.RegUser_ErrorCodeResult, req.body.id_card, result.reason))

            return
        }

        res.send({ type : 'ok', info : account })
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
    },

    confirm_password : {
        checks : [
            { type : 'equal', side : 'server', value : "password", err_info : false }
        ]
    },

    id_card          : {
        checks : [
            { type : 'empty', err_info : false },
            { type : 'length', options : [ 15, 18 ], err_info : false },
        ],
    },

    true_name        : {
        checks : [
            { type : 'empty', err_info : false },
            { type : 'length', min : 2, max : 10, err_info : false } ,
            { type : 'regex', value : /^[\u4e00-\u9fa5]{2,6}$/, err_info : false }
        ]
    },
    
    validate_pic     : {
        checks : [
            { type : 'equal', side : 'session', value : 'captcha', err_info : false }
        ]
    }

}
//--------------------------------------------------------------------------------------------------------
function request_reg(req, cb) {
    var args = {}
    args.sUserAccount = req.body.account_name
    args.sPassword    = req.body.password
    args.sTrueName    = req.body.true_name
    args.sIDCard      = req.body.id_card
    args.sIP          = ms.u2.get_req_ip(req)

    var args_birthday = ms.u2.get_birthday_from_idcard(args.sIDCard)
    if (!args_birthday) {
        return false
    }
    var db          = ms.db.mssql['ShangYoo_User']
    var sp_name     = 'cp_Users_Register'
    var user_info   = [ args.sUserAccount, 
                    ms.u2.encrypt_by_md5(args.sPassword),
                    ' ',
                    args.sIDCard,
                    args.sTrueName,
                    args_birthday.full_date,
                    args_birthday.year,
                    args_birthday.month,
                    args_birthday.day,
                    args.sIP,
                    ' ',
                    1
                  ]

    db.exec_sp(sp_name, user_info, function(err, rows, output, ret) {
        var result = {}
        if (ret > 0) {
            record_nysj_reg(req, ret)
            result.RegUser_ErrorCodeResult = 'Success'
            result.reason = 0
        }
        else {
            result.RegUser_ErrorCodeResult = 'DB_Error'
            result.reason = ret
        }

        cb(err, result)
    })
}
//---------------记录时间版注册-------------------------------------------
function record_nysj_reg(req, user_id) {
    var add_time    = ms.u2.date_to_ms_datetime(new Date(), "tds")
    var add_data    = add_time
    var nysj_cookie = req.cookies['nysj_stat'] || 'blank'

    var db          = ms.db.mssql['ShangYoo_User']
    var sp_name     = 'cp_NYSJ_RegisterCookies_AddRecord'
    var args        = [ user_id, add_time, nysj_cookie, add_data]

    db.exec_sp(sp_name, args, function(err, rows, output, ret) {
        if (err) {
            console.log(err)
        }
    })
}
//--------------------------------------------------------------------------------------------------------