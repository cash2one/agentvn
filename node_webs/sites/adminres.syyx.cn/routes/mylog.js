
exports.action = function (req, res) {
    var su = req.session.user

    if( su && (su["RES_UPLOAD"] || su["RES_ALLLOG"])){
        res.render('mylog/main')
    }
    else{
        res.redirect('/login')
    }    
    
}