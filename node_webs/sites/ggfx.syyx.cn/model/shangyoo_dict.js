//--------------------------------------------------------------------------------------------------------
// shangyoo_dict.js
//--------------------------------------------------------------------------------------------------------
exports.get_dictgame_list = function(isall, cb) {  
    var db = ms.db.mssql['ShangYoo_Dict']
    var sp_name = 'cp_Dict_GameList_GetRecordList'
    
    if (!db) {        
        console.error('db not connected')
        return
    }

    var args = [ isall ]
    db.exec_sp(sp_name, args, function(err, rows, output, ret) {
        if (err) {
            console.error(err)
            cb(1, '')
            return
        }
        
        cb(0, rows)
    })
}
//--------------------------------------------------------------------------------------------------------
