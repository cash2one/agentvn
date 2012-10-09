//---------------------------------------------------------------------------------------------------------
// sy_user.js
//---------------------------------------------------------------------------------------------------------
var user_fields_map = {
    user_id        : 'UserID',
    account        : 'UserAccount',
    password       : 'Password',
    card_id        : 'CardID',
    birthday       : 'Birthday',
    true_name      : 'TrueName',
    gender         : 'Sex',
    education      : 'Education',

    email          : 'Email',
    qq             : 'QQ',
    phone          : 'Phone',
    mobile         : 'Mobile',
    address        : 'Address',
    province       : 'Province',
    city           : 'City',

    email_ok       : 'IsEmailOk',
    idcard_ok      : 'IsIDCardOK',
    info_ok        : 'IsInfoOk',
    psw_ok         : 'IsPswOk',
    is_delete      : 'IsDelete',
    is_vip         : 'IsVIP',

    reg_time       : 'RegTime',
    reg_ip         : 'RegIP',
    lastlogin_time : 'LastLoginTime',
    lastlogin_ip   : 'LastLoginIP',
    curlogin_time  : 'CurrentLoginTime',
    curlogin_ip    : 'CurrentLoginIP',
}
//--------------------------------------------------------------------------------------------------------
// 构造函数定义，不能是匿名函数，这里的函数名即类名
function sy_user() {
    var self = this

    self.evter = new ms.events.EventEmitter()
}
//--------------------------------------------------------------------------------------------------------
sy_user.load = function(key) {
    var self = this

    if (typeof key == 'number') {
        return self.load_by_id(key)
    }

    if (typeof key == 'string') {
        return self.load_by_account(key)
    }

    return false
}
//--------------------------------------------------------------------------------------------------------
sy_user.load_by_id = function(user_id) {
    var self = this

    self.load_from_ws('GetUserInfoByID', 'iUserID', user_id)
}
//--------------------------------------------------------------------------------------------------------
sy_user.load_by_account = function(account) {
    var self = this

    self.load_from_ws('GetUserInfoByAccount', 'sUserAccount', account)
}
//--------------------------------------------------------------------------------------------------------
sy_user.load_from_ws = function(ws_name, arg_name, arg_value) {
    var self = this

    var args = {}
    args[arg_name] = arg_value

    var ws_fun = ms.ws.user[ws_name]
    ws_fun(args, function(err, result) {
        if (err) {
            console.error('load user error:', err)
            return
        }

        for (var k in user_fields_map) {
            var ret_field = user_fields_map[k]
            if (result[ret_field] !== undefined) {
                self[k] = result[ret_field]
            }
        }

        self.evter.emit('loaded')
    })
}
//--------------------------------------------------------------------------------------------------------
// 这一句必须放在类定义最后
_class(sy_user)
//--------------------------------------------------------------------------------------------------------
exports.reg_new_user = function(user_info, cb) {
    reg_new_user_check(user_info, cb, do_reg_new_user)
}
//--------------------------------------------------------------------------------------------------------
function reg_new_user_check(user_info, cb, do_reg_new_user) {
    var result = {}

    // password
    if( !string_regex_check(user_info.sPassword, /^[^\s]{6,16}$/) ) {
        result.RegUser_ErrorCodeResult = 'Password_Error'
        cb(null, result)
        return
    }

    //truename
    if( !string_regex_check(user_info.sTrueName, /^[\u4e00-\u9fa5]{2,6}$/) ) {
        result.RegUser_ErrorCodeResult = 'TrueName_Error'
        cb(null, result)
        return
    }

    // idcard
    if( !ms.u2.check_idcard(user_info.sIDCard) ) {
        result.RegUser_ErrorCodeResult = 'CardID_Error'
        cb(null, result)
        return
    }

    // check account
    check_user_exist(user_info, function(err) {
        if (err) {
            do_reg_new_user(user_info,err, cb)

            return
        }

        do_reg_new_user(user_info,null, cb)
    })
}
//--------------------------------------------------------------------------------------------------------
function do_reg_new_user(user_info,err, cb) {
    if (err) {
        var result = {}
        result.RegUser_ErrorCodeResult = err
        result.reason = 0

        cb(err, result)

        return
    }

	var args_birthday = ms.u2.get_birthday_from_idcard(user_info.sIDCard)
    if (!args_birthday) {
        return false
    }
    
	var db      = ms.db.mssql['ShangYoo_User']
    var sp_name = 'cp_Users_Register'
    var args    = [ user_info.sUserAccount, 
					ms.u2.encrypt_by_md5(user_info.sPassword),
					' ',
					user_info.sIDCard,
					user_info.sTrueName,
					args_birthday.full_date,
					args_birthday.year,
					args_birthday.month,
					args_birthday.day,
					user_info.sIP,
					' ',
					1
                  ]

    db.exec_sp(sp_name, args, function(err, rows, output, ret) {
        user_info.user_id = ret

        var result = {}
        if (ret > 0) {
            record_ad_data(user_info)
            record_fast_reg_data(user_info)

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
//--------------------------------------------------------------------------------------------------------
function record_ad_data(user_info) {
    if (user_info.user_id <= 0) {
        return false
    }

    if (user_info.VisitGuid == 0) {
        return false
    }

    if (user_info.ADId <= 0) {
        return false
    }

    var db      = ms.db.mssql['ShangYoo_User']
    var sp_name = 'cp_ADMapping_AddRecord'

	var args    = [ user_info.user_id,
					user_info.sUserAccount,
					user_info.VisitGuid,
					0,
					user_info.ADId ,
					0,
					user_info.ADWebNumber,
					ms.u2.date_to_ms_datetime(new Date(), "tds"),
					user_info.sIP,
					user_info.CookiesTime2
				  ]

	db.exec_sp(sp_name, args, function(err, rows, output, ret) {
        if (err) {
            console.error('record_ad_data', err)
        }
    })
}
//--------------------------------------------------------------------------------------------------------
function record_fast_reg_data(user_info) {
    if (user_info.user_id <= 0) {
        return false
    }

    var db      = ms.db.mssql['ShangYoo_User']
    var sp_name = 'cp_FastUserList_AddRecord'

	var args    = [ user_info.user_id,
			        user_info.sUserAccount,
			        user_info.sFastUrl,
			        ms.u2.date_to_ms_datetime(new Date(), "tds")
		          ]

	db.exec_sp(sp_name, args, function(err, rows, output, ret) {
        if (err) {
            console.error('record_fast_reg_data', err)
        }
    })
}
//--------------------------------------------------------------------------------------------------------
function check_user_exist(user_info, cb) {
    var account = user_info.sUserAccount

    var db  = ms.db.mssql['ShangYoo_User']
    var sp_name = 'cp_Users_IsExists'

    if (!db) {
        console.log('ShangYoo_User not existed')
        cb('DB_Error')

        return
    }

    var args = [ account ]
    db.exec_sp(sp_name, args, function(err, rows, output_params, ret_value) {
        if (err) {
            console.error(err)

            cb('DB_Error')
            return
        }

        if (ret_value == 0) {
            cb(null)
        }
        else {
            cb('Account_Exists')
        }
    })
}
//--------------------------------------------------------------------------------------------------------
exports.check_user_exist = check_user_exist
//--------------------------------------------------------------------------------------------------------
function string_regex_check(string, regex) {
    if (string.length == 0) {
        return false
    }
    
    if (regex.test(string)) {
        return true
    }
    
    return false
}
//--------------------------------------------------------------------------------------------------------
