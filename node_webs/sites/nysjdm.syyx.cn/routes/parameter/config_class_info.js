var configClass = require("../../model/nysjconfig/config_class.js")
exports.action = function(req,res){
	var classID = req.body.ClassID;
	configClass.get_info(classID,function(err,rows){
		res.send({"rows":rows})
	})
}