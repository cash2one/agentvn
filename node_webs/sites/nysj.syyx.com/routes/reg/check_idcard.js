//--------------------------------------------------------------------------------------------------------
// check_idcard.js
//--------------------------------------------------------------------------------------------------------
exports.action = function(req, res) {
    var idcard = req.body.v
    
    if (ms.u2.check_idcard(idcard)) {
        res.send({ type : 0 })
    }
    else {
        res.send({ type : 1 })
    }
}
//--------------------------------------------------------------------------------------------------------