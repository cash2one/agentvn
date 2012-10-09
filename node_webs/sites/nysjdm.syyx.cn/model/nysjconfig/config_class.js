//----------------------------------------------------------------
// config_class.js
//------------------------------------------------------------------
exports.get_list = function(paramsType,cbfunc){
	var db = ms.db.mssql['Analysis_TIMENYCS_Config']
	var sp_name = 'cp_Config_Class_GetRecordList'
	
	if (!db){
		console.error('db not connected')
		return ;
	}
	var args = [paramsType]
	db.exec_sp(sp_name,args,function(err,rows,output,ret){
		if(err){
			console.error(err);
			cbfunc(1,'');
			return 
		}
		cbfunc(0,rows);
	})
}

exports.get_info = function(classID,cbfunc){
	var db = ms.db.mssql['Analysis_TIMENYCS_Config']
	var sp_name = 'cp_Config_Class_GetRecordInfo'

	if (!db){
		console.error('db not connected')
		return ;
	}
	var args = [classID]
	db.exec_sp(sp_name,args,function(err,rows,output,ret){
		if(err){
			console.error(err);
			cbfunc(1,'');
			return 
		}
		cbfunc(0,rows);
	})
}

exports.del_info = function(classID,cbfunc){
	var db = ms.db.mssql['Analysis_TIMENYCS_Config']
	var sp_name = 'cp_Config_Class_DeleteRecord'

	if (!db){
		console.error('db not connected')
		return ;
	}
	var args = [classID]
	db.exec_sp(sp_name,args,function(err,rows,output,ret){
		if(err){
			console.error(err);
			cbfunc(1);
			return 
		}
		cbfunc(0);
	})
}

exports.add_info = function(classNo,className,paramsType,cbfunc){
	var db = ms.db.mssql['Analysis_TIMENYCS_Config']
	var sp_name = 'cp_Config_Class_AddRecord'
	
	if (!db){
		console.error('db not connected')
		return ;
	}
	var args = [classNo,className,paramsType]
	db.exec_sp(sp_name,args,function(err,rows,output,ret){
		if(err){
			console.error(err);
			cbfunc(1);
			return 
		}
			cbfunc(0);
	})
}

exports.upd_info = function(classID,classNo,className,paramsType,cbfunc){
	var db = ms.db.mssql['Analysis_TIMENYCS_Config']
	var sp_name = 'cp_Config_Class_UpdateRecord'
	
	if (!db){
		console.error('db not connected')
		return ;
	}
	var args = [classID,classNo,className,paramsType]
	db.exec_sp(sp_name,args,function(err,rows,output,ret){
		if(err){
			console.error(err);
			cbfunc(1);
			return 
		}
			cbfunc(0);
	})
}