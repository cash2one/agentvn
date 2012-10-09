//--------------------------------------------------------------------------------------------------------
// ad_webnumber.js
//--------------------------------------------------------------------------------------------------------
var adwebnumber = require("../model/ad_webnumber.js")

exports.action = function(req, res) {
	var adid = req.body.ADID

	adwebnumber.get_list(adid, function(err, result){
		res.send({ retcode : err, rows : result })    	
	})   
}
//--------------------------------------------------------------------------------------------------------