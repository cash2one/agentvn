//----------------------------------------------------------------
// config_items.js
//------------------------------------------------------------------
exports.get_list = function(classID,getType,cbfunc){
    var db = ms.db.mssql['Analysis_TIMENYCS_Config']
    var sp_name = 'cp_Config_Items_GetRecordList'
    
    if (!db){
        console.error('db not connected')
        return ;
    }
    var args = [classID,getType]
    db.exec_sp(sp_name,args,function(err,rows,output,ret){
        if(err){
            console.error(err);
            cbfunc(1,'');
            return 
        }
        cbfunc(0,rows);
    })
}

exports.get_list_able = function(classID,getType,cbfunc){
    var db = ms.db.mssql['Analysis_TIMENYCS_Config']
    var sp_name = 'cp_Config_Items_GetRecordList_Enabled'
    
    if (!db){
        console.error('db not connected')
        return ;
    }
    var args = [classID,getType]
    db.exec_sp(sp_name,args,function(err,rows,output,ret){
        if(err){
            console.error(err);
            cbfunc(1,'');
            return 
        }
        cbfunc(0,rows);
    })
}

exports.get_info = function(itemID,cbfunc){
    var db = ms.db.mssql['Analysis_TIMENYCS_Config']
    var sp_name = 'cp_Config_Items_GetRecordInfo'
    
    if (!db){
        console.error('db not connected')
        return ;
    }
    var args = [itemID]
    db.exec_sp(sp_name,args,function(err,rows,output,ret){
        if(err){
            console.error(err);
            cbfunc(1,'');
            return 
        }
        cbfunc(0,rows);
    })
}

exports.del_info = function(itemID,cbfunc){
    var db = ms.db.mssql['Analysis_TIMENYCS_Config']
    var sp_name = 'cp_Config_Items_DeleteRecord'
    
    if (!db){
        console.error('db not connected')
        return ;
    }
    var args = [itemID]
    db.exec_sp(sp_name,args,function(err,rows,output,ret){
        if(err){
            console.error(err);
            cbfunc(1);
            return 
        }
        cbfunc(0);
    })
}

exports.add_item = function(itemNo,itemName,classID,getType,orderNo,isEnabled,cbfunc){
    var db = ms.db.mssql['Analysis_TIMENYCS_Config']
    var sp_name = 'cp_Config_Items_AddRecord'
    
    if (!db){
        console.error('db not connected')
        return ;
    }
    var args = [itemNo,itemName,classID,getType,orderNo,isEnabled]
    db.exec_sp(sp_name,args,function(err,rows,output,ret){
        if(err){
            console.error(err);
            cbfunc(1);
            return 
        }
            cbfunc(0);
    })
}

exports.upd_iteminfo = function(ID,itemNo,itemName,classID,getType,orderNo,isEnabled,cbfunc){
    var db = ms.db.mssql['Analysis_TIMENYCS_Config']
    var sp_name = 'cp_Config_Items_UpdateRecord'
    
    if (!db){
        console.error('db not connected',db_name)
        return ;
    }
    var args = [ID,itemNo,itemName,classID,getType,orderNo,isEnabled]
    db.exec_sp(sp_name,args,function(err,rows,output,ret){
        if(err){
            console.error(err);
            cbfunc(1);
            return 
        }
            cbfunc(0);
    })
}

exports.get_list_byparams = function(paramsType,getType,cbfunc){
    var db = ms.db.mssql['Analysis_TIMENYCS_Config']
    var sp_name = 'cp_Config_Items_GetRecordList_ByParams'
    
    if (!db){
        console.error('db not connected')
        return ;
    }
    var args = [paramsType,getType]
    db.exec_sp(sp_name,args,function(err,rows,output,ret){
        if(err){
            console.error(err);
            cbfunc(1,'');
            return 
        }
        cbfunc(0,rows);
    })
}