exports.action = function(req,res){
    var db      = ms.db.mssql['NYCS_Station']
    var sp_name = 'cp_temp_notalone_GetRecordRnd'

    if (!db) {
        console.log('NYCS_Station not connected')
        res.send("2")

        return
    }

    var args = {"@RoleType" : req.body.RoleType}
    db.exec_sp(sp_name, args, function(err, rows, output_params, ret_value) {
        if (err) {
            console.error(err)
            res.send({count : 0})
            return
        }
        
        res.send(rows)
    })
}