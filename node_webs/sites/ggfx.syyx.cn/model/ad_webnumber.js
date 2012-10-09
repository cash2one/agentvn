//--------------------------------------------------------------------------------------------------------
// ad_ad.js
//--------------------------------------------------------------------------------------------------------
exports.get_list = function(adid,cb) {  
    var db = ms.db.mssql['ShangYoo_Ad_Analysis']
    var sp_name = 'cp_AD_WebNumber_GetRecordList'

    
    if (!db) {        
        console.error('db not connected')
        return
    }

    var args = [adid]
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