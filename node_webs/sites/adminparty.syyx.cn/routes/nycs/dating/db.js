//-----------------------------------------------------------------------------------------------
var db = ms.db.mongo['party']
var dating = db.collection('dating')
//-----------------------------------------------------------------------------------------------
exports.update =  function (id, doc, cb) {
    dating.updateById(id, {$set : doc }, cb)
}
//-----------------------------------------------------------------------------------------------
exports.find_all = function(cb) {
    dating.find().toArray(cb)
}
//-----------------------------------------------------------------------------------------------
exports.find =  function(selector, cb) {
    dating.find(selector).toArray(cb)
}
//-----------------------------------------------------------------------------------------------
exports.remove = function(id, cb) {
	dating.removeById(id, cb)
}
//-----------------------------------------------------------------------------------------------
exports.insert = function(doc, cb) {
	dating.insert(doc, cb)
}
//-----------------------------------------------------------------------------------------------