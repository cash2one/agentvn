var fs = require('fs')
var check_login = require('./login/check')

exports.action = function(req, res) {
    var form        = new ms.formidable.IncomingForm()
    var target_dir  = fs.readdirSync(req.app.dir + '/../r.syyx.com/public/')
    if (target_dir.indexOf('_att') == -1) {
        fs.mkdirSync(req.app.dir + '/../r.syyx.com/public/_att/')
    }

    var target_dir = fs.readdirSync(req.app.dir + '/../r.syyx.com/public/_att')
    if (target_dir.indexOf('adminnysj') == -1) {
        fs.mkdirSync(req.app.dir + '/../r.syyx.com/public/_att/adminnysj/')
    }

    form.uploadDir  = req.app.dir + '/../r.syyx.com/public/_att/adminnysj/'
    var http_url    = 'http://r.syyx.com/_att/adminnysj/'
    
    form.parse(req, function(err, fields, files) {
        if (err) {
            res.send({ 
                error   : 1,
                message : '上传失败'
            })
            return
        }
        var file_name =  Date.now() + Math.floor(Math.random()*100) + '.' + files.imgFile.type.split('/')[1]
        fs.rename(files.imgFile.path, form.uploadDir + file_name, function() {
            check_login.check(req.cookies, function(is_login, account) {
                if (!is_login) {
                    res.send({ 
                        error   : 1,
                        message : '上传失败'
                    })
                    fs.unlink(form.uploadDir + file_name)
                    return
                }
                res.send({ 
                    url     : http_url + file_name,
                    error   : 0
                })
            })
        })   
    })
}