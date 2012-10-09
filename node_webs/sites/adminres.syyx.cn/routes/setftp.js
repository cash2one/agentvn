var upload = require("./upload")

exports.action = function (req, res) {

    function str_to_num(str) {
        str_in      = escape(str);
        var num_out = ""
        for(j = 0; j < str_in.length; j++) {
            num_out += str_in.charCodeAt(j) - 23;
        }
        return num_out
    }

    var su = req.session.user
    if(su && su["RES_SETFTP"]){
        var con = req.body.con
        if(!con){
            res.send("无值")
            return
        }
        var arr_con    = con.split("\n")
        var len        = arr_con.length
        arr_con.length = len - 1
        for(var i = 0; i < len - 1; i++) {
            arr_con[i]    = arr_con[i].split(",")
            if(!/encrypt/.test(arr_con[i][4]) && arr_con[i][4] !== "") {
                arr_con[i][4] = "encrypt" + str_to_num(arr_con[i][4])
            }            
            arr_con[i]    = arr_con[i].join(",")
            
        }
        arr_con = arr_con.join("\n")

        var con     = "domain,path,ip,user,pass\n" + arr_con
        var fd      = process.env.HOME + "/admin_res/ftp.csv"

        ms.fs.writeFile(fd,con, function(){
            upload.getfetinfo()
            res.send("提交成功")
        })
        
    }
    else{
        res.send("登录超时或没有权限！")
    }
}