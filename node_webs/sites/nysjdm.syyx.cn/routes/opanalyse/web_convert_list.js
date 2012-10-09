var op_web_convertClass = require("../../model/nycsop/op_web_convert.js")
exports.action = function(req,res){
	var startDate  = req.body.StartDate;
	var endDate    = req.body.EndDate;
	op_web_convertClass.get_list(startDate,endDate,function(err,rows){
		res.send({"rows":rows})
	})
}