var op_daily_transferClass = require("../../model/nycsop/op_daily_transfer.js")
exports.action = function(req,res){
	var startDate  = req.body.StartDate;
	var endDate    = req.body.EndDate;
	var serverID   = req.body.ServerID;
	op_daily_transferClass.get_list(startDate,endDate,serverID,function(err,rows){
		res.send({"rows":rows})
	})
}