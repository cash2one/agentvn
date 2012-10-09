var configClass = require("../../model/nysjconfig/config_class.js")
exports.action = function(req,res){
	var classID = req.body.ClassID;
	var classNo = req.body.ClassNo;
    var className = req.body.ClassName;
    var paramsType = req.body.ParamsType;
	configClass.upd_info(classID,classNo,className,paramsType,function(err){
		res.send({"err":err})
	})
}	
