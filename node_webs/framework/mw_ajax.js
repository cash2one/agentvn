//------------------------------------------------------------------------------------------------
// mw_ajax.js
//------------------------------------------------------------------------------------------------
exports.jsonp = function(req, res, next) {
    var callback = req.query['callback']
    if (!callback) {
        next(); return
    }

    var send = res.send
    res.send = function(msg) {
        msg = callback + '(' + JSON.stringify(msg) + ')'
        send.call(res, msg)

        res.send = send
    }

    next(); return
}
//------------------------------------------------------------------------------------------------