var game_bossClass = require("../../model/nycsgame/game_boss.js")
exports.action = function(req,res){
	var serverID   = req.body.ServerID;
	var line       = req.body.Line;
	var bossID     = req.body.BossID;
	var startDate  = req.body.StartDate;
	var endDate    = req.body.EndDate;
	var page       = req.body.Page;
	var pageSize   = req.body.PageSize;
	game_bossClass.get_page(serverID,line,bossID,startDate,endDate,page,pageSize,function(err,output,rows){
		res.send({"output":output["@RowCount"],"rows":rows})
	})
}