var itemClass = require("../../model/nysjconfig/config_items.js")
exports.action = function(req,res){
	var id     = req.body.ID
	var itemNo = req.body.ItemNo
	var itemName = req.body.ItemName
	var classID = req.body.ClassID
	var getType = req.body.GetType
	var orderNo = req.body.OrderNo
	var isEnabled = req.body.IsEnabled=="true"?1:0
	
	itemClass.upd_iteminfo(id,itemNo,itemName,classID,getType,orderNo,isEnabled,function(result){
		res.send({"retcode":result})
	})
}