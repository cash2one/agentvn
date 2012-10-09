//--------------------------------------------------------------------------------------------------------
// convert_req.js
//--------------------------------------------------------------------------------------------------------
exports.convert_req_query = function(req, res, next) {
    for(var key in req.query){
        req.body[key] = req.query[key]
    }
    next()
}
//--------------------------------------------------------------------------------------------------------
exports.convert_req_url = function(req, res, next) {
    if( req.url.indexOf('?') < 0 ) {
        req.url = req.url.toLocaleLowerCase()
    }
    next()
}