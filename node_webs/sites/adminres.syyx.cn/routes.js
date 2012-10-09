exports.routes = [
    { method : "get",  url : "/",               module : "login",          action : "action", use_session : 0 },
    { method : "get",  url : "/login",          module : "login",          action : "action", use_session : 0 },
    { method : "post", url : "/login_action",   module : "login_action",   action : "action", use_session : 1 },
    { method : "get",  url : "/login_out",      module : "login_out",      action : "action", use_session : 1 },
    { method : "get",  url : "/get",            module : "get",            action : "action", use_session : 1 },
    { method : "get",  url : "/get_ajax",       module : "get_ajax",       action : "action", use_session : 1 },
    { method : "get",  url : "/get_html",       module : "get_html",       action : "action", use_session : 0 },
    { method : "post", url : "/get_css",        module : "get_css",        action : "action", use_session : 0 },
    { method : "post", url : "/upload",         module : "upload",         action : "action", use_session : 1 },
    { method : "post", url : "/setftp",         module : "setftp",         action : "action", use_session : 1 },
    { method : "get",  url : "/mylog",          module : "mylog",          action : "action", use_session : 1 },
    { method : "get",  url : "/mylog_ajax",     module : "mylog_ajax",     action : "action", use_session : 1 },
    { method : "get",  url : "/adminftp",       module : "adminftp",       action : "action", use_session : 1 },
    { method : "get",  url : "/adminftp_ajax",  module : "adminftp_ajax",  action : "action", use_session : 1 },
    { method : "get",  url : "/git",            module : "git",            action : "action", use_session : 1 },
    { method : "get",  url : "/gitlog",         module : "gitlog",         action : "action", use_session : 1 },
    { method : "get",  url : "/gitlog_ajax",    module : "gitlog_ajax",    action : "action", use_session : 1 },
    { method : "get",  url : "/del_upload_log", module : "del_upload_log", action : "action", use_session : 1 },
]