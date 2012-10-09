var game_moneyliftClass = require("../../model/nycsgame/game_moneylift.js")
exports.action = function(req,res){
	var serverID   = req.body.ServerID;
	var startDate  = req.body.StartDate;
	var endDate    = req.body.EndDate;
	game_moneyliftClass.get_list(serverID,startDate,endDate,function(err,rows){
		res.send({"rows":rows})
	})
}