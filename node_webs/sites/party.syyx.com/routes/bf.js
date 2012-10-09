//--------------------------------------------------------------------------------------------------------
// bf.js
//--------------------------------------------------------------------------------------------------------
exports.action = function(req, res) {
    var account  = req.body.account
    var party_id = req.body.party_id
    var bf_id    = req.body.bf_id
    var bf_type  = req.body.bf_type
    var bf_data  = req.body.bf_data

    if (!check_bf_data(bf_type, bf_data)) {
        res.send({ retcode : 1 })
        return
    }

    var party = ms.party.get_party(party_id)
    if (!party) {
        res.send({ retcode : 2 })
        return
    }

    bf_data.account = account
    var ret_data = party.participate(bf_id, bf_data) || {}

    ret_data.retcode = 0
    res.send(ret_data)
}
//--------------------------------------------------------------------------------------------------------
var bfs_data = {
    'vote' : {
        vote_type : '',
        candi_id  : 0,
        info : {},
    },
    'leavemsg' : {
        msg : '',
    },
    'lottery' : {
        step : 0,
    },
    'upload' : {
        file_name : '',
        info : {},
    },
}
//--------------------------------------------------------------------------------------------------------
function check_bf_data(type, data) {
    var bf_data = bfs_data[type]
    if (!bf_data) {
        return false
    }

    for (var k in bf_data) {
        var v = data[k]
        if (v === undefined) {
            console.error('bf error', type, data, k)
            return false
        }

        if (typeof v != typeof bf_data[k]) {
            console.error('bf type error', type, data, k)
            return false
        }
    }

    return true
}
//--------------------------------------------------------------------------------------------------------