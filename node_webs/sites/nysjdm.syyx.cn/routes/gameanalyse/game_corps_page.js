var game_corpsClass = require("../../model/nycsgame/game_corps.js")
exports.action = function(req,res){
	var serverID   = req.body.ServerID;
	var corpsName  = req.body.CorpsName;
	var page       = req.body.Page;
	var pageSize   = req.body.PageSize;
	game_corpsClass.get_page(serverID,corpsName,page,pageSize,function(err,output,rows){
		res.send({"output":output["@RowCount"],"rows":rows})
	})
}