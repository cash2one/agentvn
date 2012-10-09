exports.routes = [
    { method : "get",  url : "/account_check",    module : "account_check",    action : "action", use_session : 0 },
    { method : "get",  url : "/captcha",          module : "get_captcha",      action : "action", use_session : 1 },
    { method : "get",  url : "/check_captcha",    module : "check_captcha",    action : "action", use_session : 1 },
    { method : "get",  url : "/check_idcard",     module : "check_idcard",     action : "action", use_session : 0 },
    { method : "post", url : "/register_account", module : "register_account", action : "action", use_session : 1 },
    { method : "get",  url : "/get_card",         module : "get_card",         action : "action", use_session : 1 },
    { method : "post", url : "/activate_card",    module : "activate_card",    action : "action", use_session : 0 },
    { method : "get",  url : "/get_rush_reg",     module : "get_rush_reg",     action : "action", use_session : 0 },
    { method : "post", url : "/add_phone",        module : "add_phone",        action : "action", use_session : 0 }
]