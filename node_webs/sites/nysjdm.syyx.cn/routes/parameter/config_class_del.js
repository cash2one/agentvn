var configClass = require("../../model/nysjconfig/config_class.js")
exports.action = function(req,res){
	var classID = req.body.ClassID;
	configClass.del_info(classID,function(err){
		res.send({"err":err})
	})
}