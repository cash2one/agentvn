//--------------------------------------------------------------------------------------------------------
// mapp_binding_confirm.js
//--------------------------------------------------------------------------------------------------------
/*
请求:
    参数：
        account
        captcha
    示例：
        http://functions.syyx.com/mapp_binding_confirm?account=abcd&mobilenumber=12345678&captcha=1234

响应:
    {
        retcode : 0,
        appid   : 54698721
    }
    0: 成功
    1：系统异常
    2：账号不存在
    3：验证码错误
    4：手机号码错误
    5：该手机已经绑定了5个了
    
    注：成功时才有appid字段，其它情况下没有此字段
*/
//--------------------------------------------------------------------------------------------------------

exports.action = function(req, res) {
	var account = req.body.account;
	var captcha = req.body.captcha;
    var mobile = req.body.mobilenumber

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

    ms.account_mgr.get_userid(account, function(err, userid){
        if(err!=0){
            res.send({ retcode : err })
            return
        }

    	//binding confirm
        ms.account_mgr.get_mobile(account, function(err, phone){            
            if (err == 1 ) {
                res.send({ retcode : 1 })  
                return              
            }

            if(err == 0 && mobile != phone){
                res.send({ retcode : 4 })  
                return 
            }

            ms.sms_check.check(mobile, 'bindingapp', captcha, function(result){
                if(result != 0){
                    res.send({ retcode : 3 })
                    return
                }

                set_usermobile(err, account, mobile, function(result){
                    if(result!=0){
                        res.send({ retcode : result }) 
                        return
                    }

                    ms.account_mgr.binding_userapp(account, function(err, appid){
                        if(err !=0 ){
                            res.send({ retcode : err })
                            return
                        }

                        //add log
                        ms.log_mgr.add_applog(account, appid, 1, "绑定掌尚游")

                        ms.sms_check.update(mobile, captcha, function(result){})   

                        res.send({retcode:err, appid:appid})            
                    })
                })           
            })            
        }) 
    })   
}

function set_usermobile(flag, account, mobile, cb){
    if(flag ==0 ){
        cb(0)
        return
    }
    else if(flag == 2){
        ms.account_mgr.add_usermobile(account, mobile, function(result){
            if(result == 1){
                cb(1)
                return
            }
            else if(result == 2){
                cb(5)
                return
            }
            cb(0)
        })
    }
}

//--------------------------------------------------------------------------------------------------------