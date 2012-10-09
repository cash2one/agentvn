var fs = require('fs');

exports.action=function(req,res){
    var account   = req.body.account_name
    var password = req.body.password
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
            console.log(account, password, err)
            return
        }

        if(result.LoginResult == 'true'){
            set_session(req, res, 0)
            //添加登录状态
            add_loginstate(req, res,account, password)
            
        }
        else{
            set_session(req, res, 1)
            res.send({ type : 'failed', info : '用户名或密码错误'})
        }
    })
}

function add_loginstate(req, res,account, password){
    check_user_login(req, function(login, user_account, user_id) {
        if (login && user_account == account) {
            get_roles(account, res)
            return true
        }

        ms.account_mgr.user_login(account, password, function(e, r) {
            if (e) {
                get_roles(account, res)
                return false
            }

            var coo = ms.u2.set_cookies(res, "shangyoo2",r, { domain:".syyx.com", path: '/' })
            res.cookie._expires =  new Date((new Date()).getTime() + 1000*60*60*50)
            //console.log("check_role:")
            get_roles(account, res)
            return true
        })
    })
}
//-------------------------------------------------------------------------------------------------
function check_user_login(req, cb) {
    var user_info = ms.account_mgr.user_info(req.cookies)
    if (!user_info) {
        cb(false); return
    }

    ms.account_mgr.check_user_login(user_info, function(e, r) {
        if (e) {
            cb(false); return
        }
        cb(true, r.UserAccount, r.UserID)
    })
}
//-------------------------------------------------------------------------------------------------
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

var get_roles = function(account, res){
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
                res.send({ type : 'emailerr', info : email})
                return
            }

            //获取角色信息
            get_Role_by_ByuserID(userid, function(ret) {
                if(ret == -1) {
                    return
                }

                if(!ret || ret.length == 0){
                    res.send({ type : 'failed', info : '您的账号没有建立角色的记录。'})
                }
                else{
                    //发送邮件
                    send_email_roles(account, ret, email, res)
                }
            })
        }
    })
}

//发送邮件
var send_email_roles=function(account, rows, email, res){
    var send_content = "<div>您创建过的角色信息是：</div>"
    send_content += "<table width='99%' border='0 cellpadding='0' cellspacing='0' class='table_role'>"
    send_content += "<tr><td>服务器</td><td>角色名</td><td>性别</td><td>职业</td></tr>"
    for(var i = 0; i < rows.length; i++){
        send_content += "<tr><td>"
        send_content += rows[i]["Title"]
        send_content += "</td><td>"
        send_content += rows[i]["PlayerName"]
        send_content += "</td><td>"
        send_content += rows[i]["Sex"]
        send_content += "</td><td>"
        send_content += rows[i]["Job"]
        send_content += "</td>"
        send_content += "</tr>"
    }
    send_content += "</table>"

    //读取模板 
    var file_path = process.env.HOME + '/code/node_webs/sites/party.syyx.com/config/getrolelist.htm'

    var readfile  = fs.readFileSync(file_path, 'utf8')
    readfile = readfile.replace('[#UserAccount]', account, true)
    readfile = readfile.replace('[#UserAccount]', account, true)
    var date_type
    if(ms.dbs == ms.db_tds) {
        date_type = "tds"
    }
    else {
        date_type = "odbc"
    }
    readfile = readfile.replace('[#DateNOW]', ms.u2.date_to_ms_datetime(new Date(), date_type))
    readfile = readfile.replace('[#RoleList]', send_content)
    

    get_SystemPara('SmtpServer',function(err,ParaValue){
        var SmtpServer = ParaValue
        if(err){
            return false
        }
        get_SystemPara('SmtpPort',function(err,ParaValue){
            if(err){
                return false
            }
            var SmtpPort = ParaValue
            get_SystemPara('SmtpUserName',function(err,ParaValue){
                if(err){
                    return false
                }
                var SmtpUserName = ParaValue
                get_SystemPara('SmtpPassword',function(err,ParaValue){
                    if(err){
                        return false
                    }
                    var SmtpPassword = ParaValue
                    get_SystemPara('SmtpEmailFrom',function(err,ParaValue){
                        if(err){
                            return false
                        }
                        var SmtpEmailFrom = ParaValue
                        get_SystemPara('EnableSSL',function(err,ParaValue){
                            if(err){
                                return false
                            }
                            var EnableSSL = ParaValue
                            var sendmail = ms.email.create_sender(SmtpServer,parseInt(SmtpPort),EnableSSL=="True",SmtpUserName,SmtpPassword)
                            sendmail.send(SmtpEmailFrom,email,'角色所在服务器查询信息',{html : readfile},[],function(error, response){
                                if(error){
                                    return false
                                }
                                else{
                                    //res.send({ type : 'ok', info :'<div class="tip_okinfo">角色信息已发送到您的验证邮箱，<a target="_blank" style="display:inline;" href=' + get_mail_site(email) + '>请点此登录查询</a>。</div><div class="font_sizeandcolor">没收到角色信息邮件？ </br></br>    • 请查看是否被误发到垃圾邮件箱里。</br></br>• 如果3分钟后您的邮箱还未收到邮件，请点击<a style="display:inline;" href="index.html">刷新</a>重新查询。</div>' })    
                                    res.send({type : 'ok', info : email})
                                    return true
                                }
                            })
                        })
                    })
                })
            })
        })
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
    var db =  ms.db.mssql["ShangYoo_Dict"]
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
    var db =  ms.db.mssql["ShangYoo_User"]
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
    var sp_name = "cp_ServerUser_GetRecordListByuserID"

    var args    = {"@userID":userid}

    db.exec_sp(sp_name, args, function(err, rows, output_params, ret_value) {
        if (err) {
            console.error(err)
            cb(-1)
            return
        }

        cb(rows)
    })
}

