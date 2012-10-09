var repository = ""
ms.fs.readFile(process.env.HOME + "/admin_res/repository.csv", function(err, data) {
    repository = process.env.HOME + data.toString().replace(/\n/g, "")
})

// git 日志 --------------------------------------------------------------------------------------------------
function write_git_log(con) {

    ms.fs.open(process.env.HOME + "/admin_res/git_log.csv", 'a', 666, function(e, fd) {
        ms.fs.write(fd, con, null, 'utf8', function() {
            ms.fs.close(fd);
        });
    });
}
// git -------------------------------------------------------------------------------------------------------
var exec        = require('child_process').exec
var is_run_git  = false

var git         = {

    run_git : function(res) {
        if(res){
            if(is_run_git == true) {
                setTimeout(function() {git.run_git(res)}, 5000)
            }else{
                git.commit_master(res)
            }
        }else{
            if(is_run_git == true) {
                setTimeout(git.run_git, 5000)
            }else{
                git.commit_master()
            }
        }

    },

    commit_master : function(res) {
        is_run_git = true
        exec('git commit -am"adminres.syyx.cn"', { cwd : repository}, function(error, stdout, stderr) {
            write_git_log("\nGit - " + new Date())
            if(!res){
                setTimeout(git.run_git, 43200000) //12小时
            }
            if (stdout.indexOf("nothing to commit") > 1) {
                write_git_log(" | nothing to commit");
                is_run_git  = false
                if(res) {
                    res.send("ok")
                }
            }
            else {
                git.pull_master(res)
            }         
        })
    },

    pull_master : function(res) {
        exec('git pull', {cwd : repository}, function(error, stdout, stderr) {
            if (error) {
                write_git_log(" | pull failed")
                is_run_git  = false
                if(res) {
                    res.send("err")
                }
                return
            }
            write_git_log(" | pull success")
            git.push_master(res)
        })
    },

    push_master : function(res) {
        exec('git push', {cwd : repository}, function(error, stdout, stderr) {
            is_run_git  = false
            if (error) {
                write_git_log(" | push failed")
                if(res) {
                    res.send("err")
                }
                return
            }
            write_git_log(" | push success")
            if(res) {
                res.send("ok")
            }
        })
    }
}

setTimeout(git.commit_master, 10000)

exports.action = function(req, res) {
    var su = req.session.user;

    if (su && su["RES_UPLOAD"]) {
        git.run_git(res)
    }else {
        res.send("登录超时")
    }
}

