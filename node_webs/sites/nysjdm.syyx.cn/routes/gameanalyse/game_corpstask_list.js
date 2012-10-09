var game_corpstaskClass = require("../../model/nycsgame/game_corpstask.js")
exports.action = function(req,res){
    var startDate   = req.body.StartDate;
    var endDate     = req.body.EndDate;
    var serverID    = req.body.ServerID;
    var classID     = req.body.ClassID;
    var itemList    = req.body.ItemList;
    var corpsName   = req.body.CorpsName;
    game_corpstaskClass.get_list(startDate,endDate,serverID,classID,itemList,corpsName,function(err,rows){
        res.send({"rows":rows})
    })
}