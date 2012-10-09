var game_changeinfoClass = require("../../model/nycsgame/game_table3.js")
exports.action = function(req,res){
    var tableName   = req.body.TableName;
    var startDate   = req.body.StartDate;
    var endDate     = req.body.EndDate;
    var serverID    = req.body.ServerID;
    var classID     = req.body.ClassID;
    var itemList    = req.body.ItemList;
    var isAdd       = req.body.IsAdd;
    game_changeinfoClass.get_list(tableName,startDate,endDate,serverID,classID,itemList,isAdd,function(err,rows){
        res.send({"rows":rows})
    })
}