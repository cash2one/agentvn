//------------------------------------------------------------------------------------------------
// vote.js
//------------------------------------------------------------------------------------------------
exports.action = function(req, res) {
    var id = req.body.id
    var ip = ms.u2.get_req_ip(req)
    if(!req.app.ip[ip]) {
        res.send({ type : -1 })
        return
    }

    tshirt_vote(ip, id, function(ret) {
        res.send({ type : ret })
    })
}
//------------------------------------------------------------------------------------------------
function tshirt_vote(ip, id, cb) {
    var db = ms.db_mongo['hr']
    var cl = db.collection('tshirt_vote')

    multi_vote(cl, ip, id, cb, function() {
        var vote = {}
        vote.ip = ip
        vote.data = [ id ]

        save_vote(cl, vote, cb)
    })
}
//------------------------------------------------------------------------------------------------
function multi_vote(cl, ip, id, cb, single_vote) {
    cl.find({ ip : ip }).toArray(function(err, arr) {
        if (err) {
            console.log(err)
            cb(5); return
        }

        if (arr.length > 1) {
            cb(3); return
        }

        if (arr.length == 1) {
            var vote = arr[0]

            if (!vote.data || vote.data.length <= 0) {
                cb(4); return
            }

            if (vote.data.length >= 3) {
                cb(2); return
            }

            if (id == vote.data[0] || id == vote.data[1] || id == vote.data[2]) {
                cb(1); return
            }

            vote.data.push(id)
            save_vote(cl, vote, cb)

            return
        }

        single_vote()
    })
}
//------------------------------------------------------------------------------------------------
function save_vote(cl, vote, cb) {
    cl.save(vote, null, function(err) {
        if (err) {
            console.log(err)
            cb(6); return
        }

        cb(0); return
    })
}
//------------------------------------------------------------------------------------------------