//--------------------------------------------------------------------------------------------------------
// ad_schedule.js
//--------------------------------------------------------------------------------------------------------
exports.get_page = function(classid, mediaid, adid, pageindex, pagesize, cb) {  
    var db = ms.db.mssql['ShangYoo_Ad_Analysis']
    var sp_name = 'cp_AD_Schedule_List_GetPageList'
    
    if (!db) {        
        console.error('db not connected')
         cb(1, 0, '')
        return
    }
    var args = [classid, mediaid, adid, pageindex, pagesize]
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
exports.get_list = function(stattime, cb) {  
    var db = ms.db.mssql['ShangYoo_Ad_Analysis']
    var sp_name = 'cp_AD_Schedule_List_GetRecordList'

    
    if (!db) {        
        console.error('db not connected')
        cb(1, '')
        return
    }

    var args = [stattime]
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
    var sp_name = 'cp_AD_Schedule_List_GetRecordInfo'
    
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
exports.add_record = function(adid, pricetype, adprice, adcolor, syear, smonth, day1, day2, day3, day4, day5, day6, day7, day8, day9, day10, day11, day12, day13, day14, day15, day16, day17, day18, day19, day20, day21, day22, day23, day24, day25, day26, day27, day28, day29, day30, day31, isok, cb) { 
    var db = ms.db.mssql['ShangYoo_Ad_Analysis']
    var sp_name = 'cp_AD_Schedule_List_AddRecord'

    if (!db) {        
        console.error('db not connected')
        return
    }

    var args = [ adid, pricetype, adprice, adcolor, syear, smonth, day1, day2, day3, day4, day5, day6, day7, day8, day9, day10, day11, day12, day13, day14, day15, day16, day17, day18, day19, day20, day21, day22, day23, day24, day25, day26, day27, day28, day29, day30, day31, isok ]
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
exports.update_record = function(id, adid, pricetype, adprice, adcolor, syear, smonth, day1, day2, day3, day4, day5, day6, day7, day8, day9, day10, day11, day12, day13, day14, day15, day16, day17, day18, day19, day20, day21, day22, day23, day24, day25, day26, day27, day28, day29, day30, day31, isok, cb) { 
    var db = ms.db.mssql['ShangYoo_Ad_Analysis']
    var sp_name = 'cp_AD_Schedule_List_UpdateRecord'

    if (!db) {        
        console.error('db not connected')
        return
    }

    var args = [ id, adid, pricetype, adprice, adcolor, syear, smonth, day1, day2, day3, day4, day5, day6, day7, day8, day9, day10, day11, day12, day13, day14, day15, day16, day17, day18, day19, day20, day21, day22, day23, day24, day25, day26, day27, day28, day29, day30, day31, isok ]
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
    var sp_name = 'cp_AD_Schedule_List_DeleteRecord'
    
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
