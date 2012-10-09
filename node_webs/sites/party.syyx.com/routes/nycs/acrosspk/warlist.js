//获取跨服战列表
//startdate 开始时间 2012-5-1
//enddate 结束时间
//[{"ID":7,"PKRound":1,"ServerRank":1,"ServerName":"迷雾","FirstGroupName":"迷雾第一军团","SecondGroupName":"迷雾第二军团","Remark":"1","AddTime":"2012-05-03 11:36:46:107"},
//{"ID":8,"PKRound":1,"ServerRank":2,"ServerName":"太阳城","FirstGroupName":"太阳城第一军团","SecondGroupName":"太阳城第二军团","Remark":"0","AddTime":"2012-05-03 11:36:46:107"},
//{"ID":9,"PKRound":2,"ServerRank":3,"ServerName":"曙光","FirstGroupName":"曙光第一军团","SecondGroupName":"曙光第二军团","Remark":"2","AddTime":"2012-05-03 11:36:46:107"}]
//PKRound : 分组 1 - A 2 -B 3-C
//Remark ：备注
//
exports.action=function(req, res){
    var StartDate = req.body.startdate
    var EndDate = req.body.enddate
    if(!StartDate || !EndDate) {
        res.send("Error")
        return
    }

    var db      = ms.db.mssql['NYCS_Station']
    var sp_name = 'cp_PKServerRank_GetRecordListByDate'

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