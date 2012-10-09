var linkserverClass = require("../../model/nysjconfig/config_linkserver.js")
exports.action = function(req,res){
	var serverID = req.body.ServerID
	var linkServer = req.body.LinkServer
	var serverAlias = req.body.ServerAlias
	var isEnabled = req.body.IsEnabled
	var isShow = req.body.IsShow
	var jobID = req.body.JobID
	var serverType = req.body.ServerType

	linkserverClass.add_linkserver(serverID,linkServer,serverAlias,isEnabled,isShow,jobID,serverType,function(result){
		res.send({"retcode":result})
	})
}