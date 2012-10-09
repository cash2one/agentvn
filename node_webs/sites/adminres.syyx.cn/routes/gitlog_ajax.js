exports.action = function(req, res) {
    var su = req.session.user
    if (su && su["RES_SETFTP"]) {
        
        if(req.body.a == "rm"){

            ms.fs.writeFile(process.env.HOME + "/admin_res/git_log.csv","", function(){
                res.send({con : "删除成功"})
                return
            })

        }else{
            var ftpBD = ms.csv().fromPath(process.env.HOME + "/admin_res/git_log.csv")
            var con   = ""
            ftpBD.on('data', function(data, index) {
                if (index <= 0 || !data[0]) {
                    return
                }
                con += data[0] + "<br />"
            })
            ftpBD.on('end', function(count) {
                con = con.replace(/failed/g, "<font color='red'>failed</font>")
                res.send({con : con, name : su.name})
            })
        }

    }
    else {
        res.send({con: "", name: ""})
    }
}