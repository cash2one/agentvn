//--------------------------------------------------------------------------------------------------------
// ad_monitor.js
//--------------------------------------------------------------------------------------------------------
var admonitor = require("../model/ad_monitor.js")

exports.getdatelist = function(req, res) {
	var gameid = req.body.GameID
	var classid = req.body.ClassID
	var mediaid = req.body.MediaID
	var adid = req.body.ADID
	var adwebnumber = req.body.ADWebNumber
	var starttime = req.body.StartTime
	var endtime = req.body.EndTime

	admonitor.get_admonitor_day_list(gameid, classid, mediaid, adid, adwebnumber, starttime, endtime, function(err, result){
		res.send({ retcode : err, rows : result })    	
	})
}
//--------------------------------------------------------------------------------------------------------
exports.gethourlist = function(req, res) {
	var gameid = req.body.GameID	
	var classid = req.body.ClassID
	var mediaid = req.body.MediaID
	var adid = req.body.ADID
	var adwebnumber = req.body.ADWebNumber
	var starttime = req.body.StartTime
	var endtime = req.body.EndTime
	
	admonitor.get_admonitor_hour_list(gameid, classid, mediaid, adid, adwebnumber, starttime, endtime, function(err, result){
		res.send({ retcode : err, rows : result })    	
	})
}
//--------------------------------------------------------------------------------------------------------
