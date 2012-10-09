//--------------------------------------------------------------------------------------------------------
//通用控件用于广告联动效果
//--------------------------------------------------------------------------------------------------------
$(function(){
    select_game_list();

    get_ad_info(0,0,0);

    $("#ddlSelectClass").change(function(){
        select_admedia_list(this.value, 0);
    })

    $("#ddlSelectMedia").change(function(){
        select_adad_list(this.value, 0);
    })

    $("#ddlSelectAd").change(function(){
        select_adwebnumber_list(this.value, 0);
    })
})
//--------------------------------------------------------------------------------------------------------
//获取媒体联动列表
//--------------------------------------------------------------------------------------------------------
function get_ad_info(def_classid, def_mediaid, def_adid){
    select_adclass_list(def_classid);
    select_admedia_list(def_classid, def_mediaid);
    select_adad_list(def_mediaid, def_adid);
}
//--------------------------------------------------------------------------------------------------------
//获取游戏记录列表
//--------------------------------------------------------------------------------------------------------
function select_game_list() {
    $("#ddlSelectGame").empty();     
    get_game_list(function(json){     
        //显示记录            
        $.each(json, function(i, item) {
            $("#ddlSelectGame").append("<option value='" + item.ID + "'>" + item.Title+ "</option>");              
        })
    });
}
//--------------------------------------------------------------------------------------------------------
//获取媒体类型列表
//--------------------------------------------------------------------------------------------------------
var select_adclass_list = function (def_classid){
    $("#ddlSelectClass").empty();     
    $("#ddlSelectClass").append("<option value=0>请选择</option");
    get_adclass_list(function(json){
        //显示记录            
        $.each(json, function(i, item) {            
            $("#ddlSelectClass").append("<option value='" + item.ID + "'>" + item.ClassName+ "</option>");  
        })

        if(def_classid!=0){
            $("#ddlSelectClass").val(def_classid);        
        }
        
        return ;
    });
}
//--------------------------------------------------------------------------------------------------------
//获取媒体记录列表
//--------------------------------------------------------------------------------------------------------
var select_admedia_list =function (classid, def_mediaid){
    $("#ddlSelectMedia").empty();            
    $("#ddlSelectMedia").append("<option value=0>请选择</option");

    if(classid == 0){   
        select_adad_list(0, 0);     
        return ;
    }
    get_admedia_list(classid, function(json) {
        //显示记录            
        $.each(json, function(i, item) {           
            $("#ddlSelectMedia").append("<option value='" + item.ID + "'>" + item.MediaName+ "</option>");  
        })

        if(def_mediaid!=0){
            $("#ddlSelectMedia").val(def_mediaid);           
        }

        return ;
    });            
}
//--------------------------------------------------------------------------------------------------------
//获取广告记录列表
//--------------------------------------------------------------------------------------------------------
var select_adad_list = function (mediaid, def_adid){
    $("#ddlSelectAd").empty();            
    $("#ddlSelectAd").append("<option value=0>请选择</option");

    if(mediaid == 0){          
        return ;
    }

    get_adad_list(mediaid, function(json) {
        //显示记录            
        $.each(json, function(i, item) {           
            $("#ddlSelectAd").append("<option value='" + item.ID + "'>" + item.ADName+ "</option>");  
        })

        if(def_adid!=0)
            $("#ddlSelectAd").val(def_adid);

        return;
    });            
}
