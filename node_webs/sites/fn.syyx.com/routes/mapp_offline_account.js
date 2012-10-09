//--------------------------------------------------------------------------------------------------------
// mapp_offline_account.js
//--------------------------------------------------------------------------------------------------------
/*
请求:
    参数：
        account
        appid
    示例：
        http://functions.syyx.com/mapp_offline_account?account=abcd&appid=54698721

响应:
    {
        retcode : 0,
    }
    0: 成功
    1：系统异常
    2：账号不存在
    3：appid错误
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
        
            ms.account_mgr.get_rolesserver(account, function(err, serverlist){
                if(err !=0 ){
                    res.send({ retcode : err })
                    return
                }

                //no role
                if(serverlist.length == 0){
                    res.send({ retcode : 0})
                    return
                }
                
                var serverid = 0 
                var retcode  = 0
                var server_count = serverlist.length
                var return_count = 0
                for (var i = 0; i<server_count; i++) {
                    serverid = serverlist[i].ServerID
                    //offline user game account
                    ms.account_mgr.offline_gameaccount(serverid , userid, account, function(result){
                        
                        if(result != 0){
                            retcode = result
                        }                   

                        return_count ++
                        if(return_count == server_count) {
                            res.send( { retcode : retcode })
                        }
                    })
                }
            })
        })
    })     
}
//--------------------------------------------------------------------------------------------------------