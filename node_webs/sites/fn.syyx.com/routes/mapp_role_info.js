//--------------------------------------------------------------------------------------------------------
// mapp_role_info.js
//--------------------------------------------------------------------------------------------------------
/*
请求:
    参数：
        account
        password
    示例：
        http://functions.syyx.com/mapp_role_info?account=abcd&password=ljsaldfjjwoiefiis

响应:
    {
        retcode : 0,
        roles : [
            {
            game    : '诺亚传说',
                server  : '曙光',
            id      : 4569874587125636,
                name    : '无敌麦兜',
        gender  : 'female',
                level   : 90,
                class   : '剑武士'
        },
            {
            game    : '诺亚传说',
                server  : '迷雾',
            id      : 1254698745858736,
                name    : '麦兜无敌',
        gender  : 'male',
                level   : 90,
                class   : '异能者'
        },
        ]
    }
    0: 成功
    1：系统异常
    2：账号不存在
    3：密码错误

    注：roles只有在成功时才有值
       roles是一个数组，数组长度根据具体数据情况确定
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

	//check password is empty or null
	if(!password){		
        console.error('password is empty')
        res.send({ retcode : 3 })
        return
	}

	//get roles    
     ms.account_mgr.get_userid(account, function(err, userid){
        if(err!=0){
            res.send({ retcode : err })
            return
        }

        ms.account_mgr.get_roles(account, function(err, roles){
            if(err!=0){
                res.send(err)
                return
            }

            res.send({retcode : 0, roles : roles})
        })   
    })  
}
//-------------------------------------------------------------------------------------------------------