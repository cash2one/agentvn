exports.action = function(req, res) {
    var db      = ms.db.mssql['ShangYoo_Dict']
    var sp_name = 'cp_Dict_ServerList_GetRecordList'

    if (!db) {
        console.log('ShangYoo_Dict not connected')
        res.send("2")
        return
    }

    var args = [ 1 , 0 ]
    db.exec_sp(sp_name, args, function(err, rows, output_params, ret_value) {
        if (err) {
            console.error(err)
            res.send("3")

            return
        }
        var len = rows.length
        var ret = {}
        for(var i = 0; i < len; i++) {
            var part = rows[i].PartName
            if(ret[part]) {
                ret[part].push(rows[i].Title)
            } else {
                ret[part] = [rows[i].Title]
            }            
        }
        res.send(ret)
    })
}