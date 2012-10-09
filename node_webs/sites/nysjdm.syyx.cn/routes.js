exports.routes = [
    { 
        method      : "get",  
        url         : "/parameter/server_type_list",    
        module      : "parameter/server_type_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/parameter/link_server_add",    
        module      : "parameter/link_server_add",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "post",  
        url         : "/parameter/link_server_list",    
        module      : "parameter/link_server_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/parameter/link_server_list",    
        module      : "parameter/link_server_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/parameter/link_server_viewlist",    
        module      : "parameter/link_server_viewlist",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/parameter/link_server_info",    
        module      : "parameter/link_server_info",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/parameter/link_server_upd",    
        module      : "parameter/link_server_upd",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/parameter/config_params_list",    
        module      : "parameter/config_params_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/parameter/config_class_list",    
        module      : "parameter/config_class_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "post",  
        url         : "/parameter/config_class_list_post",    
        module      : "parameter/config_class_list_post",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/parameter/config_class_info",    
        module      : "parameter/config_class_info",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/parameter/config_class_del",    
        module      : "parameter/config_class_del",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/parameter/config_class_add",    
        module      : "parameter/config_class_add",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/parameter/config_class_upd",    
        module      : "parameter/config_class_upd",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/parameter/config_items_list",    
        module      : "parameter/config_items_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/parameter/config_items_list_able",    
        module      : "parameter/config_items_list_able",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/parameter/config_items_list_byparams",    
        module      : "parameter/config_items_list_byparams",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "post",  
        url         : "/parameter/config_items_list_post",    
        module      : "parameter/config_items_list_post",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/parameter/config_items_info",    
        module      : "parameter/config_items_info",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/parameter/config_items_del",    
        module      : "parameter/config_items_del",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/parameter/config_items_add",    
        module      : "parameter/config_items_add",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/parameter/config_items_upd",    
        module      : "parameter/config_items_upd",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/opanalyse/login_ratenew_list",    
        module      : "opanalyse/login_ratenew_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/opanalyse/daily_transfer_list",    
        module      : "opanalyse/daily_transfer_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/opanalyse/daily_online_list",    
        module      : "opanalyse/daily_online_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/opanalyse/client_install_list",    
        module      : "opanalyse/client_install_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/opanalyse/web_convert_list",    
        module      : "opanalyse/web_convert_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/opanalyse/web_uv_list",    
        module      : "opanalyse/web_uv_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/opanalyse/real_register_list",    
        module      : "opanalyse/real_register_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/gameanalyse/game_kpi_list",    
        module      : "gameanalyse/game_kpi_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/gameanalyse/game_boss_page",    
        module      : "gameanalyse/game_boss_page",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/gameanalyse/game_stone_list",    
        module      : "gameanalyse/game_stone_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/gameanalyse/game_equip_list",    
        module      : "gameanalyse/game_equip_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "post",  
        url         : "/gameanalyse/game_taskfivecolor_list",    
        module      : "gameanalyse/game_taskfivecolor_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "post",  
        url         : "/gameanalyse/game_taskaccept_list",    
        module      : "gameanalyse/game_taskaccept_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "post",  
        url         : "/gameanalyse/game_taskloop_list",    
        module      : "gameanalyse/game_taskloop_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/gameanalyse/game_tasktimes_list",    
        module      : "gameanalyse/game_tasktimes_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/gameanalyse/game_taskplayer_list",    
        module      : "gameanalyse/game_taskplayer_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/gameanalyse/game_task_list",    
        module      : "gameanalyse/game_task_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "post",  
        url         : "/gameanalyse/game_battle_list",    
        module      : "gameanalyse/game_battle_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/gameanalyse/game_corps_page",    
        module      : "gameanalyse/game_corps_page",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/gameanalyse/game_goods_list",    
        module      : "gameanalyse/game_goods_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/gameanalyse/game_detector_list",    
        module      : "gameanalyse/game_detector_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/gameanalyse/game_npcrelease_list",    
        module      : "gameanalyse/game_npcrelease_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/gameanalyse/game_money_list",    
        module      : "gameanalyse/game_money_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/gameanalyse/game_drug_list",    
        module      : "gameanalyse/game_drug_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "post",  
        url         : "/gameanalyse/game_moneylift_list",    
        module      : "gameanalyse/game_moneylift_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/gameanalyse/game_monsterdrop_list",    
        module      : "gameanalyse/game_monsterdrop_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "post",  
        url         : "/gameanalyse/game_civis_list",    
        module      : "gameanalyse/game_civis_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/gameanalyse/game_blueprint_source_list",    
        module      : "gameanalyse/game_blueprint_source_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/gameanalyse/game_blueprint_list",    
        module      : "gameanalyse/game_blueprint_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/gameanalyse/game_raidtimes_list",    
        module      : "gameanalyse/game_raidtimes_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/gameanalyse/game_monsterkill_list",    
        module      : "gameanalyse/game_monsterkill_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/gameanalyse/game_fuwen_list",    
        module      : "gameanalyse/game_fuwen_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/gameanalyse/game_jijia_list",    
        module      : "gameanalyse/game_jijia_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/gameanalyse/game_furniture_list",    
        module      : "gameanalyse/game_furniture_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/gameanalyse/game_homestead_list",    
        module      : "gameanalyse/game_homestead_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "post",  
        url         : "/gameanalyse/game_playerally_list",    
        module      : "gameanalyse/game_playerally_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "post",  
        url         : "/gameanalyse/game_manmade_list",    
        module      : "gameanalyse/game_manmade_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "post",  
        url         : "/gameanalyse/game_kfnum_list",    
        module      : "gameanalyse/game_kfnum_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/gameanalyse/game_animalinfo_list",    
        module      : "gameanalyse/game_animalinfo_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/gameanalyse/game_changeinfo_list",    
        module      : "gameanalyse/game_changeinfo_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/gameanalyse/game_corpstask_list",    
        module      : "gameanalyse/game_corpstask_list",    
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/gameanalyse/game_playerinfoshow_list",     
        module      : "gameanalyse/game_playerinfoshow_list",     
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/gameanalyse/game_onlinetimeshow_list",     
        module      : "gameanalyse/game_onlinetimeshow_list",     
        action      : "action", 
        use_session : 0 
    },
    { 
        method      : "get",  
        url         : "/gameanalyse/game_store_list",     
        module      : "gameanalyse/game_store_list",     
        action      : "action", 
        use_session : 0 
    }

]