var linkserverClass = require("../../model/nysjconfig/config_linkserver.js")
exports.action = function(req,res){
	linkserverClass.get_serverlist(function(err,rows){
		res.send({"rows":rows})
	})
}