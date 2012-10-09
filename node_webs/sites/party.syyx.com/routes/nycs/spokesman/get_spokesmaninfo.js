exports.action = function(req,res){
    get_info(req.body.a, function(amount) {
        res.send({ amount : amount})
    })
}

function get_info(VotingType, cb){
    var db      = ms.db.mssql['NYCS_Station']
    var sp_name = 'cp_temp_spokesman_GetRecordInfo'

    if (!db) {
        console.log('NYCS_Station not connected')
         cb(1)
        return
    }

    var args = {"@VotingType" : VotingType}

    db.exec_sp(sp_name, args, function(err, rows, output_params, ret) {
        if (err) {
            cb(2)
            return
        }
        
        if(rows.length == 0) {
            cb(0)
        }
        else{
            cb(rows[0].Amount)
        }
    })
}