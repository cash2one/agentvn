exports.action = function(req,res){
    check_user_login(req, function(login, user_account, user_id) {
        if (login) {
            //res.send({type : 1, account : user_account,userid : user_id})
            serverlist(user_id,res)
            return
        }
        res.send({count : 0})
    })
}

function serverlist(user_id,res){
    var db      = ms.db.mssql['ShangYoo_GameUser']
    var sp_name = 'cp_ServerUser_GetRecordListByuserIDNoMergeServer'

    if (!db) {
        console.log('ShangYoo_GameUser not connected')
        res.send("2")

        return
    }

    var args = {"@userID" : user_id}
    db.exec_sp(sp_name, args, function(err, rows, output_params, ret_value) {
        if (err) {
            console.error(err)
            res.send({count : 0})
            return
        }
        var len = rows.length
        var ret = []
        var n = {}
        for(var i = 0; i < len; i++) {
            var Title = rows[i].Title
            if(!n[Title]) {
                n[Title] = true
                ret.push(rows[i].Title)
            }           
        }
        res.send(ret)
    })
}


//-------------------------------------------------------------------------------------------------
function check_user_login(req, cb) {
    var user_info = ms.account_mgr.user_info(req.cookies)
    if (!user_info) {
        //cb(false); return
    }

    ms.account_mgr.check_user_login(user_info, function(e, r) {
        if (e) {
            cb(false); return
        }

        cb(true, r.UserAccount, r.UserID)
    })
}
//-------------------------------------------------------------------------------------------------