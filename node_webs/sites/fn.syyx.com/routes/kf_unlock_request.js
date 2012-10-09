//--------------------------------------------------------------------------------------------------------
// kf_lock_request.js
//--------------------------------------------------------------------------------------------------------
/*
请求:
    参数：
        account
        password
        idcard
        mobilenumber
    示例：
        http://functions.syyx.com/kf_unlock_request?account=abcd&password=jfalsjdofowiejfoijwojf&idcard=1111111111&mobilenumber=13322111111

响应:
    {
        retcode : 0
    }
    0: 成功
    1：系统异常
    2：账号不存在
    3：手机号码格式错误
    4：手机号码与已绑定的手机号码不一致
    5: 未开启绑定解绑功能

    注：成功时会通过SMS给手机号码发送验证码（captcha）
*/
//--------------------------------------------------------------------------------------------------------

exports.action = function(req, res) {
    var account = req.body.account
    var mobile = req.body.mobilenumber

    //check account is empty or null
    if(!account){       
        console.error('account is empty')
        res.send({ retcode : 2 })
        return
    }

    //check mobile is empty or null
    if(!mobile){      
        console.error('mobile is empty')
        res.send({ retcode : 3 })
        return
    }

    //binding request
    ms.account_mgr.get_userid(account, function(err, userid){
        if(err!=0){
            res.send({ retcode : err })
            return
        }
        
        ms.account_mgr.check_mobile(account, mobile, function(result){            
            if (result != 0) {
                res.send({ retcode : 4 })
                return
            }

            ms.account_mgr.check_mobile_right(account, function(result, changepswd, selfhelp, nofitylogin){
                if(result !=0 ){
                    res.send({ retcode : 4 })
                    return
                }

                if(!selfhelp){
                    res.send({ retcode : 5 })
                    return
                }

                var ip = ms.u2.get_req_ip(req) 
                ms.sms_check.create(mobile, 'kf_unlock', ip, function(err, validatecode){
                    if(err !=0 ){
                        if(err = 2)
                            res.send({ retcode : 1 })
                        else
                            res.send({ retcode : result })
                        return
                    }

                    //send sms
                    var sp = req.app.sms_sp
                    if (!sp) {
                        console.error('no sms sp')
                        res.send({ retcode : result })
                        return
                    }

                    var date = ms.u2.date_to_ms_datetime(new Date(), 'tds')
                
                    var msg = '您好，您的账号'+ account +'在'+ date +'进行自助解封，验证码为：'+ validatecode +'。本信息免费'

                    ms.sms.send(sp, mobile, msg, function(err,result){
                        if (err) {
                            console.error(err)
                        }
                        res.send({retcode : 0})
                    })
                }) 
            })
        }) 
    })           
}
//--------------------------------------------------------------------------------------------------------