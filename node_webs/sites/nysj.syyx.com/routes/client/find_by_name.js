var db_clients     = require('../../db/clients')

exports.action = function(req, res) {
    if (!req.body.name) {
        res.send(null)
        return
    }

    db_clients.find_by_name(req.body.name, function(err, result) {
        if (err) {
            console.log(err)
            res.send(null)
            return
        }

        res.send(result)
    })
}