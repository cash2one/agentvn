var op_login_ratenewClass = require("../../model/nycsop/op_login_ratenew.js")
exports.action = function(req,res){
	var startDate  = req.body.StartDate;
	var endDate    = req.body.EndDate;
	var serverID   = req.body.ServerID;
	op_login_ratenewClass.get_list(startDate,endDate,serverID,function(err,rows){
		res.send({"rows":rows})
	})
}