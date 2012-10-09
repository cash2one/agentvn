//----------------------------------------------------------------
// op_daily_online.js
//------------------------------------------------------------------
exports.get_list = function(startDate,endDate,allServer,serverID,type,cbfunc){
    var db = ms.db.mssql['Analysis_TIMENYCS_Operation']
    var sp_name = 'cp_Game_Online_GetRecordList'
   
    if (!db){
        console.error('db not connected',db_name)
        return ;
    }
    var args = [startDate,endDate,allServer,serverID,type]
    db.exec_sp(sp_name,args,function(err,rows,output,ret){
        if(err){
            console.error(err);
            cbfunc(1,'');
            return 
        }
        cbfunc(0,rows);
    })
}