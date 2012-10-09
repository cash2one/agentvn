//----------------------------------------------------------------
// op_login_ratenew.js
//------------------------------------------------------------------
exports.get_list = function(startDate,endDate,serverID,cbfunc){
    var db = ms.db.mssql['Analysis_TIMENYCS_Operation']
    var sp_name = 'cp_OP_Login_RateNew_GetRecordList'
    
    if (!db){
        console.error('db not connected')
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