//--------------------------------------------------------------------------------------------------------
// mapp_modify_password.js
//--------------------------------------------------------------------------------------------------------
/*
请求:
    参数：
        account
        appid
        newpassword
    示例：
        http://functions.syyx.com/mapp_modify_password?account=abcd&appid=54698721&newpassword=123456

响应:
    {
        retcode : 0,
    }
    0: 成功
    1：系统异常
    2：账号不存在
    3：appid错误
    4：新密码格式错误
*/
//--------------------------------------------------------------------------------------------------------
exports.action = function(req, res) {
	var account = req.body.account;
    var appid = req.body.appid;
	var newpassword = req.body.newpassword;

	//check account is empty or null
	if(!account){		
        console.error('account is empty')
        res.send({ retcode : 2 })
        return
	}

	//check password is empty or null
	if(!appid){		
        console.error('appid is empty')
        res.send({ retcode : 3 })
        return
	}

    //check password is empty or null
    if(!newpassword){      
        console.error('newpassword is empty')
        res.send({ retcode : 4 })
        return
    }

    ms.account_mgr.get_userid(account, function(err,userid){
        if(err!=0){
            res.send({ retcode : err })
            return
        }

        ms.account_mgr.check_appid(account, function(result, userappid){
            if(result !=0 ){
                res.send({ retcode : 3})
                return
            }

            if(appid != userappid){
                res.send({ retcode : 3})
                return
            }

            ms.account_mgr.modify_password(userid, newpassword, function(result){
                if(result !=0 ){
                    res.send({ retcode : result })  
                    return
                }

                ms.account_mgr.modify_gamepassword(userid, account, newpassword, function(result){
                    res.send({ retcode : result })  
                })

                var ip = ms.u2.get_req_ip(req)
                ms.log_mgr.add_changepasswordlog(userid, account, ' ', newpassword, 0, 0, ip)              
            })
        })
    })	
}
//--------------------------------------------------------------------------------------------------------