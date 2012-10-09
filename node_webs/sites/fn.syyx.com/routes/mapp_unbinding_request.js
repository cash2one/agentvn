//--------------------------------------------------------------------------------------------------------
// mapp_unbinding_request.js
//--------------------------------------------------------------------------------------------------------
/*
请求:
    参数：
        account
        appid
    示例：
        http://functions.syyx.com/mapp_unbinding_request?account=abcd&appid=54698721

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

            //unbinding account
            ms.account_mgr.unbinding_app(account, function(result){
                if(result !=0 ){
                    res.send({ retcode : result })
                    return
                }
                //add log
                ms.log_mgr.add_applog(account, appid, 2, "解除掌尚游绑定")

                //return retcode
                res.send({ retcode : result })
            })     
        })
    })
}
//--------------------------------------------------------------------------------------------------------

