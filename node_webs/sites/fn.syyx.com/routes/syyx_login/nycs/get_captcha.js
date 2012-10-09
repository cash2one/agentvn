//---------------------------------------------------------------------------------------------------------
// get_captcha.js
//---------------------------------------------------------------------------------------------------------
exports.action = function(req, res) {
    ms.captcha.create_captcha( function(code, data) {
        req.session.cookie._expires =  new Date((new Date()).getTime() + 1000*60*60*50)
        req.session.captcha = code

        res.header('P3P', 'CP="CAO PSA OUR"')
        res.send(data, { 'Content-Type' : 'image/png' })

        if (ms.log_debug) {
            var client_ip = ms.u2.get_req_ip(req)
            ms.u.debug(ms.u.format('[%s] [%s] [%s] get captcha [%s]', Date(), client_ip, req.session.id, req.session.captcha))
        }        
    })
}