//--------------------------------------------------------------------------------------------------------
// mapp_unlock_account.js
//--------------------------------------------------------------------------------------------------------
/*
请求:
    参数：
        account
        appid
    示例：
        http://functions.syyx.com/mapp_unlock_account?account=abcd&appid=54698721

响应:
    {
        retcode : 0,
    }
    0: 成功
    1：系统异常
    2：账号不存在
    3：appid错误
    4：账号未被自己封停
*/
//--------------------------------------------------------------------------------------------------------
exports.action = function(req, res) {
    var account = req.body.account;
    var appid = req.body.appid;

    //check account is empty or null
    if(!account){       
        console.error('account is empty')
        res.send({ retcode : 2 })
        return
    }

    //check appid is empty or null
    if(!appid){     
        console.error('appid is empty')
        res.send({ retcode : 3 })
        return
    }

    //get user account
    ms.account_mgr.get_userid(account, function(err, userid){
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

            ms.account_mgr.check_lockaccount(userid, function(err, result){
                if(err != 0){
                    res.send({ retcode : err})
                    return
                }

                //no lock or not self lock
                if(result == 1){
                    res.send({ retcode : 4})                    
                    return
                }
                
                ms.account_mgr.unlock_account(userid, function(err){
                    if(err !=0 ){
                        res.send({ retcode : err })  
                        return
                    }
                    //lock time exprie and delete the record
                    if(result == 2){
                        res.send({ retcode : 4})                    
                        return
                    }

                    //unlock user game account
                    ms.account_mgr.unlock_gameaccount(userid, account, function(result){
                        res.send({ retcode : result })
                        
                        var isok = result == 0;
                        ms.log_mgr.add_lockgameaccountlog(userid, account, 30, isok)

                        if(isok){
                            var ip = ms.u2.get_req_ip(req)
                            ms.log_mgr.add_lockoperatelog(0,' ', ip, userid, account, '用户通过掌尚游解锁账号', 30)

                            ms.log_mgr.add_applog(account, appid, 4, "用户通过掌尚游解锁账号")

                            return                                
                        }
                    })
                })                
            })
        })
    })     
}
//--------------------------------------------------------------------------------------------------------

