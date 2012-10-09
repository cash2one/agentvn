exports.action = function(req,res){
    check_user_login(req, function(login, user_account, user_id) {
        if (!login) {
            res.send({err : true})
            return
        }

        get_info(user_id, function(rows) {
            if (rows == 1 || rows == 2) {
                console.log('notalone get_info error:')
                console.log(rows)
                res.send({err:true})
                return
            }
            res.send(rows)
        })
    })
}

function get_info(user_id, cb){
    var db      = ms.db.mssql['NYCS_Station']
    var sp_name = 'cp_temp_notalone_GetRecordInfo'

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
            cb(false); return
        }
        cb(true, r.UserAccount, r.UserID)
    })
}