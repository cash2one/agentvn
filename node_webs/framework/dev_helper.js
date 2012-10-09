//--------development模式下添加一些用于快速调试的小工具----------------------------------------
//--------1.根据url,render静态页模板------------------------------------------------------
var url  = require('url')
var fs   = require('fs')
var csv  = require('csv')

exports.route_helper = function (req, res, next) {
    var site_path    = req.app.dir
    var path_name    = url.parse(req.url).pathname
    var exist_routes = req.app.routes.routes

    //skip_exist_routes
    for(var key in exist_routes) {
        for(var ruote_index = 0; ruote_index < exist_routes[key].length; ruote_index++) {
            if(exist_routes[key][ruote_index].path == path_name) {
                next()
                return
            }
        }
    }

    //render_main.jade
    fs.readdir(site_path + '/views' + path_name, function(err, files) {
        if(err) {
            next()
            return
        }
        for(var i = 0; i < files.length; i++) {
            if(files[i] == 'main.jade') {
                console.log('dev_route_helper: ' +  path_name)
                path_name = path_name.substring(1)
                res.render(path_name + '/main')
                return
            }
        }
        next()
    })    
}

exports.auto_js_helper = function (req, res, next) {
    var site_path    = req.app.dir
    var path_name    = url.parse(req.url).pathname

    if(path_name.indexOf('out.js') < 0){   
        next()
        return
    }

    var js_address = path_name.split('/')
    js_address.pop()
    js_address     = js_address.join('/')
    
    fs.readdir(site_path + '/public' + js_address, function(err, files) {
        if(err) {
            next()
            return
        }
        var main_includes = site_path + '/public' + js_address + '/main.includes'
        var include_files = []

        for(var i = 0; i < files.length; i++) {
            if(files[i] == 'main.includes') {

                csv()
                    .fromPath(main_includes)
                    .on('data', function(data, index) {
                        if (data[0] != "") {
                            var path = __dirname + '/../' + data
                            include_files.push(path)
                        }
                    })
                    .on('end', function(coun) {
                        render_js(include_files)
                    })
                    .on('error', function(err) {
                        console.log(err)
                    })
            }
        }
    })

    function render_js(include_files) {
        var return_data = ''
        //render_main.jade
        for(var i = 0; i < include_files.length; i++){
           return_data += fs.readFileSync(include_files[i]).toString()
        }
        fs.readFile(site_path + '/public' + js_address + '/main.js', function(err, data) {
            if(err) {
                next()
                return
            }
            return_data += data.toString()
            res.send(return_data)
            console.log('dynamic js: ' + js_address + '/out.js ')
        })
    }
}