var fs = require('fs');

exports.action=function(req,res){
    var account   = req.body.account_name
    var password = req.body.password
    var rolename = req.body.rolename
    var client_ip = ms.u2.get_req_ip(req)

    if(req.body.validate_pic){
        req.body.validate_pic = req.body.validate_pic.toLocaleLowerCase() 
    }

    if(req.session.check_server >= 5){
        
        res.send({ type : 'failed', info : '登录密码连续输错≥5次，请3小时后重新登录或找回登录密码' })
        return
    }

    if(!req.body.validate_pic){
        res.send({ type : 'failed', info : '请输入验证码' })
    }

    var ret = _G_check_request_data(req, input_checks)
    if (ret) {
        for (var k in ret) {
            ms.u.log(ms.u.format('[%s] [%s] login check failed: (%s, %s)', account, client_ip, k, ret[k]))
            if(k == 'validate_pic') {
                res.send({ type : 'failed', info : '验证码错误' })
                return 
            }
        }
        
        res.send({ type : 'failed', info : '填写内容验证失败' })
        return
    }

    ms.ws['user']['Login']({'sUserAccount':account,'sPassword':password},function(err, result){
        if (err) {
            res.send({ type : 'failed', info : '登录失败' })
            return
        }

        if(result.LoginResult == 'true'){
            set_session(req, res, 0)
            get_roles(account, rolename, res)
        }
        else{
            set_session(req, res, 1)
            res.send({ type : 'failed', info : '用户名或密码错误'})
        }
    })  
}

function set_session(req, res, ifadd){
    // req.session.cookie._expires =  new Date((new Date()).getTime() + 1)
    req.session.cookie.maxAge =  1000 * 60 * 60 * 3
    if(!req.session.check_server){
        req.session.check_server =  1
    }
    else{
        req.session.check_server = req.session.check_server + 1
    }

    if(ifadd == 0){
        req.session.check_server = 0
    }
    
    res.header('P3P', 'CP="CAO PSA OUR"')
}


var get_roles = function(account, rolename, res){
    var userid = 0
    //获取用户信息
    get_record_by_account(account,true,function(ret){
        if(ret == -1) {
            res.send({ type : 'failed', info :'获取数据失败' })
            return
        }

        if(!ret){
            res.send({ type : 'failed', info : '账号不存在。'})
        }
        else{
            userid = ret["ID"]
            var IsEmailOk = ret["IsEmailOk"]
            var email = ret["Email"]
            if(!IsEmailOk){
                //res.send({ type : 'failed', info :'<div  class="tip_userinfo">为了保护您的角色信息安全，请先进行<a style="display:inline;" target="blank" href="http://user.syyx.com/email/sendvalidateemail.aspx">邮箱验证</a>，角色查询结果将发送到您的验证邮箱中，谢谢。</div>' })
                //res.send({ type : 'emailerr', info : email})
                //return
            }

            //获取角色信息
            get_Role_by_ByuserID(userid, function(ret) {
                if(ret == -1) {
                    return
                }

                if(!ret){
                    res.send({ type : 'failed', info : '您的账号没有建立角色的记录。'})
                }

                //查询服务器
                for(var i = 0; i < ret.length; i++){
                    if(ret[i]["PlayerName"] == rolename){
                        res.send({ 
                            type : 'ok', 
                            info : { 
                                servername : ret[i]["Title"], 
                                roletype : ret[i]["Job"], 
                                sex : ret[i]["Sex"]
                            }
                        })
                        return
                    }
                }

                res.send({ type : 'failed', info : '角色名不存在。'})
            })
        }
    })
}

//--------------------------------------------------------------------------------------------------------
var input_checks = {
    account_name     : {
        checks : [
            { type : 'empty', err_info : false },
            { type : 'length', min : 6, max : 16, err_info : false },
            { type : 'regex', value : /^[A-Za-z0-9_]{6,16}$/, err_info : false }
        ],
    },

    password         : {
        checks : [
            { type : 'empty', err_info : false },
            { type : 'length', min : 6, max : 16, err_info : false } ,
            { type : 'regex', value : /^[^\s]{6,16}$/, err_info : false }
        ]
    },
    
    validate_pic     : {
        checks : [
            { type : 'empty', err_info : false },
            { type : 'equal', side : 'session', value : 'captcha', err_info : false }
        ]
    }

}


function get_SystemPara(sKey, cb){
    var db = ms.db.mssql["ShangYoo_Dict"]
    var sp_name = "cp_SystemPara_GetValue"
    var args = {
        "@ParaKey" : sKey
    }

    db.exec_sp(sp_name, args, function(err, rows, output, ret) {
        if (output) {
            var ParaValue = output['@ParaValue']
            if (!ParaValue) {
                cb('error: no value')
            }
            else {
                cb(null, ParaValue)
            }

            return
        }
        console.log(err)
        cb(err)
    })
}


//获取用户信息
function get_record_by_account(account, IsGetInfo, cb) { 
    var db = ms.db.mssql["ShangYoo_User"]
    var sp_name = "cp_Users_GetRecordInfoByName"

    var args    = {"@UserAccount":account,"@IsGetInfo":IsGetInfo}

    db.exec_sp(sp_name, args, function(err, rows, output_params, ret_value) {
        if (err) {
            cb(-1)
            return
        }

        if(!rows){
            cb(-1)
        }
        else{
            cb(rows[0])    
        }
        return
    })
}

//获取用户角色信息
function get_Role_by_ByuserID(userid, cb) {
    var db = ms.db.mssql["ShangYoo_GameUser"]
    var sp_name = "cp_ServerUser_GetRecordListByuserIDTIME"

    var args    = {"@userID":userid}

    db.exec_sp( sp_name, args, function(err, rows, output_params, ret_value) {
        if (err) {
            console.error(err)
            cb(-1)
            return
        }

        cb(rows)
    })
}

