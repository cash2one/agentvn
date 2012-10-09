//--------------------------------------------------------------------------------------------------------
// ad_kpi.js
//--------------------------------------------------------------------------------------------------------
exports.get_adkpi_day_list = function(gameid, starttime, endtime, keyvalue, cb) {  
    var db = ms.db.mssql['ShangYoo_Ad_Analysis']
    var sp_name = 'cp_AD_KPI_Day_GetRecordList'
    
    if (!db) {        
        console.error('db not connected')
        return
    }

    var args = [gameid, starttime, endtime, keyvalue]
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
exports.get_adkpi_month_list = function(gameid, starttime, endtime, keyvalue, cb) {  
    var db = ms.db.mssql['ShangYoo_Ad_Analysis']
    var sp_name = 'cp_AD_KPI_Month_GetRecordList'
    
    if (!db) {        
        console.error('db not connected')
        return
    }

    var args = [gameid, starttime, endtime, keyvalue]
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
exports.get_adkpi_month_detail = function(gameid, starttime, endtime, cb) {  
    var db = ms.db.mssql['ShangYoo_Ad_Analysis']
    var sp_name = 'cp_AD_KPI_Month_GetDetailList'
    
    if (!db) {        
        console.error('db not connected')
        return
    }

    var args = [gameid, starttime, endtime]
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


