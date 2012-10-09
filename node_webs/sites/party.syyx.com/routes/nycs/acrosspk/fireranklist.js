//获取星空争霸冠军列表
exports.action=function(req, res){
    var StartDate = req.body.startdate
    var EndDate = req.body.enddate

    var db      = ms.db.mssql['NYCS_Station']
    var sp_name = 'cp_PKFireRank_GetRecordListByDate'
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