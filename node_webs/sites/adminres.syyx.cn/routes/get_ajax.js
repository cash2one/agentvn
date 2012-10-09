exports.action = function(req, res) {
    var su = req.session.user;
    if (su && su["RES_UPLOAD"]) {
        var record = ""
        var setftp = ""

        if (!su["RES_UPLOAD"]) {
            res.redirect("/login")
        }

        if (su["RES_ALLLOG"]) {
            record = '<a class="all" target="_blank" href="/mylog?active=all">全部记录</a>'
        }

        if (su["RES_SETFTP"]) {
            setftp = '<a class="all" target="_blank" href="/adminftp">FTP</a><a class="all" target="_blank" href="/gitlog">Git日志</a>'
        }

        res.send({
            time   : (new Date).getTime(),
            name   : su.name,
            record : record,
            ftp    : setftp
        })
    }
    else {

        res.send({
            time   : "",
            record : "",
            ftp    : ""
        })
        
    }
}