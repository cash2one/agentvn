//--------------------------------------------------------------------------------------------------------
// module_mgr.js
//--------------------------------------------------------------------------------------------------------
function get_cache_id(path) {
    var cache_id = false

    for (var p in require.cache) {
        if (p.indexOf(path) > 0) {
            cache_id = p
            break
        }
    }

    return cache_id
}

function get_site_cache_id(site_name, route_name) {
    var path = false
    if (route_name) {
        path = 'node_webs/sites/' + site_name + '/routes/' + route_name + '.js'
    }
    else {
        path = 'node_webs/sites/' + site_name + '/app.js'
    }

    return get_cache_id(path)
}
//--------------------------------------------------------------------------------------------------------
function get_module_cache_id(module_name) {
    var path = 'node_webs/node_modules/' + module_name + '.js'

    var cache_id = get_cache_id(path)
    if (!cache_id) {
        path = 'node_webs/framework/' + module_name + '.js'
        cache_id = get_cache_id(path)
    }

    return cache_id
}
//--------------------------------------------------------------------------------------------------------
function clear_routes(site_name) {
    var path = 'node_webs/sites/' + site_name + '/routes/'

    var routes = []
    for (var p in require.cache) {
        if (p.indexOf(path) > 0) {
            routes.push(p)
        }
    }

    for (var i in routes) {
        var id = routes[i]
        require.cache[id] = null
    }
}
//--------------------------------------------------------------------------------------------------------
function clear_app(site_name) {
    var id = get_site_cache_id(site_name)
    if (!id) {
        console.error(site_name, 'has not been loaded')
        return false
    }

    require.cache[id] = null
    
    clear_routes(site_name)

    return true
}
//--------------------------------------------------------------------------------------------------------
exports.reload_route = function(site_name, route_name, act_name) {
    act_name = act_name || 'action'

    var app = ms.all_apps[site_name]
    if (!app) {
        console.error(site_name, 'not running')
        return false
    }

    var mod = app.action_mods[route_name]
    if (!mod) {
        console.error(site_name, 'have no route', route_name)
        return false
    }

    var cache_id = get_site_cache_id(site_name, route_name)
    if (!cache_id) {
        console.error(site_name, route_name, 'not yet be loaded, so can not be reloaded.')
        return false
    }

    require.cache[cache_id] = null

    var new_mod = require(cache_id)
    new_mod.type = mod.type
    new_mod.url  = mod.url

    var func = app[new_mod.type]
    func.call(app, new_mod.url, new_mod[act_name])

    var routes = app.routes.routes[new_mod.type]
    for (var i in routes) {
        if (routes[i].path == new_mod.url) {
            routes[i].callbacks[0] = new_mod[act_name]
        }
    }

    app.action_mods[route_name] = new_mod

    console.log(site_name, route_name, 'reloaded')

    return true
}
//--------------------------------------------------------------------------------------------------------
exports.load_vhost = function(dn, app_path, paused) {
    if (ms.all_apps[dn]) {
        console.error(dn, 'has been loaded')
        return false
    }

    if (!app_path) {
        app_path = __dirname + '/../sites/' + dn + '/app'
    }

    var app_mod  = require(app_path)
    var app      = app_mod.app
    var vhost    = ms.express.vhost(dn, app)

    app.domain   = dn
    app.vhost    = vhost
    app.paused   = paused

    ms.all_apps[dn] = app

    exports.resume_vhost(dn)

    return app
}
//-------------------------------------------------------------------------------------------------------
exports.pause_vhost = function(dn) {
    var app = ms.all_apps[dn]

    if (!app) {
        console.error(dn, 'has not been loaded')
        return false
    }

    var tmp = false
    for (var i in ms.server.stack) {
        var item = ms.server.stack[i]
        if (item.handle === app.vhost) {
            tmp = ms.server.stack.splice(i, 1)
            app.paused = true
            break
        }
    }

    return tmp
}
//-------------------------------------------------------------------------------------------------------
exports.resume_vhost = function(dn) {
    var app = ms.all_apps[dn]

    if (!app) {
        console.error(dn, 'has not been loaded')
        return false
    }

    if (!app.paused) {
        console.error(dn, 'has not been paused')
        return false
    }

    var item = { route : '', handle : app.vhost }
    ms.server.stack.push(item)

    app.paused = undefined

    return true
}
//-------------------------------------------------------------------------------------------------------
exports.unload_vhost = function(dn) {
    if (!clear_app(dn)) {
        return false
    }

    exports.pause_vhost(dn)

    ms.all_apps[dn] = null

    return true
}
//-------------------------------------------------------------------------------------------------------
exports.reload_vhost = function(dn) {
    exports.unload_vhost(dn)
    exports.load_vhost(dn, false, true)

    return true
}
//-------------------------------------------------------------------------------------------------------
exports.reload_module = function(module_name) {
    if (!ms[module_name]) {
        console.error(module_name, 'not in ms')
        return false
    }

    var cache_id = get_module_cache_id(module_name)
    if (!cache_id) {
        console.error(nodule_name, 'has not been loaded')
        return false
    }

    require.cache[cache_id] = null
    
    var new_mod = require(cache_id)
    if (!new_mod) {
        console.error(module_name, 'reload failed')
        return false
    }

    ms[module_name] = new_mod

    return new_mod
}
//-------------------------------------------------------------------------------------------------------