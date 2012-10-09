exports.action = function(req, res){
    check_user_login(req, function(login, user_account, user_id) {
        if (!login) {
            this_send(res, "请先登录")
            return
        }
        var ret = _G_check_request_data(req, input_checks)
        if (ret) {
            console.log('check faild')
            this_send(res, "验证失败")
            return
        }

        var sing_info = get_sing_info(req, user_id)
        if (sing_info.length == 0) {
            console.log('sing get parameter error :' )
            console.log(sing_info)
            this_send(res, "上传失败")
            return
        }        

        save_sing(sing_info, function(ret) {
            if (ret != 1) {
                console.log('sing add error:')
                console.log(ret)
                this_send(res , "上传失败")
                return
            }

            res.send({err:false})
        })      
    })
}

function this_send(res, info){
    res.send({err:true,ret : info})
    return
}

function get_sing_info(req, user_id) {
    var path = "/party/nycs/_att/sing/"
    var game_info = {
        "@UserID"          : user_id, 
        "@NickName"        : req.body.Nickname, 
        "@phone"           : req.body.phone,
        "@content"         : req.body.content,
        "@mp3url"          : path + req.body.mp3url
    }

    return game_info
}

function save_sing(notalone_info,cb){
    var db      = ms.db.mssql['NYCS_Station']
    var sp_name = 'cp_temp_resing_AddRecord'

    if (!db) {
        console.log('NYCS_Station not connected')
        cb(2)
        return
    }
    
    console.log(notalone_info)
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
    Nickname     : {
        checks : [
            { type : 'empty', err_info : false },
            { type : 'length', min : 2, max : 20, err_info : false }
        ]
    },
    phone     : {
        checks : [
            { type : 'empty', err_info : false },
            { type : 'regex', value : /^[0-9-]{6,16}$/, err_info : false }
        ]
    },
    content     : {
        checks : [
            { type : 'empty', err_info : false },
            { type : 'length', min : 1, max : 18, err_info : false}
        ]
    }
}
