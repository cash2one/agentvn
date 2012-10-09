exports.action = function (req, res) {
    var su = req.session.user

    if( su && su["RES_SETFTP"] ){
        res.render('adminftp/main')
    }
    else{
        res.redirect('/login')
    }
}