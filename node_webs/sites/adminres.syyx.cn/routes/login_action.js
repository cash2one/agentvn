var auth = ["RES_UPLOAD", "RES_ALLLOG", "RES_SETFTP"]

function login(req, res) {
    req.session.user = {
        name       : "0",
        RES_UPLOAD : 0,
        RES_ALLLOG : 0,
        RES_SETFTP : 0
    }
    var name = req.body.name

    function check_auth(arg_auth, id, i) {
        var arg = {
            iUserID   : id,
            sPowerKey : arg_auth
        }

        ms.ws.admin.CheckUserPower(arg, function(err, result) {

            if (result.CheckUserPowerResult == "true") {
                req.session.user[arg_auth] = 1
            }

            if (i < auth.length - 1) {
                check_auth(auth[++i], id, i)
                return
            }

            var su = req.session.user
            if (su[auth[0]] == 1) {
                res.send("1")
                return
            }

            if (su[auth[1]] == 1) {
                res.send("2")
                return
            }

            if (su[auth[2]] == 1) {
                res.send("3")
                return
            }

            res.send("-1")
            delete req.session.user
        })
    }

    ms.ws.admin.LoginByToken({sAccount: name, sPassword: req.body.pass, sOpt: req.body.baojian}, function(err, result) {//webservices验证密码
        var r = result.LoginByTokenResult

        if (r > 0) {
            req.session.user.name = name;
            check_auth(auth[0], r, 0)
        }
        else {
            if (r == 0) {
                res.send("0")
            }
            else {
                res.send("-100")
            }

            delete req.session.user
        }
    })
}
//-------------------------------------------------------------------------------------------------------
exports.action  = login
exports.auth    = auth
//-------------------------------------------------------------------------------------------------------
