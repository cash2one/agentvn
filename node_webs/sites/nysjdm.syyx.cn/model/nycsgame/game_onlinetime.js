//----------------------------------------------------------------
// game_onlinetime.js
//------------------------------------------------------------------
exports.get_list = function(serverList,startDate,endDate,cbfunc){
    var db = ms.db.mssql['Analysis_TIMENYCS_Game']
    var sp_name = 'cp_Game_OnlineTimeShow_GetRecordList'
    
    if (!db){
        console.error('db not connected')
        return ;
    }
    var args = [serverList,startDate,endDate]
    db.exec_sp(sp_name,args,function(err,rows,output,ret){
        if(err){
            console.error(err);
            cbfunc(1,'');
            return 
        }
        cbfunc(0,rows);
    })
}