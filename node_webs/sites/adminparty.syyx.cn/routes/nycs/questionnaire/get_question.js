exports.action = function(req, res) {

    var id      = req.body.id
    if(!id) {
        res.send({type : -2})
        return
    }
    var db      = ms.db.mongo['party']
    var cl      = db.collection('question_list')
    cl.findById(id, {name : 1, award : 1, welcome : 1, thanks : 1, config : 1, question : 1, question_cache : 1}, function(err, data) {
        if(!data){
            res.send({type : -1})
            return
        }
        
        if(req.body.json) {
            res.send({type : 0, data : data})
            return
        }

        if(data.question_cache) {
            res.send({type : 1 , data : data.question_cache})
        } else {
            res.send({type : 0, data : data})
        }
    })
}