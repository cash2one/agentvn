var game_taskfivecolorClass = require("../../model/nycsgame/game_taskfivecolor.js")
exports.action = function(req,res){
	var serverID   = req.body.ServerID;
	var startDate  = req.body.StartDate;
	var endDate    = req.body.EndDate;
	game_taskfivecolorClass.get_list(serverID,startDate,endDate,function(err,rows){
		res.send({"rows":rows})
	})
}