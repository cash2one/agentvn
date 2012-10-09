﻿//--------------------------------------------------------------------------------------------------------
// common_app.js: app main framwwork
//--------------------------------------------------------------------------------------------------------
function app_setting(app, data) {
    for (var k in data) {
        app.set(k, data[k])
    }
}
//-------------------------------------------------------------------------------------------------------
function app_init_route() {
    var self = this
    var use_js = false

    try {
        var r = require(self.dir + '/routes.js')
        use_js = true

        r.routes = r.routes || []

        for (var i = 0; i < r.routes.length; ++i) {
            var mod_name   = r.routes[i].module
            var action_mod = require(self.dir + '/routes/' + mod_name + '.js')

            action_mod.type        = r.routes[i].method
            action_mod.url         = r.routes[i].url
            action_mod.use_session = r.routes[i].use_session

            var act_name = r.routes[i].action
            var action = action_mod[act_name]
            if (!action) {
                console.error('route error:', action_mod.type, action_mod.url, mod_name, act_name)
                return
            }

            var func = self[action_mod.type]
            if (func) {
                console.log('\troute:', action_mod.type, action_mod.url, mod_name, act_name)
                func.call(self, action_mod.url, action)
            }

            self.action_mods = self.action_mods || {}
            self.action_mods[mod_name] = action_mod

            if (!action_mod.use_session) {
                ms.express.session.ignore.push(action_mod.url)
            }
        }

        process.nextTick(function() {
            self.et.emit('route_ready')
        })
    }
    catch(e) {
        if (use_js) {
            console.log(e)
            return
        }
        app_init_route2.call(self)
    }

    return self
}
//-------------------------------------------------------------------------------------------------------
function app_init_route2() {
    var self = this

    ms.csv()
        .fromPath(self.dir + '/routes.csv')
        .on('data', function(data, index) {
            if (index <= 0) {
                console.log(self.dir, 'route:')
                return
            }

            var type        = data[0]
            var url         = data[1]
            var action_str  = data[2]
            var use_session = parseInt(data[3])
            
            var action_mod  = get_route_module(self, action_str)
            action_mod.type = type
            action_mod.url  = url
            action_mod.use_session = use_session

            var action = get_route_action(self, action_str)
            if (!action) {
                console.error('route error:', type, url, action_str)
                return
            }

            var func = self[type]
            if (func) {
                console.log('\troute:', type, url, action_str)
                func.call(self, url, action)
            }

            self.action_mods = self.action_mods || {}
            var mod_name = get_route_modulename(action_str)
            self.action_mods[mod_name] = action_mod

            if (!use_session) {
                ms.express.session.ignore.push(url)
            }
        })
        .on('end', function(coun) {
            self.emit('route_ready')
        })
        .on('error', function(err) {
            console.log(err)
        })

    return self
}
//-------------------------------------------------------------------------------------------------------
exports.create = function(app_dir) {
    var app_setting_data = {
        'views'        : app_dir + '/views',
        'view engine'  : 'jade',
        'view options' : { layout : false},
    }

    var app_static_dir = app_dir + '/public'
    var stylus_src_dir = app_dir + '/public'
    var url_map_file   = app_dir + '/url_map.csv'
    var _app_static_dir = app_dir + '/_public'

    var app = ms.express.createServer()
    app.et = new ms.events.EventEmitter()

    app.dir = app_dir

    app_setting(app, app_setting_data)

    app.init_route = app_init_route

    var mem_store = new ms.express.session.MemoryStore()
    // var mem_store = new ms.mongo_session()

    app.mem_store = mem_store

    app.configure('development', function(){
        app.use(ms.stylus.middleware({ src : stylus_src_dir, compress : true }))//diff_production
        app.use(ms.params.convert_req_url)
        app.use(ms.stat.req_stat)
        app.use(ms.dev_helper.auto_js_helper)
        app.use(ms.express.static(app_static_dir, { app : app, url_map_config : url_map_file, maxAge : 1000*60*60 }))
        app.use(ms.express.cookieParser())
        app.use(ms.express.session({ key : 'syyx.sid', secret : "ShangY00", store : mem_store }))
        app.use(ms.express.bodyParser())
        delete ms.express.bodyParser.parse['multipart/form-data'];/* 火柴新增,禁用bodyParser解析二进制文件，让formidable代理*/
        app.use(ms.params.convert_req_query)
        app.use(ms.dev_helper.route_helper)//diff_production
        app.use(ms.mw_ajax.jsonp)
        app.use(app.router)
        app.use(ms.express.errorHandler({ dumpExceptions: true, showStack: true }))
    })

    app.configure('production', function(){
        app.use(ms.params.convert_req_url)
        app.use(ms.stat.req_stat)
        app.use(ms.express.static(app_static_dir, { app : app, _root : _app_static_dir, url_map_config : url_map_file, usegzip : true, maxAge : 1000*60*60 }))
        app.use(ms.express.cookieParser())
        app.use(ms.express.session({ key : 'syyx.sid', secret : "ShangY00", store : mem_store }))
        app.use(ms.express.bodyParser())
        delete ms.express.bodyParser.parse['multipart/form-data'];/* 火柴新增,禁用bodyParser解析二进制文件，让formidable代理*/
        app.use(ms.mw_ajax.jsonp)
        app.use(ms.params.convert_req_query)
        app.use(app.router)
        app.use(ms.express.errorHandler({ dumpExceptions: true, showStack: true }))
    })
    
    app.init_route()
    app.et.on('route_ready', function() {
        app.et.emit('common_init_ready')
    })

    return app
}
//-------------------------------------------------------------------------------------------------------
function get_route_module(app, action_str) {
    var a = action_str.split('.')
    if (!a) { return }

    var mod_name = a[0]
    if (!mod_name) { return }

    var action_js  = app.dir + '/routes/' + mod_name + '.js'
    var action_mod = require(action_js)

    return action_mod
}
//-------------------------------------------------------------------------------------------------------
function get_route_action(app, action_str) {
    var a = action_str.split('.')
    if (!a) { return }

    var mod_name = a[0]
    if (!mod_name) { return }

    var action_js  = app.dir + '/routes/' + mod_name + '.js'
    var action_mod = require(action_js)
    if (!action_mod) { return }

    var act_name = a[1]
    if (!act_name) {
        return action_mod['action']
    }

    return action_mod[act_name]
}
//-------------------------------------------------------------------------------------------------------
function get_route_modulename(action_str) {
    var a = action_str.split('.')
    if (!a) { return }

    return a[0]
}
//-------------------------------------------------------------------------------------------------------