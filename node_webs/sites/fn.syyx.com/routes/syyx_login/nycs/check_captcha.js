//---------------------------------------------------------------------------------------------------------
// check_captcha.js
//---------------------------------------------------------------------------------------------------------
exports.action = function(req, res) {
    var client_ip = ms.u2.get_req_ip(req)
    var sess_captcha = req.session.captcha
    if (!sess_captcha) {
        req.session = null
        res.send({ type : 1 })
        ms.u.log(ms.u.format('[%s] check captcha failed: invalid req, value: [%s]', client_ip, req.body.v))
        return
    }

    var value = req.body.v.toLocaleLowerCase()
    if (value == sess_captcha) {
        req.session = null
        res.send({ type : 0 })
        ms.u.log(ms.u.format('[%s] check captcha ok', client_ip))

        return
    }

    req.session = null
    res.send({ type : 1 })
    ms.u.log(ms.u.format('[%s] check captcha failed: [%s] != [%s]', client_ip, value, sess_captcha))
}