var itemsClass = require("../../model/nysjconfig/config_items.js")
exports.action = function(req,res){
	var itemID = req.body.ItemID;
	itemsClass.del_info(itemID,function(err){
		res.send({"err":err})
	})
}