var op_client_installClass = require("../../model/nycsop/op_client_install.js")
exports.action = function(req,res){
	var startDate  = req.body.StartDate;
	var endDate    = req.body.EndDate;
	op_client_installClass.get_list(startDate,endDate,function(err,rows){
		res.send({"rows":rows})
	})
}