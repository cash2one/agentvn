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
        url         : "/login",         
        module      : "login/index",      
        action      : "action", 
        use_session : 0
    },
    { 
        method      : "post",  
        url         : "/login/enter",    
        module      : "login/enter",    
        action      : "action", 
        use_session : 0
    },
    { 
        method      : "get",  
        url         : "/article_category/find",     
        module      : "article_category/find",     
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "post",  
        url         : "/article_category/upsert",     
        module      : "article_category/upsert",     
        action      : "action", 
        use_session : 0 
    },
    // article
    { 
        method      : "get",  
        url         : "/article",     
        module      : "article/index",     
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/article/:id",     
        module      : "article/index",     
        action      : "show", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/articles_by_title",     
        module      : "article/index",     
        action      : "by_title", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/articles_by_category/:category_id",     
        module      : "article/index",     
        action      : "by_category", 
        use_session : 0 
    },
    { 
        method      : "delete",  
        url         : "/article/:id",     
        module      : "article/index",     
        action      : "remove", 
        use_session : 0 
    },
    { 
        method      : "post",  
        url         : "/article/upsert",     
        module      : "article/upsert",     
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "post",  
        url         : "/publish_category/upsert",     
        module      : "publish_category/upsert",     
        action      : "action", 
        use_session : 0
    },
    { 
        method      : "get",  
        url         : "/publish_category/find",     
        module      : "publish_category/find",     
        action      : "action", 
        use_session : 0
    },
    { 
        method      : "post",  
        url         : "/publish_item/upsert",     
        module      : "publish_item/upsert",     
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/publish_item/find",     
        module      : "publish_item/find",     
        action      : "action", 
        use_session : 1 
    },
    { 
        method      : "post",  
        url         : "/publish_item/remove",     
        module      : "publish_item/remove",     
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "post",  
        url         : "/upload_file",     
        module      : "upload_file",     
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "post",  
        url         : "/kind_editor_upload_img",     
        module      : "kind_editor_upload_img",     
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/client",     
        module      : "client/index",     
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/client/find",     
        module      : "client/find",     
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "post",  
        url         : "/client/upsert",     
        module      : "client/upsert",     
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "post",  
        url         : "/client/remove",     
        module      : "client/remove",     
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/activate",     
        module      : "activate/index",     
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/activate_setting",     
        module      : "activate/setting_find",     
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "post",  
        url         : "/activate_setting",     
        module      : "activate/setting",     
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/activate_detail",     
        module      : "activate/find",     
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/exports_code_detail",     
        module      : "activate/find",     
        action      : "export_file", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/publish_category/remove/:id",     
        module      : "publish_category/index",     
        action      : "remove_by_id", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/article_category/remove/:id",     
        module      : "article_category/index",     
        action      : "remove_by_id", 
        use_session : 0 
    }
]