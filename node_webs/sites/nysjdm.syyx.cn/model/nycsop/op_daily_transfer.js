//----------------------------------------------------------------
// op_daily_transfer.js
//------------------------------------------------------------------
exports.get_list = function(startDate,endDate,serverID,cbfunc){
    var db = ms.db.mssql['Analysis_TIMENYCS_Operation']
    var sp_name = 'cp_OP_Daily_Transfer_GetRecordList'
    
    if (!db){
        console.error('db not connected',db_name)
        return ;
    }
    var args = [startDate,endDate,serverID]
    db.exec_sp(sp_name,args,function(err,rows,output,ret){
        if(err){
            console.error(err);
            cbfunc(1,'');
            return 
        }
        cbfunc(0,rows);
    })
}