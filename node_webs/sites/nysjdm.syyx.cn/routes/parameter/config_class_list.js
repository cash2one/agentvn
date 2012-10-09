var configClass = require("../../model/nysjconfig/config_class.js")
exports.action = function(req,res){
	var paramsType = req.body.ParamsType;
	configClass.get_list(paramsType,function(err,rows){
		res.send({"rows":rows})
	})
}