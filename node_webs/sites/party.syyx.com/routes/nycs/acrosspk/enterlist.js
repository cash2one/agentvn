//获取跨服战入围列表
//startdate 开始时间 2012-5-1
//enddate 结束时间
//[{"ID":1,"PKRound":1,"ServerName":"曙光","FirstGroupName":"永不言败","SecondGroupName":"重生公会","AddTime":"2012-05-09 00:00:00:000"},
//{"ID":3,"PKRound":1,"ServerName":"迷雾","FirstGroupName":"永不言败2","SecondGroupName":"重生公会2","AddTime":"2012-05-09 00:00:00:000"}]
exports.action=function(req, res){
    var StartDate = req.body.startdate
    var EndDate = req.body.enddate

    var db      = ms.db.mssql['NYCS_Station']
    var sp_name = 'cp_PKServerEnter_GetRecordListByDate'
    var args    = {"@StartDate" : StartDate, "@EndDate" : EndDate}
    
    if(!StartDate || !EndDate) {
        res.send("Error")
        return
    }

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