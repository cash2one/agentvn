var paramsClass = require("../../model/nysjconfig/config_params.js")
exports.action = function(req,res){
	paramsClass.get_list(function(err,rows){
		res.send({"rows":rows})
	})
}