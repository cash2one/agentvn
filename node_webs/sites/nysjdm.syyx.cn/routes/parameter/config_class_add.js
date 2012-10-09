var configClass = require("../../model/nysjconfig/config_class.js")
exports.action = function(req,res){
    var classNo = req.body.ClassNo;
    var className = req.body.ClassName;
    var paramsType = req.body.ParamsType;
    configClass.add_info(classNo,className,paramsType,function(err){
        res.send({"err":err})
    })
}