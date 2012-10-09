//--------------------------------------------------------------------------------------------------------
// mapp_account_check.js
//--------------------------------------------------------------------------------------------------------
/*
请求:
    参数：
        account
        password
        idcard
        mobilenumber
    示例：
        http://functions.syyx.com/mapp_binding_request?account=abcd&password=jfalsjdofowiejfoijwojf&idcard=1111111111&mobilenumber=13322111111

响应:
    {
        retcode : 0
    }
    0: 成功
    1：系统异常
    2：账号不存在
    3：密码错误
    4：身份证错误
    5：手机号码格式错误
    6：手机号码与已绑定的手机号码不一致    

    注：成功时会通过SMS给手机号码发送验证码（captcha）
*/
//--------------------------------------------------------------------------------------------------------

exports.action = function(req, res) {
	var account = req.body.account
	var password = req.body.password
    var idcard = req.body.idcard
    var mobile = req.body.mobilenumber

	//check account is empty or null
	if(!account){		
        console.error('account is empty')
        res.send({ retcode : 2 })
        return
	}

	//check password is empty or null
	if(!password){		
        console.error('password is empty')
        res.send({ retcode : 3 })
        return
	}

    //check idcard is empty or null
    if(!idcard){      
        console.error('idcard is empty')
        res.send({ retcode : 4 })
        return
    }

    //check mobile is empty or null
    if(!mobile){      
        console.error('mobile is empty')
        res.send({ retcode : 5 })
        return
    }

	//binding request
    ms.account_mgr.get_userinfo(account, true, function(err, rows){
        if(err !=0 ){
            res.send({ retcode : err })  
            return
        }


        if(rows[0].Password != password){
            console.error('password is error')
            res.send({ retcode : 3 })  
            return
        }

        if(rows[0].CardID != idcard){
            console.error('idcard is error')
            res.send({ retcode : 4 })  
            return
        }

        ms.account_mgr.check_mobile(account, mobile, function(result){            
            if (result != 0) {
                if(result !=2){
                    res.send({ retcode : 6 })
                    return    
                }
            }

            var ip = ms.u2.get_req_ip(req) 
            ms.sms_check.create(mobile, 'bindingapp', ip, function(err, validatecode){
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

                ms.sms.send(sp, mobile, '您好，您的账号'+account+'进行掌尚游绑定，激活码为：'+validatecode+'。本信息免费。', function(err,result){
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