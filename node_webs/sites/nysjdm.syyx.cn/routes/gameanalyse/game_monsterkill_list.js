var game_monsterkillClass = require("../../model/nycsgame/game_monsterkill.js")
exports.action = function(req,res){
    var startDate   = req.body.StartDate;
    var endDate     = req.body.EndDate;
    var serverID    = req.body.ServerID;
    var itemList    = req.body.ItemList;
    game_monsterkillClass.get_list(startDate,endDate,serverID,itemList,function(err,rows){
        res.send({"rows":rows})
    })
}