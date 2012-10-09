var game_taskloopClass = require("../../model/nycsgame/game_taskloop.js")
exports.action = function(req,res){
	var serverID   = req.body.ServerID;
	var startDate  = req.body.StartDate;
	var endDate    = req.body.EndDate;
	game_taskloopClass.get_list(serverID,startDate,endDate,function(err,rows){
		res.send({"rows":rows})
	})
}