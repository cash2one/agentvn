var linkserverClass = require("../../model/nysjconfig/config_linkserver.js")
exports.action = function(req,res){
	linkserverClass.get_viewserverlist(function(err,rows){
		res.send({"rows":rows})
	})
}