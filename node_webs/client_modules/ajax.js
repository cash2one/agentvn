//------------------------------------------------------------------------------------------------
// ajax.js
//------------------------------------------------------------------------------------------------
var _ajax = {}
_ajax.get = function(url, args, cb) {
    var remote_host = _ajax._get_remote_host(url)
    if (!remote_host || remote_host == location.host) {
        url = _ajax._random_url(url)
        return $.get(url, args, cb)
    }

    var callback = _ajax._get_callback(url)
    var options  = {
        dataType      : 'jsonp',
        jsonpCallback : callback,
        url           : _ajax._random_url(url),
        data          : args,
        success       : cb
    }

    return $.ajax(options)
}
//------------------------------------------------------------------------------------------------
_ajax.post = function(url, args, cb) {
    url = _ajax._random_url(url)
    return $.post(url, args, cb)
}
//------------------------------------------------------------------------------------------------
_ajax._get_remote_host = function(url) {
    if (url.indexOf('http://') != 0) {
        return false
    }

    var e = url.indexOf('/', 7)
    if (e < 0) {
        return false
    }

    return url.substring(7, e)
}
//------------------------------------------------------------------------------------------------
_ajax._get_callback = function(url) {
    var e = url.indexOf('/', 7)
    var route = url.substring(e + 1)
    if (route.lastIndexOf('/') == route.length - 1) {
        route = route.substring(0, route.length - 1)
    }

    var b = route.lastIndexOf('/')
    if (b >= 0) {
        route = route.substring(b + 1)
    }

    if (route.lastIndexOf('.') == route.length - 1) {
        route = route.substring(0, route.length - 1)
    }

    var e = route.lastIndexOf('.')
    if (b >= 0) {
        route = route.substring(0, e)
    }

    return route
}
//------------------------------------------------------------------------------------------------
_ajax._random_url = function(url) {
    if (url.indexOf('?') > 0) {
        url += ('&r=' + Math.random())
        return url
    }

    url += ('?r=' + Math.random())
    return url
}
//------------------------------------------------------------------------------------------------
