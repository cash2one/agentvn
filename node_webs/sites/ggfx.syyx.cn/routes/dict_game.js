//--------------------------------------------------------------------------------------------------------
// dict_game.js
//--------------------------------------------------------------------------------------------------------
var dict = require("../model/shangyoo_dict.js")

exports.action = function(req, res) {
	var isall = parseInt(req.body.IsAll)

	dict.get_dictgame_list(isall, function(err, result){
		res.send({ retcode : err, rows : result })    	
	})   
}
//--------------------------------------------------------------------------------------------------------