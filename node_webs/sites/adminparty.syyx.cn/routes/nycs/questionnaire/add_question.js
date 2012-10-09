
exports.action = function(req, res) {

    if(!/http:\/\/adminparty.syyx.cn/.test(req.headers.referer)) {
        res.send("no permissions")
        return
    }
    var config          = req.body

    if(!config.name || !config.award || !config.welcome || !config.thanks || !config.login || !config.starttime || !config.endtime || !config.adduser || !config.iplimit || !config.interval|| !config.adduser) {
        res.send({type : -2})
        return
    }

    var user            = config.adduser
    var db              = ms.db.mongo['party']
    var cl              = db.collection('question_list')
    cl.insert({
        "name"      : config.name,
        "award"     : config.award,
        "welcome"   : config.welcome,
        "thanks"    : config.thanks,
        "config" : {
            login     : (config.login == "true") ? true : false,
            iplimit   : (config.iplimit == "true") ? true : false,
            interval  : Number(config.interval),
            starttime : config.starttime,
            endtime   : config.endtime
        }, 
        "question" : [], 
        "answers" : 0,
        "adduser" : config.adduser,
        "addtime" : new Date().getTime(), 
        "deltime" : 0, 
        "deluser" : "", 
        "stat" : -1
    }, function(err, data) {
        if(err) {
            console.log(err)
            res.send({type : -1})
            return
        }
        res.send({type : 0})
    })
}