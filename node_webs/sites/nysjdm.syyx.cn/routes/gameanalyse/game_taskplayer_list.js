var game_taskplayerClass = require("../../model/nycsgame/game_taskplayer.js")
exports.action = function(req,res){
    var startDate   = req.body.StartDate;
    var endDate     = req.body.EndDate;
    var serverID    = req.body.ServerID;
    var classID     = req.body.ClassID;
    var itemList    = req.body.ItemList;
    game_taskplayerClass.get_list(startDate,endDate,serverID,classID,itemList,function(err,rows){
        res.send({"rows":rows})
    })
}