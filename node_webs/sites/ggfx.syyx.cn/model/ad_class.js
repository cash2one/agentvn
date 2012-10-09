//--------------------------------------------------------------------------------------------------------
// ad_class.js
//--------------------------------------------------------------------------------------------------------
exports.get_page = function(pageindex, pagesize, cb) {  
    var db = ms.db.mssql['ShangYoo_Ad_Analysis']
    var sp_name = 'cp_AD_Class_GetPageRecord'
    
    if (!db) {        
        console.error('db not connected')
         cb(1, 0, '')
        return
    }
    var args = [pageindex, pagesize]
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
exports.get_list = function(cb) {  
    var db = ms.db.mssql['ShangYoo_Ad_Analysis']
    var sp_name = 'cp_AD_Class_GetRecordList'
    
    if (!db) {        
        console.error('db not connected')
         cb(1, '')
        return
    }

    var args = []
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
    var sp_name = 'cp_AD_Class_GetRecordInfo'
    
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
exports.check_exists = function(className, cb) {  
    var db = ms.db.mssql['ShangYoo_Ad_Analysis']
    var sp_name = 'cp_AD_Class_CheckIsExists'
    
    if (!db) {        
        console.error('db not connected')
        return
    }

    var args = [ className ]
    db.exec_sp(sp_name, args, function(err, rows, output, ret) {
        if (err) {
            console.error(err)
            cb(1)
            return
        }
        
        cb(ret)
    })
}
//--------------------------------------------------------------------------------------------------------
exports.add_record = function(className, remark, isEnabled, isShow, cb) { 
    var db = ms.db.mssql['ShangYoo_Ad_Analysis']
    var sp_name = 'cp_AD_Class_AddRecord'
    
    if (!db) {        
        console.error('db not connected')
        return
    }

    var args = [ className, remark, isEnabled , isShow ]
    db.exec_sp(sp_name, args, function(err, rows, output, ret) {
        if (err) {
            console.error(err)
            cb(1)
            return
        }
        
        if( ret<=0 ){     
            console.error('add data to db is error')
            cb(1)
            return
        }       

        cb(0) 
    })
}
//--------------------------------------------------------------------------------------------------------
exports.update_record = function(id, className, remark, isEnabled, isShow, cb) { 
    var db = ms.db.mssql['ShangYoo_Ad_Analysis']
    var sp_name = 'cp_AD_Class_UpdateRecord'
    
    if (!db) {        
        console.error('db not connected')
        return
    }

    var args = [ id, className, remark, isEnabled , isShow ]
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

        if( ret==-2 ){     
            console.error('the classname already exists')
            cb(2)
            return
        }       

        cb(0) 
    })
}
//--------------------------------------------------------------------------------------------------------
