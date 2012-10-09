exports.action = function(req, res) {
    var db      = ms.db.mssql['NYCS_Station']
    var sp_name = 'cp_temp_midsummer2012_AddRecord'

    if (!db) {
        console.log('NYCS_Station not connected')
        res.send("2")
        return
    }

    var args = [ req.body.friend_name, req.body.friend_qq ,req.body.friend_email, req.body.name, req.body.server]
    db.exec_sp(sp_name, args, function(err, rows, output_params, ret_value) {
        if (err) {
            console.error(err)
            res.send("3")
            return
        }
        res.send(ret_value.toString())
    })
}