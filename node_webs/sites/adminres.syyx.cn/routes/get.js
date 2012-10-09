exports.action = function (req, res){
	var su = req.session.user
	if( su && su["RES_UPLOAD"]){
		res.render('get/main')
	}
	else{
		res.redirect('/login')
	}
}