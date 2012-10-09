var itemClass = require("../../model/nysjconfig/config_items.js")
exports.action = function(req,res){
    var itemID = req.body.ItemID;
    itemClass.get_info(itemID,function(err,rows){
        res.send({"rows":rows})
    })
}