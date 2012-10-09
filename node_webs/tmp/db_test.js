var db = require('mssql_tds')
var db_info = { host : '192.168.1.246\\sql2008', user : 'sa', password : 'soholife123' }
var db_name = 'Admin_Service'

ms = {}

db.open(db_info, function(conn) {
    db.exec_sql(conn, db_name, 'select * from CustomAsk', function(err, rows) {
        for (var i = 0; i < rows.length; ++i) {
            var id = rows[i]['ID']
            db.exec_sql(conn, db_name, 'select * from ServeiceAnswer where AskID = ' + id + ' and ' + "AddTime >= '2012-6-1'", function(err, rows) {
                if (rows.length > 0) {
                    var output = '' + rows[0].AskID + ','
                    for (var j = 0; j < rows.length; ++j) {
                        output = output + rows[j].AnswerType + ',"' + rows[j].Content + '",'
                    }
                    console.log(output)
                }
                
            })
        }
    })
})
