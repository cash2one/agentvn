exports.action = function(req, res) {
    var su = req.session.user
    if (su && su["RES_SETFTP"]) {
        var ftpBD = ms.csv().fromPath(process.env.HOME + "/admin_res/ftp.csv")
        var con   = ""
        ftpBD.on('data', function(data, index) {
            if (index <= 0 || !data[0]) {
                return
            }
            if(data[4] == undefined) {
                data[4] = ""
            }
            con += "<tr><td><input type='text' value='" + data[0] + "'/></td><td><input type='text' value='" + data[1] + "'/></td><td><input type='text' value='" + data[2] + "'/></td><td><input type='text' value='" + data[3] + "'/></td><td><input type='password' value='" + data[4] + "'/></td><td><em onclick='del($(this))'>删除</em></td></tr>"
        })
        ftpBD.on('end', function(count) {
            res.send({con: con, name: su.name})
        })
    }
    else {
        res.send({con: "", name: ""})
    }
}