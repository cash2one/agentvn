//--------------------------------------------------------------------------------------------------------
// mapp_account_status.js
//--------------------------------------------------------------------------------------------------------
/*
请求:
    参数：
        account
     示例：
        http://functions.syyx.com/mapp_account_status?account=abcd

响应:
    {
        retcode : 0,
        bindingstatus : 1,
        lockstatus    : 0,
        bindingnumber : '1234',
    }
    0: 成功
    1：系统异常
    2：账号不存在

    注：bindingstatus 
          0 未绑定
          1 已绑定
       lockstatus     
          0 未封停
          1 已封停
       bindingnumber
          只有在bindingstatus为1时才有值
*/
//--------------------------------------------------------------------------------------------------------
exports.action = function(req, res) {
	var account = req.body.account;
	var password = req.body.password;

	//check account is empty or null
	if(!account){		
        console.error('account is empty')
        res.send({ retcode : 2 })
        return
	}

	//get user status
    ms.account_mgr.get_userinfo(account, false, function(err, rows){
        if(err !=0 ){
            res.send({ retcode : err })  
            return
        }

        var lockstatus=0
        if(rows[0].IsDelete) lockstatus=1

        ms.account_mgr.get_mobile(account, function(err, mobile){
            if(err == 1 ){
                res.send({ retcode : 1 })  
                return
            }

            ms.account_mgr.check_appid(account, function(err, appid){
                var bindingstatus = err == 0? 1:0
                res.send({retcode : 0, bindingstatus : bindingstatus, lockstatus : lockstatus, bindingnumber : mobile})
            })            
        })
    }) 
}

//--------------------------------------------------------------------------------------------------------
