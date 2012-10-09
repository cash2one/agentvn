exports.action = function(req, res){
    // check_user_login(req, function(login, user_account, user_id) {
    //      if (!login) {
    //         this_send(res, {r : "请先登录"})
    //         return
    //     }

        var des_path = process.env.HOME + "/code/node_webs/sites/r.syyx.com/public/party/nycs/_att/sing/"
        var option = {
            tupian : {
                naming          : 'date',
                size_limit      : 10 * 1024 * 1024,
                size_limit_err  : '上传失败',   //不能超过5M
                file_type       : 'audio',
                file_type_err   : '上传失败', //只能上传mp3
                file_exts       : [ 'mp3' ],
                file_exts_err   : '上传失败'
            }
        }

        ms.upload.recv(req, des_path, option, function(err, files, option) {
            if(err){
                console.log("upload error:"+err)
                if(err == -1){
                    err = "上传失败"
                }
                this_send(res, {r : err})
                return
            }
            this_send(res, {r : "success", url : option.tupian.des_name})
        })
    // })
}

function this_send(res, info){
    res.redirect('/nycs/sing/uploadok?r=' + encodeURIComponent(info.r) + '&url=' + encodeURIComponent(info.url))
    return
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