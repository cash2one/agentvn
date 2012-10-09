//--------------------------------------------------------------------------------------------------------
// ad_monitor.js
//--------------------------------------------------------------------------------------------------------
exports.get_admonitor_day_list = function(gameid, classid, mediaid, adid, adwebnumber, starttime, endtime, cb) {  
    var db = ms.db.mssql['ShangYoo_Ad_Analysis']
    var sp_name = 'cp_AD_Monitor_Date_GetRecordList'
    
    if (!db) {        
        console.error('db not connected')
        return
    }

    var args = [gameid, classid, mediaid, adid, adwebnumber, starttime, endtime]
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
exports.get_admonitor_hour_list = function(gameid, classid, mediaid, adid, adwebnumber, starttime, endtime, cb) {  
    var db = ms.db.mssql['ShangYoo_Ad_Analysis']
    var sp_name = 'cp_AD_Monitor_Hour_GetRecordList'
    
    if (!db) {        
        console.error('db not connected')
        return
    }

    var args = [gameid, classid, mediaid, adid, adwebnumber, starttime, endtime]
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
