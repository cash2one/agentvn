exports.action = function(req, res) {
    var id      = Number(req.body.id)
    var user    = req.body.user
    var ip      = ms.u2.get_req_ip(req)

    if(!id) {
        res.send({type : -2})
        return
    }
    var db      = ms.db.mongo['party']
    var cl      = db.collection('question_answer')
    var cl2     = db.collection('question_list')

    cl2.find({addtime : id}, {config : 1}).toArray(function(err, data) {
        if(err) {
            res.send({type : -1})
            return
        }

        if(data[0].config.iplimit) {
            cl.find({id : id, ip : ip}, {ip : 1}).toArray(function(err, arr){
                if(arr.length >= 1) {
                    res.send({type : 2})
                    return
                } else {
                    user_check(data[0].config.login)
                }
            })
        } else {
            user_check(data[0].config.login)
        }

    })

    function user_check(login) {
        if(user && login) {
            cl.find({user : user, id : id}, {user : 1}).toArray(function(err, arr){
                if(arr.length >= 1) {
                    res.send({type : 1})
                    return
                } else {
                    res.send({type : 0})
                }
            }) 
        } else {
            res.send({type : 0})
        }
    }
}