//------------------------------------------------------------------------------------------------
// vote_result.js
//------------------------------------------------------------------------------------------------
exports.action = function(req, res) {
    var ip = ms.u2.get_req_ip(req)
    if(ip != "192.168.3.62" && ip != "192.168.5.25" && ip != "192.168.5.34" && ip != "192.168.2.1" ) {
        res.send({ type : 2 })
    }
    var db = ms.db_mongo['hr']
    var cl = db.collection('tshirt_vote')

    cl.find().toArray(function(err, arr) {
        if (err) {
            console.log(err)
            res.send({ type : 1 })
            return
        }

        var r = {}

        for (var i = 0; i < arr.length; ++i) {
            var id = arr[i].data[0]
            r[id] = r[id] || 0
            r[id] += 1

            id = arr[i].data[1]
            if (!id) {
                continue
            }

            r[id] = r[id] || 0
            r[id] += 1

            id = arr[i].data[2]
            if (!id) {
                continue
            }

            r[id] = r[id] || 0
            r[id] += 1
        }

        res.send({ type : 0, result : r })
    })
}
//------------------------------------------------------------------------------------------------