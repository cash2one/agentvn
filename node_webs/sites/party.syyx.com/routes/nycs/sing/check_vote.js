exports.action = function(req,res){
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

        save_vote(user_id, req, function(ret) {
            if (ret != 1) {
                console.log('vote add error:')
                console.log(ret)
                this_send(res, "投票失败")
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


function save_vote(user_id, req, cb){
    var db      = ms.db.mssql['NYCS_Station']
    var sp_name = 'cp_temp_resing_vote_AddRecord'

    if (!db) {
        console.log('NYCS_Station not connected')
        cb(0)
        return
    }

    var args = {
        "@phone" : req.body.phone,
        "@singid" : req.body.singid,
        "@UserID" : user_id
    }
    db.exec_sp(sp_name, args, function(err, rows, output_params, ret) {
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
    phone     : {
        checks : [
            { type : 'empty', err_info : false },
            { type : 'regex', value : /^[0-9]{11}$/, err_info : false }
        ]
    }
}