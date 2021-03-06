
exports.routes = [
    { method : "get",  url : "/captcha",                       module : "get_captcha",                   action : "action", use_session : 1 },
    { method : "get",  url : "/check_captcha",                 module : "check_captcha",                 action : "action", use_session : 1 },
    { method : "get",  url : "/check_user_login",              module : "check_user_login",              action : "action", use_session : 0 },
    { method : "get",  url : "/nycs/acrosspk/warcycle",        module : "nycs/acrosspk/warcycle",        action : "action", use_session : 0 },
    { method : "get",  url : "/nycs/acrosspk/warlist",         module : "nycs/acrosspk/warlist",         action : "action", use_session : 0 },
    { method : "get",  url : "/nycs/acrosspk/entercycle",      module : "nycs/acrosspk/entercycle",      action : "action", use_session : 0 },
    { method : "get",  url : "/nycs/acrosspk/enterlist",       module : "nycs/acrosspk/enterlist",       action : "action", use_session : 0 },
    { method : "get",  url : "/nycs/acrosspk/firerankcycle",   module : "nycs/acrosspk/firerankcycle",   action : "action", use_session : 0 },
    { method : "get",  url : "/nycs/acrosspk/fireranklist",    module : "nycs/acrosspk/fireranklist",    action : "action", use_session : 0 },
    { method : "get",  url : "/nycs/acrosspk/firecycle",       module : "nycs/acrosspk/firecycle",       action : "action", use_session : 0 },
    { method : "get",  url : "/nycs/acrosspk/firelist",        module : "nycs/acrosspk/firelist",        action : "action", use_session : 0 },
    { method : "post", url : "/nycs/acrosspk/enteradd",        module : "nycs/acrosspk/enteradd",        action : "action", use_session : 0 },
    { method : "post", url : "/nycs/acrosspk/fireadd",         module : "nycs/acrosspk/fireadd",         action : "action", use_session : 0 },
    { method : "post", url : "/nycs/acrosspk/firerankadd",     module : "nycs/acrosspk/firerankadd",     action : "action", use_session : 0 },
    { method : "get",  url : "/nycs/acrosspk/groupranklist",   module : "nycs/acrosspk/groupranklist",   action : "action", use_session : 0 },
    { method : "get",  url : "/nycs/special201208/time_int",   module : "nycs/special201208/time_int",   action : "action", use_session : 0 },
    { method : "get",  url : "/nycs/special201208/serverlist", module : "nycs/special201208/serverlist", action : "action", use_session : 0 },
    { method : "post", url : "/nycs/special201208/addrecord",  module : "nycs/special201208/addrecord",  action : "action", use_session : 0 },
    { method : "post", url : "/nycs/notalone/check_login",     module : "nycs/notalone/check_login",     action : "action", use_session : 1 },
    { method : "post", url : "/nycs/notalone/check_upload",    module : "nycs/notalone/check_upload",    action : "action", use_session : 0 },
    { method : "get",  url : "/nycs/notalone/get_serverlist",  module : "nycs/notalone/get_serverlist",  action : "action", use_session : 0 },
    { method : "get",  url : "/nycs/notalone/get_photolist",   module : "nycs/notalone/get_photolist",   action : "action", use_session : 0 },
    { method : "post", url : "/nycs/notalone/upload",          module : "nycs/notalone/upload",          action : "action", use_session : 0 },
    { method : "get",  url : "/nycs/notalone/get_info",        module : "nycs/notalone/get_info",        action : "action", use_session : 0 },
    { method : "get",  url : "/nycs/notalone/get_list_rnd",    module : "nycs/notalone/get_list_rnd",    action : "action", use_session : 0 },
    { method : "get",  url : "/nycs/notalone/",                module : "nycs/notalone/index",           action : "action", use_session : 0 },
    { method : "get",  url : "/nycs/notalone/uploadsuccess",   module : "nycs/notalone/uploadsuccess",   action : "action", use_session : 0 },
    //questionnaire
    { method : "get",  url : "/nycs/questionnaire/get_q_info",      module : "nycs/questionnaire/get_q_info",   action : "action", use_session : 0 },
    { method : "post",  url : "/nycs/questionnaire/submit_answer",  module : "nycs/questionnaire/submit_answer",   action : "action", use_session : 0 },
    { method : "get",   url : "/nycs/questionnaire/check_user",      module : "nycs/questionnaire/check_user",   action : "action", use_session : 0 },

    { method : "get",  url : "/nycs/role/",                    module : "nycs/role/index",               action : "action", use_session : 0 },
    { method : "get",  url : "/nycs/role/index",               module : "nycs/role/index",               action : "action", use_session : 0 },
    { method : "get",  url : "/nycs/role/check_role",          module : "nycs/role/check_role",          action : "action", use_session : 1 },
    { method : "get",  url : "/nycs/role/check_server",        module : "nycs/role/check_server",        action : "action", use_session : 1 },
    { method : "get",  url : "/nysj/role/",                    module : "nysj/role/index",               action : "action", use_session : 0 },
    { method : "get",  url : "/nysj/role/index",               module : "nysj/role/index",               action : "action", use_session : 0 },
    { method : "get",  url : "/nysj/role/check_role",          module : "nysj/role/check_role",          action : "action", use_session : 1 },
    { method : "get",  url : "/nysj/role/check_server",        module : "nysj/role/check_server",        action : "action", use_session : 1 },
    { method : "post", url : "/check_login",     module : "check_login",     action : "action", use_session : 1 },
    { method : "post", url : "/nycs/sing/upload",          module : "nycs/sing/upload",          action : "action", use_session : 0 },
    { method : "post", url : "/nycs/sing/savesing",          module : "nycs/sing/savesing",          action : "action", use_session : 0 },
    { method : "post", url : "/nycs/sing/check_vote",          module : "nycs/sing/check_vote",          action : "action", use_session : 0 },
    { method : "get", url : "/nycs/sing/uploadok",          module : "nycs/sing/uploadok",          action : "action", use_session : 0 },
    { method : "get", url : "/nycs/sing/isvote",          module : "nycs/sing/isvote",          action : "action", use_session : 0 },
    { method : "get", url : "/nycs/sing/get_myinfo",          module : "nycs/sing/get_myinfo",          action : "action", use_session : 0 },
    { method : "get", url : "/nycs/sing/get_singinfo",          module : "nycs/sing/get_singinfo",          action : "action", use_session : 0 },
    { method : "get", url : "/nycs/sing/get_toplist",          module : "nycs/sing/get_toplist",          action : "action", use_session : 0 },
    { method : "get", url : "/nycs/sing/get_newlist",          module : "nycs/sing/get_newlist",          action : "action", use_session : 0 },
    { method : "get", url : "/login_out",          module : "login_out",          action : "action", use_session : 1 },
    { method : "post", url : "/register",     module : "register",     action : "action", use_session : 1 },
    { method : "get", url : "/account_check",          module : "account_check",          action : "action", use_session : 0 },
    { method : "get", url : "/nycs/spokesman/get_spokesmaninfo",          module : "/nycs/spokesman/get_spokesmaninfo",          action : "action", use_session : 0 },
    { method : "post", url : "/nycs/spokesman/savespokesman",          module : "/nycs/spokesman/savespokesman",          action : "action", use_session : 0 },
    { method : "post", url : "/nycs/regular_customer/saveregular_customer",          module : "/nycs/regular_customer/saveregular_customer",          action : "action", use_session : 0 },

    //dating
    { method : "get", url : "/nycs/dating/get_show_images",      module : "/nycs/dating/action",     action : "get_show_images", use_session : 0 },
    { method : "get", url : "/nycs/dating/add_record",           module : "/nycs/dating/action",     action : "add_record", use_session : 0 },
    { method : "get", url : "/nycs/dating/index2.html",           module : "/nycs/dating/action",     action : "redirect", use_session : 0 },
]

