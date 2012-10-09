//----------------------------------------------------------------
// game_kfnum.js
//------------------------------------------------------------------
exports.get_list = function(serverID,startDate,endDate,kfType,cbfunc){
    var db = ms.db.mssql['Analysis_TIMENYCS_Game']
    var sp_name = 'cp_Game_KfSignUpNum_GetRecordList'
    
    if (!db){
        console.error('db not connected')
        return ;
    }
    var args = [serverID,startDate,endDate,kfType]
    db.exec_sp(sp_name,args,function(err,rows,output,ret){
        if(err){
            console.error(err);
            cbfunc(1,'');
            return 
        }
        cbfunc(0,rows);
    })
}