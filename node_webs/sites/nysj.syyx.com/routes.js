exports.routes = [
    { 
        method      : "get",  
        url         : "/",    
        module      : "index",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/stat/visit",         
        module      : "stat/visit",      
        action      : "action", 
        use_session : 0
    },
    { 
        method      : "get",  
        url         : "/stat/download_fullclient",    
        module      : "stat/download_fullclient",    
        action      : "action", 
        use_session : 0
    },
    { 
        method      : "get",  
        url         : "/stat/download_miniclient",     
        module      : "stat/download_miniclient",     
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/client/full",     
        module      : "client/full",     
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/client/mini",     
        module      : "client/mini",     
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/clients_find_by_name",     
        module      : "client/find_by_name",     
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/publish_category_find_by_name",     
        module      : "publish_category/find_by_name",     
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/reg/account_check",     
        module      : "reg/account_check",     
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/reg/get_captcha",     
        module      : "reg/get_captcha",     
        action      : "action", 
        use_session : 1
    },
    { 
        method      : "get",  
        url         : "/reg/check_captcha",     
        module      : "reg/check_captcha",     
        action      : "action", 
        use_session : 1
    },
    { 
        method      : "get",  
        url         : "/reg/check_idcard",     
        module      : "reg/check_idcard",     
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "post",  
        url         : "/reg/register_account",     
        module      : "reg/register_account",     
        action      : "action", 
        use_session : 1 
    },
    { 
        method      : "post",  
        url         : "/get_mobile_code",     
        module      : "activate/get_mobile_code",     
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "post",  
        url         : "/get_activate_code",     
        module      : "activate/get_activate_code",     
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "post",  
        url         : "/activate_account",     
        module      : "activate/activate_account",     
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/get_news_list_by_classid",     
        module      : "news/find_by_classid",     
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/get_news_content_by_newsid",     
        module      : "news/find_by_newsid",     
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/get_related_news_by_newsid",     
        module      : "news/find_related_news",     
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/get_newsclass",     
        module      : "news/find_news_class",     
        action      : "action", 
        use_session : 0 
    }
]