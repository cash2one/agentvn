exports.action = function(req, res) {
    var name = req.session.name
    if (name) {
        var file            = req.body.file;
        var refile          = req.body.refile
        var host            = file.substring(0, file.indexOf("/")) 
        var path            = file.substring(file.indexOf("/"), file.lastIndexOf("/")) // eg:/images or ""
        var filename        = file.substring(file.lastIndexOf("/") + 1) //eg:123.jpg
        var rebackupFile    = __dirname + "/../public" + refile;
        var conn
        var ftp             = 0;
        var ftpDB           = ms.csv().fromPath(__dirname + "/../data/ftp.csv") ftpDB.on('data',
        function(data, index) {
            if (index <= 0 || !data[0]) {
                return
            }
            if (data[0] == host) {
                ftp = {
                    domain: host,
                    ip: data[1],
                    root: data[2],
                    user: data[3],
                    pass: data[4]
                }
            }
        }) ftpDB.on('end', function(count) {
            if (ftp == 0) {
                res.send("FTP错误")
            } else {
                var cwd = (ftp.root == "/") ? path.replace(/^\//, "") : ftp.root + path
                conn = new ms.ftp({
                    host: ftp.ip,
                    connTimeout: 30000
                });
                conn.on('connect', function() {
                    conn.auth(ftp.user, ftp.pass,
                    function(e) {
                        if (e) {
                            res.send("链接失败")
                        }
                        conn.cwd(cwd, function(e) {
                            if (e) {
                                res.send("无效目录")
                            };
                            conn.put(ms.fs.createReadStream(rebackupFile), filename, function(e) {
                                if (e) {
                                    res.send("替换失败")
                                }
                                conn.end();
                                var fd = __dirname + "/../data/backup.csv"
                                ms.fs.readFile(fd, function(err, data) {
                                    var newexp  = RegExp("hh," + refile.substring(14)) 
                                    var data    = data.toString().replace(newexp, "\n").replace(/\n\n.*?\n/, "\n") 
                                    ms.fs.writeFile(fd, data, function() {
                                        res.send("恢复成功")
                                    })
                                })
                            });
                        })
                    });
                });
                conn.connect();
            }
        })
    } else {
        res.send("登录超时。请重新登录！")
    }
}