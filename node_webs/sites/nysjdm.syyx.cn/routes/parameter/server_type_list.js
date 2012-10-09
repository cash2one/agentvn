var servertypeClass = require("../../model/nysjconfig/config_servertype.js")
exports.action = function(req,res){
	servertypeClass.get_list(function(err,rows){
		res.send({"rows":rows})
	})
}