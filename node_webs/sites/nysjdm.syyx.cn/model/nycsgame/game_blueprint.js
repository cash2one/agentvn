//----------------------------------------------------------------
// game_blueprint.js
//------------------------------------------------------------------
exports.get_sourcelist = function(tableName,serverID,startDate,endDate,blueprintID,qualityID,levels,cbfunc){
    var db = ms.db.mssql['Analysis_TIMENYCS_Game']
    var sp_name = 'cp_Game_Blueprint_GetSourceList'
    
    if (!db){
        console.error('db not connected')
        return ;
    }
    var args = [tableName,serverID,startDate,endDate,blueprintID,qualityID,levels]
    db.exec_sp(sp_name,args,function(err,rows,output,ret){
        if(err){
            console.error(err);
            cbfunc(1,'');
            return 
        }
        cbfunc(0,rows);
    })
}

exports.get_list = function(tableName,serverID,startDate,endDate,blueprintID,qualityID,levels,itemList,cbfunc){
    var db = ms.db.mssql['Analysis_TIMENYCS_Game']
    var sp_name = 'cp_Game_Blueprint_GetRecordList'
    
    if (!db){
        console.error('db not connected')
        return ;
    }
    var args = [tableName,serverID,startDate,endDate,blueprintID,qualityID,levels,itemList]
    db.exec_sp(sp_name,args,function(err,rows,output,ret){
        if(err){
            console.error(err);
            cbfunc(1,'');
            return 
        }
        cbfunc(0,rows);
    })
}