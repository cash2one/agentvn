//--------------------------------------------------------------------------------------------------------
// ad_media.js
//--------------------------------------------------------------------------------------------------------
exports.get_page = function(classid, medianame, isenabled, isshow, pageindex, pagesize, cb) {  
    var db = ms.db.mssql['ShangYoo_Ad_Analysis']
    var sp_name = 'cp_AD_Media_GetPageRecord'

    
    if (!db) {        
        console.error('db not connected')
        cb(1, 0, '')
        return
    }

    var args = [classid, medianame, isenabled, isshow, pageindex, pagesize]
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
exports.get_list = function(classid, cb) {  
    var db = ms.db.mssql['ShangYoo_Ad_Analysis']
    var sp_name = 'cp_AD_Media_GetRecordList'

    
    if (!db) {        
        console.error('db not connected')
        return
    }

    var args = [classid]
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
    var sp_name = 'cp_AD_Media_GetRecordInfo'

    
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
exports.add_record = function(classid, medianame, mediaremark, isenabled, isshow, adduserid, cb) { 
    var db = ms.db.mssql['ShangYoo_Ad_Analysis']
    var sp_name = 'cp_AD_Media_AddRecord'

    
    if (!db) {        
        console.error('db not connected')
        return
    }

    var args = [ classid, medianame, mediaremark, isenabled, isshow, adduserid ]
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
exports.update_record = function(id, classid, medianame, mediaremark, isenabled, isshow, cb) { 
    var db = ms.db.mssql['ShangYoo_Ad_Analysis']
    var sp_name = 'cp_AD_Media_UpdateRecord'

    
    if (!db) {        
        console.error('db not connected')
        return
    }

    var args = [ id, classid, medianame, mediaremark, isenabled, isshow ]
    db.exec_sp(sp_name, args, function(err, rows, output, ret) {
        if (err) {
            console.error(err)
            cb(1)
            return
        }
        
        if( ret==-1 ){     
            console.error('update data is error')
            cb(1)
            return
        }           

        cb(0) 
    })
}
//--------------------------------------------------------------------------------------------------------
exports.delete_record = function(id, cb) { 
    var db = ms.db.mssql['ShangYoo_Ad_Analysis']
    var sp_name = 'cp_AD_Media_DeleteRecord'

    
    if (!db) {        
        console.error('db not connected')
        return
    }
    
    var args = [ id ]
    db.exec_sp(sp_name, args, function(err, rows, output, ret) {
        if (err) {
            console.error(err)
            cb(1)
            return
        }
        
        if( ret==-1 ){     
            console.error('delete data is error')
            cb(1)
            return
        }           

        cb(0) 
    })
}
//--------------------------------------------------------------------------------------------------------
