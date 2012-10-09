//--------------------------------------------------------------------------------------------------------
// ad_pegging.js
//--------------------------------------------------------------------------------------------------------
var adad = require("../model/ad_ad.js")

exports.action = function(req, res) {
	var adidlist = req.body.ADIDList

	adad.get_pegging_byadid(adidlist, function(err, result){
		res.send({ retcode : err, rows : result })    	
	})   
}
//--------------------------------------------------------------------------------------------------------