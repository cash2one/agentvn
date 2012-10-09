var op_daily_onlineClass = require("../../model/nycsop/op_daily_online.js")
exports.action = function(req,res){
    var startDate  = req.body.StartDate;
    var endDate    = req.body.EndDate;
    var allServer  = req.body.AllServer;
    var serverID   = req.body.ServerID;
    var type       = req.body.Type;
    op_daily_onlineClass.get_list(startDate,endDate,allServer,serverID,type,function(err,rows){
        res.send({"rows":rows})
    })
}