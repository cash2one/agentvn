exports.action = function(req,res){
    check_user_login(req, function(login, user_account, user_id) {
        if (!login) {
            this_send(res, "请先登录")
            return
        }  

        get_info(user_id, function(ret) {
            if (ret == 1 || ret == 2) {
                console.log('vote get error:')
                console.log(ret)
                this_send(res, "获取投票失败")
                return
            }

            if(ret.length > 0){
                this_send(res, "已投票")
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


function get_info(user_id, cb){
    var db      = ms.db.mssql['NYCS_Station']
    var sp_name = 'cp_temp_resing_vote_Isvote'

    if (!db) {
        console.log('NYCS_Station not connected')
         cb(1)
        return
    }

    var args = {"@UserID" : user_id}
    db.exec_sp(sp_name, args, function(err, rows, output_params, ret) {
        if (err) {
            cb(2)
            return
        }
        
        cb(rows)
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
