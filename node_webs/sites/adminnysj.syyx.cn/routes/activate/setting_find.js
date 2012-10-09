var activate_code_setting    = require('../../db/activate')

exports.action = function (req, res) {
    activate_code_setting.find_setting(function(err, result) {
        if (err) {
            console.log(err)
            res.send(null)
            return
        }

        res.send(result)
    })
}