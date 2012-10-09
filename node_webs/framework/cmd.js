//--------------------------------------------------------------------------------------------------------
// cmd.js
//--------------------------------------------------------------------------------------------------------
var all_cmds = {
    ls                  : 'list all commands',
    ls_sites            : 'list all web sites',
    reload_module       : 'reload module',
    reload_route        : 'reload route',
    pause               : 'pause a site',
    resume              : 'resume a site',
    stop                : 'stop a site',
    start               : 'start a site',
    mem                 : 'memory usage',
    tick                : 'tick count',
    switch_to_odbc      : 'switch to odbc',
    switch_to_tds       : 'switch to tds',  
    ls_dbs_info         : 'list all dbserver info',
    stop_captcha        : 'stop refreshing captcha buffer',
    restart_captcha     : 'restart refreshing captcha buffer',
    reqs                : 'show req stat',
    conns               : 'show connections stat',
    update              : 'execute update script file',
    remove_tshirt_db    : 'remove tshirt database from form hr',
    output_routes       : 'output routes'
}
//--------------------------------------------------------------------------------------------------------
exports.ls = function() {
    for (var cmd in all_cmds) {
        console.log(cmd, '\t\t', all_cmds[cmd])
    }
}
//--------------------------------------------------------------------------------------------------------
exports.ls_sites = function() {
    for (var k in ms.all_apps) {
        var app = ms.all_apps[k]
        console.log(app.domain, '\t', (!app.paused))
    }
}
//--------------------------------------------------------------------------------------------------------
exports.reload_module = function(name) {
    ms.module_mgr.reload_module(name)
    if (name == 'cmd') {
        cmd = ms.cmd
    }
}
//--------------------------------------------------------------------------------------------------------
exports.reload_route = function(site, route) {
    ms.module_mgr.reload_route(site, route)
}
//--------------------------------------------------------------------------------------------------------
exports.pause = function(name) {
    ms.module_mgr.pause_vhost(name)
}
//--------------------------------------------------------------------------------------------------------
exports.resume = function(name) {
    ms.module_mgr.resume_vhost(name)
}
//--------------------------------------------------------------------------------------------------------
exports.stop = function(name) {
    ms.module_mgr.unload_vhost(name)
}
//--------------------------------------------------------------------------------------------------------
exports.start = function(name) {
    ms.module_mgr.reload_vhost(name)
}
//--------------------------------------------------------------------------------------------------------
exports.mem = function() {
    var m = process.memoryUsage()
    console.log(ms.u.inspect(m))
}
//--------------------------------------------------------------------------------------------------------
exports.tick = function() {
    var old_date = new Date()

    process.nextTick(function() {
        var new_date = new Date()
        var diff = new_date.valueOf() - old_date.valueOf()

        var old_write = ms.telnet.redirect_stdout(__telnet_user)
        console.log(diff)
        process.stdout.write = old_write
    })
}
//--------------------------------------------------------------------------------------------------------
exports.switch_to_odbc = function() {
    ms.dbs   = ms.db_odbc
    ms.mssql = ms.mssql_odbc
}
//--------------------------------------------------------------------------------------------------------
exports.switch_to_tds = function() {
    ms.dbs   = ms.db_tds
    ms.mssql = ms.mssql_tds
}
//--------------------------------------------------------------------------------------------------------
exports.ls_dbs_info = function() {
    if( ms.mssql == ms.mssql_odbc ) {
        console.log("\ncurrent dbs module : odbc")
        console.log("dsn\t\trequest queue length")
        
        for(var i=0; i<ms.dbserver_odbc.length; i++) {
            console.log(ms.dbserver_odbc[i].host + "\t" + ms.dbserver_odbc[i].db.req_queue.length)
        }
    }    
    
    else {     
        console.log("\ncurrent dbs module : freetds")
        console.log("host\t\tconnnection count\trequest queue length")
        
        for(var i=0; i<ms.dbserver_tds.length; i++) {
            console.log(ms.dbserver_tds[i].host + "\t" + ms.dbserver_tds[i].db.conn_count 
                        + "\t\t" + ms.dbserver_tds[i].db.req_queue.length)
        }
    }

}
//--------------------------------------------------------------------------------------------------------
exports.stop_captcha = function() {
    ms.captcha.refresh_flag = false
}
//--------------------------------------------------------------------------------------------------------
exports.restart_captcha = function() {
    ms.captcha.refresh_flag = true
}
//--------------------------------------------------------------------------------------------------------
exports.reqs = function() {
    for (var k in ms.all_apps) {
        var app = ms.all_apps[k]

        console.log(k)
        console.log('\tcurrent:', app.req_cur_count)
        console.log('\ttotal  :', app.req_total_count.x, app.req_total_count.y, app.req_total_count.z)
        console.log('')
    }
}
//--------------------------------------------------------------------------------------------------------
exports.conns = function() {
    console.log('current:', ms.server.connect_cur_count)
    console.log('max    :', ms.server.connect_max_count)
    console.log('total  :', ms.server.connect_total_count.x, ms.server.connect_total_count.y, ms.server.connect_total_count.z)
}
//--------------------------------------------------------------------------------------------------------
exports.update = function(update_file) {
    var file_path = process.env['HOME'] + '/syyx_conf/update/' + update_file
    try {
        require(file_path)
        console.log('ok')
    }
    catch (e) {
        console.log(e)
    }
}
//--------------------------------------------------------------------------------------------------------
exports.remove_tshirt_db = function() {
    var db = ms.db_mongo['hr']
    db.dropCollection('tshirt_vote', function(err) {
        if(err) {
            console.log(err)
            console.log("tshirt_vote remove fail")
            return
        }
        console.log("tshirt_vote remove success")
    })
}
//--------------------------------------------------------------------------------------------------------
exports.output_routes = function(m) {
    console.log('exports.routes = [')

    for (var k in m) {
        console.log('    { method : "' + m[k].type + '", url : "' + m[k].url + '", module : "' + k + '", action : "' + 'action' + '", use_session : ' + m[k].use_session + ' },')
    }

    console.log(']')
}
//--------------------------------------------------------------------------------------------------------
exports.test_mongo_insert = function(cl, max) {
    function _insert(i) { 
        if (i > max) {
            console.log('finish')
            return
        }
        
        console.log(i)
        ms.db.mongo.hr.collection(cl).insert({ a : '' + i }, function(e, r) {
            if (e) { 
                console.log(e) 
                return
            }
            console.log(i, 'ok')
            _insert(++i) 
        })
    }

    _insert(0)
}
//--------------------------------------------------------------------------------------------------------