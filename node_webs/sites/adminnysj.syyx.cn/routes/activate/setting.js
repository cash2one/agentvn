var activate_code_setting    = require('../../db/activate')

exports.action = function (req, res) {
    if(req.body.setting_id) {
        activate_code_setting.update_setting(req.body.setting_id, req.body.perhour_max_count, req.body.perminute_max_count, function(err, result) {
            if (err) {
                console.log(err)
                res.send(null)
                return
            }

            res.send({ ok : 1})
        })
    } else {
        activate_code_setting.insert_setting(req.body.perhour_max_count, function(err, result) {
            if (err) {
                console.log(err)
                res.send(null)
                return
            }

            res.send({ ok : 1})
        })
    }
}