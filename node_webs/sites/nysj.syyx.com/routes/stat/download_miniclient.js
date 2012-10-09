var db_clients = require('../../db/clients')

exports.action = function(req, res) {
    db_clients.intall_client_stat('微型客户端',function(err, result) {
        if (err) {
            console.log(err)
        }
    })

    res.send("<html>1</html>")

    var db      = ms.db.mssql['NYCS_Game'] 
    var sp_name = 'cp_TimeInstallStatDetail_AddRecord'
    var args    = [ ms.u2.get_req_ip(req), 2 ]
    db.exec_sp(sp_name, args, function(err, rows, output, ret) {
        if (err) {
            console.log(err)            
        }
    })
}