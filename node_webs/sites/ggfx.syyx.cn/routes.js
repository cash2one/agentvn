exports.routes = [
    { method : "get",  url : "/dict_game",              module : "dict_game",       action : "action",              use_session : 0 },
    { method : "get",  url : "/ad_class_add",           module : "ad_class",        action : "addrecord",           use_session : 0 },
    { method : "get",  url : "/ad_class_update",        module : "ad_class",        action : "updaterecord",        use_session : 0 },
    { method : "get",  url : "/ad_class_page",          module : "ad_class",        action : "getpagelist",         use_session : 0 },
    { method : "get",  url : "/ad_class_list",          module : "ad_class",        action : "action",              use_session : 0 },
    { method : "get",  url : "/ad_class_record",        module : "ad_class",        action : "getrecord",           use_session : 0 },
    { method : "get",  url : "/ad_media_page",          module : "ad_media",        action : "getpagelist",         use_session : 0 },
    { method : "get",  url : "/ad_media_list",          module : "ad_media",        action : "action",              use_session : 0 },
    { method : "get",  url : "/ad_media_record",        module : "ad_media",        action : "getrecord",           use_session : 0 },
    { method : "get",  url : "/ad_media_add",           module : "ad_media",        action : "addrecord",           use_session : 0 },
    { method : "get",  url : "/ad_media_update",        module : "ad_media",        action : "updaterecord",        use_session : 0 },
    { method : "get",  url : "/ad_ad_list",             module : "ad_ad",           action : "action",              use_session : 0 },
    { method : "get",  url : "/ad_ad_page",             module : "ad_ad",           action : "getpagelist",         use_session : 0 },
    { method : "get",  url : "/ad_ad_record",           module : "ad_ad",           action : "getrecord",           use_session : 0 },
    { method : "get",  url : "/ad_ad_add",              module : "ad_ad",           action : "addrecord",           use_session : 0 },
    { method : "get",  url : "/ad_ad_update",           module : "ad_ad",           action : "addrecord",           use_session : 0 },
    { method : "get",  url : "/ad_period",              module : "ad_report",       action : "getadperiodlist",     use_session : 0 },
    { method : "get",  url : "/ad_period_se",           module : "ad_report",       action : "getadperiodselist",   use_session : 0 },
    { method : "get",  url : "/ad_phase",               module : "ad_report",       action : "getadphaselist",      use_session : 0 },
    { method : "get",  url : "/ad_phase_se",            module : "ad_report",       action : "getadphaseselist",    use_session : 0 },
    { method : "get",  url : "/ad_daily",               module : "ad_report",       action : "getaddailylist",      use_session : 0 },
    { method : "get",  url : "/ad_webnumber_list",      module : "ad_webnumber",    action : "action",              use_session : 0 },
    { method : "get",  url : "/ad_pegging_search",      module : "ad_pegging",      action : "action",              use_session : 0 },
    { method : "get",  url : "/ad_kpi_day_list",        module : "ad_kpi",          action : "getkpidaylist",       use_session : 0 },
    { method : "get",  url : "/ad_kpi_month_list",      module : "ad_kpi",          action : "getkpimonthlist",     use_session : 0 },
    { method : "get",  url : "/ad_kpi_month_detail",    module : "ad_kpi",          action : "getkpimonthdetail",   use_session : 0 },
    { method : "get",  url : "/ad_schedule_search",     module : "ad_schedule",     action : "action",              use_session : 0 },
    { method : "get",  url : "/ad_schedule_page",       module : "ad_schedule",     action : "getpagelist",         use_session : 0 },
    { method : "get",  url : "/ad_schedule_record",     module : "ad_schedule",     action : "getrecord",           use_session : 0 },
    { method : "get",  url : "/ad_schedule_add",        module : "ad_schedule",     action : "addrecord",           use_session : 0 },    
    { method : "get",  url : "/ad_schedule_delete",     module : "ad_schedule",     action : "deleterecord",        use_session : 0 },    
    { method : "get",  url : "/ad_monitor_date_list",   module : "ad_monitor",      action : "getdatelist",         use_session : 0 },
    { method : "get",  url : "/ad_monitor_hour_list",   module : "ad_monitor",      action : "gethourlist",         use_session : 0 },
    { method : "get",  url : "/ad_sync_data",           module : "ad_sync",         action : "action",              use_session : 0 },
]