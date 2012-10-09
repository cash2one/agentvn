var op_real_registerClass = require("../../model/nycsop/op_real_register.js")
exports.action = function(req,res){
	var startDate  = req.body.StartDate;
	var endDate    = req.body.EndDate;
	op_real_registerClass.get_list(startDate,endDate,function(err,rows){
		res.send({"rows":rows})
	})
}