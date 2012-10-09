//--------------------------------------------------------------------------------------------------------
// kf_lock_confirm.js
//--------------------------------------------------------------------------------------------------------
/*
请求:
    参数：
        account
        captcha
    示例：
        http://functions.syyx.com/kf_unlock_confirm?account=abcd&captcha=1234

响应:
    {
        retcode : 0
    }
    0: 成功
    1：系统异常
    2：账号不存在
    3：未绑定手机
    4：验证码错误
    5：帐号未封停
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

            ms.sms_check.check(mobile, 'kf_unlock', captcha, function(result){
                if(result != 0){
                    res.send({ retcode : 4 })
                    return
                }

                ms.account_mgr.check_lockaccount(userid, function(err, result){
                    if(err != 0){
                        res.send({ retcode : err})
                        return
                    }

                    //no lock or not self lock
                    if(result == 1){
                        res.send({ retcode : 5})                    
                        return
                    }
                
                    ms.account_mgr.unlock_account(userid, function(err){
                        if(err !=0 ){
                            res.send({ retcode : err })  
                            return
                        }
                        //lock time exprie and delete the record
                        if(result == 2){
                            res.send({ retcode : 5})                    
                            return
                        }

                        ms.account_mgr.unlock_gameaccount(userid, account, function(result){
                            res.send({ retcode : result })  

                            var isok = result == 0;
                            ms.log_mgr.add_lockgameaccountlog(userid, account, 28, isok)
                            ms.account_mgr.get_useractivationinfo(userid,function(e,r){
                                if(r.length>0){
                                    if(r[0].serviceConverse==2){
                                        ms.account_mgr.updateusersactivation(userid,0,function(result){})
                                    }
                                }else{
                                    ms.account_mgr.add_usersactivation(userid,0,function(result){})
                                }
                            })
                            if(isok){
                                var ip = ms.u2.get_req_ip(req)
                                ms.log_mgr.add_lockoperatelog(0,' ', ip, userid, account, '用户通过平台解锁账号', 28)

                                ms.sms_check.update(mobile, captcha, function(result){})      
                            }
                        })     
                    })     
                })                           
            })            
        })            
    })    
}

//--------------------------------------------------------------------------------------------------------