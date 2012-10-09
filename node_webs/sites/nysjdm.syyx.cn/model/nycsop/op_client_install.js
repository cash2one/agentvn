//----------------------------------------------------------------
// op_client_install.js
//------------------------------------------------------------------
exports.get_list = function(startDate,endDate,cbfunc){
    var db = ms.db.mssql['NYCS_Game']
    var sp_name = 'cp_TimeInstallStat_StatRecordList'
    
    if (!db){
        console.error('db not connected')
        return ;
    }
    var args = [startDate,endDate]
    db.exec_sp(sp_name,args,function(err,rows,output,ret){
        if(err){
            console.error(err);
            cbfunc(1,'');
            return 
        }
        cbfunc(0,rows);
    })
}