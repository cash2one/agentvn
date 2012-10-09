exports.action = function(req, res) {
    var phone = req.body.phone
    var user  = req.body.user
    var time  = new Date()
    var db    = ms.db.mongo['party']
    var cl    = db.collection('user_reg_phone')
    cl.insert({
        phone   : phone,
        user    : user,
        addtime : time
    }, function(err, data) {
        if(err) {
            console.log(err)
            res.send({type : -1})
            return
        }
        res.send({type : 0})
    })
}