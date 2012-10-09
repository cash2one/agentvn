exports.action = function(req, res) {
    var su = req.session.user
    if(su && su["RES_ALLLOG"]){
        var time = req.body.time
        ms.persistence.remove("adminres_uploadLog", {upload_time : {$lt:(new Date()).getTime() - time*86400000} }, function(){
            res.send("ok");
        })
    }else{
        res.send("没有权限")
    }
}