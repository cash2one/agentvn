exports.action = function(req, res){
    var pic = {
        r : req.body.r,
        p1 : req.body.p1,
        p2 : req.body.p2,
        w : req.body.w,
        h : req.body.h
    }

    res.render('nycs/notalone/upload_end',pic)
}