var game_taskacceptClass = require("../../model/nycsgame/game_taskaccept.js")
exports.action = function(req,res){
	var serverID   = req.body.ServerID;
	var startDate  = req.body.StartDate;
	var endDate    = req.body.EndDate;
	var taskID     = req.body.TaskID;
	game_taskacceptClass.get_list(serverID,startDate,endDate,taskID,function(err,rows){
		res.send({"rows":rows})
	})
}