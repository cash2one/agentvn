exports.action = function(req, res){
    check_user_login(req, function(login, user_account, user_id) {
        if (!login) {
            res.send("notlogin")
            return
        }

        var ret = _G_check_request_data(req, input_checks)
        if (ret) {
            console.log('check faild')
            res.send({err:true})
            return
        }

        var notalone_info = get_notalone_info(req, user_id)
        if (notalone_info.length == 0) {
            console.log('length == 0 !!' )
            console.log(notalone_info)
            res.send({err:true})
            return
        }

        save_notalone(notalone_info, function(ret) {
            if (ret != 1) {
                console.log('notalone add error:')
                console.log(ret)
                res.send({err:true,ret : ret})
                return
            }

            res.send({err:false})
        })
    })
}

function get_notalone_info(req, user_id) {
    var path = "/party/nycs/_att/notalone/"
    var game_info = {
        "@ServerName"      : req.body.Servername,
        "@UserID"          : user_id, 
        "@NickName"        : req.body.Nickname, 
        "@RoleType"        : req.body.roletype,
        "@Province"        : req.body.province,
        "@City"            : req.body.city,
        "@UserPic"         : path + req.body.UserPic,
        "@UserPicSmall"    : path + req.body.UserPicSmall,
        "@Content"         : req.body.Content,
        "@imgw"            : req.body.imgw,
        "@imgh"            : req.body.imgh
    }
    return game_info
}

function save_notalone(notalone_info,cb){
    var db      = ms.db.mssql['NYCS_Station']
    var sp_name = 'cp_temp_notalone_AddRecord'

    if (!db) {
        console.log('NYCS_Station not connected')
        cb(2)
        return
    }

    db.exec_sp(sp_name, notalone_info, function(err, rows, output_params, ret) {
        if (ret == 0 || err) {
            cb(ret)
            return
        }
        
        cb(ret)
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
            console.log("error")
            cb(false); return
        }

        cb(true, r.UserAccount, r.UserID)
    })
}
//-------------------------------------------------------------------------------------------------
var input_checks = {
    Servername     : {
        checks : [
            { type : 'empty', err_info : false }
        ]
    },
    Nickname     : {
        checks : [
            { type : 'empty', err_info : false },
            { type : 'length', min : 2, max : 20, err_info : false }
        ]
    },
    province     : {
        checks : [
            { type : 'empty', err_info : false }
        ]
    },
    city     : {
        checks : [
            { type : 'empty', err_info : false }
        ]
    },
    Content     : {
        checks : [
            { type : 'empty', err_info : false }
        ]
    },
    UserPic     : {
        checks : [
            { type : 'empty', err_info : false }
        ]
    },
    UserPicSmall     : {
        checks : [
            { type : 'empty', err_info : false }
        ]
    },
    roletype     : {
        checks : [
            { type : 'empty', err_info : false }
        ]
    }
}
