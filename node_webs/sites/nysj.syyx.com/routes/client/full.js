var db_clients     = require('../../db/clients')

exports.action = function (req, res) {
    db_clients.find_client('完整客户端',function(err, result) {
        if (err) {
            console.log(err)
            res.send({ok : 0 })
            return
        }

        if (!result) {
            res.send({ok : 0 })
            return
        }

        if (!result.link) {
            res.send({ok : 0 })
            return
        }
        
        var clients_count = result.link.length
        if (clients_count < 1) {
            res.send({ ok : 0 })
            return
        }

        var random_client = Math.floor(Math.random()*clients_count)
        res.redirect(result.link[random_client])
    })
}