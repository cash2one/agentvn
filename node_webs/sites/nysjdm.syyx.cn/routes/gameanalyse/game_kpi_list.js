var game_kpiClass = require("../../model/nycsgame/game_kpi.js")
exports.action = function(req,res){
	var serverID   = req.body.ServerID;
	var startDate  = req.body.StartDate;
	var endDate    = req.body.EndDate;
	game_kpiClass.get_list(serverID,startDate,endDate,function(err,rows){
		res.send({"rows":rows})
	})
}