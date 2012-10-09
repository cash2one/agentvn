var game_civisClass = require("../../model/nycsgame/game_civis.js")
exports.action = function(req,res){
	var serverID   = req.body.ServerID;
	var startDate  = req.body.StartDate;
	var endDate    = req.body.EndDate;
	game_civisClass.get_list(serverID,startDate,endDate,function(err,rows){
		res.send({"rows":rows})
	})
}