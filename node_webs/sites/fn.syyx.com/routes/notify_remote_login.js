//--------------------------------------------------------------------------------------------------------
// notify_remote_login.js
//--------------------------------------------------------------------------------------------------------
/*
请求:http://functions.syyx.com/notify_remote_login?account=1&mobilenumber=2&logintime=3
    参数：
        account
        mobilenumber
    示例：
        http://functions.syyx.com/notify_remote_login?account=abcd&logintime=2012-6-1 10:00:00

响应:
    {
        retcode : 0
    }
    0: 成功
    1：系统异常
    2：账号不存在
    3：账号未绑定手机手机号码

    注：成功时会通过SMS给手机号码发送信息
*/
//--------------------------------------------------------------------------------------------------------

exports.action = function(req, res) {
    var account = req.body.account
    var logintime = req.body.logintime

    //check account is empty or null
    if(!account){       
        console.error('account is empty')
        res.send({ retcode : 2 })
        return
    }


    //check userinfo
     ms.account_mgr.get_userid(account, function(err, userid){
        if(err!=0){
            res.send({ retcode : err })
            return
        }
        
        ms.account_mgr.get_mobile(account, function(err, mobile){
            if(err != 0){
                if (err == 2) 
                    res.send({ retcode : 3 })  //no binding mobile
                else
                    res.send({ retcode : err }) //system error
                return
            }
            
            ms.account_mgr.check_mobile_right(account, function(result, changepswd, selfhelp, nofitylogin){
                if(result !=0 ){
                    res.send({ retcode : 3 })
                    return
                }

                if(!nofitylogin){
                    res.send({ retcode : 4 })
                    return
                }

                //send sms
                var sp = req.app.sms_sp
                if (!sp) {
                    console.error('no sms sp')
                    res.send({ retcode : result })
                    return
                }

                var login_time = ms.u2.date_to_ms_datetime(new Date(logintime*1000), 'tds')
                
                var msg = '您的账号' + account + '于' + login_time + '在异地登陆，如非本人操作，请尽快联系客服或登陆客服中心，' 
                        + '通过自助服务中的自助封停解封功能将账号保护性封停。客服中心电话400-166-8666。本信息免费'

                ms.sms.send(sp, mobile, msg, function(err,result){
                    if (err) {
                        console.error(err)
                    }
                    res.send({retcode : 0})
                })      
            })  
        })
    })
}
//--------------------------------------------------------------------------------------------------------