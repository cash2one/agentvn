exports.action = function(req,res){
    get_info(req.body.ID, function(rows) {
        if (rows == 1 || rows == 2) {
            console.log('notalone get_info error:')
            console.log(rows)
            res.send({err:true})
            return
        }
        res.send(rows)
    })
}

function get_info(ID, cb){
    var db      = ms.db.mssql['NYCS_Station']
    var sp_name = 'cp_temp_resing_GetRecordInfo'

    if (!db) {
        console.log('NYCS_Station not connected')
         cb(1)
        return
    }

    var args = {"@ID" : ID}
    db.exec_sp(sp_name, args, function(err, rows, output_params, ret) {
        if (err) {
            cb(2)
            return
        }
        
        cb(rows)
    })
}