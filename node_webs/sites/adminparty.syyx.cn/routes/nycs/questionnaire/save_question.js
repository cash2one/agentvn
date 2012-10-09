
exports.action = function(req, res) {

    var id      = req.body.id
    var stat    = req.body.stat
    var q_data  = req.body.data
    if(!id || !q_data) {
        res.send({type : -2})
        return
    }
    var db       = ms.db.mongo['party']
    var cl       = db.collection('question_list')

    if(stat == 0) {
        eval("var data = " + q_data)
        data.stat = 0
        data.question_cache = q_data
        cl.updateById(id, {$set : data}, function(err){
            if(err) {
                res.send({type : 0})
                return
            }
            res.send({type : 1})
        })
    } else {
        cl.updateById(id, {$set : {question_cache : q_data, stat : -1}}, function(err){
            if(err) {
                res.send({type : 0})
                return
            }
            res.send({type : 1})
        })
    }
}