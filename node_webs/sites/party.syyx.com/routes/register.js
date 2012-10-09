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

        ms.account_mgr.user_login(account, req.body.password, function(e, r) {
            if (e) {
                console.log(e)
                res.send({ type : 'ok'})
                return
            }
            res.header('P3P', 'CP="CAO PSA OUR"')
            var coo = ms.u2.set_cookies(res, "shangyoo2",r, { domain:".syyx.com", path: '/' })
            res.cookie._expires =  new Date((new Date()).getTime() + 1000*60*60*50)
            res.send({ type : 'ok'})
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
    args.sIP          = ms.u2.get_req_ip(req) // req.connection.remoteAddress
    args.sFastUrl     = req.body.page_name

    var stat_info = ms.qs.parse(req.cookies['statinfo1'])
    args.VisitGuid    = stat_info['Val0'] || '0'
    args.ADId         = stat_info['Val1'] || '0'
    args.ADWebNumber  = stat_info['Val2'] || '0'
    args.CookiesTime  = ms.u2.to_soap_date(stat_info['Val3']) || '2012-01-01T00:00:00'

    args.CookiesTime2 = ms.u2.date_to_ms_datetime(new Date(stat_info['Val3'] || null), "tds")        

    if (ms.reg_use_db) {
        ms.sy_user.reg_new_user(args, cb)
    }
    else {
        ms.ws.user.RegUser_ErrorCode(args, cb)
    }
}

//--------------------------------------------------------------------------------------------------------
test_reg = function(cb) {
    var t = new Date()

    var args = {}
    args.sUserAccount = '111334'
    args.sPassword    = '111333'
    args.sTrueName    = '江溪'
    args.sIDCard      = '512530197511120012'
    args.sIP          = '192.168.2.40'
    args.sFastUrl     = 'nycs_index8'
    args.VisitGuid    = '1060000068240'
    args.ADId         = '1'
    args.CookiesTime  = '2002-05-30T09:00:00'
    args.ADWebNumber  = '0'

    ms.ws.user.RegUser(args, function(e, r) { console.log(e, r) })
}
//--------------------------------------------------------------------------------------------------------