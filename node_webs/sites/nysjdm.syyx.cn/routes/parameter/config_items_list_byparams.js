var itemsClass = require("../../model/nysjconfig/config_items.js")
exports.action = function(req,res){
	var paramsType = req.body.ParamsType;
	var getType    = req.body.GetType;
	itemsClass.get_list_byparams(paramsType,getType,function(err,rows){
		res.send({"rows":rows})
	})
}