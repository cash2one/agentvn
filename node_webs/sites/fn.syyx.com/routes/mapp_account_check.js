//--------------------------------------------------------------------------------------------------------
// mapp_account_check.js
//--------------------------------------------------------------------------------------------------------
/*
请求:
    参数：
        account
        password
    示例：
        http://functions.syyx.com/mapp_account_check?account=abcd&password=jfalsjdofowiejfoijwojf

响应:
    {
        retcode : 0
    }
    0: 成功
    1：系统异常
    2：账号不存在
    3：密码错误
*/
//--------------------------------------------------------------------------------------------------------
exports.action = function(req, res) {
	var account = req.body.account;
	var password = req.body.password;

	//check account is empty or null
	if (!account){		
        console.error('account is empty')
        res.send({ retcode : 2 })
        return
	}

	//check password is empty or null
	if (!password) {		
        console.error('password is empty')
        res.send({ retcode : 3 })
        return
	}

	//check user account
    ms.account_mgr.check_userlogin(account, password, function(result){
        res.send({ retcode : result })
    }) 
}

//--------------------------------------------------------------------------------------------------------
