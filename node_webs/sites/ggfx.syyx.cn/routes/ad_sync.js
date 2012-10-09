//--------------------------------------------------------------------------------------------------------
// ad_sync.js
//--------------------------------------------------------------------------------------------------------

exports.action = function(req, res) {
	var db = ms.db.mssql['ShangYoo_Ad_Analysis']
    var sp_name = 'cp_syn_data'
    
    if (!db) {        
        console.error('db not connected')
        res.send({ retcode : 1 })    
        return
    }

    var args = []
    db.exec_sp(sp_name, args, function(err, rows, output, ret) {
        if (err) {
            console.error(err)
            res.send({ retcode : 1 })    
            return
        }

     	res.send({ retcode : 0 })    
    })
}