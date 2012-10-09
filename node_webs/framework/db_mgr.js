//-------------------------------------------------------------------------------------------------
// db_mgr.js
//-------------------------------------------------------------------------------------------------
var mssql_module = require('mssql_tds')
var mongo_module = require('mongoskin')
// var mysql_module = require('mysql')
//-------------------------------------------------------------------------------------------------
exports.dbs_list = {
	mssql : {},
	mysql : {},
	mongo : {},
}
//-------------------------------------------------------------------------------------------------
exports.mssql = {}
exports.mysql = {}
exports.mongo = {}
//-------------------------------------------------------------------------------------------------
function mssql_db(dbs, db_name) {
    this.dbs = dbs
    this.db_name = db_name
}
mssql_db.prototype.exec_sp = function(sp_name, args, cb) {
    mssql_module.exec_sp(this.dbs, this.db_name, sp_name, args, cb)
}

mssql_db.prototype.exec_sql = function(sql, cb) {
    mssql_module.exec_sql(this.dbs, this.db_name, sql, cb)
}
//-------------------------------------------------------------------------------------------------
function mysql(dbs, db_name) {
    this.dbs = dbs
    this.db_name = db_name
}
mysql.prototype.exec_sp = function(sp_name, args, cb) {
    mysql_module.exec_sp(this.dbs, this.db_name, sp_name, args, cb)
}

mysql.prototype.exec_sql = function(sql, cb) {
    mysql_module.exec_sql(this.dbs, this.db_name, sql, cb)
}
//-------------------------------------------------------------------------------------------------
var mssql_conn_module = function(args, cb) {
    if(exports.dbs_list.mssql[args.host]) {
        cb()
        return
    }

    mssql_module.open(args, function(db) {

        exports.dbs_list.mssql[args.host] = { db : db , host : args.host } 

        var sql_str = "SELECT Name FROM Master..SysDatabases ORDER BY Name;"

        db.query(null, sql_str, function(err, rows) {
            if (err) {
                throw err
            }
            
            console.log('\nhost:', args.host)

            for (var k in rows) {
                exports.mssql[rows[k].Name] = new mssql_db(db, rows[k].Name)
                console.log('\t' + rows[k].Name)
            }

            cb()
        })   
    })       
}
//-------------------------------------------------------------------------------------------------------
var mysql_conn_module = function(args, cb) {
    if(exports.dbs_list.mysql[args.host]) {
        cb()
        return
    }

    mysql_module.open(args, function(conn) {

        exports.dbs_list.mysql[args.host] = { db : db , host : args.host } 
        
        var sql_str = "show databases;"

        conn.query(sql_str, function(err, res) {
            res.fetchAll(function (err, rows) {                 
                console.log('\nmysql host:', args.host)

                for (var k in rows) {
                    exports.mysql[rows[k].Database] = new mysql_db(conn, rows[k].Database)
                    console.log('\t' + rows[k].Database)
                }
                
                cb()
            })
        }) 
    })       
}
//-------------------------------------------------------------------------------------------------------
var mongo_conn_module = function(args, cb) {
    if(exports.dbs_list.mysql[args.host]) {
        cb()
        return
    }

    var ip   = args.host
    var port = args.port
    var uid  = args.user
    var pwd  = args.password

    var connection = uid + ':' + pwd + '@' + ip + ':' + port + '/admin'              
    
    var db = mongo_module.db(connection)

    exports.dbs_list.mongo[args.host] = { db : db , host : args.host } 

    db.admin.listDatabases(function(e, r) {
        if (e) {
            console.error(e)
            return
        }

        console.log('connect to mongodb ok :', ip + ':' + port + '/admin')  

        for (var i = 0; i < r.databases.length; ++i) {
            var db_name = r.databases[i].name
            if (db_name == 'admin') {
                continue
            }
            var connection = uid + ':' + pwd + '@' + ip + ':' + port + '/' + db_name
            exports.mongo[db_name] = mongo_module.db(connection)
            console.log('\t', db_name)
        }               

        cb() 
    })
}
//-------------------------------------------------------------------------------------------------------
var dbs_conn_module_map = {
	mssql : mssql_conn_module,
	mysql : mysql_conn_module,
	mongo : mongo_conn_module,		
}
//-------------------------------------------------------------------------------------------------------
exports.conn_dbs = function(db_type, args ,cb) {
	var conn_module = dbs_conn_module_map[db_type]
	conn_module(args, cb)
}
//-------------------------------------------------------------------------------------------------------