var itemsClass = require("../../model/nysjconfig/config_items.js")
exports.action = function(req,res){
    var classID = req.body.ClassID;
    var getType = req.body.GetType;
    itemsClass.get_list(classID,getType,function(err,rows){
        res.send({"rows":rows})
    })
}