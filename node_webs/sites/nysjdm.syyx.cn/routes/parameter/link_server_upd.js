var linkserverClass = require("../../model/nysjconfig/config_linkserver.js")
exports.action = function(req,res){
	var ID = req.body.ID
	var linkServer = req.body.LinkServer
	var serverAlias = req.body.ServerAlias
	var isEnabled = req.body.IsEnabled=="true"?1:0
	var isShow = req.body.IsShow=="true"?1:0
	var jobID = req.body.JobID
	var serverType = req.body.ServerType

	linkserverClass.upd_serverinfo(ID,linkServer,serverAlias,isEnabled,isShow,jobID,serverType,function(result){
		res.send({"retcode":result})
	})
}