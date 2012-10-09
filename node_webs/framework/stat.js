//--------------------------------------------------------------------------------------------------------
// stat.js
//--------------------------------------------------------------------------------------------------------
exports.req_stat = function(req, res, next) {
    var app = req.app
    var route = get_route(req.url)

    app.stat_info = app.stat_info || {}

    app.stat_info[route] = app.stat_info[route] || 0
    app.stat_info[route] += 1

    stat_special_route(route, req)

    next()
}
//--------------------------------------------------------------------------------------------------------
function stat_special_route(route, req) {
    var app = req.app
    app.all_special_routes = app.all_special_routes || {}

    if (!app.all_special_routes[route]) {
        return
    }

    var req_ip = req.connection.remoteAddress

    app.special_routes = app.special_routes || {}
    app.special_routes[route] = app.special_routes[route] || {}
    app.special_routes[route][req_ip] = app.special_routes[route][req_ip] || 0
    app.special_routes[route][req_ip] += 1
}
//--------------------------------------------------------------------------------------------------------
function get_route(url) {
    var i = url.indexOf('?')
    if (i > 0) {
        return url.substring(0, i)
    }

    return url
}
//--------------------------------------------------------------------------------------------------------
exports.app_setting = function(app) {
    app.req_cur_count = 0
    app.req_total_count = {}

    init_huge_counter(app.req_total_count)

    app.on('request', function(req, res) {
        inc_app_req(app)

        req.once('end', function() {
            dec_app_req(app)
        })
    })
}

function inc_app_req(app) {
    app.req_cur_count += 1
    inc_huge_counter(app.req_total_count)
}

function dec_app_req(app) {
    if (app.req_cur_count <= 0) {
        return
    }

    app.req_cur_count -= 1
}
//-------------------------------------------------------------------------------------------------------
exports.server_setting = function(server) {
    server.connect_cur_count   = 0
    server.connect_max_count   = 0
    server.connect_total_count = {}

    init_huge_counter(server.connect_total_count)

    server.on('connection', function(sock) {
        inc_server_connect(server)

        sock.once('close', function() {
            dec_server_connect(server)
        })
    })
}

function inc_server_connect(server) {
    server.connect_cur_count += 1
    if(server.connect_cur_count>server.connect_max_count) {
        server.connect_max_count = server.connect_cur_count
    }

    inc_huge_counter(server.connect_total_count)
}

function dec_server_connect(server) {
    if (server.connect_cur_count <= 0) {
        return
    }

    server.connect_cur_count -= 1
}
//-------------------------------------------------------------------------------------------------------
var max_field_count = 1000000
var max_field_count_1 = max_field_count - 1

function init_huge_counter(o) {
    o.x = 0
    o.y = 0
    o.z = 0
}

function inc_huge_counter(o) {
    o.z += 1

    if (o.z >= max_field_count) {
        o.z = 0
        o.y += 1

        if (o.y >= max_field_count) {
            o.y = 0
            o.x += 1

            if (o.x >= max_field_count) {
                o.x = 0
                o.y = 0
                o.z = 0

                console.error("huge count overflow, it's crazy!")
            }
        }
    }
}

function dec_huge_counter(o) {
    o.z -= 1

    if (o.z < 0) {
        o.z = max_field_count_1
        o.y -= 1

        if (o.y < 0) {
            o.y = max_field_count_1
            o.x -= 1

            if (o.x < 0) {
                o.x = 0
                o.y = 0
                o.z = 0

                console.error("huge count underflow, it's unacceptable.")
            }
        }
    }
}
//-------------------------------------------------------------------------------------------------------
