//--------------------------------------------------------------------------------------------------------
// ad_kpi.js
//--------------------------------------------------------------------------------------------------------
var adkpi = require("../model/ad_kpi.js")

exports.getkpidaylist = function(req, res) {
	var gameid = 1
	var starttime = req.body.StartTime
	var endtime = req.body.EndTime
	var key = req.body.Key

	adkpi.get_adkpi_day_list(gameid, starttime, endtime, key, function(err, result){
		res.send({ retcode : err, rows : result })    	
	})
}
//--------------------------------------------------------------------------------------------------------
exports.getkpimonthlist = function(req, res) {
	var gameid = 1
	var starttime = req.body.StartTime
	var endtime = req.body.EndTime
	var key = req.body.Key

	adkpi.get_adkpi_month_list(gameid, starttime, endtime, key, function(err, result){
		res.send({ retcode : err, rows : result })    	
	})
}
//--------------------------------------------------------------------------------------------------------
exports.getkpimonthdetail = function(req, res) {
	var gameid = 1
	var starttime = req.body.StartTime
	var endtime = req.body.EndTime

	adkpi.get_adkpi_month_detail(gameid, starttime, endtime, function(err, result){
		res.send({ retcode : err, rows : result })    	
	})
}
//--------------------------------------------------------------------------------------------------------