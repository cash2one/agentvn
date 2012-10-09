//--------------------------------------------------------------------------------------------------------
// kf_lock_confirm.js
//--------------------------------------------------------------------------------------------------------
/*
请求:
    参数：
        account
        captcha
    示例：
        http://functions.syyx.com/kf_lock_confirm?account=abcd&captcha=1234

响应:
    {
        retcode : 0
    }
    0: 成功
    1：系统异常
    2：账号不存在
    3：未绑定手机
    4：验证码错误
*/
//--------------------------------------------------------------------------------------------------------

exports.action = function(req, res) {
    var account = req.body.account;
    var captcha = req.body.captcha;

    //check account is empty or null
    if(!account){       
        console.error('account is empty')
        res.send({ retcode : 2 })
        return
    }

    //check captcha is empty or null
    if(!captcha){       
        console.error('captcha is empty')
        res.send({ retcode : 3 })
        return
    }

    //get user account
    ms.account_mgr.get_userid(account, function(err, userid){
        if(err !=0 ){
            res.send({ retcode : err })  
            return
        }         
        
        ms.account_mgr.get_mobile(account, function(err, mobile){
            if(err != 0){
                if(err == 2)
                    res.send({ retcode : 3 })
                else
                    res.send({ retcode : err })
                return
            }

            ms.sms_check.check(mobile, 'kf_lock', captcha, function(result){
                if(result != 0){
                    res.send({ retcode : 4 })
                    return
                }    

                ms.account_mgr.lock_account(userid, account, function(err){
                    if(err !=0 ){
                        res.send({ retcode : err })  
                        return
                    }

                    ms.account_mgr.lock_gameaccount(userid, account, function(result){

                        var isok = result == 0;
                        ms.log_mgr.add_lockgameaccountlog(userid, account, 27, isok) 

                        ms.account_mgr.get_useractivationinfo(userid,function(e,r){
                            if(r.length>0){
                                if(r[0].serviceConverse==0){
                                ms.account_mgr.updateusersactivation(userid,2,function(result){})
                                }
                            }else{
                                ms.account_mgr.get_userinfo(account,false,function(err,row){
                                if(row[0].IsConverseActivation==0){
                                    ms.account_mgr.add_usersactivation(userid,2,function(result){})  
                                }
                                })
                            }
                            
                        })

                        if(isok){
                            var ip = ms.u2.get_req_ip(req)
                            ms.log_mgr.add_lockoperatelog(0,' ', ip, userid, account, '用户通过平台锁定账号', 27)

                            offline_role(res, userid, account)

                            ms.sms_check.update(mobile, captcha, function(result){}) 
                        }                    
                    })   
                })                            
            })            
        })            
    })    
}

//--------------------------------------------------------------------------------------------------------

function offline_role(res, userid, account){
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
}
//--------------------------------------------------------------------------------------------------------