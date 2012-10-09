//--------------------------------------------------------------------------------------------------------
// ad_report.js
//--------------------------------------------------------------------------------------------------------
exports.get_adphase_list = function(gameid, starttime, endtime, classid, mediaid, adid, adwebnumber, istotal, isschedule, cb) {  
    var db = ms.db.mssql['ShangYoo_Ad_Analysis']
    var sp_name = 'cp_AD_Report_Phase_GetRecordList'
    
    if (!db) {        
        console.error('db not connected')
        return
    }

    var args = [gameid, starttime, endtime, classid, mediaid, adid, adwebnumber, istotal, isschedule]
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
exports.get_adphase_se_list = function(gameid, starttime, endtime, isschedule, cb) {  
    var db = ms.db.mssql['ShangYoo_Ad_Analysis']
    var sp_name = 'cp_AD_Report_Phase_SE_GetRecordList'
    
    if (!db) {        
        console.error('db not connected')
        return
    }

    var args = [gameid, starttime, endtime, isschedule]
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
exports.get_adperiod_list = function(gameid, starttime, endtime, classid, mediaid, adid, adwebnumber, isschedule, rollday, cb) {  
    var db = ms.db.mssql['ShangYoo_Ad_Analysis']
    var sp_name = 'cp_AD_Report_Period_GetRecordList'
    
    if (!db) {        
        console.error('db not connected')
        return
    }

    var args = [gameid, starttime, endtime, classid, mediaid, adid, adwebnumber, isschedule, rollday]
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
exports.get_adperiod_se_list = function(gameid, starttime, endtime, isschedule, cb) {  
    var db = ms.db.mssql['ShangYoo_Ad_Analysis']
    var sp_name = 'cp_AD_Report_Period_SE_GetRecordList'
    
    if (!db) {        
        console.error('db not connected')
        return
    }

    var args = [gameid, starttime, endtime, isschedule]
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
exports.get_addaily_list = function(gameid, stattime, classid, mediaid, adid, adwebnumber, isschedule, cb) {  
    var db = ms.db.mssql['ShangYoo_Ad_Analysis']
    var sp_name = 'cp_AD_Report_Daily_GetRecordList'
    
    if (!db) {        
        console.error('db not connected')
        return
    }

    var args = [gameid, stattime, classid, mediaid, adid, adwebnumber, isschedule]
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