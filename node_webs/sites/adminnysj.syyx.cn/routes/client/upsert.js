var db_clients      = require('../../db/clients')
var check_login     = require('../login/check')

exports.action = function (req, res) {
    check_login.after_login_do(req, res, function(req, res) {
        do_after_login(req, res)
    })
}

var do_after_login = function (req, res) {
    //更新客户端属性
    if (req.body.client_id) {
        var id         = req.body.client_id
        var doc        = {
            name         : req.body.name,
            link         : req.body.link.split('\r\n'),
            size         : req.body.size,
            version      : req.body.version,
            md5          : req.body.md5,
            modify_time  : new Date()
        } 
        db_clients.update_by_id(id, doc, function(err, result) {
            if (err) {
                res.send({ ok : 0 })
                return
            }

            res.send({ ok : 1 })
        }) 
    } else { //新增
        var doc        = {
            name         : req.body.name,
            link         : [],
            downloads    : 0,
            install      : 0,
            size         : '大小待添加',
            version      : '版本号待添加',
            md5          : 'md5待添加',
            created_time : new Date()
        } 
        db_clients.insert(doc, function(err, result) {
            if (err) {
                res.send({ ok : 0 })
                return
            }

            res.send({ ok : 1 })
        }) 
    }
}
