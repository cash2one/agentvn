exports.action = function(req, res) {
    var user    = req.body.user
       
    if(!user || !req.body.id) {
        res.send({type : -2})
        return
    }
    
    var answer  = req.body 
    var ip      = ms.u2.get_req_ip(req)
    var id      = Number(req.body.id)
    var addtime = new Date().getTime()
    var db      = ms.db.mongo['party']
    var cl      = db.collection('question_answer')
    var cl2     = db.collection('question_list') 
    
    delete answer.user
    delete answer.id


    cl.insert({
        user    : user,
        answer  : answer,
        addtime : addtime,
        ip      : ip,
        id      : id
    }, function(err) {
        if(err){
            res.send({type : 0})
            return
        }
        cl2.find({addtime : id},{answers : 1}).toArray(function(err, arr) {
            if(err){
                res.send({type : 0})
                return
            }
            var answers = arr[0].answers + 1
            var _id     = arr[0]._id

            cl2.updateById(_id, {$set : { answers : answers }}, function(err) {
                if(err){
                    res.send({type : 0})
                    return
                }
                res.send({type : 1})
            })
        })        
    })

}