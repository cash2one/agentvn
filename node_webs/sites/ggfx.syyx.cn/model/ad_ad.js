//--------------------------------------------------------------------------------------------------------
// ad_ad.js
//--------------------------------------------------------------------------------------------------------
exports.get_page = function(gameid, mediaid, pageindex, pagesize, cb) {  
    var db = ms.db.mssql['ShangYoo_Ad_Analysis']
    var sp_name = 'cp_AD_Ad_GetPageRecord'

    if (!db) {        
        console.error('db not connected')
        cb(1, 0, '')
        return
    }

    var args = [gameid, mediaid, pageindex, pagesize]
    db.exec_sp(sp_name, args, function(err, rows, output, ret) {
        if (err) {
            console.error(err)
            cb(1, 0, '')
            return
        }
        
        cb(0, output["@RowCount"], rows)
    })
}
//--------------------------------------------------------------------------------------------------------
exports.get_list = function(mediaid,cb) {  
    var db = ms.db.mssql['ShangYoo_Ad_Analysis']
    var sp_name = 'cp_AD_Ad_GetRecordList'

    if (!db) {        
        console.error('db not connected')
        return
    }

    var args = [mediaid]
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
exports.get_record = function(id, cb) {  
    var db = ms.db.mssql['ShangYoo_Ad_Analysis']
    var sp_name = 'cp_AD_Ad_GetRecordInfo'

    if (!db) {        
        console.error('db not connected')
        return
    }

    var args = [id]
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
exports.add_record = function(gameid, adname, begintime, endtime, adplace, adremark, adendurl, isdelete, isshow, adduserid, orderby, groupid, typeid, cb) { 
    var db = ms.db.mssql['ShangYoo_Ad_Analysis']
    var sp_name = 'cp_AD_Ad_AddRecord'

    
    if (!db) {        
        console.error('db not connected')
        return
    }

    var args = [ gameid, adname, begintime, endtime, adplace, adremark, adendurl, isdelete, isshow, adduserid, orderby, groupid, typeid ]
    db.exec_sp(sp_name, args, function(err, rows, output, ret) {
        if (err) {
            console.error(err)
            cb(1)
            return
        }
        
        if( ret==-1 ){     
            console.error('add data to db is error')
            cb(1)
            return
        }       

        cb(0) 
    })
}
//--------------------------------------------------------------------------------------------------------
exports.update_record = function(id, gameid, adname, begintime, endtime, adplace, adremark, adendurl, isdelete, isshow, orderby, groupid, typeid, cb) { 
    var db = ms.db.mssql['ShangYoo_Ad_Analysis']
    var sp_name = 'cp_AD_Ad_UpdateRecord'

    
    if (!db) {        
        console.error('db not connected')
        return
    }

    var args = [ id, gameid, adname, begintime, endtime, adplace, adremark, adendurl, isdelete, isshow, orderby, groupid, typeid ]
    db.exec_sp(sp_name, args, function(err, rows, output, ret) {
        if (err) {
            console.error(err)
            cb(1)
            return
        }
        
        if( ret==-1 ){     
            console.error('update data to db is error')
            cb(1)
            return
        }           

        cb(0) 
    })
}
//--------------------------------------------------------------------------------------------------------
exports.get_pegging_byadid = function(adidlist, cb) { 
    var db = ms.db.mssql['ShangYoo_Ad_Analysis']
    var sp_name = 'cp_AD_Ad_GetADNameList'

    
    if (!db) {        
        console.error('db not connected')
        return
    }

    var args = [ adidlist ]
    db.exec_sp(sp_name, args, function(err, rows, output, ret) {
        if (err) {
            console.error(err)
            cb(1, '')
            return
        }
        
        if( ret==-1 ){     
            console.error('add data to db is error')
            cb(1, '')
            return
        }           

        cb(0, rows) 
    })
}
//--------------------------------------------------------------------------------------------------------
