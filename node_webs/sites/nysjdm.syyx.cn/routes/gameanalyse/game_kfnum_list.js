var game_kfnumClass = require("../../model/nycsgame/game_kfnum.js")
exports.action = function(req,res){
	var serverID   = req.body.ServerID;
	var startDate  = req.body.StartDate;
	var endDate    = req.body.EndDate;
	var kfType      = req.body.KfType;
	game_kfnumClass.get_list(serverID,startDate,endDate,kfType,function(err,rows){
		res.send({"rows":rows})
	})
}