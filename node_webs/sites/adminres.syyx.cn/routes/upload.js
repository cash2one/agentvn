//-ftp.csv信息读入到内存------------------------------------------------------------------------------
var ftp_csv_con = {}

exports.getfetinfo = function () {
    function num_to_str(num) {
        str_out = "";
        for(i = 0; i < num.length; i += 2) {
            num_in  =  parseInt(num.substr(i,[2])) + 23;
            num_in  =  unescape('%' + num_in.toString(16));
            str_out += num_in;
        }
        return unescape(str_out);
    }

    var ftpDB   = ms.csv().fromPath(process.env.HOME + "/admin_res/ftp.csv")

    ftpDB.on('data', function(data, index) {
        if (index <= 0 || !data[0]) {
            return
        }
        if(!data[4]) {
            data[4] = ""
        } else {
            data[4] = num_to_str(data[4].replace(/encrypt/, ""))
        }
        ftp_csv_con[data[0]] = {
            root : data[1],
            ip   : data[2],
            user : data[3],
            pass : data[4]
        }
    })

}

exports.getfetinfo();

//-获取版本库位置------------------------------------------------------------------------------------------
var repository = ""
ms.fs.readFile(process.env.HOME + "/admin_res/repository.csv", function(err, data) {
    repository = process.env.HOME + data.toString().replace(/\n/g, "")
})
//---------------------------------------------------------------------------------------------------------

var replace_queue = {}

exports.action = function(req, res) {
    var su               = req.session.user
    var file_fullName    = req.body.file
    var active           = req.body.active
    var operation_page   = req.body.host
    var replace_time     = req.body.retime

    function upload() {

        var file_host = file_fullName.substring(0, file_fullName.indexOf("/"))
        if(ftp_csv_con[file_host]) {
            var upload_time = (new Date()).getTime()
            var form        = new ms.formidable.IncomingForm();
            form.uploadDir  = process.env.HOME + "/admin_res/tmp/";

            form.parse(req, function(err, fields, files) {

                if (err) {
                    res.send("err")
                    return
                }

                ms.fs.rename(files.upload.path, process.env.HOME + "/admin_res/upload/" + upload_time + encodeURIComponent(file_fullName));

                ms.persistence.save("adminres_uploadLog", {
                    name          : su.name,
                    operation_page: operation_page,
                    file_fullName : file_fullName,
                    upload_time   : upload_time,
                    replace_time  : (replace_time) ? replace_time : 0 ,
                    status        : 0
                })

                if(replace_time){
                    replace_queue['d' + upload_time] = setTimeout(function() {ftp_put(file_fullName, upload_time, res, "istimeout")}, replace_time - upload_time)
                    res.send("定时成功")
                }else {
                    ftp_put(file_fullName, upload_time, res)
                }

            });
        }else {
            res.send("没有权限")
        }
    }

    function cancel_upload(active) {
        var ObjectID = ms.persistence.ObjectID(active)
        ms.persistence.findOne("adminres_uploadLog", {_id : ObjectID}, {}, function(err, doc){
            if(doc.status == 0){
                clearTimeout(replace_queue["d" + doc.upload_time])
                delete replace_queue["d" + doc.upload_time]

                ms.persistence.update("adminres_uploadLog", {_id : ObjectID}, {status : "被取消"})

                ms.fs.unlink(process.env.HOME + "/admin_res/upload/" + doc.upload_time + encodeURIComponent(doc.file_fullName), function(){
                    res.send("取消成功")
                })
            }else{
                res.send("文件已经替换，无法取消")
            }

        })
    }

    if (su && su["RES_UPLOAD"]) {

        if (active == "set") {
            upload();
        }
        else {
            cancel_upload(active);
        }

    }
    else {
        res.send("登录超时。请重新登录！")
    }
}

//-当前定时数据读入。------------------------------------------------------------------------------------

setTimeout(function() {
    ms.persistence.find("adminres_uploadLog", {status : 0}, {}, function(err, doc) {
        var len = doc.length
        for(var i = 0; i < len; i++){
            var timeout = doc[i].replace_time <= (new Date()).getTime() ? 0 : doc[i].replace_time - (new Date()).getTime()
            var file    = doc[i].file_fullName
            var time    = doc[i].upload_time
            if(timeout == 0) {
                ftp_put(file, time)
            } else {
                replace_queue["d" + time] = setTimeout(function(){ftp_put(file, time, null, "istimeout")}, timeout)
            }
        }
    })
}, 5000)

//-ftp校验以及上传---------------------------------------------------------------------------------------

function ftp_put(file_fullName, upload_time, res, status) {

    var file_host   = file_fullName.substring(0, file_fullName.indexOf("/"))
    var upload_file = process.env.HOME + "/admin_res/upload/" + upload_time + encodeURIComponent(file_fullName)

    var str_cwd     = file_fullName.substring(file_fullName.indexOf("/") + 1, file_fullName.lastIndexOf("/"))

    if(/\//.test(str_cwd)) {
        var cwd     = str_cwd.split("/")
        var tier    = cwd.length
    }

    var conn = new ms.ftp({
        host        : ftp_csv_con[file_host].ip,
        connTimeout : 30000
    });

    if(status == "istimeout"){
        delete replace_queue['d' + upload_time]
    }

    ms.fs.stat(upload_file, function(err, stats) {
        if(!err && stats.isFile()) {//文件存在
            put_active()
        } else {
            ms.persistence.update("adminres_uploadLog", {file_fullName : file_fullName, upload_time : upload_time}, {status : "文件丢失"})

            if(res) {
                res.send("file err")
            }
            return
        }
    })


    var ftp = {
        auth : function() {
            conn.auth(ftp_csv_con[file_host].user, ftp_csv_con[file_host].pass, function(e) {
                if(e) {
                    conn.end();
                    console.log(e)
                    ms.persistence.update("adminres_uploadLog", {file_fullName : file_fullName, upload_time : upload_time}, {status : "连接FTP错误"})
                    if(res) {
                        res.send("auth err")
                    }
                    return
                }

                if(cwd) {
                    ftp.mkdir(0)
                } else {
                    ftp.put()
                }
            })
        },

        mkdir : function(i) {
            conn.mkdir(cwd[i], function(e) {
                ftp.cwd(i)
            })
        },

        cwd : function(i) {
            if(i >= tier) {
                ftp.put()
                return
            }

            conn.cwd(cwd[i], function(e) {
                if(e) {
                    conn.end();
                    console.log(e)
                    ms.persistence.update("adminres_uploadLog", {file_fullName : file_fullName, upload_time : upload_time}, {status : "FTP目录错误"})
                    if(res) {
                        res.send("cwd err")
                    }
                    return
                }
                ftp.mkdir(++i)
            })
        },

        put : function() {

            //ms.fs.stat(upload_file, function(err, stats) {
                //if(!err && stats.isFile()) { //文件存在
                    conn.put(ms.fs.createReadStream(upload_file), file_fullName.substring(file_fullName.lastIndexOf("/") + 1), function(e) {
                        conn.end();
                        if(e) {
                            ms.persistence.update("adminres_uploadLog", {file_fullName : file_fullName, upload_time : upload_time}, {status : "PUT失败"})

                            if(res) {
                                res.send("put err")
                            }
                            return
                        }
                        repository_action()
                    })
                //} else {
                 //   conn.end();
                 //   ms.persistence.update("adminres_uploadLog", {file_fullName : file_fullName, upload_time : upload_time}, {status : "文件丢失"})

                 //   if(res) {
                  //      res.send("file err")
                 //   }
                 //   return
                //}
            //})
        }
    }

    function repository_action() { //版本库替换
        var exec = require('child_process').exec
        exec('git pull', {cwd : repository}, function(error, stdout, stderr) {//新增pull功能
            if (error) {
                ms.persistence.update("adminres_uploadLog", {file_fullName : file_fullName, upload_time : upload_time}, {status : "Pull错误"})
                return
            }
            ms.fs.rename(upload_file, process.env.HOME + ftp_csv_con[file_host].root + file_fullName.substring(file_fullName.indexOf("/") + 1), function(err) {
                if (err) {
                    ms.persistence.update("adminres_uploadLog", {file_fullName : file_fullName, upload_time : upload_time}, {status : "版本库错误"})
                    if(res) {
                        res.send("repository err")
                    }
                    return
                }

                ms.persistence.update("adminres_uploadLog", {file_fullName : file_fullName, upload_time : upload_time}, {status : "替换成功"})

                if(res) {
                    res.send("替换成功")
                }
                return
            })
        })
    }

    function put_active() {//判断上传方式
        if( ftp_csv_con[file_host].ip == "" || !/\./g.test(ftp_csv_con[file_host].ip) ) {

            var rOption = {
                flags    : 'r',
                encoding : null,
                mode     : 0666
            }
            var wOption = {
                flags    : 'a',
                encoding : null,
                mode     : 0666
            }



            var real_path = __dirname + '/../../' + file_host + "/_public/"
            var real_file = real_path + str_cwd + file_fullName.substring(file_fullName.lastIndexOf("/"))

            function isdir(i) {
                if(i >= tier) {
                    put_file ()
                    return
                }
                var arr_dir = cwd.slice(0, i + 1)
                var dir = real_path + arr_dir.join("/")

                ms.fs.readdir(dir, function(err, files) {
                    if(files == undefined) {
                        mkdir(i, dir)
                    }else {
                        isdir(++i)
                    }
                })
            }

            function mkdir(i, dir) {

                ms.fs.mkdir(dir, function(err) {
                    isdir(++i)
                })
            }

            isdir(0)

            function put_file () {
                ms.fs.unlink(real_file, function() {

                    var fileReadStream  = ms.fs.createReadStream(upload_file, rOption);
                    var fileWriteStream = ms.fs.createWriteStream(real_file, wOption);

                    fileReadStream.on('error',function(data){
                        if(err) {
                            console.log(err);
                            ms.persistence.update("adminres_uploadLog", {file_fullName : file_fullName, upload_time : upload_time}, {status : "文件丢失"})
                            if(res) {
                                res.send("file err")
                            }
                            return
                        }
                    });

                    fileReadStream.on('data',function(data){
                        fileWriteStream.write(data);
                    });

                    fileReadStream.on('end',function(){
                        fileWriteStream.end();
                        repository_action()
                    });
                })
            }

        } else {
            conn.on('connect', function() {
                ftp.auth()
            });
            conn.connect();
        }
    }

}

/*conn.auth(ftp_csv_con[file_host].user, ftp_csv_con[file_host].pass, function(e) {
    if(e) {
        conn.end();
        ms.persistence.update("adminres_uploadLog", {file_fullName : file_fullName, upload_time : upload_time}, {status : "连接FTP错误"})
        if(res) {
            res.send("auth err")
        }
        return
    }

    conn.cwd(cwd, function(e) {
        if(e) {
            conn.end();
            ms.persistence.update("adminres_uploadLog", {file_fullName : file_fullName, upload_time : upload_time}, {status : "FTP目录错误"})
            if(res) {
                res.send("cwd err")
            }
            return
        };
        conn.put(ms.fs.createReadStream(upload_file), file_fullName.substring(file_fullName.lastIndexOf("/") + 1) , function(e) {
            if(e) {
                conn.end();
                ms.persistence.update("adminres_uploadLog", {file_fullName : file_fullName, upload_time : upload_time}, {status : "PUT失败"})
                if(res) {
                    res.send("put err")
                }
                return
            }
            conn.end();



        });
    })
});*/
