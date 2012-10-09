exports.action = function(req, res){
    var pic = {
        r : req.body.r,
        url : req.body.url
    }

    res.render('nycs/sing/upload_end',pic)
}