//--------------------------------------------------------------------------------------------------------
//获取游戏记录列表
//--------------------------------------------------------------------------------------------------------
function get_game_list(cb) {
    $.ajax({
        url: "http://ggfx.syyx.cn/dict_game?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: { IsAll: 0 },
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) { 
            cb(json.rows);
        }
    });
}
//--------------------------------------------------------------------------------------------------------
//获取媒体类型列表
//--------------------------------------------------------------------------------------------------------
function get_adclass_list(cb){
    $.ajax({
        url: "http://ggfx.syyx.cn/ad_class_list?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: {},
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
           cb(json.rows);
        }
    });
}
//--------------------------------------------------------------------------------------------------------
//获取媒体记录列表
//--------------------------------------------------------------------------------------------------------
function get_admedia_list(classid, cb){
    $.ajax({
        url: "http://ggfx.syyx.cn/ad_media_list?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: { ClassID:classid },
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {           
            cb(json.rows);
        }
    });
}
//--------------------------------------------------------------------------------------------------------
//获取广告记录列表
//--------------------------------------------------------------------------------------------------------
function get_adad_list(mediaid, cb){
    $.ajax({
        url: "http://ggfx.syyx.cn/ad_ad_list?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: { MediaID:mediaid },
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
            cb(json.rows);
        }
    });
}
//--------------------------------------------------------------------------------------------------------
//获取子站列表
//--------------------------------------------------------------------------------------------------------
function get_adwebnumber_list(adid, cb){
    $.ajax({
        url: "http://ggfx.syyx.cn/ad_webnumber_list?r="+Math.random(),
        type: "get",
        dataType: "json",
        data: { ADID:adid },
        beforeSend: function() { $("#loading").show(); },
        complete: function() { $("#loading").hide(); },
        success: function(json) {
            cb(json.rows);
        }
    });
}
//--------------------------------------------------------------------------------------------------------