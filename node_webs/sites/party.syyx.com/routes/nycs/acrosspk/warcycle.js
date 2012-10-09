//获取跨服战冠军日期列表
//[{"AddDate":"2012-07"},{"AddDate":"2012-06"},{"AddDate":"2012-05"}]
//[{"AddDate":"2012-06"},{"AddDate":"2012-05"},{"AddDate":"2012-04"}]
exports.action=function(req, res){
    var db      = ms.db.mssql['NYCS_Station']
    var sp_name = 'cp_PKServerRank_GetDateList'
    var args    = {}

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