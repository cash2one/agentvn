exports.action = function(req, res) {
    var db      = ms.db.mssql['ShangYoo_GameUser']
    var sp_name = 'cp_ServerUser_GetRecordListAll'
    var arg = ["2012-10-04 00:00:00", "2012-10-12 16:00:00"]
    db.exec_sp(sp_name, arg, function(err, rows, output, ret) {
        if(err) {
            console.log(err);
        }
        res.send({ret : ret})
        return
    })
}