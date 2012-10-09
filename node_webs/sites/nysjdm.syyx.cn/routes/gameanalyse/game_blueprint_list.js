var game_blueprintClass = require("../../model/nycsgame/game_blueprint.js")
exports.action = function(req,res){
    var tableName   = req.body.TableName;
    var serverID    = req.body.ServerID;
    var startDate   = req.body.StartDate;
    var endDate     = req.body.EndDate;
    var blueprintID = req.body.BlueprintID;
    var qualityID   = req.body.QualityID;
    var levels      = req.body.Levels;
    var itemList    = req.body.ItemList;
    game_blueprintClass.get_list(tableName,serverID,startDate,endDate,blueprintID,qualityID,levels,itemList,function(err,rows){
        res.send({"rows":rows})
    })
}