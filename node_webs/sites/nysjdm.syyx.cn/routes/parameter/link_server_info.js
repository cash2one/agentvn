var linkserverClass = require("../../model/nysjconfig/config_linkserver.js")
exports.action = function(req,res){
	var itemID = req.body.ItemID;
	linkserverClass.get_serverinfo(itemID,function(err,rows){
		res.send({"rows":rows})
	})
}