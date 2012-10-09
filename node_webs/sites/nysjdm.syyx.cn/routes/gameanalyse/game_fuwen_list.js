var game_fuwenClass = require("../../model/nycsgame/game_table2.js")
exports.action = function(req,res){
    var tableName   = req.body.TableName;
    var startDate   = req.body.StartDate;
    var endDate     = req.body.EndDate;
    var serverID    = req.body.ServerID;
    var classID     = req.body.ClassID;
    var itemList    = req.body.ItemList;
    var qualityID   = req.body.QualityID;
    game_fuwenClass.get_list(tableName,startDate,endDate,serverID,classID,itemList,qualityID,function(err,rows){
        res.send({"rows":rows})
    })
}