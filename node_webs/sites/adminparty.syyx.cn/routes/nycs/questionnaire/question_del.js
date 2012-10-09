exports.action = function(req, res) {

    var id       = req.body.id
    var user     = req.body.user
    if(!id || ! user) {
        res.send({type : -2})
        return
    }
    var db       = ms.db.mongo['party']
    var cl       = db.collection('question_list')
    var cl2      = db.collection('question_answer')
    var deltime  = new Date().getTime()
    cl.updateById(id, {$set : {deluser : user , deltime : deltime , question : [], question_cache : "" , stat : -2}}, function(err){
        if(err) {
            res.send({type : 0})
            return
        }
        cl.remove({id : id}, function() {
            if(err) {
                res.send({type : 0})
                return
            }
            res.send({type : 1, date : deltime})
        })        
    })
}