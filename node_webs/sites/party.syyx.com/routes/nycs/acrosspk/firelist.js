//获取星空争霸列表
//[{"ID":1,"PKRound":1,"TableNo":1,"LeftName":"战队1","RightName":"战队2","LeftServerName":"天子圣殿","RightServerName":"无双争霸","AddTime":"2012-05-05 00:00:00:000"},{"ID":2,"PKRound":1,"TableNo":2,"LeftName":"战队3","RightName":"战队4","LeftServerName":"天子圣殿","RightServerName":"无双争霸","AddTime":"2012-05-05 00:00:00:000"},{"ID":3,"PKRound":1,"TableNo":3,"LeftName":"战队5","RightName":"战队6","LeftServerName":"天子圣殿3","RightServerName":"无双争霸3","AddTime":"2012-05-05 00:00:00:000"},{"ID":4,"PKRound":2,"TableNo":1,"LeftName":"战队7","RightName":"战队8","LeftServerName":"天子圣殿","RightServerName":"无双争霸3","AddTime":"2012-05-05 00:00:00:000"}]
exports.action=function(req, res){
    var StartDate = req.body.startdate
    var EndDate = req.body.enddate
    if(!StartDate || !EndDate) {
        res.send("Error")
        return
    }

    var db      = ms.db.mssql['NYCS_Station']
    var sp_name = 'cp_PKFire_GetRecordListByDate'
    var args    = {"@StartDate" : StartDate, "@EndDate" : EndDate}

    db.exec_sp(sp_name, args, function(err, rows, output, ret) {
        if(err){
            console.error(sp_name, err)
            res.send('Error')
            return
        }

        if(!rows){
            res.send({count : 0})
        }
        else{
            res.send(rows)
        }
        return
    })
}