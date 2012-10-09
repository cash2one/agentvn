var op_web_uvClass = require("../../model/nycsop/op_web_uv.js")
exports.action = function(req,res){
	var startDate  = req.body.StartDate;
	var endDate    = req.body.EndDate;
	op_web_uvClass.get_list(startDate,endDate,function(err,rows){
		res.send({"rows":rows})
	})
}