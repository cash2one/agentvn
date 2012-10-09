//---------------------------------------------------------------------------------------------------------
// get_captcha.js
//---------------------------------------------------------------------------------------------------------
exports.action = function(req, res) {
    ms.captcha.create_captcha( function(code, data) {
        req.session.cookie._expires = false
        req.session.captcha = code

        res.header('P3P', 'CP="CAO PSA OUR"')
        res.header('Content-Type', 'image/png')
        res.send(data)

        if (ms.log_debug) {
            var client_ip = ms.u2.get_req_ip(req)
            ms.u.debug(ms.u.format('[%s] [%s] [%s] get captcha [%s]', Date(), client_ip, req.session.id, req.session.captcha))
        }        
    })
}

