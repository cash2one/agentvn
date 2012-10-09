//----------------------------------------------------------------
// game_boss.js
//------------------------------------------------------------------
exports.get_page = function(serverID,line,bossID,startDate,endDate,page,pageSize,cbfunc){
    var db = ms.db.mssql['Analysis_TIMENYCS_Game']
    var sp_name = 'cp_Game_Boss_GetPageRecord'
    
    if (!db){
        console.error('db not connected')
        return ;
    }
    var args = [serverID,line,bossID,startDate,endDate,page,pageSize]
    db.exec_sp(sp_name,args,function(err,rows,output,ret){
        if(err){
            console.error(err);
            cbfunc(1,0,'');
            return 
        }
        cbfunc(0,output,rows);
    })
}