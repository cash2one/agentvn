//--------------------------------------------------------------------------------------------------------
// ad_report.js
//--------------------------------------------------------------------------------------------------------
var adreport = require("../model/ad_report.js")

exports.getadphaselist = function(req, res) {
	var gameid = req.body.GameID
	var starttime = req.body.StartTime
	var endtime = req.body.EndTime
	var classid = req.body.ClassID
	var mediaid = req.body.MediaID
	var adid = req.body.ADID
	var adwebnumber = req.body.ADWebNumber
	var istotal = req.body.IsTotal
	var isschedule = req.body.IsSchedule

	adreport.get_adphase_list(gameid, starttime, endtime, classid, mediaid, adid, adwebnumber, istotal, isschedule, function(err, result){
		res.send({ retcode : err, rows : result })    	
	})
}
//--------------------------------------------------------------------------------------------------------
exports.getadperiodlist = function(req, res) {
	var gameid = req.body.GameID
	var starttime = req.body.StartTime
	var endtime = req.body.EndTime
	var classid = req.body.ClassID
	var mediaid = req.body.MediaID
	var adid = req.body.ADID
	var adwebnumber = req.body.ADWebNumber
	var isschedule = req.body.IsSchedule
	var rollday = req.body.RollDay
	
	adreport.get_adperiod_list(gameid, starttime, endtime, classid, mediaid, adid, adwebnumber, isschedule, rollday, function(err, result){
		res.send({ retcode : err, rows : result })    	
	})
}
//--------------------------------------------------------------------------------------------------------
exports.getaddailylist = function(req, res) {
	var gameid = req.body.GameID
	var stattime = req.body.StatTime
	var classid = req.body.ClassID
	var mediaid = req.body.MediaID
	var adid = req.body.ADID
	var adwebnumber = req.body.ADWebNumber
	var isschedule = req.body.IsSchedule

	adreport.get_addaily_list(gameid, stattime, classid, mediaid, adid, adwebnumber, isschedule, function(err, result){
		res.send({ retcode : err, rows : result })    	
	})
}
//--------------------------------------------------------------------------------------------------------
exports.getadphaseselist = function(req, res) {
	var gameid = req.body.GameID
	var starttime = req.body.StartTime
	var endtime = req.body.EndTime
	var isschedule = req.body.IsSchedule

	adreport.get_adphase_se_list(gameid, starttime, endtime, isschedule, function(err, result){
		res.send({ retcode : err, rows : result })    	
	})
}
//--------------------------------------------------------------------------------------------------------
exports.getadperiodselist = function(req, res) {
	var gameid = req.body.GameID
	var starttime = req.body.StartTime
	var endtime = req.body.EndTime
	var isschedule = req.body.IsSchedule

	adreport.get_adperiod_se_list(gameid, starttime, endtime, isschedule, function(err, result){
		res.send({ retcode : err, rows : result })    	
	})
}
//--------------------------------------------------------------------------------------------------------