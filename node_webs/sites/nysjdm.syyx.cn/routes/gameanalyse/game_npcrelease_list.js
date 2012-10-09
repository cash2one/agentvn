var game_npcreleaseClass = require("../../model/nycsgame/game_npcrelease.js")
exports.action = function(req,res){
	var startDate  = req.body.StartDate;
	var endDate    = req.body.EndDate;
	var serverList = req.body.ServerList;
	var typeID     = req.body.TypeID;
	game_npcreleaseClass.get_list(startDate,endDate,serverList,typeID,function(err,rows){
		res.send({"rows":rows})
	})
}