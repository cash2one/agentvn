//-以上为读取问卷到内存-------------------------------------------------------------------

exports.action = function(req, res) {
    var addtime   = Number(req.body.id)
    var info      = req.body.info
    var q         = req.body.q

    if(!addtime || (!info && !q)) {
        res.send({type : -2})
        return
    }
    var db  = ms.db.mongo['party']
    var cl  = db.collection('question_list')
    var cl2 = db.collection('question_answer')

    if(info) {
        cl.find({addtime : addtime}).toArray(function(err ,arr) {
            if(err) {
                res.send({type : -2})
                return
            }
            if(arr.length < 0 || arr[0].stat == -1) {
                res.send({type : -1})
                return
            }
            var config = arr[0].config

            function send(type) {                
                var now = new Date().getTime()
                var arr_start = config.starttime.split("-")
                starttime = Date.parse(arr_start[1] + " " + arr_start[2] + "," + arr_start[0])

                var arr_end = config.endtime.split("-")
                endtime = Date.parse(arr_end[1] + " " + arr_end[2] + "," + arr_end[0])
                
                if(now > endtime) {
                    type = 2
                } else if(now < starttime) {
                    type = 1
                }
                res.send({
                    type        : type ,
                    name        : arr[0].name,
                    award       : arr[0].award,
                    welcome     : arr[0].welcome,
                    thanks      : arr[0].thanks,
                    login       : config.login,
                    interval    : config.interval,
                    q_len       : arr[0].question.length
                })
            }

            // if(config.iplimit) {
            //     cl2.find({ip : ip, addtime : addtime}, {user : 1}).toArray(function(err, arr){

            //         if(err) {
            //             res.send({type : -2})
            //             return
            //         }

            //         if(arr.length > 0) {
            //             send(3)
            //         }else {
            //             send(0)
            //         }      
            //     })
            // } else {
                send(0)
            //}

       })
        return
    }

    if(q) {
        cl.find({addtime : Number(addtime)}).toArray(function(err ,arr) {
            if(arr.length < 0 || arr[0].stat == -1) {
                res.send({type : -1})
                return
            }
            res.send({type : 0 , question : arr[0].question[q - 1]})
        })
    }
}