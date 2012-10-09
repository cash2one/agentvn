var db_stat = require('../../db/stat')

var guid            = ''
var from_url        = 'blank'
var dest_url        = 'blank'
var from_url_detail = 'blank'
var ip              = ''
var cookie_name     = 'nysj_stat'

exports.action = function (req, res) {
    from_url        = req.body.from_url
    dest_url        = req.body.dest_url
    from_url_detail = req.body.from_url_detail
    ip              = ms.u2.get_req_ip(req)

    if (req.cookies[cookie_name] !== 'undefined' && req.cookies[cookie_name] !== undefined && req.cookies[cookie_name] !== null) {
        db_stat.is_exist(req.cookies[cookie_name], function(err, result) {
            if (err) {
                console.log(err)
                res.send({ok : 0})
                return
            }
            if (result == null) {
                create(req, res)
            } else {
                guid = req.cookies[cookie_name]
                res.send({ ok : 1})
                save_to_data()
            }
        })
    } else {
        create(req, res)
    }
}

function create (req, res) {
    db_stat.create(function(err, result) {
        if (err) {
            res.send({ok : 0})
            return
        }
        res.cookie(cookie_name, result[0]._id, { path : '/', maxAge : 1000*60*60*1000000})
        guid = result[0]._id
        res.send({ ok : 1})
        save_to_data()
    })
}

function save_to_data() {
    var db      = ms.db.mssql['NYCSTime_Web']    
    var sp_name = 'cp_Cookie_VisitDetail_AddRecord'
    var args    = [ guid, from_url, dest_url, ip, from_url_detail ]
    
    db.exec_sp(sp_name, args, function(err, rows, output, ret) {
        if (err) {
            console.log(err)            
        }
    })
}