var game_battleClass = require("../../model/nycsgame/game_battle.js")
exports.action = function(req,res){
	var serverID   = req.body.ServerID;
	var startDate  = req.body.StartDate;
	var endDate    = req.body.EndDate;
	var line       = req.body.Line;
	var flag       = req.body.Flag;
	game_battleClass.get_list(serverID,startDate,endDate,line,flag,function(err,rows){
		res.send({"rows":rows})
	})
}