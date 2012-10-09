//----------------------------------------------------------------
// config_linkserver.js
//------------------------------------------------------------------
exports.add_linkserver = function(serverID,serverLink,serverAlias,isEnable,isShow,jobID,serverType,cbfunc){
	var db = ms.db.mssql['Analysis_TIMENYCS_Config']
	var sp_name = 'cp_Config_LinkServer_AddRecord'
	
	if (!db){
		console.error('db not connected')
		return ;
	}
	var args = [serverID,serverLink,serverAlias,isEnable,isShow,jobID,serverType]
	db.exec_sp(sp_name,args,function(err,rows,output,ret){
		if(err){
			console.error(err);
			cbfunc(-3);
			return 
		}
		if(ret <= -1){
			console.error('add data to db is error')
			cbfunc(ret);
			return
		}
			cbfunc(1);
	})
}

exports.get_serverlist = function(cbfunc){
	var db = ms.db.mssql['Analysis_TIMENYCS_Config']
	var sp_name = 'cp_Config_LinkServer_GetNoPageRecord'
	
	if (!db){
		console.error('db not connected')
		return ;
	}
	var args = []
	db.exec_sp(sp_name,args,function(err,rows,output,ret){
		if(err){
			console.error(err);
			cbfunc(1,'');
			return 
		}
		cbfunc(0,rows);
	})
}

exports.get_serverinfo = function(itemID,cbfunc){
	var db = ms.db.mssql['Analysis_TIMENYCS_Config']
	var sp_name = 'cp_Config_LinkServer_GetRecordInfo'

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

exports.upd_serverinfo = function(ID,serverLink,serverAlias,isEnable,isShow,jobID,serverType,cbfunc){
	var db = ms.db.mssql['Analysis_TIMENYCS_Config']
	var sp_name = 'cp_Config_LinkServer_UpdateRecord'
	
	if (!db){
		console.error('db not connected')
		return ;
	}
	var args = [ID,serverLink,serverAlias,isEnable,isShow,jobID,serverType]
	db.exec_sp(sp_name,args,function(err,rows,output,ret){
		if(err){
			console.error(err);
			cbfunc(1);
			return 
		}
			cbfunc(0);
	})
}

exports.get_viewserverlist = function(cbfunc){
	var db = ms.db.mssql['Analysis_TIMENYCS_Config']
	var sp_name = 'cp_Config_LinkServer_GetRecordList'
	
	if (!db){
		console.error('db not connected')
		return ;
	}
	var args = []
	db.exec_sp(sp_name,args,function(err,rows,output,ret){
		if(err){
			console.error(err);
			cbfunc(1,'');
			return 
		}
		cbfunc(0,rows);
	})
}