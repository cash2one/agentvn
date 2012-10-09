//----------------------------------------------------------------
// game_table3.js
//------------------------------------------------------------------
exports.get_list = function(tableName,startDate,endDate,serverID,classID,itemList,isAdd,cbfunc){
    var db = ms.db.mssql['Analysis_TIMENYCS_Game']
    var sp_name = 'cp_Game_TableName3_GetRecordList'
   
    if (!db){
        console.error('db not connected')
        return ;
    }
    var args = [tableName,startDate,endDate,serverID,classID,itemList,isAdd]
    db.exec_sp(sp_name,args,function(err,rows,output,ret){
        if(err){
            console.error(err);
            cbfunc(1,'');
            return 
        }
        cbfunc(0,rows);
    })
}